'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

import { images } from '@/constants';
import { SignOutPopup, Button } from '@/components';
import { IconPopupWrapper } from '@/wrappers';

export default function AuthLayout({ children }) {
	const { data: session } = useSession();
	const [showLogout, setShowLogout] = useState(false);
	const [authenticated, setAuthenticated] = useState(session);
	const [dontRespond, setDontRespond] = useState(true);

	useEffect(() => {
		if (session) {
			setAuthenticated(true);
		} else {
			setAuthenticated(false);
			setDontRespond(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="relative w-full flex items-center justify-center bg-pattern bg-cover bg-fixed">
			<div
				className={`relative w-full flex items-center justify-center p-0 md:px-[50px] min-h-screen ${
					dontRespond && 'pointer-events-none'
				}`}
			>
				{children}
			</div>
			{authenticated && (
				<div className="fixed top-0 left-0 w-full h-screen !z-10">
					<IconPopupWrapper
						icon={images.logout}
						title={`Can't View Page`}
						smallIcon
					>
						<div className={`space-y-3 pt-3 w-full`}>
							<p className="text-center w-[90%] mx-auto">
								You are logged in as{' '}
								{session?.user?.role === 'admin' ? 'an admin' : 'a user'}.<br />
								<span className="text-[--brand]">Logout first</span>
							</p>
							<div className="grid grid-cols-2 gap-3 w-[90%] mx-auto">
								<Button
									link={`/${session?.user?.role}`}
									text="Dashboard"
									noBg
								/>
								<Button onClick={() => setShowLogout(true)} text="Logout" sm />
							</div>
						</div>
						{showLogout && (
							<SignOutPopup noBg={true} close={() => setShowLogout(false)} />
						)}
					</IconPopupWrapper>
				</div>
			)}
		</div>
	);
}
