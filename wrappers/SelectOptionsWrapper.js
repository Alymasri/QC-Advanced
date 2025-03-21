'use client';

import { useEffect } from 'react';

const SelectOptionsWrapper = ({
	children,
	list,
	label,
	name,
	setValue,
	error,
}) => {
	useEffect(() => {
		if (list?.length < 1) {
			setValue(name, '');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [list, name, setValue]);

	return list ? (
		list?.length > 0 ? (
			children
		) : (
			<div>
				<div className={`input-block `}>
					<div className="flex">
						<label className="capitalize">{label}</label>
					</div>
					<div className={`icon-input`}>
						<p className="input capitalize">--No {label}--</p>
					</div>
					{error && <p className="text-[--brand] text-xs">Add assignee*</p>}
				</div>
			</div>
		)
	) : (
		<div>
			<div className={`input-block `}>
				<div className="flex">
					<label className="capitalize">{label}</label>
				</div>
				<div className={`icon-input`}>
					<p className="input capitalize">--Loading--</p>
				</div>
				{error && <p className="text-[--brand] text-xs">Choose assignee*</p>}
			</div>
		</div>
	);
};

export default SelectOptionsWrapper;
