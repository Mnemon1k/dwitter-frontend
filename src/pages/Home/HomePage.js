import UserList from "../../components/UserList/UserList";
import {Container, Typography} from "@mui/material";

function HomePage() {
	return (
		<Container className={"padding-md text-center"} data-testid={"homepage"} maxWidth="sm">
			<Typography component="h4" variant="h4">
				Users
			</Typography>
			<UserList/>
		</Container>
	);
}

export default HomePage;