import RecordRemoveButton from "../RecordRemoveButton/RecordRemoveButton";
import {Avatar, Card, CardContent, CardHeader} from "@mui/material";
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";

const RecordItem = ({post, removeAction}) => {
	const {date, user, id, content} = post;

	const dateFormat = new Date(date);
	const avatarSrc = user?.image ? "/images/profile/" + user?.image : null;
	const dateString = dateFormat.toLocaleDateString() + " | " + dateFormat.toLocaleTimeString();

	const action = removeAction && <RecordRemoveButton id={id}/>;
	const avatar = (<Avatar
		sx={{width: 44, height: 44}}
		src={avatarSrc}
	/>);
	const title = <Link to={"/users/" + user?.username}>{user?.username}</Link>;

	return (
		<Card elevation={2} sx={{mt: 4}}>
			<CardHeader
				action={action}
				avatar={avatar}
				title={title}
				subheader={dateString}
			/>
			<CardContent>
				<Typography variant="body2" color="text.secondary" component="p">
					{content}
				</Typography>
			</CardContent>
		</Card>
	);
};


export default RecordItem;
