'use client';

import { useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { buttonClick } from '@/constants/variants';
const InputCheckbox = ({ text, toggle, toggled, editChecklist }) => {
	const [checked, setChecked] = useState(toggled);

	const check = () => {
		setChecked((prev) => !prev);
		toggle();
	};
	return (
		<motion.button
			whileHover="hover"
			// whileTap="tap"
			variants={buttonClick}
			className="slide-animated-children px-3 rounded-lg bg-[--card] flex-v-center !gap-3 w-full "
		>
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
			<p onClick={editChecklist} className="black-text py-3 w-full text-left">
				{text}
			</p>
		</motion.button>
	);
};

export default InputCheckbox;
