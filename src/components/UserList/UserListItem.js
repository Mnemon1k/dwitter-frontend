import {Avatar, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import {Link} from "react-router-dom";

const UserListItem = ({user}) => {
	return (
		<ListItem
			data-testid={"user-group-item"}
		>
			<ListItemAvatar>
				<Avatar
					style={{marginRight: 14}}
					data-testid={"UserImage"}
					sx={{width: 56, height: 56}}
					src={user?.image && "/images/profile/" + user?.image}
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
