import { Dispatch, SetStateAction } from "react"
import FudgeWindow from "./FudgeWindow"

export type FudgeApp = {
	title: string,
	defaultWidth: number,
	defaultHeight: number,
	getContent: () => React.ReactNode,
	isOpen: boolean,
	isMinimized: boolean,
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
		windowInstance: null
	}
}

export function startApp(app: FudgeApp, forceRerender: Dispatch<SetStateAction<number>>): FudgeApp {
	const window = new FudgeWindow(forceRerender, app.title, 0, 0, app.defaultWidth, app.defaultHeight, app.getContent())
	window.unminimize()
	return {
		...app,
		isOpen: true,
		isMinimized: false,
		windowInstance: window,
	}
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