'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';

import { SignOutPopup, Button } from '@/components';
import { PiCaretDownBold } from 'react-icons/pi';
import { variants, icons } from '@/constants';

const LoggedInCard = ({ logout, scrolledOffTop }) => {
	const [showOptions, setShowOptions] = useState(false);
	const { data: session } = useSession();
	const ref = useRef();

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (ref.current && !ref.current.contains(event.target)) {
				setShowOptions(false);
			}
		};

		document.addEventListener('click', handleClickOutside, true);

		return () => {
			document.removeEventListener('click', handleClickOutside, true);
		};
	}, []);

	return (
		<>
			<div
				ref={ref}
				className="flex flex-v-center flex-row justify-end max-w-[220px] !gap-2 relative"
			>
				<button
					className={`flex-v-center rounded-[2rem] transition duration-700 ${
						scrolledOffTop
							? 'bg-[--card] px-2 md:px-3 py-[6px] md:py-2 !gap-1'
							: '!gap-[6px]'
					}`}
					type="button"
					onClick={() => setShowOptions((prev) => !prev)}
				>
					<div className="w-full hidden md:block">
						<p className="text-sm truncate leading-[110%] text-[--black]">
							{session && session?.user?.name.split(' ')[0]}{' '}
							{session &&
								session?.user?.name.split(' ').length > 1 &&
								session?.user?.name.split(' ')[1][0]}
						</p>
						{/* <p className="text-xs truncate w-[100px] leading-[110%]">
						{session?.user?.email}
					</p> */}
					</div>
					<PiCaretDownBold
						className={`transition duration-700 text-sm md:text-base ${
							showOptions ? 'rotate-180' : 'rotate-0'
						}`}
					/>
					{/* AVATAR */}
					{session?.user?.role === 'admin' ? (
						<div
							className={`${
								scrolledOffTop
									? 'w-[25px] min-w-[25px] h-[25px]'
									: 'w-[32.5px] min-w-[32.5px] h-[32.5px]'
							}`}
						>
							<Image
								src={session?.user?.image}
								width={50}
								height={50}
								alt="log out"
								className={`rounded-full object-cover object-top${
									scrolledOffTop
										? 'w-[25px] min-w-[25px] h-[25px]'
										: 'w-[32.5px] min-w-[32.5px] h-[32.5px]'
								}`}
							/>
						</div>
					) : (
						<div
							className={`rounded-full bg-[--brand] flex-center ${
								scrolledOffTop
									? 'w-[25px] min-w-[25px] h-[25px]'
									: 'w-[32.5px] min-w-[32.5px] h-[32.5px]'
							}`}
						>
							<h2
								className={`text-[--white] uppercase  ${
									scrolledOffTop ? '!text-sm' : '!text-lg'
								}`}
							>
								{session && session?.user?.name.split(' ').length > 1
									? `${session?.user?.name.split(' ')[0][0]}${
											session?.user?.name.split(' ')[1][0]
									  }`
									: `${session?.user?.name.substr(0, 2)}`}
							</h2>
						</div>
					)}
				</button>

				{/* POPUP */}
				<AnimatePresence>
					{showOptions && (
						<motion.div
							initial="initial"
							animate="animate"
							exit="exit"
							// variants={variants.slideInRight}
							// transition={{ staggerChildren: 0.01 }}
							className={`absolute bg-[--white] rounded-xl w-[80vw] max-w-[220px] p-5 pb-2 shadow-lg transition-all duration-700 overflow-hidden ${
								scrolledOffTop ? 'top-[60px] lg:top-[70px]' : 'top-[45px]'
							}`}
						>
							<motion.div className="w-full flex-center flex-col !gap-1">
								{/* AVATAR */}
								{session?.user?.role === 'admin' ? (
									<motion.div
										variants={variants.slideInRight}
										className={'w-[45px] min-w-[45px] h-[45px]'}
									>
										<Image
											src={session?.user?.image}
											width={50}
											height={50}
											alt="log out"
											className={`rounded-full object-cover object-top w-[45px] min-w-[45px] h-[45px]`}
										/>
									</motion.div>
								) : (
									<motion.div
										variants={variants.slideInRight}
										className={`rounded-full bg-[--brand] flex-center w-[45px] min-w-[45px] max-w-[45px] h-[45px]
											`}
									>
										<h2 className="text-[--white] uppercase">
											{session && session?.user?.name.split(' ').length > 1
												? `${session?.user?.name.split(' ')[0][0]}${
														session?.user?.name.split(' ')[1][0]
												  }`
												: `${session?.user?.name.substr(0, 2)}`}
										</h2>
									</motion.div>
								)}

								<motion.h2
									variants={variants.slideInRight}
									className="text-sm truncate leading-[110%] text-[--black]"
								>
									{session?.user?.name}
								</motion.h2>
								<motion.p
									variants={variants.slideInRight}
									className="text-xs truncate w-[100px] leading-[110%]"
								>
									{session?.user?.email}
								</motion.p>
							</motion.div>
							<motion.div className="pt-1 flex flex-col w-full divide-y divide-[--outline]">
								<motion.div className="py-2" variants={variants.slideInRight}>
									<Link
										href={`/${session?.user?.role}`}
										className="py-2 hover:text-[--brand] transition duration-700"
									>
										Dashboard
									</Link>
								</motion.div>
								<motion.div className="py-2" variants={variants.slideInRight}>
									<Link
										href={`/${session?.user?.role}/action`}
										className="py-2 hover:text-[--brand] transition duration-700"
									>
										Action
									</Link>
								</motion.div>
								<motion.div className="py-2" variants={variants.slideInRight}>
									<Link
										href={`/${session?.user?.role}/training`}
										className="py-2 hover:text-[--brand] transition duration-700"
									>
										Training
									</Link>
								</motion.div>{' '}
								<motion.div className="py-2" variants={variants.slideInRight}>
									<Link
										href={`/${session?.user?.role}/settings`}
										className="py-2 hover:text-[--brand] transition duration-700"
									>
										Settings
									</Link>
								</motion.div>{' '}
								<motion.div className="py-2" variants={variants.slideInRight}>
									<button
										type="button"
										onClick={logout}
										className="py-2 text-[--brand] transition duration-700 flex-v-center !gap-2 text-sm"
									>
										{/* <Image
											src={icons.logout}
											width={20}
											height={20}
											alt="delete"
										/> */}
										Logout
									</button>
								</motion.div>{' '}
							</motion.div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</>
	);
};

export default LoggedInCard;
