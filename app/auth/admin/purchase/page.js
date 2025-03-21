'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { IconBoxWrapper } from '../../../../wrappers';
import { images, icons } from '../../../../constants';
import { InputField } from '../../../../components';

const pricing = [
	{
		freq: 'monthly',
		price: 59,
	},
	{
		freq: 'quarterly',
		price: 49,
	},
	{
		freq: 'yearly',
		price: 39,
	},
];

export default function Purchase() {
	const [formData, setFormData] = useState({
		subscription: 'monthly',
	});
	const { subscription } = formData;
	const monthlyRef = useRef();
	const quarterlyRef = useRef();
	const yearlyRef = useRef();
	const radioRefs = [monthlyRef, quarterlyRef, yearlyRef];

	// Dynamic refs for radio buttons
	// useEffect(() => {
	// 	radioRefs.current = radioRefs.current.slice(0, pricing.length);
	// }, [pricing]);

	const clickRadio = (i) => {
		switch (i) {
			case 0:
				monthlyRef.current.click();
				break;
			case 1:
				quarterlyRef.current.click();
				break;
			case 2:
				yearlyRef.current.click();
				break;
			default:
				break;
		}
	};

	const onOptionChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const router = useRouter();
	const submitForm = () => {
		// console.log(formData);
		router.push('/admin');
	};

	return (
		<IconBoxWrapper
			icon={images.crown}
			title="Go Premium"
			title2="Get Unlimited Access"
			className=""
			skip="/admin"
		>
			<div className="flex flex-col items-center justify-center w-full max-w-[350px] gap-5">
				<div className="w-full space-y-2 py-[15px]">
					{pricing.map(({ freq, price }, i) => (
						<button
							key={i}
							onClick={() => clickRadio(i)}
							className={`flex-v-center w-full text-left border rounded-lg p-3 ${
								subscription === freq
									? 'border-[--brand] bg-[--highlight-bg-4]'
									: 'border-[--card] bg-[--card]'
							}`}
						>
							<input
								ref={radioRefs[i]}
								type="radio"
								name="subscription"
								value={freq}
								checked={subscription === freq}
								onChange={onOptionChange}
								className="hidden"
							/>
							<div
								className={`w-[20px] h-[20px] max-w-[20px] min-w-[20px] border  p-[2px] rounded-full flex-center ${
									subscription === freq
										? 'border-[--brand] bg-transparent'
										: 'bg-[--gray] border-[--gray]'
								}`}
							>
								<span
									className={`${
										subscription === freq ? 'bg-[--brand]' : 'bg-[--gray]'
									} rounded-full w-full h-full`}
								/>
							</div>
							<label htmlFor={freq} className="flex flex-col w-full">
								<p>
									<span className="text-[--black] font-semibold text-sm md:text-base">
										${price}
									</span>{' '}
									/month
								</p>
								<p className="capitalize">{freq} subscription</p>
							</label>
						</button>
					))}
				</div>
				<button onClick={() => submitForm()} className="btn-1">
					15 days free trial
				</button>
				<p className="text-[--black] p-0 w-full text-center">
					<Link href="/auth/settings" className="text-[--text]">
						Terms of Use | Privacy Policy
					</Link>
				</p>
			</div>
		</IconBoxWrapper>
	);
}
