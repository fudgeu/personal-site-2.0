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
import ShadowGL from '../rat/RatGL/RatGL'
import { FudgeApp, minimizeApp, minimizeAppTo, startApp, unminimizeApp } from '../util/FudgeApp'
import { defaultApps } from './DefaultApps'

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

	const [applications, setApplications] = useState<FudgeApp[]>(defaultApps)

	const [ _, forceRerender ] = useState(0);

	const [ windows, setWindows ] = useState<FudgeWindow[]>([]);

	const searchParams = useSearchParams();

	const taskbarRefs: {[key: string]: HTMLDivElement | null} = {}

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

	const getMinimizeTo = useCallback((ref: RefObject<HTMLDivElement>): {x: number, y: number} => {
		if (!ref.current) return {x: 0, y: 0};
		const x = ((ref.current?.getBoundingClientRect().left || 0) + (ref.current?.getBoundingClientRect().right || 0)) / 2
		const y = ((ref.current?.getBoundingClientRect().top || 0) + (ref.current?.getBoundingClientRect().bottom || 0)) / 2
		return {x, y}
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
			action: () => {
				const title = "About"
				setApplications(applications.map((a) => {
					if (a.title == title) return startApp(a, window.innerWidth, window.innerHeight, forceRerender);
					return a;
				}))
				setTimeout(() => {
					setApplications((apps) => apps.map((a) => {
						if (a.title == title) return unminimizeApp(a);
						return a;
					}))
				}, 100)
				// const toX = ((taskBarIconRef.current?.getBoundingClientRect().left || 0) + (taskBarIconRef.current?.getBoundingClientRect().right || 0) / 2);
				// const toY = ((taskBarIconRef.current?.getBoundingClientRect().top || 0) + (taskBarIconRef.current?.getBoundingClientRect().bottom || 0) / 2);
				// wind.minimizeTo(toX, toY)
				// setWindows((cur) => {
				// 	cur.push(wind)
				// 	return cur;
				// });
			},
			text: "",
			timeout: 150
		})
		

		processTerminalEvent(eventList)
	}, [processTerminalEvent])

	const handleAppFunction = useCallback((app: FudgeApp) => {
		setApplications(applications.map((a) => {
			if (a.title == app.title) return app;
			return a;
		}))
	}, [applications])

	const getAmtOpenApps = useCallback((apps: FudgeApp[]): number => {
		let amt = 0;
		apps.forEach((app) => {
			if (app.isOpen) amt++;
		})
		return amt;
	}, [])

	const setFocus = useCallback((app: FudgeApp) => {
		const curZIndex = app.windowInstance?.zIndex || 0
		setApplications((apps) => apps.map((a) => {
			if (!a.windowInstance) return a;
			if (a.title === app.title) {
				a.windowInstance.zIndex = getAmtOpenApps(apps);
				return a;
			}
			if (a.windowInstance.zIndex > curZIndex) {
				a.windowInstance.zIndex--;
				return a;
			}
			return a;
		}))
	}, [getAmtOpenApps])

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
					{
						applications.map((app) => (
							<div 
								key={app.title}
								className={clsx({
									[styles.taskbarIcon]: true,
									[styles.taskbarIconActive]: !app.isMinimized,
								})}
								ref={ref => taskbarRefs[app.title] = ref}
								onClick={() => {
									// Handle app open
									if (!app.isOpen) {
										setApplications(applications.map((a) => {
											if (a.title == app.title) {
												const startedApp = startApp(a, window.innerWidth, window.innerHeight, forceRerender);
												if (startedApp.windowInstance)
													startedApp.windowInstance.zIndex = getAmtOpenApps(applications) + 1
												return startedApp;
											}
											return a;
										}))
										return
									}
									// Handle app un/minimize
									if (app.isMinimized) {
										handleAppFunction(unminimizeApp(app))
										setFocus(app)
									} else {
										handleAppFunction(minimizeAppTo(app, taskbarRefs[app.title]?.getBoundingClientRect()))
									}
								}}
							>
								{app.title}
							</div>
						))
					}
					{/*<div 
						className={clsx({
							[styles.taskbarIcon]: !aboutMeTaskActive,
							[styles.taskbarIconActive]: aboutMeTaskActive,
						})}
						onClick={() => {
							if (aboutMeTaskActive) {
								windows.forEach((window) => {
									const minTo = getMinimizeTo(taskBarIconRef);
									window.minimizeTo(minTo.x, minTo.y);
								})
							} else {
								windows.forEach((window) => window.unminimize())
							}
							setAboutMeTaskActive(!aboutMeTaskActive)
						}}
						ref={taskBarIconRef}
					>
						ABOUT ME
					</div>
					<div className={styles.taskbarIcon} onClick={() => {
						const wind = new FudgeWindow(forceRerender, "Projects", 0, 0, 800, 600, (
							<div className={styles.windowContentContainer}>
								<ShadowGL />
							</div>
						))
						wind.unminimize()
						setWindows((cur) => {
							cur.push(wind)
							return cur;
						});
					}}>
						PROJECTS
					</div>
					<div className={styles.taskbarIcon} onClick={() => {
						const wind = new FudgeWindow(forceRerender, "Education", 100, 100, 1200, 1000, (
							<iframe className={styles.iframe} src="http://firecade.neocities.org" />
						))
						wind.unminimize()
						setWindows((cur) => {
							cur.push(wind)
							return cur;
						});
					}}>
						EDUCATION
					</div>
				<div className={styles.taskbarIcon}>CONTACT</div> */}
				</div>
				<div className={styles.taskbarRight}>
					10:26 PM
				</div>
			</div>

			{/* Window */}
			{applications.map(app => {
				if (!app.isOpen || !app.windowInstance) return [];
				return <Window 
					key={app.title}
					from={app.windowInstance}
					minimizeTo={getMinimizeTo(taskBarIconRef)}
					onMinimize={() => handleAppFunction(minimizeAppTo(app, taskbarRefs[app.title]?.getBoundingClientRect()))}
					onClick={() => setFocus(app)}
				/>
			})}

			{/* CRT effect, courtesy of greenlemon */}
			<div className={styles.lines}></div>
		</main>
	)
}