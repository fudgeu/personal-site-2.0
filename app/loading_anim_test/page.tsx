/* eslint-disable @next/next/no-img-element */
'use client'

import { RefObject, useCallback, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import styles from './styles.module.css'
import clsx from 'clsx'
import BackgroundGL from '../webgl/component/background_gl'
import Marquee from 'react-fast-marquee'
import GLView2 from '../webgl/component/GLView2'
import Window from '../components/window/Window'
import FudgeWindow from '../util/FudgeWindow'

type TerminalEvent = {
	action: () => void,
	text: string,
	timeout: number,
}

enum ElementAnimState {
	Hidden,
	Loading,
	Showing,
	Unloading,
}

export default function TestPage() {

	const [textList, setTextList] = useState<string[]>([])
	const [useGreen, setUseGreen] = useState(false)
	const [showBackground, setShowBackground] = useState(false)
	const [loadingTextFadeOut, setLoadingTextFadeOut] = useState(false);
	const [titleTextState, setTitleTextState] = useState(ElementAnimState.Hidden)
	const [amtTitleSubTexts, setAmtTitleSubTexts] = useState(0);
	const [scrollingBinaryState, setScrollingBinaryState] = useState(ElementAnimState.Hidden)
	const [contentContainerState, setContentContainerState] = useState(ElementAnimState.Showing)
	const [navItemShowList, setNavItemShowList] = useState([false, false, false, false])
	const [showTRCornerDeco, setShowTRCornerDeco] = useState(false)
	const [showBottomDeco, setShowBottomDeco] = useState(false)
	const [showBRCornerDeco, setShowBRCornerDeco] = useState(false)
	const [taskbarState, setTaskbarState] = useState(ElementAnimState.Hidden)
	const taskBarIconRef = useRef<HTMLDivElement>(null);
	const [aboutMeTaskActive, setAboutMeTaskActive] = useState(true)
	const windowRef = useRef<HTMLDivElement>(null);
	const [spawnWindow, setSpawnWindow] = useState(false)
	const [mousePos, setMousePos] = useState({x: 0, y: 0})

	const [ forceRerender, setRerender ] = useState(0);

	const [ windows, setWindows ] = useState<FudgeWindow[]>([]);

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

	const minimizeWindow = useCallback((ref: RefObject<HTMLDivElement>, toRef: RefObject<HTMLDivElement>) => {
		if (!ref.current) return;
		const toX = ((toRef.current?.getBoundingClientRect().left || 0) + (toRef.current?.getBoundingClientRect().right || 0)) / 2
		const toY = ((toRef.current?.getBoundingClientRect().top || 0) + (toRef.current?.getBoundingClientRect().bottom || 0)) / 2
		const deltaX = toX - (ref.current.getBoundingClientRect().left + ref.current.getBoundingClientRect().right) / 2;
		const deltaY = toY - (ref.current.getBoundingClientRect().top + ref.current.getBoundingClientRect().bottom) / 2;
		console.log(`${deltaX}, ${deltaY}`)
		ref.current.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0)`
	}, [])

	const unMinimizeWindow = useCallback((ref: RefObject<HTMLDivElement>) => {
		if (!ref.current) return;
		ref.current.style.transform = "translate(0, 0) scale(1)"
	}, [])

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
			action: () => setTitleTextState(ElementAnimState.Loading),
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
			action: () => setScrollingBinaryState(ElementAnimState.Loading),
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

		eventList.push({
			action: () => {
				setShowBRCornerDeco(true)
			},
			text: "",
			timeout: 50,
		})

		processTerminalEvent(eventList)

	}, [])

	const loadSection = useCallback(() => {
		const eventList: TerminalEvent[] = [];

		eventList.push({
			action: () => {setTitleTextState(ElementAnimState.Unloading)},
			text: "",
			timeout: 10
		})

		eventList.push({
			action: () => {setScrollingBinaryState(ElementAnimState.Unloading)},
			text: "",
			timeout: 10
		})

		eventList.push({
			action: () => {setContentContainerState(ElementAnimState.Unloading)},
			text: "",
			timeout: 200
		})

		eventList.push({
			action: () => {setTaskbarState(ElementAnimState.Loading)},
			text: "",
			timeout: 10
		})

		eventList.push({
			action: () => {setSpawnWindow(true)},
			text: "",
			timeout: 10
		})

		eventList.push({
			//action: () => {unMinimizeWindow(windowRef)},
			action: () => {
				const recurse = () => {
					console.log("recursing!")
					const wind = new FudgeWindow("About", Math.random() * window.outerWidth, Math.random() * window.outerHeight, 800, 600, (
						<div className={styles.windowContentContainer}>
							<p>Congratulations, you are our lucky winner!</p>
							<img src="https://cdn.discordapp.com/attachments/575127872516259859/1163345799250456636/image.png" width="600" />
							<p>01100001 01100111 01101111 01101110 01111001</p>
						</div>
					))
					setWindows((cur) => {
						cur.push(wind)
						return cur;
					});
					setRerender(Math.random())
					setTimeout(() => {recurse()}, 50)
				}
				recurse();
			},
			text: "",
			timeout: 10
		})

		processTerminalEvent(eventList)
	}, [processTerminalEvent, unMinimizeWindow])

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
					[styles.hidden]: titleTextState == ElementAnimState.Hidden,
					[styles.titleTextUnloaded]: titleTextState == ElementAnimState.Unloading,
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
				[styles.hidden]: scrollingBinaryState == ElementAnimState.Hidden,
				[styles.scrollingTextLoad]: scrollingBinaryState == ElementAnimState.Loading,
				[styles.scrollingTextUnload]: scrollingBinaryState == ElementAnimState.Unloading,
			})}>
				<Marquee autoFill speed={10} direction="right">011011000110111101101100001000000110011101100101011101000010000001110000011100100110000101101110011010110110010101100100</Marquee>
			</div>

			{/* Content Container */}
			<div className={clsx({
				[styles.textContentContainer]: true,
				[styles.textContentContainerUnload]: contentContainerState == ElementAnimState.Unloading,
			})}>
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
								<button className={styles.listLink} onClick={() => loadSection()}>
										<span className={styles.navItemArrow}>&gt;</span><span className={styles.navItemText}>EDUCATION</span>
								</button>
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
			<div className={clsx({
				[styles.brCornerDecoration]: true,
				[styles.showBRCornerDeco] : showBRCornerDeco
			})}>
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

			{/* Taskbar */}
			<div className={clsx({
				[styles.taskbar]: true,
				[styles.taskbarLoad]: taskbarState == ElementAnimState.Loading
			})}>
				<div className={styles.taskbarLeft}>
					<div className={styles.taskbarIcon}>FUDGEU</div>
					<div 
						className={clsx({
							[styles.taskbarIcon]: !aboutMeTaskActive,
							[styles.taskbarIconActive]: aboutMeTaskActive,
						})}
						onClick={() => {
							if (aboutMeTaskActive) {
								minimizeWindow(windowRef, taskBarIconRef)
							} else {
								unMinimizeWindow(windowRef)
							}
							setAboutMeTaskActive(!aboutMeTaskActive)
						}}
						ref={taskBarIconRef}
					>
							ABOUT ME
						</div>
					<div className={styles.taskbarIcon}>PROJECTS</div>
					<div className={styles.taskbarIcon}>EDUCATION</div>
					<div className={styles.taskbarIcon}>CONTACT</div>
				</div>
				<div className={styles.taskbarRight}>
					10:26 PM
				</div>
			</div>

			{/* Window */}
			{windows.map(window => {
				return <Window key={window.title} from={window} />
			})}

			{/* CRT effect, courtesy of greenlemon */}
			<div className={styles.lines}></div>
		</main>
	)



}