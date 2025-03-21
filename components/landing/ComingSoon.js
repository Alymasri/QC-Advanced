'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Lottie from 'react-lottie';
import * as animationData from '@/assets/lottie/coming-soon.json';

import {
	motion,
	useScroll,
	useTransform,
	cubicBezier,
	useMotionTemplate,
	circOut,
} from 'framer-motion';
import { FaCheck } from 'react-icons/fa';

import { landingImages } from '@/constants';
import { slideInBottom, popIn } from '@/constants/variants';
import { Button } from '@/components';

const Header = ({ page, text }) => {
	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: animationData,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice',
		},
	};
	return (
		<motion.div className="!relative w-full h-auto min-h-screen border-b border-[--border] lg:h-screen overflow-hidden">
			<Image
				src={landingImages.heroBg}
				alt="QC Advanced"
				className="absolute top-0 left-0 object-cover object-center md:object-right-bottom h-full lg:w-[70%]"
			/>
			<motion.div
				initial="initial"
				exit="exit"
				whileInView="animate"
				transition={{ staggerChildren: 0.2 }}
				className="relative md:grid md:grid-cols-1 lg:grid-cols-2 w-full container pt-[100px] lg:h-full lg:pt-0"
			>
				<motion.div className="relative flex flex-col justify-center w-full py-[0px] lg:h-screen lg:pr-[50px] lg:py-0 !text-center lg:!text-start">
					<motion.p
						variants={slideInBottom}
						className="italic font-semibold text-[--black] pb-2 md:pb-0 uppercase"
					>
						QC ADVANCED
					</motion.p>
					<motion.h1 variants={slideInBottom} className="header uppercase">
						{page} page
						<br />
						<span className="text-[--brand]">COMING SOON</span>
					</motion.h1>
					<motion.p
						variants={slideInBottom}
						className="text-[--black] py-4 lg:py-5"
					>
						{text}
					</motion.p>
					<motion.div
						variants={slideInBottom}
						className="flex justify-center lg:justify-start w-full pt-3"
					>
						<div className="flex w-ful">
							<Button
								link="/auth/admin/about"
								text="Get Started Now"
								className="btn-1 !normal-case"
							/>
						</div>
					</motion.div>
					<motion.div className="bottom-0 left-0 py-5 mt-3 flex-v-center justify-center lg:absolute lg:justify-start">
						<motion.p variants={slideInBottom} className="flex-v-center !gap-2">
							<span className="p-1 bg-[--brand] rounded-full">
								<FaCheck className="text-[--white] text-[9px]" />
							</span>
							Free Register
						</motion.p>
						<motion.p variants={slideInBottom} className="flex-v-center !gap-2">
							<span className="p-1 bg-[--brand] rounded-full">
								<FaCheck className="text-[--white] text-[9px]" />
							</span>
							Great Service
						</motion.p>
					</motion.div>
				</motion.div>
				{/* IMAGES */}
				<motion.div
					// // initial="initial"
					// exit="exit"
					// whileInView="animate"
					// // transition={{ staggerChildren: 0.2 }}
					className="relative flex-center w-full"
				>
					<Lottie options={defaultOptions} height={500} width={500} />
				</motion.div>
			</motion.div>
		</motion.div>
	);
};

export default Header;
