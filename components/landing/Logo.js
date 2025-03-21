import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { landingImages } from '../../constants';

const Logo = () => {
	return (
		<div className="min-w-[130px] w-[130px]">
			<Image
				src={landingImages.logo}
				alt="QC Advanced"
				className="w-full h-auto object-contain"
			/>
		</div>
	);
};

export default Logo;
