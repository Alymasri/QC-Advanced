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
	TrainingMaterial,
	Loading,
	LoadingFailed,
	Empty,
	Button,
	FormError,
	FormSuccess,
} from '../../../components';
import { SidePopupWrapper, IconPopupWrapper } from '../../../wrappers';
import { SideNavIcons } from '../../../components/svgs';

// SERVER ACTIONS/COMPONENTS
import { getTrainingMaterials } from '@/actions/getTrainingMaterials';
import { deleteTrainingMaterial } from '@/config/addTrainingMaterials';

const colors = ['#2d2d2b08', '#2d2d2b08', '#f5edc7'];
const tags = ['all', 'due soon', 'exceeded due date'];

export default function Training() {
	const { data: session } = useSession();
	const userId = session?.user?.id;
	const [isLoading, setIsLoading] = useState(true); // The loading state of the training list
	const [successfullyLoaded, setSuccessfullyLoaded] = useState(false);
	const [trainingMaterialsList, setTrainingMaterialsList] = useState(); // For storing the training materials list information that would be placed on the dashboard
	const [businessList, setBusinessList] = useState();
	const [overview, setOverview] = useState([]); // Overview data
	const [pendingDelete, setPendingDelete] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	const [activeTraining, setActiveTraining] = useState();
	const [showDetails, setShowDetails] = useState(false);
	const [showEdit, setShowEdit] = useState(false);
	const [showDelete, setShowDelete] = useState(false);
	const [showAddMaterial, setShowAddMaterial] = useState(false);
	const [activeTrainingData, setActiveTrainingData] = useState();
	const [showNoDocument, setShowNoDocument] = useState(false);

	useEffect(() => {
		if (trainingMaterialsList && activeTraining) {
			setActiveTrainingData(
				trainingMaterialsList?.filter((list) => {
					return list.training_id === activeTraining;
				})[0]
			);
			// console.log(trainingMaterialsList);
		}
	}, [activeTraining, trainingMaterialsList]);

	useEffect(() => {
		getTrainingMaterials().then((data) => {
			setTrainingMaterialsList(data?.data?.data);
			setBusinessList(data?.businessList?.data);
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
					label: 'Businesses',
					value: data?.overview?.data?.no_of_business,
				},
			]);
			if (data?.data?.ResponseCode === 1) {
				setIsLoading(false);
				setSuccessfullyLoaded(true);
			} else {
				setIsLoading(false);
			}
		});
	}, []);

	const showTrainingDetails = (id) => {
		setActiveTraining(id);
		setShowDetails(true);
	};

	const showEditTraining = (id) => {
		setActiveTraining(id);
		setShowEdit(true);
	};

	const promptDeleteMaterial = (id) => {
		setError('');
		setSuccess('');
		setActiveTraining(id);
		setShowDelete(true);
	};

	const deleteActiveMaterial = () => {
		// console.log(userId, activeTraining);
		setError('');
		setSuccess('');
		setPendingDelete(true);

		deleteTrainingMaterial(userId, activeTraining).then((data) => {
			setError(data.error);
			setSuccess(data.success);

			if (data?.response === 1) {
				let newTrainingMaterialsList = trainingMaterialsList.filter((list) => {
					return list.training_id !== activeTraining;
				});
				setTrainingMaterialsList(newTrainingMaterialsList);

				let newOverview = overview;
				newOverview[0].value = overview[0].value - 1;
				setOverview(newOverview);

				setPendingDelete(false);
				setShowDelete(false);
			} else {
				setPendingDelete(false);
			}
		});
	};

	return isLoading ? (
		<Loading notFull />
	) : successfullyLoaded ? (
		<>
			<div className="md:p-10">
				<h1 className="h-[15vh] lg:h-auto flex-center text-center relative">
					Training <span className="md:hidden">Material</span>
					<button
						onClick={() => setShowAddMaterial(true)}
						className="md:hidden bg-[--white] !w-[35px] h-[35px] absolute right-4 rounded-full flex-center"
					>
						<Image
							src={icons.plus2}
							alt="Add Training Material"
							className="w-[15px]"
						/>
					</button>
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
							<div className="hidden lg:block">
								<Button
									onClick={() => setShowAddMaterial(true)}
									icon={
										<HiOutlinePlusSm className="text-[--white] text-3xl md:text-xl" />
									}
									text="Add Training"
								/>
							</div>
							{/* <button
								onClick={() => setShowAddMaterial(true)}
								className="btn-1 gap-2 hidden lg:flex items-center justify-center shadow-md !shadow-[#00000044]  !w-auto"
							>
								<span className="pr-1 hidden lg:block">Add Material</span>
								<HiOutlinePlusSm className="text-[--white] text-3xl md:text-xl" />
							</button> */}
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
											onClick={() => showTrainingDetails(training_id)}
											admin
											remove={() => promptDeleteMaterial(training_id)}
											edit={() => showEditTraining(training_id)}
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

				{showDetails && (
					<SidePopupWrapper
						close={() => setShowDetails(false)}
						title={activeTrainingData?.title}
						otherIcon={icons.download}
						otherFunc={() => {
							if (activeTrainingData?.document) {
								window.open(activeTrainingData?.document);
							} else {
								setShowNoDocument(true);
							}
						}}
					>
						<TrainingDetails
							img={activeTrainingData?.image}
							text={activeTrainingData?.description}
							userId={userId}
							// title={trainings[activeTraining].title}
						/>
					</SidePopupWrapper>
				)}

				{showEdit && (
					<SidePopupWrapper
						close={() => setShowEdit(false)}
						title="Edit Material"
					>
						<TrainingMaterial
							close={() => setShowEdit(false)}
							className=""
							edit
							initialValues={activeTrainingData}
							editId={activeTraining}
							userId={userId}
							businessList={businessList}
							trainingMaterialsList={trainingMaterialsList}
							setTrainingMaterialsList={setTrainingMaterialsList}
						/>
					</SidePopupWrapper>
				)}
				{showAddMaterial && (
					<SidePopupWrapper
						close={() => setShowAddMaterial(false)}
						title="Add Material"
					>
						<TrainingMaterial
							close={() => setShowAddMaterial(false)}
							className=""
							userId={userId}
							businessList={businessList}
							trainingMaterialsList={trainingMaterialsList}
							setTrainingMaterialsList={setTrainingMaterialsList}
							overview={overview}
							setOverview={setOverview}
						/>
					</SidePopupWrapper>
				)}
				{showDelete && (
					<IconPopupWrapper
						icon={
							success
								? images.congratulations
								: error
								? images.query
								: images.query
						}
						title={`Delete Training Material`}
						smallIcon
						className={pendingDelete && 'pointer-events-none'}
						darkBg
					>
						<div
							className={`space-y-3 text-center pt-3 w-full ${
								pendingDelete && 'pending'
							}`}
						>
							<p>
								{success ? (
									''
								) : error ? (
									''
								) : (
									<span>
										Are you sure you want to delete{' '}
										<i className="text-[--brand]">
											{activeTrainingData?.title}
										</i>
									</span>
								)}
							</p>

							{error && <FormError message={error} center />}
							{success && <FormSuccess message={success} center />}

							<div className="w-full grid grid-cols-2 gap-4 lg:gap-5">
								<Button onClick={() => setShowDelete(false)} noBg text="no" />
								<Button
									onClick={() => deleteActiveMaterial()}
									text="yes"
									submitting={pendingDelete}
									sm
								/>
							</div>
						</div>
					</IconPopupWrapper>
				)}

				{showNoDocument && (
					<IconPopupWrapper
						icon={images.query}
						title={`No Document`}
						smallIcon
						darkBg
					>
						<div className={`space-y-3 text-center pt-3 w-full`}>
							<p>No tutorial document to download</p>

							{error && <FormError message={error} center />}
							{success && <FormSuccess message={success} center />}

							<div className="w-full grid grid-cols-2 gap-4 lg:gap-5">
								<Button
									onClick={() => setShowNoDocument(false)}
									noBg
									text="ok"
								/>
							</div>
						</div>
					</IconPopupWrapper>
				)}
			</div>
		</>
	) : (
		<LoadingFailed />
	);
}
