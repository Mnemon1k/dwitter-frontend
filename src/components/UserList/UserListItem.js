import React from 'react';
import {Avatar, IconButton, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {Link} from "react-router-dom";

const UserListItem = ({user}) => {
	return (
		<ListItem
			data-testid={"user-group-item"}
			secondaryAction={
				<div>
					<IconButton edge="end" aria-label="delete">
						<EditIcon/>
					</IconButton>
					<IconButton edge="end" aria-label="delete">
						<DeleteIcon/>
					</IconButton>
				</div>
			}
		>
			<ListItemAvatar>
				<Avatar
					data-testid={"UserImage"}
					sx={{width: 56, height: 56}}
					src={user?.image}
				/>
			</ListItemAvatar>
			<ListItemText
				primary={
					<Link to={"/users/" + user.username}>{user?.displayName}</Link>
				}
				secondary={user?.username}
			/>
		</ListItem>
	);
};

export default UserListItem;
