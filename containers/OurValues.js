import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { valuesData } from '../textData/landingPageData';
import { landingImages } from '../constants';
import { SectionBlock, SoultionsCard, Button } from '../components';

const OurValues = () => {
	return (
		<div className="relative">
			{/* BACKGROUND */}
			<div className="absolute top-[-250px] left-0 w-full h-[100%] z-[-1]">
				<Image
					src={landingImages.solutionsBg}
					alt="point"
					className="w-auto h-full object-cover md:w-full lg:object-fill"
				/>
			</div>
			{/* CONTENT */}
			<div className="relative container flex-center flex-col !gap-[50px] lg:gap-[70px]">
				<SectionBlock
					tag="ABOUT QC ADVANCED"
					heading="Our Values"
					text="We value intergrity, excellence, innovation and our clients above all else."
					wrapperClasses="max-w-[525px] items-center text-center"
				/>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-7 max-w-[900px]">
					{valuesData.map(({ icon, title, desc }, i) => (
						<SoultionsCard key={i} icon={icon} title={title} desc={desc} />
					))}
				</div>
				<div className="">
					<Button
						text="Get in Touch with us"
						link="#contact"
						className="btn-1-v2"
					/>
				</div>
			</div>
		</div>
	);
};

export default OurValues;
