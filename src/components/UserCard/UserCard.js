import React, {useEffect, useState} from 'react';
import {Avatar, Card, CardContent, Stack, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {CancelSharp, Edit, Save} from "@mui/icons-material";
import UserCardInfo from "../UserCardInfo/UserCardInfo";
import LoadingButton from "@mui/lab/LoadingButton";

const UserCard = ({user, isEditable, editMode, toggleEditMode, onClickSave, userUpdating}) => {
	const [newName, setNewName] = useState("");

	useEffect(() => setNewName(user.displayName), [editMode, user.displayName]);

	const EditForm = () => (<div>
		<TextField
			autoFocus
			key={"displayName"}
			size={"small"}
			value={newName}
			name="displayName"
			onChange={e => setNewName(e.target.value)}
			label="New display name"
		/>
		<br/>
		<Stack style={{marginTop: 10}}
			   spacing={2}
			   direction="row">
			<LoadingButton
				onClick={() => onClickSave({displayName: newName})}
				loading={userUpdating}
				variant="contained"
				color={"success"}
				size={"small"}
				loadingIndicator="Loading…"
			>
				Update user
			</LoadingButton>

			<Button variant="outlined"
					color={"error"}
					size={"small"}
					onClick={toggleEditMode}
					startIcon={<CancelSharp/>}>Cancel</Button>
		</Stack>
	</div>);

	return (
		<Card sx={{display: {xs: "block", sm: 'flex'}}}>
			<Avatar variant={"square"}
					data-testid={"UserImage"}
					src={user?.image}
					sx={{
						width: {xs: "100%", sm: 260},
						height: {xs: "100%", sm: 260}
					}}
			/>

			<CardContent className={"text-left"} sx={{flex: 1}}>
				{editMode ? <EditForm/> : <UserCardInfo user={user}/>}

				{(isEditable && !editMode) &&
					<Button style={{marginTop: 10}}
							variant="contained"
							color={"primary"}
							size={"small"}
							onClick={toggleEditMode}
							startIcon={<Edit/>}>Edit</Button>}
			</CardContent>
		</Card>
	);
};

export default UserCard;