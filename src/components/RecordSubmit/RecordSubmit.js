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

	const submitPost = () => {
		setLoading(true);
		setError(null);

		createRecord({content})
			.then(() => {
				setContent("");
				setFocused(false);
			})
			.catch(({response}) => {
				setError(response?.data?.validationErrors)
			})
			.finally(() => {
				setLoading(false);
			});
	}

	const onPost = () => submitPost();
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
							rows={focused ? 4 : 1}
							helperText={error?.content && error?.content.charAt(0).toUpperCase() + error?.content.slice(1)}
							error={!!error?.content}
						/>
						{focused &&
							<Stack className={"mt-20"} spacing={2} direction="row">
								<LoadingButton
									onClick={onPost}
									endIcon={<SendIcon/>}
									loading={loading}
									loadingPosition="end"
									variant="contained"
									disableElevation
								>
									Post
								</LoadingButton>

								<Button variant="outlined"
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
