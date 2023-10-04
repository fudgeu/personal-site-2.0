'use client'

import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import styles from './styles.module.css'
import clsx from 'clsx'
import BackgroundGL from '../webgl/component/background_gl'
import Marquee from 'react-fast-marquee'
import GLView2 from '../webgl/component/GLView2'

type TerminalEvent = {
	action: () => void,
	text: string,
	timeout: number,
}

export default function TestPage() {

	const [textList, setTextList] = useState<string[]>([])
	const [useGreen, setUseGreen] = useState(false)
	const [showBackground, setShowBackground] = useState(false)
	const [loadingTextFadeOut, setLoadingTextFadeOut] = useState(false);
	const [hideTitleText, setHideTitleText] = useState(true)
	const [amtTitleSubTexts, setAmtTitleSubTexts] = useState(0);
	const [hideScrollingBinary, setHideScrollingBinary] = useState(true)
	const [navItemShowList, setNavItemShowList] = useState([false, false, false, false])
	const [showTRCornerDeco, setShowTRCornerDeco] = useState(false)
	const [showBottomDeco, setShowBottomDeco] = useState(false)
	const [mousePos, setMousePos] = useState({x: 0, y: 0})

	const searchParams = useSearchParams();

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
				setLoadingTextFadeOut(true)
			},
			text: "",
			timeout: 1500
		})

		eventList.push({
			action: () => setHideTitleText(false),
			text: "",
			timeout: 50
		})

		// add expanding subtexts
		for (let i = 0; i < 10; i++) {
			eventList.push({
				action: () => setAmtTitleSubTexts((prev) => prev + 1),
				text: "",
				timeout: 50
			})
		}

		eventList.push({
			action: () => setHideScrollingBinary(false),
			text: "",
			timeout: 50
		})

		eventList.push({
			action: () => {
				setNavItemShowList((prev) => {
					prev[0] = true
					return prev
				})
			},
			text: "",
			timeout: 50,
		})

		eventList.push({
			action: () => {
				setNavItemShowList((prev) => {
					prev[1] = true
					return prev
				})
			},
			text: "",
			timeout: 50,
		})

		eventList.push({
			action: () => {
				setNavItemShowList((prev) => {
					prev[2] = true
					return prev
				})
			},
			text: "",
			timeout: 50,
		})

		eventList.push({
			action: () => {
				setNavItemShowList((prev) => {
					prev[3] = true
					return prev
				})
			},
			text: "",
			timeout: 50,
		})

		eventList.push({
			action: () => {
				setNavItemShowList((prev) => {
					prev[4] = true
					return prev
				})
			},
			text: "",
			timeout: 50,
		})

		eventList.push({
			action: () => {
				setNavItemShowList((prev) => {
					prev[5] = true
					return prev
				})
			},
			text: "",
			timeout: 50,
		})

		eventList.push({
			action: () => {
				setShowTRCornerDeco(true)
			},
			text: "",
			timeout: 50,
		})

		eventList.push({
			action: () => {
				setShowBottomDeco(true)
			},
			text: "",
			timeout: 50,
		})

		processTerminalEvent(eventList)

	}, [])

	const getSubtexts = useCallback(
		() => {
			return Array(amtTitleSubTexts).fill(<h1>FUDGEU</h1>)
		},
		[amtTitleSubTexts]
	)

	return (
		<main className={
			clsx({
				[styles.main]: true,
				[styles.greenText]: useGreen
			})
		}>

			{/* Background */}
			{showBackground && <BackgroundGL mouseX={mousePos.x} mouseY={mousePos.y} model={searchParams.get("model") || "all"} />}

			{/* Intro Code Text */}
			<div className={clsx({
				[styles.loadingTextContainer]: true,
				[styles.fadeOut]: loadingTextFadeOut
			})}>
				{
					textList.map((val, index) => {
						return (<pre key={index}>{val}</pre>)
					})
				}
			</div>

			{/* Title Text */}
			<div className={clsx({
					[styles.titleTextContainer]: true,
					[styles.hidden]: hideTitleText,
			})}>
				<span className={styles.subTitleTextTop}>
					{getSubtexts()}
				</span>
				<div className={styles.mainTitleText}>
					<h1>FUDGEU</h1>
				</div>
				<span className={styles.subTitleText}>
					{getSubtexts()}
				</span>
			</div>

			{/* Scrolling Binary Text */}
			<div className={clsx({
				[styles.scrollingTextContainer]: true,
				[styles.hidden]: hideScrollingBinary,
				[styles.scrollingTextIntro]: !hideScrollingBinary,
			})}>
				<Marquee autoFill speed={10} direction="right">011011000110111101101100001000000110011101100101011101000010000001110000011100100110000101101110011010110110010101100100</Marquee>
			</div>

			{/* Content Container */}
			<div className={styles.textContentContainer}>
				<div className={clsx({
					[styles.subHeader]: true,
					[styles.showSubHeader]: navItemShowList[0]
				})}>
					<h2>AKA PATRICK KOSS</h2>
					<div className={styles.subHeaderDecoration}>
						<div className={styles.subHeaderDecorationPiece} />	
						<div className={styles.subHeaderDecorationPiece} />	
						<div className={styles.subHeaderDecorationPiece} />	
					</div>
				</div>
				<div className={styles.descriptionAndNav}>
					<p className={clsx({
						[styles.description]: true,
						[styles.showNavItem]: navItemShowList[1]
					})}>
						ASPIRING WEB DEVELOPER, GAME DEVELOPER, AND MAYBE MORE?
					</p>	
					<nav>
						<ul className={styles.navList}>
							<li className={clsx({
								[styles.navItem]: true,
								[styles.showNavItem]: navItemShowList[2]
							})}>
								<a className={styles.listLink} href="rat">
									<span className={styles.navItemArrow}>&gt;</span><span className={styles.navItemText}>ABOUT ME</span>
								</a>
							</li>
							<li className={clsx({
								[styles.navItem]: true,
								[styles.showNavItem]: navItemShowList[3]
							})}>
								<a className={styles.listLink} href="shadow">
										<span className={styles.navItemArrow}>&gt;</span><span className={styles.navItemText}>PROJECTS</span>
								</a>
							</li>
							<li className={clsx({
								[styles.navItem]: true,
								[styles.showNavItem]: navItemShowList[4]
							})}>
								<a className={styles.listLink} href="?model=4krat">
										<span className={styles.navItemArrow}>&gt;</span><span className={styles.navItemText}>EDUCATION</span>
								</a>
							</li>
							<li className={clsx({
								[styles.navItem]: true,
								[styles.showNavItem]: navItemShowList[5]
							})}>
								<a className={styles.listLink} href="?model=shadow">
									<span className={styles.navItemArrow}>&gt;</span><span className={styles.navItemText}>CONTACT</span>
								</a>
							</li>
						</ul>
					</nav>
				</div>
			</div>

			{/* Top Right Corner Decoration */}
			<div className={clsx({
				[styles.cornerDecoration]: true,
				[styles.cornerDecorationShow]: showTRCornerDeco
			})}>
				<div className={styles.cornerDecorationLine}>
					<div className={styles.cornerDecoRect} />
					<div className={styles.cornerDecoCircle} />
					<div className={styles.cornerDecoRect} />
					<div className={styles.cornerDecoCircle} />
					<div className={styles.cornerDecoRect} />
					<div className={styles.cornerDecoCircle} />
					<div className={styles.cornerDecoRect} />
					<div className={styles.cornerDecoCircle} />
				</div>
				
				<div className={styles.cornerDecorationLineRev}>
					<div className={styles.cornerDecoRect} />
					<div className={styles.cornerDecoCircle} />
					<div className={styles.cornerDecoRect} />
					<div className={styles.cornerDecoCircle} />
					<div className={styles.cornerDecoRect} />
					<div className={styles.cornerDecoCircle} />
					<div className={styles.cornerDecoRect} />
					<div className={styles.cornerDecoCircle} />
				</div>

				<div className={styles.cornerDecorationLine}>
					<div className={styles.cornerDecoRect} />
					<div className={styles.cornerDecoCircle} />
					<div className={styles.cornerDecoRect} />
					<div className={styles.cornerDecoCircle} />
					<div className={styles.cornerDecoRect} />
					<div className={styles.cornerDecoCircle} />
					<div className={styles.cornerDecoRect} />
					<div className={styles.cornerDecoCircle} />
				</div>
			</div>

			{/* Bottom Right GL Decoration */}
			<div className={styles.brCornerDecoration}>
				<GLView2 mouseX={mousePos.x} mouseY={mousePos.y} />
			</div>
			
			{/* Bottom Decoration */}
			<div className={clsx({
				[styles.bottomDecoration]: true,
				[styles.showBottomDecoration]: showBottomDeco
			})}>
				<div className={styles.bottomDecoBox} />
				<div className={styles.bottomDecoBox} />
				<div className={styles.bottomDecoBox} />
				<div className={styles.bottomDecoBox} />
				<div className={styles.bottomDecoBox} />
				<div className={styles.bottomDecoBox} />
				<div className={styles.bottomDecoBox} />
				<div className={styles.bottomDecoBox} />
				<div className={styles.bottomDecoBox} />
				<div className={styles.bottomDecoBox} />
			</div>

		</main>
	)



}