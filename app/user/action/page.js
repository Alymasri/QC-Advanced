'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { HiOutlinePlusSm } from 'react-icons/hi';
import { RiGlassesLine } from 'react-icons/ri';

import { images, icons } from '../../../constants';
import {
	ActionCard,
	AddAction,
	ActionDetails,
	Loading,
	LoadingFailed,
	Empty,
	Button,
	FormError,
	FormSuccess,
} from '../../../components';
import {
	SidePopupWrapper,
	TitlePopupWrapper,
	IconPopupWrapper,
} from '../../../wrappers';
import { SideNavIcons } from '../../../components/svgs';

import { getActionsUser, deleteAction } from '@/actions/getActions';

const colors = ['#2d2d2b08', '#2d2d2b08', '#f5edc7'];
const tags = ['all', 'due soon', 'exceeded due date'];

export default function Action() {
	const [isLoading, setIsLoading] = useState(true); // The loading state of getActions
	const [successfullyLoaded, setSuccessfullyLoaded] = useState(false);
	const [actionsList, setActionsList] = useState(); // For storing the actions list information that would be placed on the dashboard
	const [assigneeList, setAssigneeList] = useState();
	const [overview, setOverview] = useState([]); // Overview data
	const { data: session } = useSession();
	const userId = session?.user?.id;
	const [pendingDelete, setPendingDelete] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [showDelete, setShowDelete] = useState(false);

	const [activeAction, setActiveAction] = useState(0);
	const [addAction, setAddAction] = useState(false);
	const [showDetails, setShowDetails] = useState(false);

	// Filters
	const [filter, setFilter] = useState(tags[0]);
	const [filteredActionsList, setFilteredActionsList] = useState();

	useEffect(() => {
		getActionsUser().then((data) => {
			// console.log(data?.businessList);
			console.log(data);
			setActionsList(data?.data?.data);
			setFilteredActionsList(data?.data?.data);

			let assignees = data?.assignees?.data?.filter(
				(val) => val.user_type !== 'admin'
			);
			setAssigneeList(assignees);

			setOverview([
				{
					label: 'Pending Actions',
					value: data?.overview?.data?.no_of_pending_actions,
				},
				{
					label: 'Due Soon',
					value: data?.overview?.data?.no_of_action_due_soon,
				},
				{
					label: 'Exceeded Due Date',
					value: data?.overview?.data?.no_of_actions_exceeded_due_date,
				},
			]);
			setIsLoading(false);
			if (data?.data?.ResponseCode === 1) {
				setSuccessfullyLoaded(true);
			}
		});
	}, []);

	useEffect(() => {
		// let due = new Date(due_date);
		// let now = new Date();
		// let diff_mins = Math.round(diff_time / (1000 * 60));
		// console.log(actionsList);

		if (actionsList) {
			let prevList = [...actionsList];

			if (filter === tags[0]) {
				setFilteredActionsList(actionsList);
			}
			// due_soon
			else if (filter === tags[1]) {
				let newList = prevList.filter((list) => {
					return (
						Math.round(
							(new Date(list.due_date).getTime() - new Date().getTime()) /
								(1000 * 60)
						) > 0
					);
				});
				setFilteredActionsList(newList);
			}
			// Exceeded due_date
			else if (filter === tags[2]) {
				let newList = prevList.filter((list) => {
					return (
						Math.round(
							(new Date(list.due_date).getTime() - new Date().getTime()) /
								(1000 * 60)
						) < 0
					);
				});
				setFilteredActionsList(newList);
			} else {
				setFilteredActionsList(actionsList);
			}
		}
	}, [actionsList, filter]);

	const showActionDetails = (i) => {
		setActiveAction(i);
		setShowDetails(true);
	};

	const deleteSelectedAction = () => {
		setError('');
		setSuccess('');
		setPendingDelete(true);

		let active_action_id = actionsList[activeAction].action_id;

		deleteAction(active_action_id).then((data) => {
			setError(data.error);
			setSuccess(data.success);
			setPendingDelete(false);
			if (data?.response === 1) {
				setShowDetails(false);
				let newActionsList = actionsList.filter((list) => {
					return list.action_id !== active_action_id;
				});

				let prevOverview = overview;
				prevOverview[0].value = overview[0].value - 1;
				prevOverview[1].value = overview[1].value - 1;
				setOverview(prevOverview);

				setActionsList(newActionsList);
				setTimeout(() => {
					setShowDetails(false);
					setShowDelete(false);
				}, 1000);
			}
		});
	};

	return isLoading ? (
		<Loading notFull />
	) : successfullyLoaded ? (
		<>
			<div className="md:p-10">
				<h1 className="h-[15vh] lg:h-auto flex-center text-center">Actions</h1>
				{/* OVERVIEW */}
				<div className="hidden lg:block min-h-[250px] w-full bg-white rounded-[--rounding] p-7 my-7">
					<div className="w-full h-full space-y-5">
						<div className="flex-v-center justify-between">
							<h1 className="text-[--black]">Overview</h1>

							<button
								onClick={() => setAddAction(true)}
								className="btn-1 gap-2 flex items-center justify-center shadow-md !shadow-[#00000044]  !w-auto"
							>
								<HiOutlinePlusSm className="text-[--white] text-3xl md:text-xl" />
								<span className="pr-1 hidden lg:block">Add Action</span>
							</button>
						</div>
						<div className="grid grid-cols-3 gap-5">
							{overview?.map(({ label, value }, i) => (
								<div
									key={i}
									className={`p-5 rounded-xl`}
									style={{ background: colors[i] }}
								>
									<SideNavIcons i={1} color={'#2d2d2b'} w={35} />
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
						<div>
							<button
								onClick={() => setAddAction(true)}
								className="fixed bottom-[100px] right-4 md:right-12 !w-[60px] h-[60px] md:!w-[70px] md:h-[70px] btn-1 !rounded-full gap-2 flex items-center justify-center !shadow-xl md:!shadow-md !shadow-[#00000044] lg:hidden"
							>
								<HiOutlinePlusSm className="text-[--white] text-3xl md:text-3xl" />
							</button>
							<h2 className="hidden lg:block">Pending Actions</h2>
							<div className="hidden lg:flex items-center gap-2 pt-3">
								{tags.map((tag, i) => (
									<button
										key={i}
										className={
											filter === tag
												? 'tag !border-[--brand] !text-[--brand]'
												: 'tag'
										}
										type="button"
										onClick={() => setFilter(tag)}
									>
										{tag}
									</button>
								))}
							</div>
						</div>
					</div>
					{filteredActionsList.length > 0 ? (
						<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 px-4 py-5 md:pt-0  lg:p-8 lg:pt-5">
							{filteredActionsList?.map(
								(
									{
										desc,
										title,
										asignee_dtl,
										business_dtl,
										to_do_list,
										due_date,
									},
									i
								) => (
									<ActionCard
										key={i}
										title={title}
										time={'5 days'}
										due_date={due_date}
										assignee={asignee_dtl ? asignee_dtl.username : 'unassigned'}
										businessName={business_dtl.business_name}
										businessId={business_dtl.business_id}
										tag={to_do_list}
										onClick={() => showActionDetails(i)}
									/>
								)
							)}
						</div>
					) : (
						<Empty text="No action assigned to you." />
					)}

					<div className="pb" />
				</div>
				{addAction && (
					<SidePopupWrapper
						close={() => setAddAction(false)}
						title="Add Action"
					>
						<AddAction
							close={() => setAddAction(false)}
							actionsList={actionsList}
							setActionsList={setActionsList}
							assigneeList={assigneeList}
							overview={overview}
							setOverview={setOverview}
						/>
					</SidePopupWrapper>
				)}
				{showDetails && (
					<SidePopupWrapper
						close={() => setShowDetails(false)}
						title=""
						otherIcon={icons.deleteRed}
						otherFunc={() => setShowDelete(true)}
					>
						<ActionDetails
							close={() => setAddAction(false)}
							userId={userId}
							actionsList={actionsList}
							setActionsList={setActionsList}
							activeAction={activeAction}
							assigneeList={assigneeList}
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
						title={`Delete Action?`}
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
										Are you sure you want to delete
										<i className="text-[--brand]">
											{actionsList[activeAction].title}
										</i>
									</span>
								)}
							</p>

							{error && <FormError message={error} center />}
							{success && <FormSuccess message={success} center />}

							<div className="w-full grid grid-cols-2 gap-4 lg:gap-5">
								<Button onClick={() => setShowDelete(false)} noBg text="no" />
								<Button
									onClick={() => deleteSelectedAction()}
									text="yes"
									submitting={pendingDelete}
									sm
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
