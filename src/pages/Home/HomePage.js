import UserList from "../../components/UserList/UserList";
import {Container, Grid, Typography} from "@mui/material";
import RecordSubmit from "../../components/RecordSubmit/RecordSubmit";
import {connect} from "react-redux";
import RecordsFeed from "../../components/RecordsFeed/RecordsFeed";

function HomePage({user}) {
	return (
		<Container className={"padding-md "}
				   data-testid={"homepage"}
				   maxWidth="lg">
			<Grid container
				  justifyContent={"space-between"}
				  spacing={4}>
				<Grid item xs={12} md={7}>
					{user.isLoggedIn && <RecordSubmit/>}
					<RecordsFeed/>
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

function mapStateToProps(state) {
	return {user: state};
}

export default connect(
	mapStateToProps,
)(HomePage);




