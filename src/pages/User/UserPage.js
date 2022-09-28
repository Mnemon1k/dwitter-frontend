import {useEffect, useState} from "react";
import {getUser} from "../../api/apiCalls";
import {useParams} from "react-router-dom";
import {Container, Stack, Alert, Typography} from "@mui/material";
import UserCardSkeleton from "../../components/UserCardSkeleton/UserCardSkeleton";
import UserCard from "../../components/UserCard/UserCard";
import {connect} from "react-redux";

function UserPage({loggedInUser}) {
	const params = useParams();
	const [user, setUser] = useState(undefined);
	const [userLoading, setUserLoading] = useState(true);
	const [userLoadingError, setUserLoadingError] = useState(null);

	useEffect(() => {
		if (params.username) {
			setUserLoading(true);
			setUserLoadingError(null);
			getUser(params.username)
				.then((response) => {
					setUser(response?.data);
				})
				.catch((error) => {
					setUserLoadingError(error?.response?.data?.message || "Server error");
				})
				.finally(() => {
					setUserLoading(false);
				});
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
							<Alert severity="error">
								{userLoadingError}
							</Alert>
							:
							userLoading ?
								<UserCardSkeleton/>
								:
								<UserCard
									isEditable={loggedInUser.username === user.username}
									user={user}
								/>
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