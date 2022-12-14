import {useEffect, useState} from "react";

import Alert from '@mui/material/Alert'
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import {CancelSharp} from "@mui/icons-material";
import {Stack, TextField} from "@mui/material";

const UserEditForm = ({
						  user, errors, resetError, onFileSelect, onClickUpdate, userUpdating, toggleEditMode
					  }) => {
	const [newName, setNewName] = useState("");

	useEffect(() => {
		setNewName(user.displayName);
	}, [user.displayName]);

	return (
		<Stack spacing={2}>
			<TextField
				autoFocus
				size={"small"}
				value={newName}
				helperText={errors?.displayName}
				error={!!errors?.displayName}
				name="displayName"
				onChange={event => {
					setNewName(event.target.value);
					resetError({...errors, displayName: ""});
				}}
				label="New display name"
			/>
			<input data-testid={"profile-image-input"}
				   multiple={false}
				   type="file"
				   onChange={onFileSelect}/>
			{
				(errors?.image || typeof errors === "string")
				&&
				<Alert severity="error">{errors || errors?.image}</Alert>
			}
			<Stack spacing={2}
				   direction="row">
				<LoadingButton
					onClick={() => onClickUpdate({displayName: newName})}
					loading={userUpdating}
					variant="contained"
					color={"secondary"}
					disableElevation
					loadingIndicator="Loading…"
				>
					Update user
				</LoadingButton>

				<Button variant="outlined"
						color={"error"}
						onClick={toggleEditMode}
						startIcon={<CancelSharp/>}>Cancel</Button>
			</Stack>
		</Stack>);
};

export default UserEditForm;
