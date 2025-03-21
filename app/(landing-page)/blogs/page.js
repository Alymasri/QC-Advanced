'use client';

import { useState, useEffect } from 'react';

import { SmoothScroll } from '@/wrappers';
import { Loading, ComingSoon } from '@/components';
import { Contact } from '@/containers';

export default function Blogs() {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(false);
	}, []);

	return loading ? (
		<Loading />
	) : (
		<SmoothScroll>
			<main className="flex flex-col ap-[50px] md:ap-[80px] xl:ap-[100px] landing overflow-auto snap-y snap-mandatory">
				<ComingSoon
					page="blog"
					text="Become part of a community committed to quality and excellence. Explore our resources, connect with industry experts, and take your restaurant to the next level with QC Advanced."
				/>
				<Contact />
			</main>
		</SmoothScroll>
	);
}
