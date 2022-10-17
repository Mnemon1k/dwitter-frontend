import {IconButton, Popover, Stack, Tooltip} from "@mui/material";
import {DeleteOutline} from "@mui/icons-material";
import Button from "@mui/material/Button";

import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {fetchPrevRecordsThunk, removeRecordThunk} from "../../redux/records/recordsThunk";

const RecordRemoveButton = ({id}) => {
	const dispatch = useDispatch();
	const [anchorEl, setAnchorEl] = useState(null);

	const handleClose = () => setAnchorEl(null);
	const {removeRecordLoading, records} = useSelector((state) => state.records);

	const onBtnClick = (event) => setAnchorEl(event.currentTarget);

	const removeRecordHandler = () => {
		dispatch(removeRecordThunk(id))
			.then((action) => {
				console.log(records.length)
				if (action.type === "records/remove/fulfilled" && records.length < 6) {
					dispatch(fetchPrevRecordsThunk({
						id: records[records.length - 1].id,
						size: 1,
					}));
				}
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
				<div style={{padding: "14px", textAlign: "center"}}>
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
								disabled={removeRecordLoading}
								size={"small"}>{removeRecordLoading ? "Loading..." : "Remove"}</Button>
					</Stack>
				</div>
			</Popover>
		</>
	);
};

export default RecordRemoveButton;
