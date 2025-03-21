'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

import { IconBoxWrapper } from '@/wrappers';
import { images, icons, variants } from '@/constants';
import { InputField, SubmitButton, FormError, FormSuccess } from '@/components';

// API RELATED
import { purchasePlan } from '@/actions/purchasePlan';
import { useSession } from 'next-auth/react';

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

export default function Purchase({ close }) {
	// API RELATED
	const { data: session } = useSession();
	const userId = session?.user?.id;
	const [isPending, setIsPending] = useState();
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	// UI AND FORM DATA
	const [formData, setFormData] = useState({
		subscription: 'monthly',
	});
	const { subscription } = formData;
	const monthlyRef = useRef();
	const quarterlyRef = useRef();
	const yearlyRef = useRef();
	const radioRefs = [monthlyRef, quarterlyRef, yearlyRef];

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
	const submitForm = (e) => {
		e.preventDefault();

		setError('');
		setSuccess('');

		setIsPending(true);
		// console.log(formData);

		purchasePlan(userId).then((data) => {
			setError(data.error);
			setSuccess(data.success);
			setIsPending(false);
			if (data?.response === 1) {
				setTimeout(() => {
					close();
				}, 1000);
			}
		});
	};

	return (
		<div className="fixed top-0 left-0 w-full h-screen overflow-auto flex-center bg-pattern bg-cover bg-fixed">
			<IconBoxWrapper
				icon={images.crown}
				title="Go Premium"
				title2="Get Unlimited Access"
				className=""
				skip={close}
			>
				<form
					onSubmit={(e) => submitForm(e)}
					className={`flex flex-col items-center justify-center w-full max-w-[350px] gap-5 ${
						isPending && 'pending'
					}`}
				>
					<div className="w-full space-y-2 py-[15px]">
						{pricing.map(({ freq, price }, i) => (
							<motion.button
								whileTap="tap"
								whileHover="hover"
								variants={variants.buttonClick}
								key={i}
								onClick={() => clickRadio(i)}
								className={`slide-animated-children flex-v-center w-full text-left border rounded-lg p-3 ${
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
									className={`w-[20px] h-[20px] max-w-[20px] min-w-[20px] border  p-[2px] rounded-full flex-center pointer-events-none ${
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
								<label
									htmlFor={freq}
									className="flex flex-col w-full pointer-events-none"
								>
									<p>
										<span className="text-[--black] font-semibold text-sm md:text-base">
											${price}
										</span>{' '}
										/month
									</p>
									<p className="capitalize">{freq} subscription</p>
								</label>
							</motion.button>
						))}
					</div>

					{error && <FormError message={error} center />}
					{success && <FormSuccess message={success} center />}

					<SubmitButton text="15 days free trial" submitting={isPending} />
					{/* <button onClick={() => submitForm()} className="btn-1">
						15 days free trial
					</button> */}
					<p className="text-[--black] p-0 w-full text-center">
						<Link href="/auth/settings" className="text-[--text]">
							Terms of Use | Privacy Policy
						</Link>
					</p>
				</form>
			</IconBoxWrapper>
		</div>
	);
}
