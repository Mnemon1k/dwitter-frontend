import React from 'react';
import {Avatar, Card, CardContent, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {Edit} from "@mui/icons-material";

const UserCard = ({user, isEditable}) => (
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
			{
				isEditable &&
				<Button style={{marginTop: 10}} variant="contained" color={"primary"} size={"small"}
						startIcon={<Edit/>}>Edit</Button>
			}
		</CardContent>
	</Card>
);

export default UserCard;