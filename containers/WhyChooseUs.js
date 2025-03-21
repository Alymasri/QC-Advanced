'use client';

import React from 'react';

import { IconBox, TextButtonCard } from '@/components';
import { landingImages } from '@/constants';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination } from 'swiper/modules';

const WhyChooseUs = () => {
	return (
		<div className="container !max-w-[1024px] space-y-[25px] lg:space-y-[35px]">
			<div className="border border-[--border] rounded-xl flex-v-center justify-center md:justify-around p-4 md:p-7 flex-wrap !gap-4">
				<IconBox text="Reliability" icon={landingImages.star} />
				<IconBox text="Customizability" icon={landingImages.blocks} />
				<IconBox text="Innovation" icon={landingImages.medal} makeSmaller />
				<IconBox text="Support" icon={landingImages.mic} />
			</div>
			<div className="">
				<Swiper
					spaceBetween={20}
					slidesPerView={'auto'}
					loop={true}
					autoplay={{
						delay: 2500,
						disableOnInteraction: false,
					}}
					pagination={{
						clickable: true,
					}}
					modules={[Autoplay, Pagination]}
					className="mySwiper"
					// bulletClass="bg-[--brand]"
				>
					<SwiperSlide>
						<TextButtonCard
							title="Reliability"
							text="Trusted by industry leaders, our solutions are designed to meet the rigorous demands of modern restaurant operations."
							button={['Our Story', '#']}
						/>
						<div className="h-[50px]" />
					</SwiperSlide>
					<SwiperSlide>
						<TextButtonCard
							title="Customizability"
							text="We understand that no two restaurants are the same. Our checklists are customizable to fit the specific needs of your establishment."
							button={['Give it a Try', '#']}
						/>
						<div className="h-[50px]" />
					</SwiperSlide>
					<SwiperSlide>
						<TextButtonCard
							title="Innovation"
							text="We utilize the latest technology to provide cutting-edge solutions that drive efficiency and quality."
							button={['Our Story', '#']}
						/>
						<div className="h-[50px]" />
					</SwiperSlide>
					<SwiperSlide>
						<TextButtonCard
							title="Support"
							text="Our dedicated support team is always here to assist you, ensuring you get the most out of our services."
							button={['Give it a Try', '#']}
						/>
						<div className="h-[50px]" />
					</SwiperSlide>
				</Swiper>
				{/* <TextButtonCard
					title="Reliability"
					text="Trusted by industry leaders, our solutions are designed to meet the rigorous demands of modern restaurant operations."
					button={['Our Story', '#']}
				/>
				<TextButtonCard
					title="Customizability"
					text="We understand that no two restaurants are the same. Our checklists are customizable to fit the specific needs of your establishment."
					button={['Give it a Try', '#']}
				/> */}
				{/* <TextButtonCard
					title="Innovation"
					text="We utilize the latest technology to provide cutting-edge solutions that drive efficiency and quality."
					button={['Our Story', '#']}
				/>
				<TextButtonCard
					title="Support"
					text="Our dedicated support team is always here to assist you, ensuring you get the most out of our services."
					button={['Our Story', '#']}
				/> */}
			</div>
		</div>
	);
};

export default WhyChooseUs;
