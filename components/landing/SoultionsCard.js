'use client';
import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

const SoultionsCard = ({ icon, title, desc }) => {
	const container = useRef();
	const { scrollYProgress } = useScroll({
		target: container,
		offset: ['start end', 'start center'],
	});

	const scale = useTransform(scrollYProgress, [0, 1], [0.75, 1]);
	return (
		<motion.div
			ref={container}
			style={{ scale }}
			className="w-full flex flex-col gap-3 bg-[--white] border border-[--outline] rounded-xl p-5 lg:p-7"
		>
			<div className="py-3">
				<Image
					src={icon}
					alt="point"
					className="w-[40px] h-[40px] object-contain"
				/>
			</div>
			<h3>{title}</h3>
			<p>{desc}</p>
		</motion.div>
	);
};

export default SoultionsCard;
