'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { images } from '../constants';

export default function IconPopupWrapper({
	children,
	icon,
	title,
	text,
	className,
	noBg,
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
			className={`fixed top-0 right-0 bottom-0 h-full w-full !z-10 flex flex-col items-center justify-center p-5 lg:p-7 ${className} ${
				noBg
					? '!bg-transparent backdrop-blur-sm'
					: 'bg-[--transparent-bg] backdrop-blur-sm'
			}`}
		>
			<div ref={ref} className={`flex flex-col items-center justify-center`}>
				<div className="bg-white w-[90px] md:w-[100px] h-[90px] md:h-[100px] rounded-full overflow-hidden flex items-center justify-center p-5 border-[5px] border-[--gray] mb-[-45px] md:mb-[-50px] z-10">
					<Image
						src={icon}
						alt="logo"
						w={50}
						h={50}
						className={`w-full h-full object-contain`}
					/>
				</div>

				<div className="bg-[--white] pt-[50px] w-full rounded-[--rounding] h-auto shadow shadow-white overflow-auto max-w-[300px]">
					<div className="flex flex-col items-center px-5 pt-3 pb-7 ">
						<h2 className="max-w-[300px]">{title}</h2>
						<p className="px-5 text-center pt-1 max-w-[300px]">{text}</p>
						{children}
					</div>
				</div>
			</div>
		</div>
	);
}
