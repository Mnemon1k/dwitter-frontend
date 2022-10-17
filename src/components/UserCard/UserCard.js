import Button from "@mui/material/Button";
import {Edit} from "@mui/icons-material";
import {Avatar, Card, CardContent} from "@mui/material";

import UserCardInfo from "../UserCardInfo/UserCardInfo";
import UserEditForm from "../UserEditForm/UserEditForm";
import {useDispatch, useSelector} from "react-redux";
import {setEditMode, setUserUpdatingError} from "../../redux/user/userSlice";
import {updateUserThunk} from "../../redux/user/userThunk";
import {useState} from "react";

const UserCard = ({isEditable}) => {
	const dispatch = useDispatch();
	const [loadedImage, setLoadedImage] = useState(null);

	const {
		data: user,
		isEditMode,
		userUpdating,
		userUpdatingError
	} = useSelector((state) => state.user);

	const toggleEditMode = () => {
		setLoadedImage(null);
		dispatch(setEditMode(!isEditMode));
	}
	const onClickUpdate = ({displayName}) => {
		dispatch(updateUserThunk({
			userId: user.id,
			body: {displayName, image: loadedImage && loadedImage.split(",")[1]}
		}));
	}
	const resetError = (error) => dispatch(setUserUpdatingError(error));

	const onFileSelect = (event) => {
		resetError({...userUpdatingError, image: ""});

		if (event.target.files.length !== 0) {
			const file = event.target.files[0];
			let reader = new FileReader();
			reader.onload = () => {
				setLoadedImage(reader.result);
			};
			reader.readAsDataURL(file);
		}
	}

	return (
		<Card sx={{display: {xs: "block", sm: 'flex'}}}>
			<Avatar variant={"square"}
					data-testid={"UserImage"}
					src={loadedImage ? loadedImage : user?.image && "/images/profile/" + user?.image}
					sx={{
						width: {xs: "100%", sm: 290, md: 180, lg: 290, xl: 340},
						height: {xs: "100%", sm: 290, md: 180, lg: 290, xl: 340}
					}}
			/>

			<CardContent className={"text-left"} sx={{flex: 1}}>
				{isEditMode ?
					<UserEditForm user={user}
								  resetError={resetError}
								  errors={userUpdatingError}
								  onFileSelect={onFileSelect}
								  onClickUpdate={onClickUpdate}
								  userUpdating={userUpdating}
								  toggleEditMode={toggleEditMode}/>
					:
					<UserCardInfo user={user}/>}

				{(isEditable && !isEditMode) &&
					<Button style={{marginTop: 10}}
							variant="contained"
							color={"secondary"}
							disableElevation
							onClick={toggleEditMode}
							startIcon={<Edit/>}>Edit</Button>}
			</CardContent>
		</Card>
	);
};

export default UserCard;