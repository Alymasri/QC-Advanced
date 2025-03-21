'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { RiEyeLine } from 'react-icons/ri';

import { images, icons } from '../../constants';
import {
	Tabs,
	ActionActivityCard,
	CommentTextBox,
	SelectInput,
	DateTimePicker,
	InputField,
	AddAction,
	Loading,
	LoadingFailed,
} from '../../components';

// SERVER COMPONENTE
import { getActionActivities } from '@/actions/getActions';

// const actionActivities = [
// 	{
// 		title: 'Coffee machine broken',
// 		createdBy: '',
// 		date: '2024-09-23T22:47:36.000000Z',
// 	},
// 	{
// 		title: 'Coffee machine repairs started',
// 		createdBy: '',
// 		date: '2024-09-23T22:47:36.000000Z',
// 	},
// ];

const ActionDetails = ({
	close,
	admin,
	userId,
	businessList,
	actionsList,
	assigneeList,
	setActionsList,
	activeAction,
	overview,
	setOverview,
}) => {
	// TAB VARIABLES
	const [activeTab, setActiveTab] = useState(0);
	// COMMENT VARIABLES
	const [comment, setComment] = useState('');
	const [isLoading, setIsLoading] = useState(true); // The loading state of the business Types list
	const [successfullyLoaded, setSuccessfullyLoaded] = useState(false);
	const [actionActivitiesList, setActionActivitiesList] = useState();

	useEffect(() => {
		getActionActivities(actionsList[activeAction].action_id).then((data) => {
			// console.log(data?.data?.data);
			if (data?.response === 1) {
				setActionActivitiesList(data?.data?.data);
				setSuccessfullyLoaded(true);
			}
			setIsLoading(false);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return isLoading ? (
		<Loading inner />
	) : successfullyLoaded ? (
		<>
			<div className="h-full w-full py-5 px-4 lg:p-7 space-y-8">
				<div className="lg:mt-[-10px] mb-[-15px]">
					<Tabs
						tabs={['details', 'activities']}
						active={activeTab}
						onClick={setActiveTab}
					/>
				</div>
				{activeTab === 0 ? (
					<div className="space-y-8">
						<AddAction
							actionsList={actionsList}
							setActionsList={setActionsList}
							businessList={businessList}
							initialValues={actionsList[activeAction]}
							edit
							activeAction={activeAction}
							admin={admin}
							assigneeList={assigneeList}
							overview={overview}
							setOverview={setOverview}
						/>

						<div className="flex flex-col items-center text-center gap-1">
							<p className="font-medium">Inspection Of</p>
							<p className="black-text">
								{actionsList[activeAction].business_dtl.business_name} /{' '}
								{new Date(
									actionsList[activeAction].due_date
								).toLocaleDateString(undefined, {
									year: 'numeric',
									month: 'long',
									day: 'numeric',
								})}
							</p>
							{/* <p className="text-[--brand] font-semibold flex gap-1 items-center pt-2">
								<RiEyeLine className="text-lg" /> View Report
							</p> */}
						</div>
					</div>
				) : (
					<div className="w-full space-y-4 pt-2">
						{actionActivitiesList.map((activity, i) => (
							<ActionActivityCard
								key={i}
								title={activity.msg}
								msg={activity.msg}
								date={activity.created_at}
								createdBy={
									activity.user_dtl.username || admin ? 'You' : 'Admin'
								}
								img={activity.media}
							/>
						))}
						{/* <div className="popup-pb" /> */}
						<div className="h-[75px]" />
						{/* ! Text Box */}
						<CommentTextBox
							actionId={actionsList[activeAction].action_id}
							actionActivitiesList={actionActivitiesList}
							setActionActivitiesList={setActionActivitiesList}
							userId={userId}
						/>
					</div>
				)}
				<div className="popup-pb" />
			</div>
		</>
	) : (
		<LoadingFailed />
	);
};

export default ActionDetails;
