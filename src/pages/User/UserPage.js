import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {useParams} from "react-router-dom";

import UserCardSkeleton from "../../components/UserCardSkeleton/UserCardSkeleton";
import UserCard from "../../components/UserCard/UserCard";

import {Container, Alert, Typography, Grid} from "@mui/material";
import RecordsFeed from "../../components/RecordsFeed/RecordsFeed";
import {fetchUserThunk} from "../../redux/user/userThunk";
import {resetState} from "../../redux/user/userSlice";

function UserPage() {
	const params = useParams();
	const dispatch = useDispatch();

	const {user: loggedInUser} = useSelector((state) => state.auth);
	const {userLoading, userLoadingError} = useSelector((state) => state.user);

	useEffect(() => {
		if (params?.username)
			dispatch(fetchUserThunk(params?.username));

		return () => {
			dispatch(resetState());
		}
	}, [params?.username]);

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
						<RecordsFeed username={params?.username}/>
					</Grid>
					<Grid item xs={12} md={6}>
						{
							userLoadingError ?
								<Alert severity="error"> {userLoadingError} </Alert>
								:
								userLoading ?
									<UserCardSkeleton/>
									:
									<UserCard isEditable={params?.username === loggedInUser?.username}/>
						}
					</Grid>
				</Grid>

			</Container>
		</div>
	);
}

export default UserPage;