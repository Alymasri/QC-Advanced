'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

import { SectionBlock } from '@/components';
import { landingImages, variants } from '@/constants';

const AppCTA = () => {
	return (
		<div className="w-full py-[100px] lg:py-[125px] relative mt-5">
			<div className="w-full h-full absolute top-0 left-0">
				<Image
					src={landingImages.appCtaBg}
					alt="testimonial quote"
					width={1280}
					height={720}
					className="object-cover lg:object-fill w-auto lg:w-full h-full"
				/>
			</div>
			<div className="container relative">
				<div className="flex-center flex-col">
					<SectionBlock
						tag="QC ADVANCED APP"
						heading="Download our app and start your free trail to get started today!"
						text="Quality Assurance and management in a single solution."
						wrapperClasses="max-w-[525px] items-center text-center"
					/>
					<div className="flex-center flex-wrap">
						<div>
							<motion.button
								whileTap="tap"
								whileHover="hover"
								variants={variants.buttonClick}
								className={`flex-center !gap-2 rounded-[2rem] bg-[--white] py-[12px] w-[150px] min-w-[130px] md:min-w-[140px] text-xs md:text-sm`}
							>
								<Image
									src={landingImages.apple}
									alt="testimonial quote"
									width={15}
									height={15}
									className="object-contain"
								/>{' '}
								Playstore
							</motion.button>
						</div>
						<div>
							<motion.button
								whileTap="tap"
								whileHover="hover"
								variants={variants.buttonClick}
								className={`flex-center !gap-2 rounded-[2rem] bg-[--black] text-[--white] py-[12px] w-[150px] min-w-[130px] md:min-w-[140px] text-xs md:text-sm`}
							>
								<Image
									src={landingImages.googleplay}
									alt="testimonial quote"
									width={15}
									height={15}
									className="object-contain"
								/>{' '}
								Google Play
							</motion.button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AppCTA;
