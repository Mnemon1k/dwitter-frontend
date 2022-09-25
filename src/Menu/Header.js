import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CenterFocusStrongIcon from "@mui/icons-material/CenterFocusStrong";
import "./Header.scss"
import MenuLink from "./MenuLink";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import Button from "@mui/material/Button";

function Header({user, dispatch}) {
	const onClickLogout = () => {
		const action = {
			type: "LOGOUT_SUCCESS"
		};

		dispatch(action);
	}

	const getAuthLinks = () => {
		if (user.isLoggedIn)
			return (
				<>
					<Button onClick={onClickLogout} sx={{color: "#fff"}}>
						Logout
					</Button>
					<MenuLink data-testid={"qwe"} color={"#fff"} to={"/" + user.username}>My profile</MenuLink>
				</>
			);

		return (
			<>
				<MenuLink color={"#fff"} to={"/login"}>Login</MenuLink>
				<MenuLink color={"#fff"} to={"/signup"}>Register</MenuLink>
			</>
		);
	}

	return (
		<Box sx={{display: 'flex'}}>
			<AppBar data-testid={"header"} component="nav" className={"header"}>
				<Toolbar>
					<Typography
						variant="h6"
						sx={{flexGrow: 1}}
						className={"nav-logo"}
					>
						<Link to={"/"}>
							<CenterFocusStrongIcon/>
							Dwitter
						</Link>
					</Typography>
					<Box className={"menu"}>
						<MenuLink color={"#fff"} to={"/"}>Home</MenuLink>
						{getAuthLinks()}
					</Box>
				</Toolbar>
			</AppBar>
		</Box>
	);
}

function mapStateToProps(state) {
	return {
		user: state
	};
}

export default connect(
	mapStateToProps,
)(Header);
