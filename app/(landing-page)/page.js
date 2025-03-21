'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { icons, images } from '@/constants';
import { SmoothScroll } from '@/wrappers';

import {
	Header,
	About,
	OurSolutions,
	WhyChooseUs,
	Testimonials,
	Blogs,
	Contact,
} from '@/containers';
import { AppCTA, CardCTA, Loading } from '@/components';

export default function Home() {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(false);
	}, []);

	return loading ? (
		<Loading />
	) : (
		<SmoothScroll>
			<main className="flex flex-col gap-[50px] md:gap-[70px] xl:gap-[100px] landing overflow-auto snap-y snap-mandatory">
				<Header />
				<About />
				<CardCTA
					header="Join the QC Advanced Community"
					desc="Become part of a community committed to quality and excellence.
						Explore our resources, connect with industry experts, and take your
						restaurant to the next level with QC Advanced."
				/>

				<OurSolutions />
				<WhyChooseUs />
				<Testimonials />
				{/* <Blogs /> */}
				<Contact />
			</main>
		</SmoothScroll>
	);
}
