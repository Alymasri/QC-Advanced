'use client';

import { useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { PiCaretDownBold } from 'react-icons/pi';
import { motion, AnimatePresence } from 'framer-motion';
import { buttonClick } from '@/constants/variants';

const InputCheckbox = ({
	toggle,
	toggled,
	name,
	questions,
	showQuestions,
	setShowQuestions,
}) => {
	const [checked, setChecked] = useState(toggled);

	const check = () => {
		setChecked((prev) => !prev);
		toggle();
	};

	const variants = {
		initial: {
			height: 0,
			opacity: 0,
		},
		animate: {
			height: 'auto',
			opacity: 1,
			transition: {
				delay: 0.1,
			},
		},
		exit: {
			height: 0,
			opacity: 0,
			transition: {
				duration: 0.1,
			},
		},
	};
	return (
		<motion.button
			whileHover="hover"
			// whileTap="tap"
			variants={buttonClick}
			className="slide-animated-children rounded-lg bg-[--card] w-full flex flex-col px-3 "
		>
			<div className="rounded-lg bg-[--card] flex-v-center !gap-3 w-full ">
				<span
					onClick={() => check()}
					className={`rounded-full min-w-[17px] max-w-[17px] h-[17px] flex-center ${
						checked ? 'bg-[--brand]' : 'bg-[--gray]'
					}`}
				>
					<FaCheck
						className={`text-[9px] ${
							checked ? 'text-[--white]' : 'text-[--text]'
						}`}
					/>
				</span>
				<p className="black-text py-3 w-full text-left">{name}</p>
				<span
					onClick={setShowQuestions}
					className={`rounded-full min-w-[20px] max-w-[20px] h-[20px] flex-center black-text`}
				>
					<PiCaretDownBold
						className={`text-[15px] ${
							showQuestions ? 'rotate-180' : 'rotate-0'
						}`}
					/>
				</span>
			</div>
			<AnimatePresence>
				{showQuestions && (
					<motion.div
						initial="initial"
						animate="animate"
						exit="exit"
						variants={variants}
						className="w-full space-y-3 py-3 border-t border-[--border] overflow-hidden"
					>
						{questions && questions.length > 0 ? (
							questions.map(({ question }, i) => (
								<motion.p
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									key={i}
									className="w-full text-left"
								>
									{question}
								</motion.p>
							))
						) : (
							<motion.p
								initial={{ opacity: 0 }}
								animate={{ opacity: [0, 1] }}
								exit={{ opacity: [1, 0] }}
								className="w-full text-left"
							>
								No question added
							</motion.p>
						)}
					</motion.div>
				)}
			</AnimatePresence>
		</motion.button>
	);
};

export default InputCheckbox;
