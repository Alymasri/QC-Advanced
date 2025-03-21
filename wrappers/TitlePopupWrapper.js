'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';

import { motion } from 'framer-motion';
import { variants } from '@/constants';

export default function TitlePopupWrapper({
	children,
	title,
	close,
	darkBg,
	options,
	icon,
	iconFunc,
}) {
	const ref = useRef();

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (ref.current && !ref.current.contains(event.target)) {
				close();
			}
		};

		document.addEventListener('click', handleClickOutside, true);

		return () => {
			document.removeEventListener('click', handleClickOutside, true);
		};
	}, []);

	return (
		<div
			className={`fixed top-0 right-0 bottom-0 h-full w-full  ${
				darkBg
					? 'bg-[--transparent-bg]'
					: 'bg-[--transparent-bg] lg:bg-[#00000005]'
			} backdrop-blur-sm !z-10 flex items-center justify-center p-5 lg:p-7`}
		>
			{options ? (
				<div ref={ref} className={`w-full max-w-[350px] space-y-4`}>
					<div className="max-h-[500px] overflow-auto">{children}</div>
				</div>
			) : (
				<div
					ref={ref}
					className={`bg-white w-full py-4 lg:py-5 rounded-[--rounding] max-w-[375px] space-y-4`}
				>
					<div className="px-4 lg:px-5 !relative">
						<h1 className="border-b border-[--border] text-center !text-[--black] pb-4">
							{title}
							{icon && (
								<motion.button
									whileTap="tap"
									whileHover="hover"
									variants={variants.buttonClick}
									onClick={iconFunc}
									className="popup-animated-children popup-button absolute right-4 lg:right-5 top-0"
								>
									<Image src={icon} alt="close" />
								</motion.button>
							)}
						</h1>
					</div>
					<div className="px-4 lg:px-5 max-h-[70vh] overflow-auto">
						{children}
					</div>
				</div>
			)}
		</div>
	);
}
