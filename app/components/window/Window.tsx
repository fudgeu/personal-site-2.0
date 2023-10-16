/* eslint-disable @next/next/no-img-element */
import { createElement, forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react';
import styles from './styles.module.css'
import ResizeFrame from '../resize-frame/ResizeFrame';

type WindowProps = {
	title: string;
	onMinimize: () => void;
	children: React.ReactNode;
}

type MousePos = {
	x: number;
	y: number;
}

export default forwardRef<HTMLDivElement, WindowProps>(function Window({ title, onMinimize, children }, ref) {

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

		windowRef.current.style.top  = (windowRef.current.offsetTop - deltaY).toString() + "px";
		windowRef.current.style.left = (windowRef.current.offsetLeft - deltaX).toString() + "px";
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
		const ref = windowRef.current;
		if (!ref) return;
		ref.style.width = (ref.offsetWidth + deltaX).toString() + "px"; 
	}, [])

	const changeHeight = useCallback((deltaY: number) => {
		const ref = windowRef.current;
		if (!ref) return;
		ref.style.height = (ref.offsetHeight + deltaY).toString() + "px"; 
	}, [])

	const changeLeft = useCallback((deltaX: number) => {
		const ref = windowRef.current;
		if (!ref) return;
		ref.style.left = (ref.offsetLeft + deltaX).toString() + "px"; 
	}, [])

	const changeTop = useCallback((deltaY: number) => {
		const ref = windowRef.current;
		if (!ref) return;
		ref.style.top = (ref.offsetTop + deltaY).toString() + "px"; 
	}, [])

	/* Set to middle of screen by default */
	useEffect(() => {
		if (!windowRef.current) return;
		windowRef.current.style.top = ((window.innerHeight - windowRef.current.offsetHeight) / 2).toString() + "px"
		windowRef.current.style.left = ((window.innerWidth - windowRef.current.offsetWidth) / 2).toString() + "px"
	}, [])
	
	return (
		<article className={styles.container} ref={windowRef}>
			<div className={styles.titleBar} ref={titleBarRef}>
				<div className={styles.titleBarLeft}>
					<span>{title}</span>
				</div>
				<div className={styles.titleBarRight}>
					<div className={styles.button} onClick={onMinimize}>
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
				{children}
			</div>
			<ResizeFrame changeWidth={changeWidth} changeHeight={changeHeight} changeLeft={changeLeft} changeTop={changeTop} />
		</article>
	)
});
