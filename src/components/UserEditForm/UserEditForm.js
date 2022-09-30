import {Stack, TextField} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import {CancelSharp} from "@mui/icons-material";
import {useEffect, useState} from "react";

const UserEditForm = ({user, onFileSelect, onClickUpdate, userUpdating, toggleEditMode}) => {
	const [newName, setNewName] = useState("");

	useEffect(() => {
		setNewName(user.displayName);
	}, [user.displayName]);


	return (
		<Stack spacing={2}>
			<TextField
				autoFocus
				key={"displayName"}
				size={"small"}
				value={newName}
				name="displayName"
				onChange={e => setNewName(e.target.value)}
				label="New display name"
			/>
			<input data-testid={"profile-image-input"}
				   multiple={false}
				   type="file"
				   onChange={onFileSelect}/>
			<Stack spacing={2}
				   direction="row">
				<LoadingButton
					onClick={() => onClickUpdate({displayName: newName})}
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
		</Stack>);
};

export default UserEditForm;
