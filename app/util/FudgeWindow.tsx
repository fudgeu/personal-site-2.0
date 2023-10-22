import { Dispatch, ReactNode, RefObject, SetStateAction } from "react";

export default class FudgeWindow {
	title: string;
	x: number;
	y: number;
	width: number;
	height: number;
	translateX: number = 0;
	translateY: number = 0;
	scale: number = 0;
	zIndex: number = 1;
	content: ReactNode;
	rerender: Dispatch<SetStateAction<number>>;

	_isMinimized = false;

	constructor(rerender: Dispatch<SetStateAction<number>>, title?: string, x?: number, y?: number, w?: number, h?: number, content?: ReactNode) {
		this.title = title || "Window";
		this.x = x || 0;
		this.y = y || 0;
		this.width = w || 800;
		this.height = h || 600;
		this.content = content || [];
		this.rerender = rerender;
	}

	get isMinimized() {
		return this._isMinimized;
	}
	
	minimize() {
		this._isMinimized = true;
		this.scale = 0;
		this.rerender(Math.random); 
	}

	minimizeTo(x: number, y: number) {
		const centerX = this.x + (this.width / 2)
		const centerY = this.y + (this.height / 2)
		this._isMinimized = true;
		this.scale = 0;
		this.translateX = x - centerX;
		this.translateY = y - centerY;
		this.rerender(Math.random())
	}

	unminimize() {
		this._isMinimized = false;
		this.scale = 1;
		this.translateX = 0;
		this.translateY = 0;
		this.rerender(Math.random())
	}
}