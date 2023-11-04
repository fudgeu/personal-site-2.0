import { Dispatch, SetStateAction } from "react"
import FudgeWindow from "./FudgeWindow"

export type FudgeApp = {
	title: string,
	defaultWidth: number,
	defaultHeight: number,
	getContent: () => React.ReactNode,
	isOpen: boolean,
	isMinimized: boolean,
	isMaximized: boolean,
	unminimizedWidth: number,
	unminimizedHeight: number,
	unminimizedX: number,
	unminimizedY: number,
	windowInstance: FudgeWindow | null,
}

export function makeApp(
	title: string,
	content: () => React.ReactNode
): FudgeApp {
	return {
		title,
		defaultWidth: 800,
		defaultHeight: 600,
		getContent: content,
		isOpen: false,
		isMinimized: true,
		isMaximized: false,
		unminimizedWidth: 0,
		unminimizedHeight: 0,
		unminimizedX: 0,
		unminimizedY: 0,
		windowInstance: null
	}
}

export function startApp(app: FudgeApp, surfaceWidth: number, surfaceHeight: number, forceRerender: Dispatch<SetStateAction<number>>): FudgeApp {
	const windowX = (surfaceWidth - app.defaultWidth) / 2;
	const windowY = (surfaceHeight - app.defaultHeight) / 2;
	const window = new FudgeWindow(
		forceRerender, 
		app.title,
		windowX,
		windowY,
		app.defaultWidth,
		app.defaultHeight,
		app.getContent()
	)
	window.unminimize()
	return {
		...app,
		isOpen: true,
		isMinimized: false,
		isMaximized: false,
		windowInstance: window,
	}
}

export function closeApp(app: FudgeApp) {
	if (app.windowInstance)
		app.windowInstance.scale = 0;
	setTimeout(() => {
		app.isOpen = false;
		app.windowInstance = null;
		app.isMinimized = true;
	}, 200);
	return app;
}

export function maximizeApp(app: FudgeApp, width: number, height: number) {
	if (!app.windowInstance) return app;
	if (app.isMaximized) {
		app.windowInstance.unmaximize(app.unminimizedX, app.unminimizedY, app.unminimizedWidth, app.unminimizedHeight);
		app.isMaximized = false;
		return app;
	}

	app.unminimizedX = app.windowInstance.x; 
	app.unminimizedY = app.windowInstance.y;
	app.unminimizedWidth = app.windowInstance.width;
	app.unminimizedHeight = app.windowInstance.height;

	app.windowInstance.maximize(width, height)
	app.isMaximized = true;

	return app;
}

export function unminimizeApp(app: FudgeApp): FudgeApp {
	if (!app.isOpen) return app;
	app.isMinimized = false;
	app.windowInstance?.unminimize();
	return app;
}

export function minimizeApp(app: FudgeApp): FudgeApp {
	if (!app.isOpen) return app;
	app.isMinimized = true;
	app.windowInstance?.minimizeTo(0, 0);
	return app;
}

export function minimizeAppTo(app: FudgeApp, rect: DOMRect | undefined): FudgeApp {
	if (!app.isOpen) return app;
	app.isMinimized = true;
	let toX = 0;
	let toY = 0;
	if (rect) {
		toX = rect.left + (rect.width / 2)
		toY = rect.top + (rect.height / 2)
	}
	app.windowInstance?.minimizeTo(toX, toY);
	return app;
}

export function onDrag(app: FudgeApp, x: number, y: number): FudgeApp {
	if (!app.windowInstance || !app.isMaximized) {
		return app;
	}

	// Calculate window position
	const xPos = x - (((x - app.windowInstance.x) / app.windowInstance.width) * app.unminimizedWidth)
	app.windowInstance.unmaximizeInstantly(xPos, y, app.unminimizedWidth, app.unminimizedHeight)
	app.isMaximized = false;
	return app;
}