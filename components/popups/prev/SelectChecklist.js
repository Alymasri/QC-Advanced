'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { SidePopupWrapper } from '../../wrappers';
import { images, icons, variants } from '../../constants';
import {
	AddChecklist,
	MyChecklist,
	InputCheckbox,
	Button,
	FormError,
	FormSuccess,
} from '../../components';
import { checklistData } from '../../textData/checkListData';

// SERVER COMPONENT
import { addChecklist } from '@/config/addBusinessAndChecklist';

export default function SelectChecklist({ back, close, businessId, userId }) {
	const [pendingRequest, setPendingRequest] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const router = useRouter();

	const [checklist, setChecklist] = useState([...checklistData]);
	const [showAddChecklist, setShowAddChecklist] = useState(false);
	const [showMyChecklist, setShowMyChecklist] = useState(false);
	const [checklistId, setChecklistId] = useState(0);
	const [formData, setFormData] = useState(checklist);
	// console.log(businessId);
	useEffect(() => {
		setFormData(checklist);
	}, [checklist]);

	const editChecklist = (i) => {
		setChecklistId(i);
		setShowMyChecklist(true);
	};

	const submitForm = () => {
		const submitFormData = formData.filter((form) => form.selected === true);
		// console.log(submitFormData);
		setPendingRequest(true); // Start Loading

		addChecklist(submitFormData, userId, businessId).then((data) => {
			setError(data.error);
			setSuccess(data.success);

			if (data.response) {
				// setPendingRequest(false);
				setTimeout(() => {
					window.location.reload();
				}, 1000);
			}
		});
	};

	return (
		<SidePopupWrapper
			title="Select Checklist"
			close={close}
			// noBg
			otherIcon={icons.plus2}
			otherFunc={() => setShowAddChecklist(true)}
		>
			<div
				className={`h-full w-full py-5 px-4 lg:p-7 space-y-8 relative ${
					pendingRequest && 'pending'
				}`}
			>
				<div className={'space-y-3'}>
					{checklist.map(({ name, selected }, i) => (
						<InputCheckbox
							key={i}
							text={name}
							toggled={selected}
							toggle={() => {
								let newVal = checklist;
								newVal[i].selected = !newVal[i].selected;
								setChecklist(newVal);
							}}
							editChecklist={() => editChecklist(i)}
						/>
					))}
				</div>
				<div className="space-y-3 text-center">
					<p className="w-full bg-[--tag] border border-[--brand] px-5 py-2 rounded-lg black-text pointer-events-none">
						Use Our Template Checklist
					</p>
					<p className="w-full bg-[--tag] border border-[--brand] px-5 py-2 rounded-lg black-text pointer-events-none">
						Or upload your own Checklist
					</p>
					{error && <FormError message={error} />}
					{success && <FormSuccess message={success} />}
					<Button
						onClick={() => submitForm()}
						text="save"
						submitting={pendingRequest}
					/>
				</div>
				<div className="popup-pb" />
			</div>
			{showAddChecklist && (
				<AddChecklist
					close={() => setShowAddChecklist(false)}
					list={checklist}
					setChecklist={setChecklist}
				/>
			)}
			{showMyChecklist && (
				<MyChecklist
					close={() => setShowMyChecklist(false)}
					list={checklist}
					setChecklist={setChecklist}
					checklistId={checklistId}
				/>
			)}
		</SidePopupWrapper>
	);
}
