'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { images, icons } from '../../constants';
import { Button, FormError, FormSuccess } from '@/components';
import { IconPopupWrapper } from '../../wrappers';

import { deleteAccount } from '@/actions/userProfile';

const options = [
	'Lorem ipsum dolor sit amet',
	'Lorem ipsum dolor sit amet',
	'Lorem ipsum dolor sit amet',
	'Lorem ipsum dolor sit amet',
];

const DeleteAccount = () => {
	const [showOther, setShowOther] = useState(false);
	const [otherReason, setOtherReason] = useState('');
	const [reason, setReason] = useState(options[0]);
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [showDeletePrompt, setShowDeletePrompt] = useState(false);
	const [pendingDelete, setPendingDelete] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	const router = useRouter();

	const handleChangeInput = (e) => {
		const { name, value } = e.target;
		setReason(value);
		setOtherReason(value);
	};

	// DELETE ACCOUNT
	const requestDeleteAccount = () => {
		setError('');
		setSuccess('');
		setPendingDelete(true);

		deleteAccount(reason).then((data) => {
			setError(data.error);
			setSuccess(data.success);
			setPendingDelete(false);

			if (data?.response === 1) {
				setTimeout(() => {
					router.push('/');
				}, 1000);
			}
		});
	};

	return (
		<>
			<div>
				<h2>Choose a Reason</h2>
				<div className="flex flex-col gap-3 py-3">
					{options.map((option, i) => (
						// <Button
						// 	key={i}
						// 	onClick={() => {
						// 		setShowOther(false);
						// 		setReason(option);
						// 	}}
						// 	className={`px-4 py-2 rounded-lg border p text-left ${
						// 		!showOther && option === reason
						// 			? 'border-[--brand] text-[--brand]'
						// 			: 'border-[--gray] text-[--text]'
						// 	}`}
						// 	text={option}
						// />
						<button
							key={i}
							className={`px-4 py-2 rounded-lg border p text-left transition duration-700 ${
								!showOther && selectedIndex === i
									? 'border-[--brand] !text-[--brand]'
									: 'border-[--gray] text-[--text] hover:border-[--brand] hover:!text-[--brand]'
							}`}
							onClick={() => {
								setShowOther(false);
								setSelectedIndex(i);
								setReason(option);
							}}
						>
							{option}
						</button>
					))}
					<button
						onClick={() => {
							setShowOther(true);
							setSelectedIndex(-1);
							setReason(otherReason);
						}}
						className={`px-4 py-2 rounded-lg border p text-left transition duration-700 ${
							showOther
								? 'border-[--brand] !text-[--brand]'
								: 'border-[--gray] text-[--text] hover:border-[--brand] hover:!text-[--brand]'
						}`}
					>
						Other
					</button>

					{/* Other Textbox */}
					{showOther && (
						<div className="input-block">
							<div className="icon-input">
								<textarea
									name="reason"
									placeholder="Write your reason"
									value={otherReason}
									onChange={handleChangeInput}
									className="textare"
								/>
							</div>
						</div>
					)}
				</div>

				<div className="w-full pt-5">
					<Button
						text="Delete Account"
						onClick={() => setShowDeletePrompt(true)}
					/>
				</div>
			</div>
			{/* DELETE PROMPT */}
			{showDeletePrompt && (
				<IconPopupWrapper
					icon={
						success
							? images.congratulations
							: error
							? images.query
							: images.query
					}
					title={`Delete Account`}
					text={
						success
							? ''
							: ''
							? ''
							: `Are you sure you want to delete this account?`
					}
					smallIcon
					className={pendingDelete && 'pointer-events-none'}
				>
					<div
						className={`space-y-3 pt-3 w-full ${pendingDelete && 'pending'}`}
					>
						{error && <FormError message={error} />}
						{success && <FormSuccess message={success} />}

						<div className="grid grid-cols-2 gap-3 w-[80%] mx-auto">
							<Button
								onClick={() => setShowDeletePrompt(false)}
								text="no"
								noBg
							/>
							<Button
								onClick={() => requestDeleteAccount()}
								text="Yes"
								sm
								submitting={pendingDelete}
							/>
						</div>
					</div>
				</IconPopupWrapper>
			)}
		</>
	);
};

export default DeleteAccount;
