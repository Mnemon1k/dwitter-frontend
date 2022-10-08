import React, {useEffect, useState} from 'react';
import * as apiCalls from "../../api/apiCalls";

import {Alert} from "@mui/material";
import RecordSkeleton from "../ReacordSkeleton/RecordSkeleton";
import RecordItem from "../RecordItem/RecordItem";
import LoadingButton from "@mui/lab/LoadingButton";
import {useInterval} from "../../hooks/useInterval";
import LoadPostsButton from "../LoadPostsButton/LoadPostsButton";

const RecordsFeed = ({username}) => {
	const [content, setContent] = useState([]);
	const [loading, setLoading] = useState(false);
	const [morePostsLoading, setMorePostsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [pagination, setPagination] = useState({});
	const [newPostsCount, setNewPostsCount] = useState(0);

	const processResponse = (response) => {
		const {content: newContent, ...pagination} = response?.data;
		setContent([...content, ...newContent]);
		setPagination(pagination);
	};

	const processError = () => setError("Error while loading posts");
	const checkNewPostsCount = () => {
		apiCalls.getNewRecordsCount(content[0]?.id || 0, username)
			.then((response) => {
				setNewPostsCount(response?.data?.count);
			});
	};

	useEffect(() => {
		setLoading(true);
		setError(null);

		apiCalls.getRecords({username})
			.then(processResponse)
			.catch(processError)
			.finally(() => setLoading(false));
	}, [username]);


	useInterval(checkNewPostsCount, 1000);

	const loadNextPage = () => {
		setMorePostsLoading(true);

		apiCalls.getPrevRecords(content[content.length - 1]?.id || 0, username)
			.then(processResponse)
			.catch(processError)
			.finally(() => setMorePostsLoading(false));
	}

	const loadNewPosts = () => {
		apiCalls.getNewRecords(content[0]?.id || 0, username)
			.then((qwe) => {
				setNewPostsCount(0);
				setContent([...qwe?.data, ...content]);
			});
	}


	return (
		<div className={"mt-20"}>
			{
				loading ?
					<>
						<RecordSkeleton text/>
						<RecordSkeleton className={"mt-20"} image text/>
					</>
					:
					<>
						<LoadPostsButton onClick={loadNewPosts} newPostsCount={newPostsCount}/>
						{
							content?.length
								?
								<>
									{content?.map((post) => (
										<RecordItem post={post} key={post.id}/>
									))}
									{
										!pagination.last &&
										<div style={{marginTop: 25, textAlign: "center"}}>
											<LoadingButton
												onClick={loadNextPage}
												loading={morePostsLoading}
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
				error && <Alert className={"mt-20"} severity="error">{error}</Alert>
			}
		</div>
	);
};

export default RecordsFeed;
