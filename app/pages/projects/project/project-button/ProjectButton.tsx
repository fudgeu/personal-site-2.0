/* eslint-disable @next/next/no-img-element */
import Marquee from 'react-fast-marquee';
import styles from './styles.module.css';
import { useCallback, useRef, useState } from 'react';
import clsx from 'clsx';

type ProjectButtonProps = {
	from: ProjectButtonInfo
}

const iconLookupTable: {[key in ProjectButtonType as string]: string} = {
	'github': 'projects/github-mark.svg',
	'curseforge': 'projects/curseforge.svg',
	'other': 'projects/globe.svg',
}

export default function ProjectButton({ from }: ProjectButtonProps) {
	const [isHovered, setIsHovered] = useState(false);
	const longBoxGenerated = useRef(false);

	const generateFloatingBox = useCallback((corner: number) => {
		let width;
		if (!longBoxGenerated.current && Math.random() <= 0.33) {
			width = 4;
			longBoxGenerated.current = true;
		} else {
			width = Math.random() + 1.15 // range between 1.15 and 2.15
		}

		let xOffset = 0;
		while (xOffset >= -0.25 && xOffset <= 0.1)
			xOffset = Math.random() - 0.75; // range between -0.75 and 0.25

		const yOffset = Math.random() * 0.5 - 1; // range between -1 and -0.5

		let resultingStyle;
		switch (corner) {
			case 0: // top left
				resultingStyle = {
					top: yOffset + "rem",
					left: xOffset + "rem",
					width: width + "rem"
				}
				break;
			case 1: // top right
				resultingStyle = {
					top: yOffset + "rem",
					right: xOffset + "rem",
					width: width + "rem"
				}
				break;
			case 2: // bottom right
				resultingStyle = {
					bottom: yOffset + "rem",
					right: xOffset + "rem",
					width: width + "rem"
				}
				break;
			case 3: // bottom left
				resultingStyle = {
					bottom: yOffset + "rem",
					left: xOffset + "rem",
					width: width + "rem"
				}
		}
		
		return (
			<div className={styles.floatingBox} style={resultingStyle}>
				<Marquee className={styles.marquee} speed={20} autoFill direction="right"><img src={iconLookupTable[from.type]} alt="" /></Marquee>
			</div>
		)
	}, [from.type]);

	const handleMouseOut = useCallback(() => {
		setIsHovered(false);
		longBoxGenerated.current = false;
	}, [])

	return (
		<a
			className={styles.button}
			type="button"
			onMouseOver={() => setIsHovered(true)}
			onMouseOut={handleMouseOut}
			href={from.link}
		>
			{from.text}
			{
				isHovered && <>
				{generateFloatingBox(0)}
				{generateFloatingBox(1)}
				{generateFloatingBox(2)}
				{generateFloatingBox(3)}
				</>
			}
		</a>
	)
}