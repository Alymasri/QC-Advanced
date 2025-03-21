'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { IconBoxWrapper } from '@/wrappers';
import { images, icons } from '@/constants';
import { Button } from '@/components';

export default function LogIn() {
	return (
		<>
			<IconBoxWrapper
				icon={images.logo}
				title="Choose your Business"
				text="Please choose your business to login"
				className=""
				logo
			>
				<div className="flex items-center justify-center w-full py-[12vw] md:py-[30px]">
					<div className="flex flex-col items-center justify-center w-full md:max-w-[300px] gap-3 ">
						<Button text="admin" link="/api/auth/signin?callbackUrl=/admin" />
						<Button
							text="user "
							link="/api/auth/signin?callbackUrl=/user"
							noBg
						/>
					</div>
				</div>
			</IconBoxWrapper>
		</>
	);
}
