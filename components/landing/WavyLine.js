'use client';

import React from 'react';
import { motion } from 'framer-motion';

const WavyLine = () => {
	const transition = { duration: 1.5, yoyo: Infinity, ease: 'easeInOut' };
	return (
		<svg
			width="100%"
			height="100%"
			viewBox="0 0 1112 449"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g filter="url(#filter0_d_6_342)">
				<motion.path
					d="M27 311C75 346 186.8 412 250 396C329 376 348.5 273 470.5 249C592.5 225 682 308.5 776.5 188C871 67.5003 917 -11.4997 1044 5.50027"
					stroke="#EA433F"
					strokeWidth="5"
					strokeLinecap="round"
					strokeLinejoin="round"
					initial={{ pathLength: 0 }}
					whileInView={{ pathLength: 1 }}
					transition={transition}
				/>
			</g>
			<defs>
				<filter
					id="filter0_d_6_342"
					x="0.499832"
					y="0.703613"
					width="1070"
					height="448.255"
					filterUnits="userSpaceOnUse"
					colorInterpolationFilters="sRGB"
				>
					<feFlood floodOpacity="0" result="BackgroundImageFix" />
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dy="24" />
					<feGaussianBlur stdDeviation="12" />
					<feComposite in2="hardAlpha" operator="out" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0.215686 0 0 0 0 0.203922 0 0 0 0 0.662745 0 0 0 0.3 0"
					/>
					<feBlend
						mode="normal"
						in2="BackgroundImageFix"
						result="effect1_dropShadow_6_342"
					/>
					<feBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_6_342"
						result="shape"
					/>
				</filter>
			</defs>
		</svg>
	);
};

export default WavyLine;
