'use client';

import React from 'react';
import Link from 'next/link';

import {
	FaFacebookF,
	FaInstagram,
	FaLinkedinIn,
	FaPhoneAlt,
	FaRegEnvelope,
} from 'react-icons/fa';

import { Logo } from '@/components';
import { contactData, socialData } from '@/textData/landingPageData';

const Footer = () => {
	return (
		<div className="py-[50px] lg:py-[80px]">
			<div className="container grid grid-cols-1 md:grid-cols-3 gap-5">
				<div className="space-y-3">
					<Logo />
					<p className="lg:max-w-[225px] !leading-[150%]">
						Become part of a community committed to quality and excellence.
					</p>
					<div className="flex-v-center !gap-2">
						<Link href="/about" className="footer-link hover:!scale-110">
							<FaFacebookF className="text-[--brand] text-base mr-[-4px]" />
						</Link>
						<Link href="/about" className="footer-link hover:!scale-110">
							<FaInstagram className="text-[--brand] text-base" />
						</Link>
						<Link href="/about" className="footer-link hover:!scale-110">
							<FaLinkedinIn className="text-[--brand] text-base" />
						</Link>
					</div>
				</div>
				<div className="grid grid-cols-2 gap-5">
					<div className="flex flex-col gap-3">
						<h3>Company</h3>
						<Link href="/about" className="footer-link">
							About Us
						</Link>
						<Link href="/#contact" className="footer-link">
							Contact Us
						</Link>
						<Link href="/coming-soon" className="footer-link">
							Blog
						</Link>
						<Link href="/coming-soon" className="footer-link">
							Pricing
						</Link>
					</div>
					<div className="flex flex-col gap-3">
						<h3>User Area</h3>
						<Link href="/auth/admin/about" className="footer-link">
							Sign Up
						</Link>
						<Link href="/auth" className="footer-link">
							Sign In
						</Link>
						<Link href="/about" className="footer-link">
							Privacy Policy
						</Link>
					</div>
				</div>
				<div className="flex md:justify-end">
					<div className="flex flex-col gap-3">
						<h3>Contact</h3>

						<Link
							href={contactData[0].link}
							className="footer-link flex-v-center"
						>
							<FaPhoneAlt /> {contactData[0].text}
						</Link>
						<Link
							href={contactData[1].link}
							className="footer-link flex-v-center"
						>
							<FaRegEnvelope />
							{contactData[1].text}
						</Link>
						<Link
							href={contactData[2].link}
							className="footer-link flex-v-center"
						>
							<FaRegEnvelope />
							{contactData[2].text}
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Footer;
