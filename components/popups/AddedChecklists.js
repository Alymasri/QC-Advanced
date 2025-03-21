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
	SelectChecklist,
	InputCheckbox,
	Button,
	FormError,
	FormSuccess,
	Loading,
	LoadingFailed,
	Empty,
} from '../../components';
import { checklistData } from '../../textData/checkListData';

// SERVER COMPONENT
// import { addChecklist } from '@/config/addBusinessAndChecklist';
import { getListOfChecklist } from '@/actions/getChecklist';

export default function AddedChecklists({
	back,
	close,
	businessId,
	userId,
	inspection,
}) {
	const router = useRouter();

	const [isLoading, setIsLoading] = useState(true);
	const [successfullyLoaded, setSuccessfullyLoaded] = useState();
	const [checklist, setChecklist] = useState();
	const [showSelectChecklist, setShowSelectChecklist] = useState(false);
	const [showAddChecklist, setShowAddChecklist] = useState(false);
	const [showMyChecklist, setShowMyChecklist] = useState(false);
	const [checklistId, setChecklistId] = useState(0);

	const getChecklistData = () => {
		setIsLoading(true);
		setSuccessfullyLoaded(false);
		getListOfChecklist(businessId, 'unarchive').then((data) => {
			// console.log(data);
			setChecklist(data?.checklist?.data?.checklist_data);
			if (data?.response === 1) {
				setSuccessfullyLoaded(true);
			}
			setIsLoading(false);
		});
	};

	useEffect(() => {
		getChecklistData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const editChecklist = (business_checklist_id) => {
		setChecklistId(business_checklist_id);
		setShowMyChecklist(true);
	};

	return (
		<SidePopupWrapper
			title="Select Checklist"
			close={close}
			noBg={inspection}
			otherIcon={icons.plus2}
			otherFunc={() => setShowAddChecklist(true)}
		>
			{isLoading ? (
				<Loading inner />
			) : successfullyLoaded ? (
				<>
					<div className={`h-full w-full py-5 px-4 lg:p-7 space-y-8 relative`}>
						<div className={'space-y-3'}>
							{checklist.length > 0 ? (
								checklist.map(({ name, business_checklist_id }, i) => (
									<Button
										key={i}
										text={name}
										className="w-full btn-2 !text-left !capitalize"
										onClick={() => editChecklist(business_checklist_id)}
									/>
								))
							) : (
								<Empty text="No Checklist Added, use our template checklist or upload your own checklist" />
							)}
						</div>
						<div className="space-y-3 text-center">
							<Button
								onClick={() => setShowSelectChecklist(true)}
								text="Use Our Template Checklist"
								className="w-full bg-[--light-brand] border border-[--brand] px-5 py-2 rounded-lg black-text"
							/>
							<Button
								onClick={() => setShowAddChecklist(true)}
								text="Upload your own Checklist"
								className="w-full bg-[--light-brand] border border-[--brand] px-5 py-2 rounded-lg black-text"
							/>

							<Button
								onClick={() => {
									// router.refresh();
									close();
								}}
								text="done"
							/>
						</div>
						<div className="popup-pb" />
					</div>

					{/* SELECT FROM TEMPLATE CHECKLIST */}
					{showSelectChecklist && (
						<SelectChecklist
							close={() => {
								getChecklistData();
								setShowSelectChecklist(false);
							}}
							list={checklist}
							setChecklist={setChecklist}
							inspection={inspection}
							businessId={businessId}
						/>
					)}

					{showAddChecklist && (
						<AddChecklist
							close={() => {
								getChecklistData();
								setShowAddChecklist(false);
							}}
							list={checklist}
							setChecklist={setChecklist}
							businessId={businessId}
							userId={userId}
						/>
					)}
					{showMyChecklist && (
						<MyChecklist
							close={() => {
								getChecklistData();
								setShowMyChecklist(false);
							}}
							list={checklist}
							checklistId={checklistId}
							businessId={businessId}
							userId={userId}
						/>
					)}
				</>
			) : (
				<LoadingFailed />
			)}
		</SidePopupWrapper>
	);
}
