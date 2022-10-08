import React, {useState} from 'react';
import {Alert, Avatar, ListItem, ListItemAvatar, Stack, TextField, Typography} from "@mui/material";
import {connect} from "react-redux";
import Button from "@mui/material/Button";
import {createRecord} from "../../api/apiCalls";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from '@mui/icons-material/Send';

const RecordSubmit = ({user, content, setContent}) => {
	const [focused, setFocused] = useState(false);
	const [post, setPost] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const submitPost = () => {
		setLoading(true);
		setError(null);

		createRecord({content: post})
			.then(({data}) => {
				setPost("");
				setContent([data, ...content]);
				setFocused(false);
			})
			.catch((data) => {
				setError(data?.response?.data?.validationErrors?.length ? data?.response?.data?.validationErrors : data?.message);
			})
			.finally(() => {
				setLoading(false);
			});
	}

	const onPost = () => {
		if (post.length > 10 && post.length < 333) {
			submitPost();
		} else {
			setError({content: "Post should be more than 10 and less than 333 letters."});
		}
	};
	const onCanlcel = () => {
		setFocused(false);
		setPost("");
		setError(null);
	};
	const textareaOnChange = (event) => {
		setError(null);
		setPost(event.target.value);
	};

	return (
		<>
			<Typography component="h5"
						variant="h5">
				Create new post
			</Typography>
			<div className="mt-20">
				<ListItem alignItems={"flex-start"}>
					<ListItemAvatar>
						<Avatar
							style={{marginRight: 14, marginTop: -8}}
							data-testid={"UserImage"}
							sx={{width: 56, height: 56}}
							src={user?.image && "/images/profile/" + user?.image}
						/>
					</ListItemAvatar>
					<div style={{width: "100%"}}>
						<TextField
							onFocus={() => setFocused(true)}
							onChange={textareaOnChange}
							fullWidth
							multiline
							label="Whats new?"
							value={post}
							inputProps={{
								style: {
									transition: "all 0.12s ease-out",
									height: focused ? "100px" : "26px",
								}
							}}
							helperText={error?.content && error?.content.charAt(0).toUpperCase() + error?.content.slice(1)}
							error={!!error?.content}
						/>
						{typeof error === "string" && <Alert className={"mt-20"} severity="error">{error}</Alert>}
						{focused &&
							<Stack className={"mt-20"} spacing={2} direction="row">
								<LoadingButton
									onClick={onPost}
									endIcon={<SendIcon/>}
									loading={loading}
									loadingPosition={"end"}
									variant="contained"
									color={"secondary"}
									disableElevation
								>
									{"Post"}
								</LoadingButton>

								<Button
									disableElevation
									onClick={onCanlcel}>Cancel</Button>
							</Stack>
						}
					</div>
				</ListItem>
			</div>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		user: state
	};
}
export default connect(mapStateToProps)(RecordSubmit);
