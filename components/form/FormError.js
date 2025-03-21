'use client';

import React from 'react';
import { BiError } from 'react-icons/bi';
import { motion } from 'framer-motion';

import { slideInBottom2 } from '@/constants/variants';

const FormError = ({ message, center }) => {
	return (
		<motion.div
			initial="initial"
			animate="animate"
			exit="exit"
			variants={slideInBottom2}
			className={`flex-v-center border border-[--brand] w-full p-2 !gap-2 rounded-lg bg-[--tag] ${
				center && '!justify-center'
			}`}
		>
			<BiError className="text-[--brand]" />
			<p className="text-[--brand]">{message}</p>
		</motion.div>
	);
};

export default FormError;
