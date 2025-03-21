'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { buttonClick } from '@/constants/variants';

const LinkButton = ({ text, link, className }) => {
	return (
		<motion.div
			whileTap="tap"
			whileHover="hover"
			variants={buttonClick}
			className="flex !w-full"
		>
			<Link href={link} className={className ? className : 'btn-1'}>
				{text}
			</Link>
		</motion.div>
	);
};

export default LinkButton;
