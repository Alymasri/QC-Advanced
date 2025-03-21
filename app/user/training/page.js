'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { HiOutlinePlusSm } from 'react-icons/hi';

import { images, icons } from '../../../constants';
import {
	TrainingCard,
	TrainingDetails,
	Loading,
	LoadingFailed,
	Empty,
} from '../../../components';
import { SidePopupWrapper, IconPopupWrapper } from '../../../wrappers';
import { SideNavIcons } from '../../../components/svgs';

// SERVER ACTIONS/COMPONENTS
import { getUserTrainingMaterials } from '@/actions/getTrainingMaterials';

const colors = ['#2d2d2b08', '#2d2d2b08', '#f5edc7'];

export default function Training() {
	const { data: session } = useSession();
	const userId = session?.user?.id;
	const [isLoading, setIsLoading] = useState(true); // The loading state of the training list
	const [successfullyLoaded, setSuccessfullyLoaded] = useState(false);
	const [trainingMaterialsList, setTrainingMaterialsList] = useState(); // For storing the training materials list information that would be placed on the dashboard
	const [overview, setOverview] = useState([]); // Overview data

	const [activeTraining, setActiveTraining] = useState();
	const [showDetails, setShowDetails] = useState(false);
	const [activeTrainingData, setActiveTrainingData] = useState();

	// useEffect(() => {
	// 	if (trainingMaterialsList && activeTraining) {
	// 		setActiveTrainingData(
	// 			trainingMaterialsList.filter((list) => {
	// 				return list.training_id === activeTraining;
	// 			})[0]
	// 		);
	// 		console.log(trainingMaterialsList);
	// 	}
	// }, [activeTraining, trainingMaterialsList]);

	useEffect(() => {
		getUserTrainingMaterials('user').then((data) => {
			setTrainingMaterialsList(data?.data?.data);
			setOverview([
				{
					label: 'Training Materials',
					value: data?.overview?.data?.no_of_training_materials,
				},
				{
					label: 'Training Materials Limit',
					value: '∞',
				},
				{
					label: 'Pending Actions',
					value: data?.overview?.data?.no_of_pending_actions,
				},
			]);
			setIsLoading(false);
			if (data?.data?.ResponseCode === 1) {
				setSuccessfullyLoaded(true);
			}
		});
	}, []);

	const showTrainingDetails = (i) => {
		setActiveTrainingData(trainingMaterialsList[i]);
		setShowDetails(true);
	};

	return isLoading ? (
		<Loading notFull />
	) : successfullyLoaded ? (
		<>
			<div className="md:p-10">
				<h1 className="h-[15vh] lg:h-auto flex-center text-center relative">
					Training <span className="md:hidden">Material</span>
				</h1>
				{/* OVERVIEW */}
				<div className="hidden lg:block w-full bg-white rounded-[--rounding] p-7 my-7">
					<div className="w-full h-full space-y-5">
						<div className="flex-v-center justify-between">
							<h1 className="text-[--black]">Overview</h1>
						</div>
						<div className="grid grid-cols-3 gap-5">
							{overview?.map(({ label, value }, i) => (
								<div
									key={i}
									className={`p-5 rounded-xl`}
									style={{ background: colors[i] }}
								>
									<SideNavIcons i={2} color={'#2d2d2b'} w={35} />
									<p className="text-[--black] !font-semibold pt-5 pb-1">
										{label}
									</p>
									<h1 className="text-[--brand]">{value}</h1>
								</div>
							))}
						</div>
					</div>
				</div>
				{/* DASHBOARD CONTENT */}
				<div className="dashboard-content-box">
					<div className="md:p-8 !pb-0">
						<div className="w-full flex justify-between items-center">
							<h2 className="hidden lg:block">Training Materials</h2>
						</div>
					</div>
					{trainingMaterialsList?.length > 0 ? (
						<>
							<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 px-4 py-5 md:pt-0  lg:p-8 lg:pt-5">
								{trainingMaterialsList?.map(
									({ title, description, training_id }, i) => (
										<TrainingCard
											key={i}
											title={title}
											text={
												description.length > 150
													? `${description.slice(0, 149)}...`
													: description
											}
											onClick={() => showTrainingDetails(i)}
										/>
									)
								)}
							</div>

							<div className="pb" />
						</>
					) : (
						<Empty text="No material added" />
					)}
				</div>

				{/* TRAINING DETAILS */}
				{showDetails && (
					<SidePopupWrapper
						close={() => setShowDetails(false)}
						title={activeTrainingData?.title}
						otherIcon={icons.download}
						otherFunc={() => window.open(activeTrainingData?.document)}
					>
						<TrainingDetails
							img={activeTrainingData?.image}
							text={activeTrainingData?.description}
							userId={userId}
							// title={trainings[activeTraining].title}
						/>
					</SidePopupWrapper>
				)}
			</div>
		</>
	) : (
		<LoadingFailed />
	);
}
