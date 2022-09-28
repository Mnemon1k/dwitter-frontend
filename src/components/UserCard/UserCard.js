import React from 'react';
import {Avatar, Card, CardContent, Typography} from "@mui/material";

const UserCard = ({user}) => (
	<Card sx={{display: {xs: "block", sm: 'flex'}}}>
		<Avatar
			variant={"square"}
			data-testid={"UserImage"}
			src={user?.image}
			sx={{
				width: {xs: "100%", sm: 260},
				height: {xs: "100%", sm: 260}
			}}
		/>

		<CardContent className={"text-left"} sx={{flex: 1}}>
			<Typography component="h5" variant="h5">
				Name: <span>{user?.displayName}</span>
			</Typography>
			<Typography variant="subtitle1" color="text.secondary">
				Username: <span>{user?.username}</span>
			</Typography>
			<Typography variant="subtitle1" color="text.secondary">
				Id: <span>{user?.id}</span>
			</Typography>
		</CardContent>
	</Card>
);

export default UserCard;