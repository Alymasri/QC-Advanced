'use client';

import { useRef } from 'react';
import Image from 'next/image';

import {
	motion,
	useScroll,
	useTransform,
	cubicBezier,
	useMotionTemplate,
	circOut,
} from 'framer-motion';
import { FaCheck } from 'react-icons/fa';

import { landingImages } from '../constants';
import { slideInBottom, popIn } from '../constants/variants';
import { Button } from '@/components';

const Header = () => {
	const container = useRef(null);
	const { scrollYProgress } = useScroll({
		target: container,
		offset: ['start start', 'end start'],
	});

	const parallax1 = useTransform(scrollYProgress, [0, 1], [0, -200], {
		ease: circOut,
	});

	return (
		<motion.div
			ref={container}
			className="!relative w-full h-auto min-h-screen border-b border-[--border] lg:h-screen overflow-hidden"
		>
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
						className="italic font-semibold text-[--black] pb-2 md:pb-0"
					>
						Quality Growth Solution in Single Platform.
					</motion.p>
					<motion.h1 variants={slideInBottom} className="header">
						QC Advanced: Elevating Quality in Every Bite
					</motion.h1>
					<motion.p
						variants={slideInBottom}
						className="text-[--black] py-4 lg:py-5"
					>
						From menu development and kitchen design to marketing and financial
						planning, we have the skills and experience to help your restaurant
						thrive.
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
					className="relative flex flex-col justify-center items-center w-full"
				>
					<motion.div
						initial="initial"
						whileInView="animate"
						transition={{ staggerChildren: 0.2 }}
						className="w-full relative h-[70vh] max-w-[400px] max-h-[600px] lg:h-screen lg:max-w-[50vw] lg:max-h-[100vh] place-content-center"
					>
						{/* Circle */}
						<motion.div
							// x={parallax1}
							// y={parallax1}
							variants={popIn}
							className=""
						>
							<Image
								src={landingImages.heroCirle}
								alt="QC Advanced"
								className="absolute object-contain top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-auto h-[45vh] max-h-[400px] lg:h-[calc(100vh-200px)] lg:max-h-[500px]"
							/>
						</motion.div>
						<motion.div variants={popIn}>
							<Image
								src={landingImages.phone2}
								alt="QC Advanced"
								className="absolute object-contain top-[50%] left-[40%] translate-x-[-50%] translate-y-[-50%] w-auto h-[45vh] max-h-[400px] lg:w-auto lg:h-[calc(100vh-200px)] lg:max-h-[500px]"
							/>
						</motion.div>
						<motion.div variants={popIn}>
							<Image
								src={landingImages.phone1}
								alt="QC Advanced"
								className="absolute object-contain top-[50%] left-[60%] translate-x-[-50%] translate-y-[-50%] w-auto h-[50vh] max-h-[500px] lg:w-auto lg:h-[calc(100vh-160px)] lg:max-h-[600px]"
							/>
						</motion.div>
						<motion.div variants={popIn}>
							<Image
								src={landingImages.kit2}
								alt="QC Advanced"
								className="absolute object-contain top-[50%] left-[18%]  translate-x-[-50%] translate-y-[-50%] w-auto h-[18vh] max-h-[150px] lg:left-[15%] lg:w-auto lg:max-h-[calc(52vh-160px)] lg:h-[200px]"
							/>
						</motion.div>
						<motion.div variants={popIn}>
							<Image
								src={landingImages.kit1}
								alt="QC Advanced"
								className="absolute object-contain top-[50%] left-[78%] translate-x-[-50%] translate-y-[-50%] w-auto h-[18vh] max-h-[150px] lg:left-[80%] lg:w-auto lg:h-[calc(52vh-160px)] lg:max-h-[200px]"
							/>
						</motion.div>
					</motion.div>
				</motion.div>
			</motion.div>
		</motion.div>
	);
};

export default Header;
