'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

import { DayPicker, getDefaultClassNames } from 'react-day-picker';
import { setHours, setMinutes } from 'date-fns';

import { icons } from '../../constants';
import { TitlePopupWrapper } from '../../wrappers';
import { Tabs, SelectInput, Button } from '../../components';

const DatePicker = ({ selected, handleDaySelect }) => {
	const defaultClassNames = getDefaultClassNames();

	return (
		<>
			{/* <style>{css}</style> */}
			<DayPicker
				mode="single"
				selected={selected}
				onSelect={handleDaySelect}
				showOutsideDays
				classNames={{
					today: `text-[--brand]`, // Add a border to today's date
					selected: `bg-[--brand-50] rounded-lg border-[--brand] text-[--brand]`, // Highlight the selected day
					root: `${defaultClassNames.root} !w-full p-0 !text-sm sm:!text-sm !h-[300px]`, // Add a shadow to the root element
					chevron: `${defaultClassNames.chevron} !fill-[--brand] !h-[20px] hover:scale-125 transition duration-700`, // Change the color of the chevron
					day_button: `!w-[20px] transition duration-700 hover:text-[--brand] hover:drop-shadow-md`,
					month_caption: `${defaultClassNames.month_caption} !text-lg sm:!text-md md:!text-lg !font-semibold`,
					weekday: `${defaultClassNames.weekday} !text-[--grey] !text-xs !font-regular`,
					outside: `text-[--grey]`,
				}}
			/>
		</>
	);
};

const TimePickerTab = ({ timeValue, handleTimeChange }) => {
	return (
		<div className="py-5 flex-center">
			<input
				type="time"
				value={timeValue}
				onChange={handleTimeChange}
				className="tracking-widest text-lg bg-[--card] p-2 rounded-lg"
			/>
		</div>
	);
};

const DateTimePicker = ({
	label,
	rhf,
	setValue,
	name,
	error,
	defaultValue,
}) => {
	const [showSelector, setShowSelector] = useState(false);
	const [activeTab, setActiveTab] = useState(0);
	const [selectedDate, setSelectedDate] = useState();
	// const [selectedTime, setSelectedTime] = useState('00:00:00');

	const [selected, setSelected] = useState(
		defaultValue ? defaultValue : new Date()
	);
	const [timeValue, setTimeValue] = useState('00:00');

	const handleTimeChange = (e) => {
		const time = e.target.value;
		if (!selected) {
			setTimeValue(time);
			return;
		}
		const [hours, minutes] = time.split(':').map((str) => parseInt(str, 10));
		const newSelectedDate = setHours(setMinutes(selected, minutes), hours);
		setSelected(newSelectedDate);
		setTimeValue(time);
	};

	const handleDaySelect = (date) => {
		if (!timeValue || !date) {
			setSelected(date);
			return;
		}
		const [hours, minutes] = timeValue
			.split(':')
			.map((str) => parseInt(str, 10));
		const newDate = new Date(
			date.getFullYear(),
			date.getMonth(),
			date.getDate(),
			hours,
			minutes
		);
		setSelected(newDate);
	};

	useEffect(() => {
		if (selected) {
			let dateVal = new Date(selected);
			// CONVERT DATE TO UTC AND SEND TO THE BACKEND
			let utc = dateVal.toUTCString();
			let t = {
				day:
					new Date(utc).getDate() < 10
						? '0' + new Date(utc).getDate()
						: new Date(utc).getDate(),
				month:
					new Date(utc).getMonth() + 1 < 10
						? '0' + (new Date(utc).getMonth() + 1)
						: new Date(utc).getMonth() + 1,
				year: new Date(utc).getFullYear(),
				hr:
					new Date(utc).getUTCHours() < 10
						? '0' + new Date(utc).getUTCHours()
						: new Date(utc).getUTCHours(),
				min:
					new Date(utc).getUTCMinutes() < 10
						? '0' + new Date(utc).getUTCMinutes()
						: new Date(utc).getUTCMinutes(),
				sec:
					new Date(utc).getUTCSeconds() < 10
						? '0' + new Date(utc).getUTCSeconds()
						: new Date(utc).getUTCSeconds(),
			};
			utc =
				t.year +
				'-' +
				t.month +
				'-' +
				t.day +
				' ' +
				t.hr +
				':' +
				t.min +
				':' +
				t.sec;
			setValue(name, utc);

			// DISPLAY DATE ACCORDING TO LOCALITY
			const options = {
				year: 'numeric',
				month: 'long',
				day: 'numeric',
			};
			setSelectedDate(
				dateVal.toLocaleDateString(undefined, options) +
					', ' +
					dateVal.toLocaleTimeString(undefined, {
						timeZoneName: 'short',
						hour12: 'true',
					})
			);
			// console.log(selected.toLocaleDateString(undefined, options));
			// console.log(
			// 	selected.toLocaleTimeString(undefined, {
			// 		timeZoneName: 'short',
			// 		hour12: 'true',
			// 	})
			// );
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selected]);

	// const selectOption = (i) => {
	// 	setValue(name, selectedDate);
	// 	console.log(selectedDate);
	// 	setShowSelector(false);
	// };

	return (
		<div>
			<div className="input-block">
				<label>{label}</label>
				<input
					id={label}
					{...rhf}
					defaultValue={defaultValue && defaultValue}
					className="hidden"
				/>
				<button
					className="icon-input block w-full"
					type="button"
					onClick={() => setShowSelector(true)}
				>
					<p className="w-full text-left text-[--black]">{selectedDate}</p>
					<Image
						src={icons.calendar}
						w={20}
						h={20}
						alt="mail"
						className="input-img !p-0"
					/>
				</button>
				{error && <p className="text-[--brand] text-xs">{error}*</p>}
			</div>

			{showSelector && (
				<TitlePopupWrapper options close={() => setShowSelector(false)}>
					<div className="flex-center">
						<div className="bg-[--white] rounded-[--rounding] p-4 md:p-5 flex flex-col gap-1 max-w-[310px]">
							<div className=" border-b border-[--border] pb-3">
								<Tabs
									tabs={['Date', 'Time']}
									active={activeTab}
									onClick={setActiveTab}
								/>
							</div>
							<div className="w-full overflow-hidden">
								{activeTab === 0 ? (
									<DatePicker
										selected={selected}
										handleDaySelect={handleDaySelect}
									/>
								) : (
									<TimePickerTab
										timeValue={timeValue}
										handleTimeChange={handleTimeChange}
									/>
								)}
							</div>
							<div className=" border-t border-[--border] pt-3">
								<div className="w-full grid grid-cols-2 gap-4 lg:gap-5">
									<Button
										text="cancel"
										noBg
										onClick={() => setShowSelector(false)}
									/>
									<Button
										text="create"
										onClick={() =>
											activeTab === 0 ? setActiveTab(1) : setShowSelector(false)
										}
									/>
								</div>
							</div>
						</div>
					</div>
				</TitlePopupWrapper>
			)}
		</div>
	);
};

export default DateTimePicker;
