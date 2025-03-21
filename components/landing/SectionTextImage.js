'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

import { landingImages } from '@/constants';
import { SectionBlock } from '@/components';
import { slideInBottom2 } from '@/constants/variants';

const SectionTextImage = ({ i, tag, image, heading, text, largerImage }) => {
	const container = useRef();
	const { scrollYProgress } = useScroll({
		target: container,
		offset: ['start end', 'start start'],
	});
	const scale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
	return (
		<div
			key={i}
			className={`container gap-[25px] lg:gap-[50px] overflow-hidden ${
				i && i % 2
					? 'flex flex-col md:flex-row-reverse md:items-center'
					: 'grid md:grid-cols-2 items-center'
			}`}
		>
			<motion.div
				initial="initial"
				exit="exit"
				whileInView="animate"
				variants={slideInBottom2}
				className={`w-full rounded-xl relative overflow-hidden flex-center ${
					largerImage ? 'h-[225px] md:h-[300px]' : 'h-[200px] md:h-[250px]'
				}`}
			>
				<motion.div
					ref={container}
					style={{ scale }}
					initial="initial"
					exit="exit"
					whileInView="animate"
					variants={slideInBottom2}
					className={`w-full rounded-xl overflow-hidden  ${
						largerImage ? 'h-[225px] md:h-[300px]' : 'h-[200px] md:h-[250px]'
					}`}
				>
					<Image
						src={landingImages.cardCta}
						alt="our mission"
						width={800}
						height={400}
						className="w-full h-full object-cover"
					/>
				</motion.div>
			</motion.div>
			<SectionBlock tag={tag} heading={heading} text={text} />
		</div>
	);
};

export default SectionTextImage;
