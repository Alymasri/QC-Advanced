'use client';

import React from 'react';
import { FaRegCheckCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';

import { slideInBottom2 } from '@/constants/variants';

const FormSuccess = ({ message, center }) => {
	return (
		<motion.div
			initial="initial"
			animate="animate"
			variants={slideInBottom2}
			className={`flex-v-center border border-[--green-2] w-full p-2 !gap-2 rounded-lg bg-[--green-50] ${
				center && '!justify-center'
			}`}
		>
			<FaRegCheckCircle className="text-[--green-2]" />
			<p className="text-[--green-2]">{message}</p>
		</motion.div>
	);
};

export default FormSuccess;
