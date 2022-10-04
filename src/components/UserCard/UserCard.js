import Button from "@mui/material/Button";
import {Edit} from "@mui/icons-material";
import {Avatar, Card, CardContent} from "@mui/material";

import UserCardInfo from "../UserCardInfo/UserCardInfo";
import UserEditForm from "../UserEditForm/UserEditForm";

const UserCard = ({
					  user,
					  errors,
					  setErrors,
					  isEditable,
					  editMode,
					  toggleEditMode,
					  onClickUpdate,
					  userUpdating,
					  onFileSelect,
					  loaddedImage
				  }) => {

	return (
		<Card sx={{display: {xs: "block", sm: 'flex'}}}>
			<Avatar variant={"square"}
					data-testid={"UserImage"}
					src={loaddedImage ? loaddedImage : user?.image && "/images/profile/" + user?.image}
					sx={{
						width: {xs: "100%", sm: 290, md: 360},
						height: {xs: "100%", sm: 290, md: 360}
					}}
			/>

			<CardContent className={"text-left"} sx={{flex: 1}}>
				{editMode ?
					<UserEditForm user={user}
								  errors={errors}
								  setErrors={setErrors}
								  onFileSelect={onFileSelect}
								  onClickUpdate={onClickUpdate}
								  userUpdating={userUpdating}
								  toggleEditMode={toggleEditMode}/>
					:
					<UserCardInfo user={user}/>}

				{(isEditable && !editMode) &&
					<Button style={{marginTop: 10}}
							variant="contained"
							color={"primary"}
							disableElevation
							onClick={toggleEditMode}
							startIcon={<Edit/>}>Edit</Button>}
			</CardContent>
		</Card>
	);
};

export default UserCard;