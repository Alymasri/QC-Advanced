'use client';

import { useState } from 'react';
import Image from 'next/image';

import { SectionBlock, AppCTA } from '@/components';
import { testimonials } from '@/textData/testimonialsData';
import { landingImages } from '@/constants';

const Testimonials = () => {
	return (
		<div>
			<div className="container">
				<div className="flex-center">
					<SectionBlock
						tag="TESTIMONIALS"
						heading="Check what our clients are saying"
						wrapperClasses="max-w-[525px] items-center text-center"
					/>
				</div>
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-[25px lg:gap-[50px] max-w-[950px] mx-auto justify-center items-center">
					<div className="p-[30px] md:p-[40px] relative">
						{/* Top Left */}
						<Image
							src={landingImages.ellipse}
							alt="testimonial quote"
							width={30}
							height={30}
							className="absolute top-0 left-0 rotate-180"
						/>
						<Image
							src={landingImages.ellipseRed}
							alt="testimonial quote"
							width={40}
							height={40}
							className="absolute top-[12.5px] md:top-[15px] left-[12.5px] md:left-[15px] rotate-180"
						/>
						{/* Top Right */}
						<Image
							src={landingImages.dots}
							alt="testimonial quote"
							width={110}
							height={110}
							className="absolute top-0 right-0"
						/>
						{/* Bottom Right */}
						<Image
							src={landingImages.ellipse}
							alt="testimonial quote"
							width={100}
							height={100}
							className="absolute bottom-0 right-0 w-[75px] h-[75px] md:w-[90px] md:h-[90px]"
						/>

						{/* Actual Image */}
						<div className="w-full h-[45vh] md:h-[400px] rounded-xl bg-[--card] overflow-hidden relative">
							<Image
								src={testimonials[0].img}
								alt="testimonial quote"
								width={400}
								height={400}
								className="object-cover object-center w-full h-full"
							/>
						</div>
					</div>
					<div className="space-y-4 lg:pr-[50px]">
						<Image
							src={landingImages.quote}
							alt="testimonial quote"
							width={25}
							height={25}
						/>
						{/* <div className="flex gap-1">
							{Array(testimonials[0].no_of_stars)
								.fill(0)
								.map((n, i) => (
									<Image
										key={i}
										src={landingImages.starRed}
										alt="testimonial quote"
										width={20}
										height={20}
									/>
								))}
							{5 - testimonials[0].no_of_stars > 0 &&
								Array(5 - testimonials[0].no_of_stars)
									.fill(0)
									.map((n, i) => (
										<Image
											key={i}
											src={landingImages.starGrey}
											alt="testimonial quote"
											width={20}
											height={20}
										/>
									))}
						</div> */}
						<h2 className="lg:leading-[130%] lg:text-[1.75rem]">
							{testimonials[0].comment}
						</h2>
						<div className="flex-v-center justify-between pt-2">
							<div>
								<p className="text-[--black] font-semibold uppercase">
									{testimonials[0].name}
								</p>
								<p>{testimonials[0].title}</p>
							</div>
							<div>
								<Image
									src={testimonials[0].logo}
									alt="testimonial quote"
									width={40}
									height={40}
									className="h-[20px] w-auto grayscale"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			<AppCTA />
		</div>
	);
};

export default Testimonials;
