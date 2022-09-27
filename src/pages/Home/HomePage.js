import UserList from "../../components/UserList/UserList";
import {Container} from "@mui/material";

function HomePage() {
	return (
		<div data-testid={"homepage"}>
			<Container maxWidth="sm">
				<UserList/>
			</Container>
		</div>
	);
}

export default HomePage;