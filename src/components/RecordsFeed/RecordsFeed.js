import {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {fetchPrevRecordsThunk, fetchRecordsThunk} from "../../redux/records/recordsThunk";

import RecordItem from "../RecordItem/RecordItem";
import RecordSubmit from "../RecordSubmit/RecordSubmit";
import LoadPostsButton from "../LoadPostsButton/LoadPostsButton";
import RecordsFeedSkeleton from "../Skeletons/RecordsFeedSkeleton";

import {Alert} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

const RecordsFeed = ({username, submitForm}) => {
	const dispatch = useDispatch();
	const {
		records,
		recordsLoading,
		moreRecordsLoading,
		recordsLoadingError,
		pagination
	} = useSelector((state) => state.records);
	const {user, isLoggedIn} = useSelector((state) => state.auth);
	const showSubmitForm = (username === user.username || submitForm) && isLoggedIn;

	const loadNextPage = () => {
		dispatch(fetchPrevRecordsThunk({
			id: records[records.length - 1]?.id || 0,
			username
		}));
	}

	useEffect(() => {
		dispatch(fetchRecordsThunk(username));
	}, [username, dispatch]);

	return (
		<div className={"mt-20"}>
			{(showSubmitForm && isLoggedIn) && <RecordSubmit/>}

			{recordsLoading ?
				<RecordsFeedSkeleton/>
				:
				<>
					<LoadPostsButton/>
					{/*<LoadPostsButton onClick={loadNewPosts} newPostsCount={newPostsCount}/>*/}
					{records?.length
						?
						<>
							{records?.map((post) => (
								<RecordItem post={post}
											removeAction={(user.username === post.user.username) && isLoggedIn}
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
						!recordsLoadingError && <Alert className={"mt-20"} severity="info">There is no posts</Alert>
					}
				</>}
			{recordsLoadingError && <Alert className={"mt-20"} severity="error">{recordsLoadingError}</Alert>}
		</div>
	);
};

export default RecordsFeed;
