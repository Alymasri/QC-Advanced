'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { icons, images, landingImages } from '@/constants';
import { aboutData } from '@/textData/landingPageData';
import { SmoothScroll } from '@/wrappers';

import {
	HeaderAbout,
	OurValues,
	WhyChooseUs,
	Testimonials,
	Blogs,
	Contact,
} from '@/containers';
import {
	AppCTA,
	CardCTA,
	Loading,
	SectionBlock,
	SectionTextImage,
} from '@/components';
import { slideInBottom2 } from '@/constants/variants';

export default function About() {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(false);
	}, []);

	return loading ? (
		<Loading />
	) : (
		<SmoothScroll>
			<main className="flex flex-col gap-[50px] md:gap-[80px] xl:gap-[100px] landing overflow-auto snap-y snap-mandatory">
				<HeaderAbout />
				<div className="flex flex-col gap-[30px] md:gap-[50px] xl:gap-[50px]">
					{aboutData.map(({ image, heading, text }, i) => (
						<SectionTextImage
							key={i}
							i={i}
							tag="ABOUT QC ADVANCED"
							image={image}
							heading={heading}
							text={text}
						/>
					))}
				</div>

				<CardCTA
					header="Join the QC Advanced Community"
					desc="Become part of a community committed to quality and excellence.
						Explore our resources, connect with industry experts, and take your
						restaurant to the next level with QC Advanced."
				/>

				<OurValues />
				<SectionTextImage
					tag="THE FUTURE"
					// image={image}
					heading="Looking to the Future"
					text="As we continue to grow, QC Advanced remains committed to its founding principles. We are excited to expand our reach and help more restaurants achieve their quality control goals. Join us on this journey towards excellence and discover the difference QC Advanced can make for your business."
					largerImage
				/>
				{/* <WhyChooseUs />
				<Testimonials /> */}
				{/* <Blogs /> */}
				<Contact />
			</main>
		</SmoothScroll>
	);
}
