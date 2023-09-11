'use client'

import { useCallback, useEffect, useState } from 'react'
import styles from './styles.module.css'
import clsx from 'clsx'

type TerminalEvent = {
	action: () => void,
	text: string,
	timeout: number,
}

export default function TestPage() {

	const [textList, setTextList] = useState<string[]>([])
	const [useGreen, setUseGreen] = useState(false)

	// go through terminal events
	const processTerminalEvent = useCallback((eventList: TerminalEvent[]) => {
		const curEvent = eventList[0]
		eventList.shift()
		curEvent.action()
		setTextList((previous) => [...previous, curEvent.text])
		if (eventList.length == 0) return
		setTimeout(() => processTerminalEvent(eventList), curEvent.timeout)
	}, []);

	// loading animation
	useEffect(() => {
		const eventList: TerminalEvent[] = [];

		eventList[0] = {
			action: () => {},
			text: "RUNNING MEMORY TEST...",
			timeout: 100
		}

		eventList[1] = {
			action: () => {},
			text: "MEMORY TEST OK",
			timeout: 50
		}

		eventList[2] = {
			action: () => {},
			text: "KEYBOARD OK",
			timeout: 50
		}

		eventList[3] = {
			action: () => {},
			text: "INITIALIZING HYPER-RAM DRIVE...",
			timeout: 50
		}

		eventList[4] = {
			action: () => {},
			text: "INITIALIZING QUANTUM TUNNELING DEVICE...",
			timeout: 50
		}

		eventList[5] = {
			action: () => {},
			text: "INITIALIZING 4D GRAPHICS DEVICE...",
			timeout: 150
		}

		eventList[6] = {
			action: () => {setUseGreen(true)},
			text: "GRAPHICS DEVICE LOADED. ADJUSTING COLOR PALETTE.",
			timeout: 50
		}

		eventList[7] = {
			action: () => {setUseGreen(true)},
			text: "BEGINNING OPERATING SYSTEM LOAD",
			timeout: 150
		}

		eventList[8] = {
			action: () => {setUseGreen(true)},
			text: "LOADED FILE X:/SYSTEM/BLAH.DLL",
			timeout: 20
		}

		eventList[9] = {
			action: () => {setUseGreen(true)},
			text: "LOADED FILE X:/SYSTEM/BLAH.DLL",
			timeout: 20
		}

		eventList[10] = {
			action: () => {setUseGreen(true)},
			text: "LOADED FILE X:/SYSTEM/BLAH.DLL",
			timeout: 20
		}

		eventList[11] = {
			action: () => {setUseGreen(true)},
			text: "LOADED FILE X:/SYSTEM/BLAH.DLL",
			timeout: 20
		}

		processTerminalEvent(eventList)

	}, [])

	return (
		<main className={
			clsx({
				[styles.main]: true,
				[styles.greenText]: useGreen
			})
		}>
			{
				textList.map((val, index) => {
					return (<p key={index}>{val}</p>)
				})
			}
		</main>
	)



}