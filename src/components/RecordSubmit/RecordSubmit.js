import React, {useState} from 'react';
import {Alert, Avatar, ListItem, ListItemAvatar, Stack, TextField, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from '@mui/icons-material/Send';
import {useDispatch, useSelector} from "react-redux";
import {addRecordThunk} from "../../redux/records/recordsThunk";
import {setNewRecordError} from "../../redux/records/recordsSlice";

const RecordSubmit = () => {
	const [focused, setFocused] = useState(false);
	const [content, setContent] = useState("");

	const {user} = useSelector((state) => state.auth);
	const {newRecordLoading, newRecordError} = useSelector((state) => state.records);
	const dispatch = useDispatch();

	const submitPost = () => {
		dispatch(addRecordThunk({content}))
			.then((action) => {
				if (action.type == "records/add/fulfilled") {
					setContent("");
					setFocused(false);
				}
			});
	};

	const onPost = () => {
		if (content.length > 3 && content.length < 333) {
			submitPost();
		} else {
			dispatch(setNewRecordError({content: "Post should be more than 10 and less than 333 letters."}));
		}
	};
	const onCanlcel = () => {
		setFocused(false);
		setContent("");
		dispatch(setNewRecordError(null));
	};
	const textareaOnChange = (event) => {
		dispatch(setNewRecordError(null));
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
									height: focused ? "100px" : "26px",
								}
							}}
							helperText={newRecordError?.content && newRecordError?.content.charAt(0).toUpperCase() + newRecordError?.content.slice(1)}
							error={!!newRecordError?.content}
						/>
						{typeof newRecordError === "string" &&
							<Alert className={"mt-20"} severity="error">{newRecordError}</Alert>}
						{focused &&
							<Stack className={"mt-20"} spacing={2} direction="row">
								<LoadingButton
									onClick={onPost}
									endIcon={<SendIcon/>}
									loading={newRecordLoading}
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

export default RecordSubmit;
