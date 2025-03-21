'use client';

import { useState, useEffect } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { FaCheck } from 'react-icons/fa6';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { NoteSchema } from '@/schemas';

import { InputFieldRHF, SubmitButton, Button } from '../../components';

const MiniAddNote = ({ close, note, addNote, prevNote }) => {
	const [isPending, setIsPending] = useState(false);

	const [isFollowup, setIsFollowup] = useState(
		prevNote ? (prevNote.follow_up === 'Yes' ? true : false) : false
	);
	const {
		setValue,
		register,
		handleSubmit,
		formState: { errors },
		control,
	} = useForm({
		resolver: zodResolver(NoteSchema),
	});

	useEffect(() => {
		setValue('follow_up', prevNote ? prevNote.follow_up : 'No');
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (isFollowup) {
			setValue('follow_up', 'Yes');
		} else {
			setValue('follow_up', 'No');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isFollowup]);

	const onSubmit = (values) => {
		setIsPending(true);

		addNote(values);
	};

	return (
		<form
			className={`space-y-3 ${isPending && 'pending'}`}
			onSubmit={handleSubmit((d) => onSubmit(d))}
		>
			<InputFieldRHF
				label=""
				type="textarea"
				placeholder="Add a note"
				rhf={{ ...register('notes') }}
				error={errors.notes?.message}
				longer
				defaultTextarea
				defaultValue={prevNote && prevNote.notes}
			/>
			<div className="flex gap-2">
				<button
					type="button"
					onClick={() => setIsFollowup((prev) => !prev)}
					className={`min-w-[22.5px] max-w-[22.5px] h-[22.5px]  rounded-md flex-center p-[6px] ${
						isFollowup ? 'bg-[--brand]' : 'bg-[--gray]'
					}`}
				>
					<AnimatePresence>
						{isFollowup && (
							<motion.span
								animate={{ scale: [0, 1.1, 1] }}
								exit={{ scale: [1, 1.1, 0] }}
							>
								<FaCheck className={`text-[--white]`} />
							</motion.span>
						)}
					</AnimatePresence>
				</button>
				<p>Follow up required</p>
			</div>

			<div className="grid grid-cols-2 gap-4 lg:gap-5">
				<Button text="cancel" noBg onClick={close} />
				<SubmitButton text="ok" submitting={isPending} />
			</div>
		</form>
	);
};

export default MiniAddNote;
