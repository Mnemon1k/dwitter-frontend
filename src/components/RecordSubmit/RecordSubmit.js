import React, {useState} from 'react';
import {Avatar, ListItem, ListItemAvatar, Stack, TextField, Typography} from "@mui/material";
import {connect} from "react-redux";
import Button from "@mui/material/Button";
import {createRecord} from "../../api/apiCalls";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from '@mui/icons-material/Send';

const RecordSubmit = ({user}) => {
	const [focused, setFocused] = useState(false);
	const [content, setContent] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(false);

	const submitPost = () => {
		setLoading(true);
		setError(null);

		createRecord({content})
			.then(() => {
				setContent("");
				setSuccess(true);
				setTimeout(() => {
					setFocused(false);
					setSuccess(false);
				}, 1000);
			})
			.catch(({response}) => {
				setError(response?.data?.validationErrors)
			})
			.finally(() => {
				setLoading(false);
			});
	}

	const onPost = () => {
		if (content.length > 10 && content.length < 333) {
			submitPost();
		} else {
			setError({content: "Post should be more than 10 and less than 333 letters."});
		}
	};
	const onCanlcel = () => {
		setFocused(false);
		setContent("");
		setError(null);
	};
	const textareaOnChange = (event) => {
		setError(null);
		setContent(event.target.value);
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
							value={content}
							inputProps={{
								style: {
									transition: "all 0.12s ease-out",
									height: focused ? "100px" : "30px",
								}
							}}
							helperText={error?.content && error?.content.charAt(0).toUpperCase() + error?.content.slice(1)}
							error={!!error?.content}
						/>
						{focused &&
							<Stack className={"mt-20"} spacing={2} direction="row">
								<LoadingButton
									onClick={onPost}
									endIcon={success ? null : <SendIcon/>}
									loading={loading}
									loadingPosition="end"
									variant="contained"
									color={success ? "success" : "secondary"}
									disableElevation
								>
									{success ? "Success" : "Post"}
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
