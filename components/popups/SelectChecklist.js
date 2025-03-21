'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { SidePopupWrapper } from '../../wrappers';
import { images, icons, variants } from '../../constants';
import {
	AddChecklist,
	MyChecklist,
	InputCheckbox,
	Button,
	FormError,
	FormSuccess,
	Loading,
	LoadingFailed,
} from '../../components';
import { checklistData } from '../../textData/checkListData';

// SERVER COMPONENT
import {
	getTemplateChecklist,
	importTemplateChecklist,
} from '@/actions/getChecklist';

export default function SelectChecklist({
	back,
	close,
	businessId,
	userId,
	inspection,
}) {
	const [isLoading, setIsLoading] = useState(true);
	const [successfullyLoaded, setSuccessfullyLoaded] = useState();
	const [showQuestions, setShowQuestions] = useState(-1);

	const [isPending, setIsPending] = useState();
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	const [selected, setSelected] = useState();
	const [checklist, setChecklist] = useState();
	const [acmIds, setAcmIds] = useState();
	// console.log(businessId);

	useEffect(() => {
		getTemplateChecklist().then((data) => {
			// console.log(data);
			setChecklist(data?.checklist?.data);
			setSelected(new Array(data?.checklist?.data.length).fill(false));
			setIsLoading(false);
			if (data?.response === 1) {
				setSuccessfullyLoaded(true);
			}
		});
	}, []);

	const submitForm = () => {
		let acmIds = [];
		selected.map((val, i) => {
			if (val) {
				acmIds.push(checklist[i].acm_id);
			}
		});

		// console.log(businessId);

		setSuccess('');
		setError('');
		setIsPending(true);

		importTemplateChecklist(businessId, acmIds).then((data) => {
			// console.log(data);
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
		<SidePopupWrapper title="Select Checklist" close={close} noBg>
			{isLoading ? (
				<Loading inner />
			) : successfullyLoaded ? (
				<>
					<div
						className={`h-full w-full py-5 px-4 lg:p-7 space-y-8 relative ${
							isPending && 'pending'
						}`}
					>
						<div className={'space-y-3'}>
							{checklist &&
								checklist.map(({ name, sub_checklist_dtl }, i) => (
									<InputCheckbox
										key={i}
										name={name}
										questions={sub_checklist_dtl}
										toggled={selected[i]}
										toggle={() => {
											let newVal = selected;
											newVal[i] = !newVal[i];
											setSelected(newVal);
										}}
										showQuestions={showQuestions === i}
										setShowQuestions={
											showQuestions === i
												? () => setShowQuestions(-1)
												: () => setShowQuestions(i)
										}
									/>
								))}
						</div>
						<div className="space-y-3 text-center">
							{error && <FormError message={error} />}
							{success && <FormSuccess message={success} />}
							<Button
								onClick={() => submitForm()}
								text="add"
								submitting={isPending}
							/>
						</div>
						<div className="popup-pb" />
					</div>
				</>
			) : (
				<LoadingFailed />
			)}
		</SidePopupWrapper>
	);
}
