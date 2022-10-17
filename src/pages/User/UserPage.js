import {useEffect, useState} from "react";
import {connect, useDispatch, useSelector} from "react-redux";

import {getUser, updateUser} from "../../api/apiCalls";

import {useParams} from "react-router-dom";

import UserCardSkeleton from "../../components/UserCardSkeleton/UserCardSkeleton";
import UserCard from "../../components/UserCard/UserCard";

import {Container, Alert, Typography, Grid} from "@mui/material";
import RecordSubmit from "../../components/RecordSubmit/RecordSubmit";
import RecordsFeed from "../../components/RecordsFeed/RecordsFeed";

function UserPage() {
	const params = useParams();
	const [userLoading, setUserLoading] = useState(true);
	const [userUpdating, setUserUpdating] = useState(false);
	const [userLoadingError, setUserLoadingError] = useState("");
	const [editMode, setEditMode] = useState(false);
	const [image, setImage] = useState(null);
	const [errors, setErrors] = useState({});


	const {user, isLoggedIn} = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const toggleEditMode = () => {
		setEditMode(!editMode);
		setImage(null);
		setErrors({});
	}

	const onFileSelect = (event) => {
		setErrors({...errors, image: ""});
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
		setErrors({});
		updateUser(user.id,
			{
				displayName,
				image: image && image.split(",")[1]
			})
			.then((response) => {
				setEditMode(false);
				// setUser({...user, displayName, image: response.data.image});
				dispatch({
					type: "UPDATE_SUCCESS",
					payload: {user: {...user, displayName, image: response.data.image}}
				});
			})
			.catch((error) => {
				if (error?.response?.data?.validationErrors) {
					setErrors(error?.response?.data?.validationErrors);
				} else {
					setUserLoadingError(error?.message);
				}
			})
			.finally(() => setUserUpdating(false));
	}

	useEffect(() => {
		if (params.username) {
			setUserLoading(true);
			setUserLoadingError("");
			getUser(params.username)
				// .then(response => setUser(response?.data))
				.catch(error => setUserLoadingError(error?.response?.data?.message || "Server error"))
				.finally(() => setUserLoading(false));
		}
	}, [params.username]);

	return (
		<div className={"padding-md"} data-testid={"userpage"}>
			<Container maxWidth={"xl"}>
				<Typography component="h4" variant="h4">
					Feed
				</Typography>
				<Grid container
					  justifyContent={"space-between"}
					  spacing={4}>
					<Grid item md={6}>
						<RecordsFeed username={params.username}/>
					</Grid>
					<Grid item xs={12} md={6}>
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
											  errors={errors}
											  setErrors={setErrors}
											  isEditable={params.username === user.username}
											  user={user}/>
						}
					</Grid>
				</Grid>

			</Container>
		</div>
	);
}

export default UserPage;