'use client';

import React from 'react';
import { motion } from 'framer-motion';

import { buttonClick } from '@/constants/variants';

const SubmitButton = ({ additionalClass, text, submitting }) => {
	const variants = {
		initial: (i) => ({
			height: [5 + i * 0.5],
			// opacity: 0,
		}),
		animate: (i) => ({
			height: [5 + i * 0.5, 10 + i * 0.5],
			// opacity: [0, 1],
			transition: {
				// type: 'tween',
				duration: 1.5,
				delay: i * 0.1,
				type: 'spring',
				bounce: 0.75,
				repeat: Infinity,
				// repeaDelay: 1,
			},
		}),
	};

	return submitting ? (
		<div
			variants={buttonClick}
			type="button"
			className={`btn-1 ${additionalClass} pointer-events-none text-center`}
		>
			<motion.div
				initial="initial"
				animate="animate"
				className="overflow-hidden text-[--white] flex-center !gap-2"
			>
				<span>Please Wait</span>
				<div className="flex-center !w-auto !gap-1">
					<motion.span
						variants={variants}
						custom={0}
						className="w-[1px] bg-[--white]"
					/>
					<motion.span
						variants={variants}
						custom={1}
						className="w-[1px] bg-[--white]"
					/>
					<motion.span
						variants={variants}
						custom={2}
						className="w-[1px] bg-[--white]"
					/>
				</div>
			</motion.div>
		</div>
	) : (
		<motion.input
			whileTap="tap"
			whileHover="hover"
			variants={buttonClick}
			type="submit"
			className={`btn-1 ${additionalClass}`}
			value={text}
		/>
	);
};

export default SubmitButton;
