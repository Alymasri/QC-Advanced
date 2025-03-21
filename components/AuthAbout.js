'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components';

const AuthAbout = ({ title, subheading, text, linkText, link }) => {
	// const wheelRef = useRef();
	// const handleWheel = (e) => {
	// 	// e.preventDefault();
	// 	wheelRef.current.scrollBy({
	// 		top: e.deltaY,
	// 		// behavior: 'smooth',
	// 	});
	// };

	const [isPending, setIsPending] = useState(false);
	return (
		<div className={`lg:p-10`}>
			<div className="h-[15vh] lg:h-auto flex-center text-center lg:pb-7">
				<h1 className="">{title}</h1>
			</div>
			<div
				// ref={wheelRef}
				// onWheel={(e) => handleWheel(e)}
				className="dashboard-content-box !h-fit max-w-[900px] py-5 lg:py-7"
			>
				<div className={`!relative ${isPending && 'pending'}`}>
					<div className="flex flex-col items-center px-4 lg:px-7">
						<h2 className="text-left w-full">{subheading}</h2>
						<div className="space-y-2 py-2">
							{text.map((p, index) => (
								<p key={index}>{p}</p>
							))}
						</div>
						<div className="popup-pb" />
						<div
							className="w-full flex md:max-w-[250px] pt-3"
							onClick={() => setIsPending(true)}
						>
							<Button link={link} text={linkText} submitting={isPending} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AuthAbout;
