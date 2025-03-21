'use client';

import React from 'react';
import Link from 'next/link';
import {
	motion,
	useScroll,
	useTransform,
	cubicBezier,
	useMotionTemplate,
	circOut,
} from 'framer-motion';
import { Button } from '@/components';

import { slideInBottom2 } from '@/constants/variants';

// const buttonColors = ["#b62e32","card"]
const SectionBlock = ({
	tag,
	heading,
	text,
	buttons,
	wrapperClasses,
	makeWhite,
	// scrollYProgress,
}) => {
	return (
		<motion.div
			initial="initial"
			exit="exit"
			whileInView="animate"
			transition={{ staggerChildren: 0.2 }}
			className={`w-full flex flex-col gap-1 ${wrapperClasses}`}
		>
			<motion.p
				// style={{ translateY: parallax4 }}
				variants={slideInBottom2}
				className="text-[--brand] font-semibold"
			>
				{tag}
			</motion.p>
			<motion.h1
				// style={{ translateY: parallax3 }}
				variants={slideInBottom2}
				className={`${makeWhite ? 'h1 !text-[--white]' : 'h1 text-[--black]'}`}
			>
				{heading}
			</motion.h1>
			<motion.p
				// style={{ translateY: parallax2 }}
				variants={slideInBottom2}
				className={`py-2 ${makeWhite && 'text-[--white]'}`}
			>
				{text}
			</motion.p>
			{buttons && (
				<motion.div
					// style={{ translateY: parallax1 }}
					variants={slideInBottom2}
					className="space-x-2 pt-5 flex "
				>
					{buttons.map((data, i) => (
						<div key={i}>
							<Button
								key={i}
								text={data.text}
								link={data.link}
								className={`!rounded-[2rem] ${
									i === 0 ? 'btn-1-v2' : 'btn-2-v2'
								}`}
							/>
						</div>
					))}
				</motion.div>
			)}
		</motion.div>
	);
};

export default SectionBlock;
