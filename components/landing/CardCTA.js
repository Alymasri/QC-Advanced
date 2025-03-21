'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { landingImages, variants } from '@/constants';
import { Button } from '@/components';

const CardCTA = ({ header, desc }) => {
	return (
		<div className="container flex-center">
			<motion.div
				initial="initial"
				exit="exit"
				whileInView="animate"
				transition={{ staggerChildren: 0.2 }}
				className="max-w-[700px] h-[350px] relative"
			>
				<motion.div
					variants={variants.slideInBottom2}
					className="w-full h-full absolute"
				>
					<Image
						src={landingImages.cardCta}
						alt="point"
						className="w-full h-full object-cover rounded-xl"
					/>
				</motion.div>
				<motion.div className="relative flex-center flex-col h-full text-center px-5 md:px-[50px] lg:px-[80px]">
					<motion.h1
						variants={variants.slideInBottom2}
						className="h1 !text-[--white]"
					>
						{header}
					</motion.h1>
					<motion.p
						variants={variants.slideInBottom2}
						className="!text-[--white] italic"
					>
						{desc}
					</motion.p>
					<motion.div variants={variants.slideInBottom2} className="pt-5">
						<Button
							link="/auth/admin/about"
							className="btn-1-v2"
							text="Get Started"
						/>
					</motion.div>
				</motion.div>
			</motion.div>
		</div>
	);
};

export default CardCTA;
