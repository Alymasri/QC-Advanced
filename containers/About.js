'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useScroll, motion } from 'framer-motion';

import { SectionBlock, WavyLine } from '../components';
import { qcSteps } from '../textData/landingPageData';
import { landingImages } from '../constants';
import { slideInBottom, popIn } from '../constants/variants';

const stepPositions = [
	'lg:pt-[32vw] xl:pt-[355px]',
	'lg:pt-[220px] lg:ml-[100px] xl:pt-[230px]',
	'lg:pt-[4.5vw] xl:pt-0',
];

const StepContent = ({ step, desc, id, position }) => (
	<motion.div
		initial="initial"
		exit="exit"
		whileInView="animate"
		transition={{ staggerChildren: 0.2 }}
		// variants={slideInBottom}
		className={`relative flex flex-col gap-4 w-full md:max-w-[200px] shadow-md lg:shadow-none lg:p-0 rounded-lg p-5 ${position}`}
	>
		<Image
			src={landingImages.linePoint}
			alt="point"
			className="shadow-lg rounded-xl w-[40px] h-[40px]"
		/>
		<motion.div className="relative space-y-1">
			{id === 2 && (
				<motion.div
					variants={popIn}
					className="hidden lg:block absolute top-[-100px] left-[50%] min-w-[350px] h-[350px]"
				>
					<Image
						src={landingImages.heroCirle}
						alt="point"
						className="w-full h-full object-contain"
					/>
				</motion.div>
			)}
			<motion.p
				variants={popIn}
				className="absolute bottom-[90%] right-0 md:left-[70%] lg:bottom-[20%] text-[--black] opacity-5 text-[65px] lg:text-[100px] !font-black leading-none thick-text lg:px-2"
			>
				{id + 1}
			</motion.p>
			<motion.h3 variants={slideInBottom} className="relative capitalize">
				{step}
			</motion.h3>
			<motion.p variants={slideInBottom} className="relative">
				{desc}
			</motion.p>
		</motion.div>
	</motion.div>
);

const About = () => {
	const container = useRef(null);
	const { scrollYProgress } = useScroll({
		target: container,
		offset: ['start end', 'end end'],
	});

	return (
		<div
			className="w-full overflow-hidden pb-3 lg:min-h-[610px]"
			ref={container}
		>
			<div className="container">
				<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2">
					<SectionBlock
						tag="ABOUT QC"
						heading="Welcome to QC Advanced: Elevating Quality in Every Bite"
						text="At QC Advanced, we are committed to revolutionizing the way restaurants maintain quality and safety. Our comprehensive QC control checklists ensure that every aspect of your dining experience meets the highest standards. From food preparation to customer service, we provide the tools and insights needed to enhance operational efficiency and customer satisfaction."
						buttons={[
							{
								text: 'Get Started',
								link: '/auth',
							},
							{
								text: 'Learn More',
								link: '/about',
							},
						]}
						wrapperClasses="col-span-1 md:col-span-2 lg:col-span-1"
						scrollYProgress={scrollYProgress}
					/>
				</div>
				<div className="lg:mt-[-200px] w-full relative pt-[40px] md:pt-[50px] lg:pt-0 lg:h-[449px] pointer-events-none">
					<div className="hidden lg:flex items-center justify-center overflow-hidden w-full h-full pr-[10%] xl:pr-12">
						<WavyLine />
					</div>
					<motion.div
						// initial="initial"
						// exit="exit"
						// whileInView="animate"
						// transition={{ staggerChildren: 0.2 }}
						className="flex flex-col md:flex-row w-full h-full mbg-red-800/50 justify-between lg:pl-[12.5%] lg:absolute top-0 left-0 gap-5"
					>
						{qcSteps.map(({ step, desc }, i) => (
							<StepContent
								key={i}
								step={step}
								desc={desc}
								id={i}
								position={stepPositions[i]}
							/>
						))}
					</motion.div>
				</div>
			</div>
		</div>
	);
};

export default About;
