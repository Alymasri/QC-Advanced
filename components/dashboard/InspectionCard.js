'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { RiGlassesLine } from 'react-icons/ri';
import {
	motion,
	useMotionValue,
	useTransform,
	useSpring,
	useAnimate,
} from 'framer-motion';
import { FormError, FormSuccess } from '../../components';
import { icons } from '../../constants';

// SERVER COMPONENT
import { archiveToggleChecklist } from '@/config/addBusinessAndChecklist';

const InspectionCard = ({
	inspectionContent,
	title,
	percentage,
	completed,
	total,
	toggled,
	business_checklist_id,
	onClick,
	sidebar,
	archived,
	userId,
	archiveList,
	setArchiveList,
	inspectionData,
	setInspectionData,
}) => {
	const [isPending, setIsPending] = useState();
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const dragRef = useRef();

	const [scope, animate] = useAnimate();
	const x = useMotionValue(0);

	const scaleNormal = useTransform(x, [0, -30], [0, 1]);
	const scale = useSpring(scaleNormal);

	const opacityNormal = useTransform(x, [0, -50], [0, 1]);
	const opacity = useSpring(opacityNormal);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dragRef.current && !dragRef.current.contains(event.target)) {
				animate(dragRef.current, { x: 0 });
			}
		};

		document.addEventListener('click', handleClickOutside, true);

		return () => {
			document.removeEventListener('click', handleClickOutside, true);
		};
	}, []);

	const doArchiveUnarchive = (type) => {
		setError('');
		setSuccess('');

		setIsPending(true);

		// console.log(values);

		archiveToggleChecklist(userId, business_checklist_id, type).then((data) => {
			setIsPending(false);
			setError(data.error);
			setSuccess(data.success);
			// console.log(data);

			if (data.success) {
				if (archived) {
					setInspectionData([inspectionContent, ...inspectionData]);

					let newArchiveList = archiveList.filter((list) => {
						return (
							list.business_checklist_id !==
							inspectionContent.business_checklist_id
						);
					});
					setArchiveList(newArchiveList);
				} else {
					setArchiveList([inspectionContent, ...archiveList]);

					let newInspectionData = inspectionData.filter((list) => {
						return (
							list.business_checklist_id !==
							inspectionContent.business_checklist_id
						);
					});
					setInspectionData(newInspectionData);
				}
			}
		});
	};

	const archiveUnarchive = () => {
		if (archived) {
			doArchiveUnarchive('unarchive');
		} else {
			doArchiveUnarchive('archive');
		}
	};

	return (
		<div ref={scope} className={`w-full relative ${isPending && 'pending'}`}>
			<motion.div
				ref={dragRef}
				drag="x"
				style={{ x }}
				dragConstraints={{
					left: sidebar ? -50 : 0,
					right: 0,
					top: 0,
					bottom: 0,
				}}
				whileHover={{ x: sidebar ? -50 : 0 }}
				transition={{ type: 'spring', duration: 1 }}
				dragElastic={sidebar ? 0.1 : 0}
				className={`slide-animated-children flex justify-between items-center w-full bg-[--card] border border-[--border] rounded-lg gap-4 relatives ${
					sidebar ? '' : 'lg:flex-col lg:items-start lg:p-[14px]'
				}`}
			>
				<div
					className={`hidden items-center justify-between w-full ${
						sidebar ? '' : 'lg:flex'
					}`}
				>
					<RiGlassesLine className="text-[2rem] bg-[--tag] rounded-full p-[6px]" />
					<motion.button
						whileTap={{ scale: 0.9 }}
						whileHover={{ scale: 1.2 }}
						transition={{ type: 'spring', bounce: 0.5, duration: 1.5 }}
						type="button"
						onClick={() => archiveUnarchive()}
						className="p-2 bg-[--highlight-bg-2] rounded-md"
					>
						<Image
							src={archived ? icons.upload2 : icons.archive}
							alt="caret"
							className="w-[20px]"
						/>
					</motion.button>
				</div>
				<motion.button
					whileTap={{ scale: 0.9 }}
					whileHover={{ scale: sidebar ? 1 : 0.95 }}
					transition={{ type: 'spring', bounce: 0.5, duration: 1.5 }}
					type="button"
					onClick={onClick}
					className={`flex justify-between items-center w-full p-[14px]   bg-[--card] rounded-lg gap-3 ${
						sidebar ? '' : 'lg:p-0 lg:py-2 lg:hover:scale-9'
					}`}
				>
					<div className="flex-v-center">
						<Image src={icons.caret} alt="caret" className={`w-[10px]`} />
						<p className="black-text">{title}</p>
					</div>
					<p className="black-text">
						{completed}/{total} ({percentage}%)
					</p>
				</motion.button>
			</motion.div>
			<motion.div
				style={{ scale, opacity }}
				className={`absolute right-0 top-0 h-full`}
			>
				<motion.button
					whileTap={{ scale: 0.9 }}
					whileHover={{ scale: 1.1 }}
					type="button"
					onClick={() => archiveUnarchive()}
					className="flex-center min-w-[40px] w-[40px] max-w-[40px] h-full bg-[--highlight-bg] rounded-lg p-[10px]"
				>
					<Image
						src={archived ? icons.upload2 : icons.archive}
						alt={archived ? 'unarchive' : 'archive'}
						width={30}
						height={30}
					/>
				</motion.button>
			</motion.div>
			{/* <div className="absolute top-0 left-0 w-full">
			{error && <FormError message={error} />}
			{success && <FormSuccess message={success} />}
			</div> */}
		</div>
	);
};

export default InspectionCard;
