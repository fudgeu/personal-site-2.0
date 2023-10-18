import { ReactNode, RefObject } from "react";

export default class FudgeWindow {
	title: string;
	x: number;
	y: number;
	width: number;
	height: number;
	content: ReactNode;

	constructor(title?: string, x?: number, y?: number, w?: number, h?: number, content?: ReactNode) {
		this.title = title || "Window";
		this.x = x || 0;
		this.y = y || 0;
		this.width = w || 800;
		this.height = h || 600;
		this.content = content || [];
	}
}