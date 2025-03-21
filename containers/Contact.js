'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	useAnimate,
	usePresence,
	stagger,
	useInView,
	motion,
} from 'framer-motion';

import { SectionBlock, InputFieldRHF, SubmitButton } from '@/components';
import { slideInBottom2 } from '@/constants/variants';
import { icons, variants } from '@/constants';
import { contactData } from '@/textData/landingPageData';

// SERVER COMPONENTE
import { LandingPageContactUsSchema } from '@/schemas';

const Contact = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
	} = useForm({
		resolver: zodResolver(LandingPageContactUsSchema),
	});

	const onSubmit = (values) => {
		// console.log(values);
	};

	// ANIMATION
	const [scope, animate] = useAnimate();
	const isInView = useInView(scope, {
		margin: '0px 150px -50px 0px',
	});
	const [isPresent, safeToRemove] = usePresence();
	useEffect(() => {
		if (isInView) {
			const enterAnimation = async () => {
				animate(
					'.slide-animated-children',
					{
						opacity: [0, 1],
						x: [50, 0],
					},
					{ delay: stagger(0.05), type: 'spring', duration: 1, bounce: 0.5 }
				);
			};
			enterAnimation();
		} else {
			const exitAnimation = async () => {
				animate(
					'.slide-animated-children',
					{
						opacity: [1, 0],
						x: [0, 50],
					},
					{ delay: stagger(0.015), type: 'spring', duration: 0.5, bounce: 0.3 }
				);
			};

			exitAnimation();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isInView]);

	return (
		<div id="contact" className="bg-[--black] overflow-hidden">
			<div className="container py-[50px] lg:py-[80px] grid grid-cols-1 lg:grid-cols-2 lg:items-center gap-5 md:gap-7 lg:gap-[80px]">
				<div>
					<div className="flex-center lg:!justify-start">
						<SectionBlock
							tag="Our Solutions"
							heading="Get in Touch with us"
							text="Ready to elevate your restaurant's quality control? Contact us today to learn more about how QC Advanced can transform your operations.Integration, Expert Guidance  and Continuous Improvement."
							wrapperClasses="max-w-[525px] items-center text-center lg:items-start lg:text-left"
							makeWhite
						/>
					</div>
					<motion.div
						initial="initial"
						exit="exit"
						whileInView="animate"
						transition={{ staggerChildren: 0.2 }}
						className="flex gap-3 lg:gap-7 flex-wrap pt-5 lg:pt-7"
					>
						{contactData.map((dtl, i) => (
							<motion.div key={i} variants={variants.slideInBottom2}>
								<Link
									key={i}
									href={dtl.link}
									className="flex items-center gap-3"
								>
									<div className="rounded-full overflow-hidden bg-[--brand] p-3 w-[40px] h-[40px] min-w-[40px] max-w-[40px] flex-center">
										<Image
											src={dtl.icon}
											width={30}
											height={30}
											alt={dtl.text}
										/>
									</div>
									<div className="">
										<p className="text-[--white]">{dtl.text}</p>
										<p className="text-white/50">{dtl.desc}</p>
									</div>
								</Link>
							</motion.div>
						))}
					</motion.div>
				</div>
				<div>
					{/* <h2 className="text-[--white]">Drop us a message</h2>
					<p>We will get back to you as soon as possible.</p> */}
					<form
						onSubmit={handleSubmit((d) => onSubmit(d))}
						className="space-y-5"
					>
						<div
							ref={scope}
							className="grid grid-cols-1 md:grid-cols-2 w-full gap-3 py-5"
						>
							{/* First Name */}
							<InputFieldRHF
								label="Name"
								// icon={icons.user1}
								type="text"
								placeholder="John Doe"
								rhf={{ ...register('name') }}
								error={errors.name?.message}
								landing
							/>
							{/* Email */}
							<InputFieldRHF
								label="Email"
								// icon={icons.envelope}
								type="mail"
								placeholder="user@mail.com"
								rhf={{ ...register('email') }}
								error={errors.email?.message}
								landing
							/>
							{/* Subject */}
							<InputFieldRHF
								label="Subject"
								// icon={icons.details}
								type="text"
								placeholder="Subject"
								rhf={{ ...register('subject') }}
								error={errors.subject?.message}
								additionalClassName="md:col-span-2"
								landing
							/>
							{/* Message */}
							<InputFieldRHF
								label="Message"
								// icon={icons.location}
								type="textarea"
								placeholder="Enter your Message"
								rhf={{ ...register('msg') }}
								error={errors.msg?.message}
								additionalClassName="md:col-span-2"
								landing
							/>
						</div>
						<SubmitButton />
					</form>
				</div>
			</div>
		</div>
	);
};

export default Contact;
