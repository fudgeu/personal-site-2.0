'use client'

import { useCallback, useEffect, useState } from 'react'
import styles from './styles.module.css'
import clsx from 'clsx'
import BackgroundGL from '../webgl/component/background_gl'

type TerminalEvent = {
	action: () => void,
	text: string,
	timeout: number,
}

export default function TestPage() {

	const [textList, setTextList] = useState<string[]>([])
	const [useGreen, setUseGreen] = useState(false)
	const [showBackground, setShowBackground] = useState(false)
	const [mousePos, setMousePos] = useState({x: 0, y: 0})

	// mouse pos effect
	useEffect(() => {
		const handleMouseMove = (event: MouseEvent) => {
			setMousePos({x: event.clientX, y: event.clientY})
		}
		window.addEventListener('mousemove', handleMouseMove)
		return () => window.removeEventListener('mousemove', handleMouseMove)
	})

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
			action: () => {},
			text: "BEGINNING OPERATING SYSTEM LOAD",
			timeout: 150
		}

		eventList[8] = {
			action: () => {},
			text: "LOADED FILE X:/SYSTEM/BLAH.DLL",
			timeout: 20
		}

		eventList[9] = {
			action: () => {},
			text: "LOADED FILE X:/SYSTEM/BLAH.DLL",
			timeout: 20
		}

		eventList[10] = {
			action: () => {},
			text: "LOADED FILE X:/SYSTEM/BLAH.DLL",
			timeout: 20
		}

		eventList[11] = {
			action: () => {},
			text: "LOADED FILE X:/SYSTEM/BLAH.DLL",
			timeout: 20
		}

		eventList[12] = {
			action: () => {},
			text: "OPERATING SYSTEM LOAD COMPLETE",
			timeout: 250
		}

		eventList.push({
			action: () => {},
			text: " ",
			timeout: 5
		})

		eventList.push({
			action: () => {},
			text: " ________ ___  ___  ________  ________  _______   ___  ___          ________  ________",
			timeout: 0
		})

		eventList.push({
			action: () => {},
			text: "|\\  _____\\\\  \\|\\  \\|\\   ___ \\|\\   ____\\|\\  ___ \\ |\\  \\|\\  \\        |\\   __  \\|\\   ____\\",
			timeout: 5
		})

		eventList.push({
			action: () => {},
			text: "\\ \\  \\__/\\ \\  \\\\\\  \\ \\  \\_|\\ \\ \\  \\___|\\ \\   __/|\\ \\  \\\\\\  \\       \\ \\  \\|\\  \\ \\  \\___|_",
			timeout: 5
		})

		eventList.push({
			action: () => {},
			text: " \\ \\   __\\\\ \\  \\\\\\  \\ \\  \\ \\\\ \\ \\  \\  __\\ \\  \\_|/_\\ \\  \\\\\\  \\       \\ \\  \\\\\\  \\ \\_____  \\",
			timeout: 5
		})

		eventList.push({
			action: () => {},
			text: "  \\ \\  \\_| \\ \\  \\\\\\  \\ \\  \\_\\\\ \\ \\  \\|\\  \\ \\  \\_|\\ \\ \\  \\\\\\  \\       \\ \\  \\\\\\  \\|____|\\  \\",
			timeout: 5
		})

		eventList.push({
			action: () => {},
			text: "   \\ \\__\\   \\ \\_______\\ \\_______\\ \\_______\\ \\_______\\ \\_______\\       \\ \\_______\\____\\_\\  \\",
			timeout: 5
		})

		eventList.push({
			action: () => {},
			text: "    \\|__|    \\|_______|\\|_______|\\|_______|\\|_______|\\|_______|        \\|_______|\\_________\\",
			timeout: 5
		})

		eventList.push({
			action: () => {},
			text: "                                                                                \\|_________|",
			timeout: 5
		})

		eventList.push({
			action: () => {},
			text: "                                                                                 VERSION 1.1",
			timeout: 5
		})

		eventList.push({
			action: () => {},
			text: " ",
			timeout: 5
		})

		eventList.push({
			action: () => {},
			text: "[!] LOGGING IN USER",
			timeout: 20
		})

		eventList.push({
			action: () => {},
			text: "[+] LOGGED IN AS: ROOT",
			timeout: 20
		})

		eventList.push({
			action: () => {},
			text: "[!] LOADING USER PREFERENCES",
			timeout: 20
		})

		eventList.push({
			action: () => {},
			text: "[!] PREPARING ENVIRONMENT",
			timeout: 20
		})

		eventList.push({
			action: () => {},
			text: "[!] PREPARING SYMBIOTIC LINK DEVICE",
			timeout: 20
		})

		eventList.push({
			action: () => {setShowBackground(true)},
			text: "[!] CREATING HYPER-REALITY DESKTOP",
			timeout: 750
		})

		eventList.push({
			action: () => {
				setTextList((previous) => {
					previous[previous.length - 1] = previous[previous.length - 1] + "."
					return previous
				})
			},
			text: "",
			timeout: 750
		})

		eventList.push({
			action: () => {
				setTextList((previous) => {
					previous[previous.length - 2] = previous[previous.length - 2] + "."
					return previous
				})
			},
			text: "",
			timeout: 750
		})

		eventList.push({
			action: () => {
				setTextList((previous) => {
					previous[previous.length - 3] = previous[previous.length - 3] + "."
					return previous
				})
			},
			text: "",
			timeout: 750
		})



		processTerminalEvent(eventList)

	}, [])

	return (
		<main className={
			clsx({
				[styles.main]: true,
				[styles.greenText]: useGreen
			})
		}>
			{showBackground && <BackgroundGL mouseX={mousePos.x} mouseY={mousePos.y}/>}
			{
				textList.map((val, index) => {
					return (<pre key={index}>{val}</pre>)
				})
			}
		</main>
	)



}