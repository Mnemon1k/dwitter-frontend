import React from 'react';
import {Typography} from "@mui/material";

const UserCardInfo = ({user}) => {
	return (
		<>
			<Typography component="h5" variant="h5">
				Name: <span>{user?.displayName}</span>
			</Typography>
			<Typography variant="subtitle1" color="text.secondary">
				Username: <span>{user?.username}</span>
			</Typography>
			<Typography variant="subtitle1" color="text.secondary">
				Id: <span>{user?.id}</span>
			</Typography>
		</>
	);
};

export default UserCardInfo;
