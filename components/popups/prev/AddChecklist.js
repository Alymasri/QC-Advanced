'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { images, icons } from '../../constants';
import { SidePopupWrapper } from '../../wrappers';
import { AnimatePresence } from 'framer-motion';

import {
	SelectInput,
	DateTimePicker,
	InputField,
	SubChecklist,
	FormError,
} from '../../components';

const AddChecklist = ({ close, list, setChecklist }) => {
	const [checklistData, setChecklistData] = useState({
		name: '',
		assignee_id: '',
		sub_checklist: [],
	});

	const { checklist, assignee, subChecklist } = checklistData;

	const [showErrorMessage, setShowErrorMessage] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	// FORM FUNCTIONS
	const addChecklist = () => {
		if (!checklistData.name) {
			setErrorMessage('Enter Checklist Name');
			setShowErrorMessage(true);
			setTimeout(() => {
				setShowErrorMessage(false);
			}, 2000);
		} else if (errorMessage.length > 0) {
			setShowErrorMessage(true);
			setTimeout(() => {
				setShowErrorMessage(false);
			}, 2000);
		} else {
			let newData = [...list];
			newData.push({ ...checklistData, selected: true });
			setChecklist(newData);
			close();
		}
	};

	return (
		<SidePopupWrapper title="Add Checklist" close={close} noBg>
			<div className={'h-full w-full py-5 px-4 lg:p-7 space-y-8 relative'}>
				<div className="w-full space-y-4">
					{/* Checklist */}
					<InputField
						icon={icons.category}
						label="Checklist"
						type="text"
						placeholder="Name your checklist"
						formData={checklistData}
						setFormData={setChecklistData}
						nameValue="name"
					/>

					{/* Assignee */}
					<SelectInput
						label="Assignee"
						placeholder="Choose Assignee"
						options={['Low', 'Medium', 'High']}
						valueName="assignee_id"
						setFormData={setChecklistData}
						formData={checklistData}
						darkBg
					/>
					<SubChecklist
						setErrorMessage={setErrorMessage}
						formData={checklistData}
						setFormData={setChecklistData}
						nameValue="sub_checklist"
					/>
				</div>
				<div className="w-full">
					<button onClick={() => addChecklist()} className="btn-1 block">
						add
					</button>
				</div>
				<div className="popup-pb" />
				<AnimatePresence>
					{showErrorMessage && (
						<div className="fixed right-0 bottom-[20px] lg:top-[70px] w-full md:w-[--sidebar] px-4 lg:px-7 pointer-events-none">
							{/* <div className="bg-[--white] w-full"> */}
							<FormError message={errorMessage} />
							{/* </div> */}
						</div>
					)}
				</AnimatePresence>
			</div>
		</SidePopupWrapper>
	);
};

export default AddChecklist;
