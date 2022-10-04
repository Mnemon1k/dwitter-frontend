import React, {useEffect, useState} from 'react';
import {getRecords} from "../../api/apiCalls";
import {Alert} from "@mui/material";
import RecordSkeleton from "../ReacordSkeleton/RecordSkeleton";

const RecordsFeed = ({username}) => {
	const [content, setContent] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		setLoading(true);
		getRecords({username})
			.then(({data}) => {
				setContent(data?.content);
			})
			.catch()
			.finally(() => {
				setLoading(false);
			});
	}, [username]);

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
						content?.map(({id, content}) => (
							<div key={id}>
								{content}
							</div>
						))
						:
						<Alert severity="info">There is no posts</Alert>
			}
		</div>
	);
};

export default RecordsFeed;
