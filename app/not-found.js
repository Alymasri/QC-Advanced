'use client';

import { Button, Navbar, Footer } from '@/components';

export default function NotFound() {
	return (
		<>
			<Navbar bgActive />
			<div className="containe">
				<div className="grid min-h-screen py-[50px] px-4 place-content-center">
					<div className="flex-center flex-col gap-5 container">
						<h1 className="font-black text-[--gray] text-8xl md:text-9xl">
							404
						</h1>

						<h2 className="">Page Not Found</h2>

						<p className="">This Page does not exist</p>

						<div className="mt-3">
							<Button link="/" text="Return Home" className="btn-1-v2" />
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
}
