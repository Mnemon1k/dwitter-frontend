import React, {useEffect, useState} from 'react';
import * as apiCalls from "../../api/apiCalls";

import {Alert} from "@mui/material";
import RecordSkeleton from "../ReacordSkeleton/RecordSkeleton";
import RecordItem from "../RecordItem/RecordItem";
import LoadingButton from "@mui/lab/LoadingButton";

const RecordsFeed = ({username}) => {
	const [content, setContent] = useState([]);
	const [loading, setLoading] = useState(false);
	const [morePostsLoading, setMorePostsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [pagination, setPagination] = useState({});

	const apiRequest = (params) => {
		setError(null);
		return apiCalls.getRecords(params)
			.then(({data}) => {
				const {content: newContent, ...pagination} = data;
				setPagination(pagination);
				setContent([...content, ...newContent]);
			})
			.catch(() => {
				setError("Error while loading posts");
			})
	}

	useEffect(() => {
		setLoading(true);
		apiRequest({username})
			.finally(() => {
				setLoading(false);
			});
	}, [username]);

	const loadNextPage = () => {
		setMorePostsLoading(true);

		const lastPost = content[content.length - 1];
		apiCalls.getPrevRecords(lastPost.id, username)
			.then((response) => {
				const {content: newContent, ...pagination} = response?.data;
				setContent([...content, ...newContent])
				setPagination(pagination);
			})
			.finally(() => {
				setMorePostsLoading(false);
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
						!error && <Alert severity="info">There is no posts</Alert>
			}
			{
				error && <Alert className={"mt-20"} severity="error">{error}</Alert>
			}
		</div>
	);
};

export default RecordsFeed;
