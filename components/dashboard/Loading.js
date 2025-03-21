'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { images, variants } from '@/constants';

const Loading = ({ inner, notFull }) => {
	return (
		<motion.div
			className={`${
				inner
					? 'h-full min-h-full bg-[--white]'
					: notFull
					? 'h-screen bg-[--card] fixed top-0 left-0 w-full !z-[100000] lg:relative'
					: 'h-screen bg-[--card] fixed top-0 left-0 w-full !z-[1000000000000]'
			} w-full  text-[--black] flex-center overflow-hidden`}
		>
			<motion.div
				animate={{ scale: [1, 1.05, 1] }}
				transition={{
					type: 'tween',
					ease: 'easeInOut',
					duration: 2,
					repeat: Infinity,
					// repeatType: 'mirror',
				}}
				className="p-[2px] rounded-full shadow-[--highlight-bg] shadow-2xl overflow-hidden w-[50vw] h-[50vw] md:w-[200px] md:h-[200px]"
			>
				<motion.div
					// animate={{ scale: [1, 1.05, 1], opacity: [0.85, 1, 0.85] }}
					// transition={{
					// 	type: 'tween',
					// 	ease: 'easeInOut',
					// 	duration: 2,
					// 	repeat: Infinity,
					// 	// repeatType: 'mirror',
					// }}
					className="p-[5vw] pt-[10vw] md:p-7 md:pt-12 rounded-full bg-[--white] overflow-hidden w-full h-full"
				>
					<Image
						src={images.logoFull}
						alt="QC Advanced Loading"
						width={200}
						height={200}
						className="w-full h-full object-contain"
					/>
				</motion.div>
			</motion.div>
			{/* <div className="absolute bottom-0 left-0">
				<h2>100</h2>
			</div> */}
			{/* <p>Loading</p> */}
		</motion.div>
	);
};

export default Loading;
