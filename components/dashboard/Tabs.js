import React from 'react';

const Tabs = ({ tabs, active, onClick }) => {
	return (
		<div className="flex-center !gap-5 Lg:!gap-7">
			{tabs.map((tab, i) => (
				<button
					key={i}
					onClick={() => onClick(i)}
					type="button"
					className={
						active === i
							? 'tab !text-[--black] !font-semibold !border-[--brand]'
							: 'tab'
					}
				>
					{tab}
				</button>
			))}
		</div>
	);
};

export default Tabs;
