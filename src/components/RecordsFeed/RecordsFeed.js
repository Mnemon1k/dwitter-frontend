import React, {useEffect} from 'react';

import {Alert} from "@mui/material";
import RecordSkeleton from "../ReacordSkeleton/RecordSkeleton";
import RecordItem from "../RecordItem/RecordItem";
import LoadingButton from "@mui/lab/LoadingButton";
import LoadPostsButton from "../LoadPostsButton/LoadPostsButton";
import {useDispatch, useSelector} from "react-redux";
import RecordSubmit from "../RecordSubmit/RecordSubmit";
import {fetchPrevRecordsThunk, fetchRecordsThunk} from "../../redux/records/recordsThunk";

const RecordsFeed = ({username, submitForm}) => {
	const {
		records,
		recordsLoading,
		moreRecordsLoading,
		recordsLoadingError,
		pagination
	} = useSelector((state) => state.records);
	const {user, isLoggedIn} = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const loadNextPage = () => {
		dispatch(fetchPrevRecordsThunk({
			id: records[records.length - 1]?.id || 0,
			username
		}));
	}

	useEffect(() => {
		dispatch(fetchRecordsThunk(username));
	}, [username]);

	return (
		<div className={"mt-20"}>
			{((username === user.username) || submitForm) && <RecordSubmit/>}
			{recordsLoading ?
				<><RecordSkeleton text/><RecordSkeleton className={"mt-20"} image text/></>
				:
				<>
					<LoadPostsButton/>
					{/*<LoadPostsButton onClick={loadNewPosts} newPostsCount={newPostsCount}/>*/}
					{records?.length
						?
						<>
							{records?.map((post) => (
								<RecordItem post={post}
											removeAction={user.username === post.user.username}
											key={post.id}/>
							))}
							{
								!pagination?.last &&
								<div style={{marginTop: 25, textAlign: "center"}}>
									<LoadingButton
										onClick={loadNextPage}
										loading={moreRecordsLoading}
										variant="contained"
										size={"large"}
										disableElevation
									>
										Load more
									</LoadingButton>
								</div>
							}
						</>
						:
						!recordsLoadingError &&
						<Alert className={"mt-20"} severity="info">There is no posts</Alert>
					}
				</>}
			{recordsLoadingError && <Alert className={"mt-20"} severity="error">{recordsLoadingError}</Alert>}
		</div>
	);
};

export default RecordsFeed;
