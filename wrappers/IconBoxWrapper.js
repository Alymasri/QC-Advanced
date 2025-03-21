'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAnimate, usePresence, stagger, motion } from 'framer-motion';

import { images, icons, variants } from '../constants';
import { EditProfileImage } from '../components';

export default function AppWrap({
	children,
	icon,
	title,
	title2,
	text,
	className,
	logo,
	back,
	header,
	profile,
	setValue,
	name,
	rhf,
	error,
	skip,
}) {
	// ANIMATION
	const [scope, animate] = useAnimate();
	const [isPresent, safeToRemove] = usePresence();

	// // scroll
	// const wheelRef = useRef();
	// const handleWheel = (e) => {
	// 	wheelRef.current.scrollBy({
	// 		top: e.deltaY / 2,
	// 		behavior: 'smooth',
	// 	});
	// };

	useEffect(() => {
		if (isPresent) {
			const enterAnimation = async () => {
				animate(
					'.slide-animated-children',
					{
						opacity: [0, 1],
						x: [50, 0],
					},
					{ delay: stagger(0.05), type: 'spring', duration: 1, bounce: 0.5 }
				);
				animate(
					'.popup-animated-children',
					{
						opacity: [0, 1],
						scale: [1.1, 1],
					},
					{ delay: stagger(0.05), type: 'spring', duration: 1, bounce: 0.5 }
				);
			};
			enterAnimation();
		} else {
			const exitAnimation = async () => {
				animate(
					'.slide-animated-children',
					{
						opacity: [1, 0],
						x: [0, 50],
					},
					{ delay: stagger(0.015), type: 'spring', duration: 0.5, bounce: 0.3 }
				);
				animate(
					'.popup-animated-children',
					{
						opacity: [1, 0],
						x: [1, 1.1],
					},
					{ delay: stagger(0.015), type: 'spring', duration: 0.5, bounce: 0.3 }
				);
				safeToRemove();
			};

			exitAnimation();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isPresent]);
	return (
		<div
			ref={scope}
			className={`auth-container flex flex-col-reverse items-center ${className}`}
		>
			{back && (
				<div className="w-full flex justify-between gap-5 items-center h-[15vh] fixed top-0 right-0 !text-[--white] px-4 lg:z-[1] lg:pl-10">
					<Link
						href={back}
						className="popup-animated-children popup-button min-w-[35px] lg:min-w-[45px] lg:!min-h-[45px]"
					>
						<Image src={icons.arrowLeft} alt="close" />
					</Link>
					<h2 className="popup-animated-children text-[--white] lg:text-[--black] col-span-2 text-center">
						{header}
					</h2>
					<div className="popup-animated-children flex justify-end min-w-[35px] lg:min-w-[45px]"></div>
				</div>
			)}
			{skip && (
				<div className="w-full flex justify-between gap-5 items-center h-[15vh] fixed top-0 right-0 !text-[--white] px-4 lg:z-[1] lg:px-10">
					<div className="flex justify-end min-w-[35px] lg:min-w-[45px]"></div>
					<h2 className="text-[--white] lg:text-[--black] col-span-2 text-center">
						{header}
					</h2>
					<motion.button
						whileTap="tap"
						whileHover="hover"
						variants={variants.buttonClick}
						onClick={skip}
						className="popup-button min-w-[35px] lg:min-w-[45px] lg:!min-h-[45px]"
					>
						<Image src={icons.logout} alt="close" />
					</motion.button>
				</div>
			)}

			<div
				// ref={wheelRef}
				// onWheel={(e) => handleWheel(e)}
				className="bg-[--white] pt-[50px] w-full rounded-t-[--rounding] md:rounded-[--rounding] min-h-[300px] h-full md:h-auto md:max-h-[80vh] shadow overflow-auto"
			>
				<div className="flex flex-col items-center px-5 pt-3 pb-7 ">
					<p className="text-[--brand]">
						{error === 'Input not instance of File' &&
							'Please add Profile Picture*'}
					</p>
					<h2 className="slide-animated-children max-w-[300px]">{title}</h2>
					{title2 ? (
						<h2 className="slide-animated-children max-w-[300px]">{title2}</h2>
					) : (
						<p className="slide-animated-children px-5 text-center pt-1 max-w-[300px]">
							{text}
						</p>
					)}
					{children}
				</div>
			</div>

			{/* ProfileImage or just Icon */}
			{profile ? (
				<>
					<EditProfileImage
						rhf={rhf}
						error={error}
						setValue={setValue}
						name={name}
					/>
				</>
			) : (
				<div
					className={`popup-animated-children bg-white w-[100px] md:w-[110px] h-[100px] md:h-[110px] rounded-full overflow-hidden flex items-center justify-center relative ${
						logo ? 'p-3' : 'p-6'
					} border-[5px] border-[--gray] mb-[-50px] md:mb-[-55px]`}
				>
					<Image
						src={icon}
						alt="logo"
						w={100}
						h={100}
						className={`w-full h-full object-contain`}
					/>
				</div>
			)}

			<div className="popup-animated-children slide-animated-children absolute hidden" />
		</div>
	);
}
