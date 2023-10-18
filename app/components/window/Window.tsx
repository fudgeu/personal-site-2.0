/* eslint-disable @next/next/no-img-element */
import { createElement, forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react';
import styles from './styles.module.css'
import ResizeFrame from '../resize-frame/ResizeFrame';
import FudgeWindow from '@/app/util/FudgeWindow';

type WindowProps = {
	/*title: string;
	onMinimize: () => void;
	children: React.ReactNode;*/
	from: FudgeWindow;
}

type MousePos = {
	x: number;
	y: number;
}

export default forwardRef<HTMLDivElement, WindowProps>(function Window({ from }, ref) {

	const windowRef = useRef<HTMLDivElement>(null);
	const titleBarRef = useRef<HTMLDivElement>(null);

	const lastMousePos = useRef<MousePos>();

	useImperativeHandle(ref, () => {
		if (windowRef.current)
			return windowRef.current
		return document.createElement('div');
	});
	
	const onMouseMove = useCallback((e: MouseEvent) => {
		if (!lastMousePos.current || !windowRef.current) return;
		const deltaX = lastMousePos.current.x - e.clientX;
		const deltaY = lastMousePos.current.y - e.clientY;

		//windowRef.current.style.top  = (windowRef.current.offsetTop - deltaY).toString() + "px";
		//windowRef.current.style.left = (windowRef.current.offsetLeft - deltaX).toString() + "px";
		from.x -= deltaX;
		from.y -= deltaY;
		lastMousePos.current = {x: e.clientX, y: e.clientY}
	}, [])

	const onMouseUp = useCallback((e: MouseEvent) => {
		document.body.style.userSelect = "auto";
		window.removeEventListener("mousemove", onMouseMove)
		window.removeEventListener("mouseup", onMouseUp)
	}, [onMouseMove])

	const onMouseDown = useCallback((e: MouseEvent) => {
		lastMousePos.current = {x: e.clientX, y: e.clientY}
		document.body.style.userSelect = "none";
		window.addEventListener("mousemove", onMouseMove)
		window.addEventListener("mouseup", onMouseUp)
	}, [onMouseMove, onMouseUp]);

	useEffect(() => {
		// Apply mouse down listener
		const ref = titleBarRef.current;
		if (!ref) return;
		ref.addEventListener("mousedown", onMouseDown)
	}, []);

	/* Resize handlers */
	const changeWidth = useCallback((deltaX: number) => {
		from.width += deltaX;
	}, [from])

	const changeHeight = useCallback((deltaY: number) => {
		from.height += deltaY
	}, [from])

	const changeLeft = useCallback((deltaX: number) => {
		from.x += deltaX
	}, [from])

	const changeTop = useCallback((deltaY: number) => {
		from.y += deltaY;
	}, [from])

	/* Set to middle of screen by default */
	useEffect(() => {
		if (!windowRef.current) return;
		windowRef.current.style.top = ((window.innerHeight - windowRef.current.offsetHeight) / 2).toString() + "px"
		windowRef.current.style.left = ((window.innerWidth - windowRef.current.offsetWidth) / 2).toString() + "px"
	}, [])

	useEffect(() => {
		if (!windowRef.current) return;
		windowRef.current.style.top  = from.y.toString() + "px"
		windowRef.current.style.left = from.x.toString() + "px"
		windowRef.current.style.height = from.height.toString() + "px"
		windowRef.current.style.width  = from.width.toString() + "px"
	}, [from.height, from.width, from.x, from.y])
	
	return (
		<article className={styles.container} ref={windowRef}>
			<div className={styles.titleBar} ref={titleBarRef}>
				<div className={styles.titleBarLeft}>
					<span>{from.title}</span>
				</div>
				<div className={styles.titleBarRight}>
					<div className={styles.button} onClick={() => {}}>
						<img alt="Minimize window" src="dash.svg" />
					</div>
					<div className={styles.button}>
						<img alt="Maximize window" src="square.svg" />
					</div>					
					<div className={styles.button}>
						<img alt="Close window" src="x.svg" />
					</div>
				</div>
			</div>
			<div className={styles.content}>
				{from.content}
			</div>
			<ResizeFrame changeWidth={changeWidth} changeHeight={changeHeight} changeLeft={changeLeft} changeTop={changeTop} />
		</article>
	)
});
