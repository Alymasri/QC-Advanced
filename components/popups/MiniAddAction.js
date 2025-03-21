import React from 'react';

import { AddSubchecklistAction } from '../../components';

const MiniAddAction = ({ close, userId, assigneeData, bsc_id }) => {
	return (
		<div>
			<AddSubchecklistAction
				close={close}
				userId={userId}
				assigneeData={assigneeData}
				bsc_id={bsc_id}
			/>
		</div>
	);
};

export default MiniAddAction;
