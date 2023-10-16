import { useCallback, useEffect, useRef } from 'react';
import styles from './styles.module.css'

type ResizeFrameProps = {
	changeWidth: (deltaX: number) => void;
	changeHeight: (deltaY: number) => void;
	changeLeft: (deltaX: number) => void;
	changeTop: (deltaY: number) => void;
}

type MousePos = {
	x: number;
	y: number;
}

type MouseDragEvent = (e: MouseEvent) => void;

export default function ResizeFrame({ changeWidth, changeHeight, changeLeft, changeTop}: ResizeFrameProps) {

	const lastMousePos = useRef<MousePos>();

	/* Resize Refs */
	const topLeftRef     = useRef<HTMLDivElement>(null);
	const topRef         = useRef<HTMLDivElement>(null);
	const topRightRef    = useRef<HTMLDivElement>(null);
	const rightRef 		   = useRef<HTMLDivElement>(null);
	const bottomRightRef = useRef<HTMLDivElement>(null);
	const bottomRef 		 = useRef<HTMLDivElement>(null);
	const bottomLeftRef  = useRef<HTMLDivElement>(null);
	const leftRef 			 = useRef<HTMLDivElement>(null);

	/* Util */
	const onMouseUp = useCallback((e: MouseEvent, mouseDragEvent: MouseDragEvent) => {
		document.body.style.userSelect = "auto";
		window.removeEventListener("mousemove", mouseDragEvent)
		window.removeEventListener("mouseup", (e) => onMouseUp(e, mouseDragEvent))
	}, [])

	const onMouseDown = useCallback((e: MouseEvent, mouseDragEvent: MouseDragEvent) => {
		lastMousePos.current = {x: e.clientX, y: e.clientY}
		document.body.style.userSelect = "none";
		window.addEventListener("mousemove", mouseDragEvent)
		window.addEventListener("mouseup", (e) => onMouseUp(e, mouseDragEvent))
	}, [onMouseUp]);

	/* Drag handlers */
	const topLeftHandle = useCallback((e: MouseEvent) => {
		if (!lastMousePos.current) return;
		const deltaX = e.clientX - lastMousePos.current.x;
		const deltaY = e.clientY - lastMousePos.current.y;
		changeLeft(deltaX)
		changeWidth(-deltaX);
		changeTop(deltaY);
		changeHeight(-deltaY);
		lastMousePos.current = {x: e.clientX, y: e.clientY}
	}, [changeHeight, changeLeft, changeTop, changeWidth]);
	
	const topHandle = useCallback((e: MouseEvent) => {
		if (!lastMousePos.current) return;
		const deltaY = e.clientY - lastMousePos.current.y;
		changeTop(deltaY);
		changeHeight(-deltaY);
		lastMousePos.current = {x: e.clientX, y: e.clientY}
	}, [changeHeight, changeTop])

	const topRightHandle = useCallback((e: MouseEvent) => {
		if (!lastMousePos.current) return;
		const deltaX = e.clientX - lastMousePos.current.x;
		const deltaY = e.clientY - lastMousePos.current.y;
		changeWidth(deltaX);
		changeTop(deltaY);
		changeHeight(-deltaY);
		lastMousePos.current = {x: e.clientX, y: e.clientY}
	}, [changeHeight, changeTop, changeWidth]);

	const rightHandle = useCallback((e: MouseEvent) => {
		if (!lastMousePos.current) return;
		const deltaX = e.clientX - lastMousePos.current.x;
		changeWidth(deltaX);
		lastMousePos.current = {x: e.clientX, y: e.clientY}
	}, [changeWidth]);

	const bottomRightHandle = useCallback((e: MouseEvent) => {
		if (!lastMousePos.current) return;
		const deltaX = e.clientX - lastMousePos.current.x;
		const deltaY = e.clientY - lastMousePos.current.y;
		changeWidth(deltaX);
		changeHeight(deltaY);
		lastMousePos.current = {x: e.clientX, y: e.clientY}
	}, [changeHeight, changeWidth]);

	const bottomHandle = useCallback((e: MouseEvent) => {
		if (!lastMousePos.current) return;
		const deltaY = e.clientY - lastMousePos.current.y;
		changeHeight(deltaY);
		lastMousePos.current = {x: e.clientX, y: e.clientY}
	}, [changeHeight]);

	const bottomLeftHandle = useCallback((e: MouseEvent) => {
		if (!lastMousePos.current) return;
		const deltaX = e.clientX - lastMousePos.current.x;
		const deltaY = e.clientY - lastMousePos.current.y;
		changeLeft(deltaX)
		changeWidth(-deltaX);
		changeHeight(deltaY);
		lastMousePos.current = {x: e.clientX, y: e.clientY}
	}, [changeHeight, changeLeft, changeWidth]);

	const leftHandle = useCallback((e: MouseEvent) => {
		if (!lastMousePos.current) return;
		const deltaX = e.clientX - lastMousePos.current.x;
		changeLeft(deltaX)
		changeWidth(-deltaX);
		lastMousePos.current = {x: e.clientX, y: e.clientY}
	}, [changeLeft, changeWidth]);

	useEffect(() => {
		// Apply mouse down listener
		const tlRef = topLeftRef.current;
		const tRef = topRef.current;
		const trRef = topRightRef.current;
		const rRef = rightRef.current;
		const brRef = bottomRightRef.current;
		const bRef = bottomRef.current;
		const blRef = bottomLeftRef.current;
		const lRef = leftRef.current;
		if (!tlRef || !tRef || !trRef || !rRef || !brRef || !bRef || !blRef || !lRef) return;
		tlRef.addEventListener("mousedown", (e) => onMouseDown(e, topLeftHandle))
		tRef.addEventListener("mousedown", (e) => onMouseDown(e, topHandle));
		trRef.addEventListener("mousedown", (e) => onMouseDown(e, topRightHandle));
		rRef.addEventListener("mousedown", (e) => onMouseDown(e, rightHandle));
		brRef.addEventListener("mousedown", (e) => onMouseDown(e, bottomRightHandle));
		bRef.addEventListener("mousedown", (e) => onMouseDown(e, bottomHandle));
		blRef.addEventListener("mousedown", (e) => onMouseDown(e, bottomLeftHandle));
		lRef.addEventListener("mousedown", (e) => onMouseDown(e, leftHandle));
	}, []);
	
	return (
		<div className={styles.container}>
			<div className={styles.topLeftCorner} ref={topLeftRef} />
			<div className={styles.top} ref={topRef} />
			<div className={styles.topRightCorner} ref={topRightRef} />
			<div className={styles.right} ref={rightRef} />
			<div className={styles.bottomRightCorner} ref={bottomRightRef} />
			<div className={styles.bottom} ref={bottomRef} />
			<div className={styles.bottomLeftCorner} ref={bottomLeftRef} />
			<div className={styles.left} ref={leftRef} />
		</div>
	)
}