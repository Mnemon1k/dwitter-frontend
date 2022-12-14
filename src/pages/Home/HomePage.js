import UserList from "../../components/UserList/UserList";
import RecordsFeed from "../../components/RecordsFeed/RecordsFeed";
import {Container, Grid, Typography} from "@mui/material";

function HomePage() {
	return (
		<Container className={"padding-md "}
				   data-testid={"homepage"}
				   maxWidth="lg">
			<Grid container
				  justifyContent={"space-between"}
				  spacing={4}>
				<Grid item xs={12} md={7}>
					<RecordsFeed submitForm/>
				</Grid>
				<Grid item lg={4} xs={12} md={5}>
					<Typography component="h5"
								variant="h5">
						Users
					</Typography>
					<UserList/>
				</Grid>
			</Grid>
		</Container>
	);
}

export default HomePage;




