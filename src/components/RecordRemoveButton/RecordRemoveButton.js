import {IconButton, Popover, Stack, Tooltip} from "@mui/material";
import {DeleteOutline} from "@mui/icons-material";
import Button from "@mui/material/Button";
import {useState} from "react";
import {removeRecord} from "../../api/apiCalls";

const RecordRemoveButton = ({id}) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const handleClose = () => setAnchorEl(null);
	const [loading, setLoading] = useState(false);

	const onBtnClick = (event) => {
		setAnchorEl(event.currentTarget);
	}

	const removeRecordHandler = () => {
		setLoading(true);
		removeRecord(id)
			.then(() => {
				// setContent(content.filter(post => post.id !== id));
			})
			.catch((error) => {
				alert(error?.response?.data?.message ? error?.response?.data?.message : error?.message);
			})
			.finally(() => {
				setLoading(false);
				handleClose();
			});
	}

	return (
		<>
			<Tooltip title="Delete">
				<IconButton onClick={onBtnClick}>
					<DeleteOutline/>
				</IconButton>
			</Tooltip>
			<Popover
				open={Boolean(anchorEl)}
				anchorEl={anchorEl}
				onClose={handleClose}
				elevation={5}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
			>
				<div
					style={{padding: "14px", textAlign: "center"}}
				>
					<p style={{marginTop: 0}}>Are you sure?</p>
					<Stack spacing={2}
						   direction="row">
						<Button variant="contained"
								disableElevation
								onClick={handleClose}
								size={"small"}>Cancle</Button>
						<Button disableElevation
								onClick={removeRecordHandler}
								variant="contained"
								color={"error"}
								disabled={loading}
								size={"small"}>{loading ? "Loading..." : "Remove"}</Button>
					</Stack>
				</div>
			</Popover>
		</>
	);
};

export default RecordRemoveButton;
