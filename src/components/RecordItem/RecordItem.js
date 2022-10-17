import {Avatar, Card, CardContent, CardHeader} from "@mui/material";
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";
import RecordRemoveButton from "../RecordRemoveButton/RecordRemoveButton";

const RecordItem = ({post, removeAction}) => {
	let date = new Date(post.date);

	return (
		<Card elevation={2} sx={{mt: 4}}>
			<CardHeader
				action={removeAction && <RecordRemoveButton id={post.id}/>}
				avatar={
					<Avatar
						sx={{width: 44, height: 44}}
						src={post?.user?.image && "/images/profile/" + post?.user?.image}
					/>
				}
				title={
					<Link to={"/users/" + post?.user?.username}>{post?.user?.username}</Link>
				}
				subheader={date.toLocaleDateString() + " | " + date.toLocaleTimeString()}
			/>

			<CardContent>
				<Typography variant="body2" color="text.secondary" component="p">
					{post.content}
				</Typography>
			</CardContent>
		</Card>
	);
};


export default RecordItem;
