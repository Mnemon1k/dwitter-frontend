import {useEffect, useState} from "react";
import {getUser, updateUser} from "../../api/apiCalls";
import {useParams} from "react-router-dom";
import {Container, Stack, Alert, Typography} from "@mui/material";
import UserCardSkeleton from "../../components/UserCardSkeleton/UserCardSkeleton";
import UserCard from "../../components/UserCard/UserCard";
import {connect} from "react-redux";

function UserPage({loggedInUser}) {
	const params = useParams();
	const [user, setUser] = useState(undefined);
	const [userLoading, setUserLoading] = useState(true);
	const [userUpdating, setUserUpdating] = useState(false);
	const [userLoadingError, setUserLoadingError] = useState(null);
	const [editMode, setEditMode] = useState(false);
	const [image, setImage] = useState(null);

	const toggleEditMode = () => {
		setEditMode(!editMode);
		setImage(null);
	}

	const onFileSelect = (event) => {
		if (event.target.files.length !== 0) {
			const file = event.target.files[0];
			let reader = new FileReader();
			reader.onload = () => {
				setImage(reader.result);
			};
			reader.readAsDataURL(file);
		}
	}

	const onClickUpdate = ({displayName}) => {
		setUserUpdating(true);
		updateUser(user.id,
			{
				displayName,
				image: image && image.split(",")[1]
			})
			.then((response) => {
				console.log(response);
				setEditMode(false);
				setUser({...user, displayName, image: response.data.image});
			})
			.catch(e => alert("Error while updating user"))
			.finally(() => setUserUpdating(false));
	}

	useEffect(() => {
		if (params.username) {
			setUserLoading(true);
			setUserLoadingError(null);
			getUser(params.username)
				.then(response => setUser(response?.data))
				.catch(error => setUserLoadingError(error?.response?.data?.message || "Server error"))
				.finally(() => setUserLoading(false));
		}
	}, [params.username]);

	return (
		<div className={"padding-md text-center"} data-testid={"userpage"}>
			<Typography component="h4" variant="h4">
				User info page
			</Typography>
			<Container className={"mt-30"} maxWidth={"md"}>
				<Stack spacing={2} alignItems={"center"} width="100%">
					{
						userLoadingError ?
							<Alert severity="error"> {userLoadingError} </Alert>
							:
							userLoading ?
								<UserCardSkeleton/>
								:
								<UserCard editMode={editMode}
										  userUpdating={userUpdating}
										  onClickUpdate={onClickUpdate}
										  toggleEditMode={toggleEditMode}
										  loaddedImage={image}
										  onFileSelect={onFileSelect}
										  isEditable={loggedInUser.username === user.username}
										  user={user}/>
					}
				</Stack>
			</Container>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		loggedInUser: state
	}
}

export default connect(mapStateToProps)(UserPage);