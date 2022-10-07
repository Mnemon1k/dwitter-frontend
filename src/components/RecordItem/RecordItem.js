import {Avatar, Card, CardContent, CardHeader, CardMedia} from "@mui/material";
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";

const RecordItem = ({post}) => {
	let date = new Date(post.date);


	return (
		<Card elevation={2} sx={{mt: 4}}>
			<CardHeader
				avatar={
					<Avatar
						sx={{width: 44, height: 44}}
						src={post?.user?.image && "/images/profile/" + post?.user?.image}
					/>
				}
				title={<Link to={"/users/" + post?.user?.username}>{post?.user?.username}</Link>}
				subheader={date.toLocaleDateString() + " | " + date.toLocaleTimeString()}
			/>

			{/*<CardMedia*/}
			{/*	component="img"*/}
			{/*	height="140"*/}
			{/*	image="https://pi.tedcdn.com/r/talkstar-photos.s3.amazonaws.com/uploads/72bda89f-9bbf-4685-910a-2f151c4f3a8a/NicolaSturgeon_2019T-embed.jpg?w=512"*/}
			{/*/>*/}

			<CardContent>
				<Typography variant="body2" color="text.secondary" component="p">
					{post.content}
				</Typography>
			</CardContent>
		</Card>
	);
};


export default RecordItem;
