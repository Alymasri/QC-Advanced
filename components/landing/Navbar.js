'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

// ICONS
import { CgMenuLeftAlt } from 'react-icons/cg';
import { MdClose } from 'react-icons/md';

// COMPONENTS AND UTILS
import { Logo, LoggedInCard, SignOutPopup } from '../../components';
import { slideInBottom } from '../../constants/variants';

// BACKEND AND APIS
import { useSession } from 'next-auth/react';

const navigation = [
	{
		label: 'Home',
		link: '/',
	},
	{
		label: 'About',
		link: '/about',
	},
	{
		label: 'Blogs',
		link: '/blogs',
	},
	{
		label: 'Pricing',
		link: '/pricing',
	},
];

const Navbar = ({ bgActive }) => {
	const [menuToggled, setMenuToggled] = useState(false);
	const [scrolledOffTop, setScrolledOffTop] = useState(false);
	const popupClickable = useRef();
	const clickable = useRef();
	const path = usePathname();
	const [showLogout, setShowLogout] = useState(false);

	const { data: session } = useSession();

	// When scrolled off top
	useEffect(() => {
		const handleScroll = () => {
			const scrollTop = window.scrollY;
			if (scrollTop >= 40) {
				setScrolledOffTop(true);
			} else {
				setScrolledOffTop(false);
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	// When User Click on the Background of the mobile menu
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				popupClickable.current &&
				!popupClickable.current.contains(event.target)
			) {
				setMenuToggled(false);
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
				className={`fixed top-0 left-0 z-[100000] flex flex-col justify-center w-full transition-all duration-500 
					${bgActive && '!bg-[--white] shadow-sm shadow-[--card]'} ${
					scrolledOffTop
						? 'bg-[--white] shadow-sm shadow-[--card] h-[60px] md:h-[70px]'
						: 'bg-transparent h-[80px] md:h-[100px]'
				}`}
			>
				<div className="container flex items-center justify-between">
					<Logo />
					<div className="flex-v-center justify-between !gap-5 w-full max-w-[250px] !hidden lg:!flex">
						{navigation.map(({ label, link }, i) => (
							<Link
								key={i}
								href={link}
								className={`navlinks ${path === link && '!text-[--brand]'}`}
							>
								{label}
							</Link>
						))}
					</div>

					<div className="hidden lg:block">
						{session ? (
							<LoggedInCard
								logout={() => setShowLogout(true)}
								scrolledOffTop={scrolledOffTop}
							/>
						) : (
							<div className="flex-v-center justify-end min-w-[220px] !gap-2 !hidden lg:!flex">
								<Link
									// href="/api/auth/signin?callbackUrl=/auth-in"
									href="/auth"
									className="btn-2-v2 !bg-transparent hover:!bg-[--card] !capitalize"
								>
									Sign In
								</Link>
								<Link href="/auth/admin/about" className="btn-1-v2 !capitalize">
									Sign Up
								</Link>
							</div>
						)}
					</div>
					<div className="flex-v-center !gap-2 lg:hidden">
						{session && (
							<LoggedInCard
								logout={() => setShowLogout(true)}
								scrolledOffTop={scrolledOffTop}
							/>
						)}
						<button className="lg:hidden" onClick={() => setMenuToggled(true)}>
							{menuToggled ? (
								<MdClose className="text-[--black] text-2xl" />
							) : (
								<CgMenuLeftAlt className="text-[--black] text-2xl" />
							)}
						</button>
					</div>
				</div>
				{/* popup */}
				<AnimatePresence>
					{menuToggled && (
						<motion.div
							animate={{ opacity: [0, 1] }}
							exit={{ opacity: [1, 0] }}
							transition={{ type: 'tween', duration: 0.5 }}
							className="fixed top-0 left-0 w-full h-screen bg-[#ffffffaa] backdrop-blur z-[1000000] lg:hidden"
						>
							<motion.div className="flex flex-col gap-[5vh] h-full justify-start items-center pt-[10vh]">
								<motion.div>
									<Logo />
								</motion.div>
								<motion.div
									ref={popupClickable}
									initial="initial"
									exit="exit"
									whileInView="animate"
									transition={{ staggerChildren: 0.2 }}
									className="flex flex-col gap-[3vh] justify-center items-center "
								>
									{navigation.map(({ label, link }, i) => (
										<Link key={i} href={link}>
											<motion.p
												variants={slideInBottom}
												onClick={() => {
													setMenuToggled(false);
												}}
												className={`navlinks ${
													path === link && '!text-[--brand]'
												}`}
											>
												{label}
											</motion.p>
										</Link>
									))}
									{!session && (
										<div className="flex-v-center flex-col !gap-[1.5vh] mt-[2vh]">
											<motion.a
												// href="/api/auth/signin?callbackUrl=/auth-in"
												href="/auth"
												variants={slideInBottom}
												whileHover={{ scale: 1.1 }}
												whileTap={{ scale: 0.9 }}
												transition={{
													type: 'spring',
													stiffness: 400,
													damping: 10,
												}}
												className="btn-2-v2 !bg-[--card] !capitalize min-w-[100px]"
											>
												Sign In
											</motion.a>
											<motion.a
												href="/auth/admin/about"
												variants={slideInBottom}
												whileHover={{ scale: 1.1 }}
												whileTap={{ scale: 0.9 }}
												transition={{
													type: 'spring',
													stiffness: 400,
													damping: 10,
												}}
												className="btn-1-v2 !capitalize min-w-[100px]"
											>
												Sign Up
											</motion.a>
										</div>
									)}
									{/* <motion.a
									href="/auth"
									variants={slideInBottom}
									whileHover={{ scale: 1.1 }}
									whileTap={{ scale: 0.9 }}
									transition={{
										type: 'spring',
										stiffness: 400,
										damping: 10,
									}}
									className="btn-2-v2 !bg-[--card] !capitalize min-w-[100px] mt-[2vh]"
								>
									Sign In
								</motion.a> */}
								</motion.div>
							</motion.div>

							{/* *TOGGLE BUTTON */}
							<div className="fixed top-0 left-0 w-full h-[80px] container flex items-center justify-end">
								<button
									className="z-[10]"
									onClick={() => setMenuToggled(false)}
								>
									{menuToggled ? (
										<MdClose className="text-[--black] text-2xl" />
									) : (
										<CgMenuLeftAlt className="text-[--black] text-2xl" />
									)}
								</button>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
				{/* Logout Popup */}
				{showLogout && <SignOutPopup close={() => setShowLogout(false)} />}
			</div>
		</>
	);
};

export default Navbar;
