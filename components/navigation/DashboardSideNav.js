'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

import { images, icons, variants } from '../../constants';
import { SideNavIcons } from '../../components/svgs';
import { SignOutPopup } from '../../components';

// BACKEND AND APIS
import { useSession } from 'next-auth/react';

const menu = [
	{
		label: 'Dashboard',
		link: '',
	},
	{
		label: 'Action',
		link: '/action',
	},
	{
		label: 'Training',
		link: '/training',
	},
	{
		label: 'Settings',
		link: '/settings',
	},
];

const DashboardSideNav = ({ type }) => {
	const [showLogout, setShowLogout] = useState(false);

	const path = usePathname();

	const { data: session } = useSession();

	return (
		<>
			<div className="h-screen w-full">
				<div className="w-full h-full flex flex-col items-center p-5 gap-7 xl:gap-[50px] ">
					<div className="w-[120px] h-[120px]">
						<Image
							src={images.logoFull}
							w={70}
							h={70}
							alt="QC advanced"
							className="w-full h-full object-contain"
						/>
					</div>
					<div className="w-full space-y-2">
						{menu.map(({ label, link }, i) => (
							<Link
								key={i}
								href={`/${type}${link}`}
								className={
									path === `/${type}` + link
										? 'sidenav-link !bg-[--brand] !text-[--white] hover:!bg-[--brand] hover:!text-[--white] shadow'
										: 'sidenav-link'
								}
							>
								<SideNavIcons
									i={i}
									color={path === `/${type}` + link ? '#ffffff' : '#777e90'}
								/>
								<span>{label}</span>
							</Link>
						))}
						<button
							onClick={() => setShowLogout(true)}
							className={'sidenav-link'}
						>
							<Image
								src={icons.logoutRed}
								alt="logout"
								width={20}
								height={20}
								className="min-w-[20px] max-w-[20px]"
							/>
							<span className="text-[--brand]">Logout</span>
						</button>
					</div>

					<div className="w-full absolute bottom-0 flex gap-3 font-medium text-[--black] items-center px-5 pb-8">
						<div className="relative flex gap-3">
							{session ? (
								<Link
									href={`/${session?.user?.role}/settings`}
									className="relative flex gap-3 text-left"
								>
									{type === 'admin' ? (
										<div className={`w-[45px] min-w-[45px]`}>
											<Image
												src={session?.user?.image}
												width={50}
												height={50}
												alt="log out"
												className="w-[45px] h-[45px] rounded-full object-cover object-top"
											/>
										</div>
									) : (
										<div
											className={`w-[45px] min-w-[45px] h-[45px] rounded-full bg-[--brand] flex-center`}
										>
											<h2 className="text-[--white] uppercase">
												{session && session?.user?.name.split(' ').length > 1
													? `${session?.user?.name.split(' ')[0][0]}${
															session?.user?.name.split(' ')[1][0]
													  }`
													: `${session?.user?.name.substr(0, 2)}`}
											</h2>
										</div>
									)}
									<div className="w-full">
										<h3 className="text-base truncate w-[150px]">
											{session?.user?.name || 'No Name'}
										</h3>
										<p className="text-sm truncate w-[150px]">
											{session?.user?.email}
										</p>
									</div>
								</Link>
							) : (
								<div></div>
							)}
						</div>
					</div>
				</div>
				{/* Logout Popup */}
				{showLogout && <SignOutPopup close={() => setShowLogout(false)} />}
			</div>
		</>
	);
};

export default DashboardSideNav;
