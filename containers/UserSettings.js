'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePathname, useSearchParams } from 'next/navigation';

import { images, icons } from '@/constants';
import {
	ContactUs,
	PrivacyPolicy,
	TermsAndConditions,
	SettingsNavButton,
	SignOutPopup,
	Loading,
} from '@/components';
import { SidePopupWrapper } from '@/wrappers';
import { SideNavIcons } from '@/components/svgs';

const navs = [
	{
		label: 'Privacy Policy',
		icon: icons.lock2,
		link: 'privacy-policy',
	},
	{
		label: 'Contact Us',
		icon: icons.profile2,
		link: 'contact-us',
	},
	{
		label: 'Terms & Conditions',
		icon: icons.noteList,
		link: 'terms-and-conditions',
	},
	{
		label: 'Logout',
		icon: icons.logout,
	},
];

export default function Settings() {
	const [isLoading, setIsLoading] = useState(true);
	const [activeTab, setActiveTab] = useState(0);
	const [showPopup, setShowPopup] = useState(false);
	const [showLogout, setShowLogout] = useState(false);

	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	useEffect(() => {
		setIsLoading(false);
	}, []);

	useEffect(() => {
		let tab = searchParams ? searchParams.get('tab') : '';

		navs.map((nav, i) => {
			if (tab === nav.link) {
				setActiveTab(i);
				if (window.innerWidth < 768) {
					setShowPopup(true);
				}
			} else if (tab === '0') {
				if (window.innerWidth < 768) {
					setShowPopup(false);
				}
			}
		});
	}, [pathname, searchParams, router]);

	const openTab = (i) => {
		router.push(`?tab=${navs[i].link}`);
	};

	return isLoading ? (
		<Loading notFull />
	) : (
		<div className="md:p-10">
			<h1 className="h-[15vh] lg:h-auto flex-center text-center lg:pb-7">
				Settings
			</h1>
			{/* DASHBOARD CONTENT */}
			<div className="dashboard-content-box lg:!h-full">
				<div className="flex w-full lg:h-full">
					<div className="w-full lg:max-w-[300px] border-r border-[--border] p-4 lg:p-7 space-y-3">
						<h3 className="hidden lg:block">Settings</h3>
						<div className="space-y-4">
							{navs.slice(0, navs.length - 1).map((nav, i) => (
								<SettingsNavButton
									key={i}
									icon={nav.icon}
									label={nav.label}
									onClick={() => openTab(i)}
								/>
							))}
							<SettingsNavButton
								icon={navs[navs.length - 1].icon}
								label={navs[navs.length - 1].label}
								onClick={() => setShowLogout(true)}
							/>
						</div>
					</div>
					<div className="hidden lg:flex p-7 w-full h-full">
						<div className="flex-1 border border-[--border] rounded-[--rounding] py-7 flex md:min-h-[calc(85vh-48px)]">
							<div className="flex-1 px-7 overflow-auto">
								{activeTab === 0 && <PrivacyPolicy />}
								{activeTab === 1 && <ContactUs />}
								{activeTab === 2 && <TermsAndConditions />}
							</div>
						</div>
					</div>
				</div>

				<div className="pb lg:!hidden" />
			</div>

			<div className="lg:hidden">
				{showPopup && (
					<SidePopupWrapper
						title={navs[activeTab].label}
						close={() => {
							router.push(`?tab=0`);
						}}
					>
						<div className="px-4 py-5">
							{activeTab === 0 && <PrivacyPolicy />}
							{activeTab === 1 && <ContactUs />}
							{activeTab === 2 && <TermsAndConditions />}
						</div>
					</SidePopupWrapper>
				)}
			</div>

			{showLogout && <SignOutPopup close={() => setShowLogout(false)} />}
		</div>
	);
}
