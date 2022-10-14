import React, {useState} from 'react';

import {Alert} from "@mui/material";
import RecordSkeleton from "../ReacordSkeleton/RecordSkeleton";
import RecordItem from "../RecordItem/RecordItem";
import LoadingButton from "@mui/lab/LoadingButton";
import {useInterval} from "../../hooks/useInterval";
import LoadPostsButton from "../LoadPostsButton/LoadPostsButton";
import {connect} from "react-redux";
import RecordSubmit from "../RecordSubmit/RecordSubmit";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {getNewRecords, getPrevRecords, getRecords} from "../../api/reactQueryApi";

const RecordsFeed = ({username, loggedInUser, submitForm}) => {
	const [pagination, setPagination] = useState({});
	const [newPostsCount, setNewPostsCount] = useState(0);
	const [content, setContent] = useState([]);

	const queryClient = useQueryClient();

	let {isLoading, error} = useQuery(
		["records", username],
		() => getRecords({username}),
		{
			onSuccess: (response) => {
				setContent(response);
			},
			keepPreviousData: true
		}
	);

	console.log(isLoading);

	const loadNewPosts2 = useMutation(() => getPrevRecords(content[content.length - 1]?.id || 0, username), {
		onSuccess: (response) => {
			const {content: newContent, ...pagination} = response;

			setPagination(pagination);
			setContent([...content, ...newContent]);
		}
	});

	// const processError = () => setError("Error while loading posts");

	const checkNewPostsCount = () => {
		// apiCalls.getNewRecordsCount(content[0]?.id || 0, username)
		// 	.then((response) => {
		// 		setNewPostsCount(response?.data?.count);
		// 	});
	};


	// useInterval(checkNewPostsCount, 5000);

	const loadNextPage = () => {
		// setMorePostsLoading(true);
		//
		// apiCalls.getPrevRecords(content[content.length - 1]?.id || 0, username)
		// 	.then(processResponse)
		// 	.catch(processError)
		// 	.finally(() => setMorePostsLoading(false));
	}


	return (
		<div className={"mt-20"}>
			{(loggedInUser.username && submitForm) &&
				<RecordSubmit
					content={content}
					setContent={null}/>}
			{
				isLoading ?
					<>
						<RecordSkeleton text/>
						<RecordSkeleton className={"mt-20"} image text/>
					</>
					:
					<>
						<>
							<LoadPostsButton onClick={loadNextPage} newPostsCount={newPostsCount}/>
						</>
						{
							content?.length
								?
								<>
									{content?.map((post) => (
										<RecordItem post={post}
													content={content}
													setContent={null}
													removeAction={loggedInUser.username === post.user.username}
													key={post.id}/>
									))}
									{
										!pagination.last &&
										<div style={{marginTop: 25, textAlign: "center"}}>
											<LoadingButton
												onClick={() => loadNewPosts2.mutate()}
												loading={loadNewPosts2.isLoading}
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
								!error && <Alert className={"mt-20"} severity="info">There is no posts</Alert>
						}
					</>

			}
			{
				(error || loadNewPosts2.isError) &&
				<Alert className={"mt-20"} severity="error">{error || loadNewPosts2.error}</Alert>
			}
		</div>
	);
};


const mapStateToProps = (state) => {
	return {
		loggedInUser: state
	};
}
export default connect(mapStateToProps)(RecordsFeed);
