import {connect} from "react-redux";

import MenuLink from "./MenuLink";
import {Link} from "react-router-dom";

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CenterFocusStrongIcon from "@mui/icons-material/CenterFocusStrong";

import "./Header.scss"
import {Avatar, Container, IconButton, Menu, MenuItem, Tooltip} from "@mui/material";
import {useState} from "react";
import {ArrowDropDown} from "@mui/icons-material";

function Header({user, dispatch}) {
	const onClickLogout = () => dispatch({type: "LOGOUT_SUCCESS"});

	const [anchorElUser, setAnchorElUser] = useState(null);
	const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
	const handleCloseUserMenu = () => setAnchorElUser(null);

	const getUserMenu = () => {
		if (user.isLoggedIn)
			return (<Box>
				<Tooltip title="Open menu">
					<IconButton color={"primary"} onClick={handleOpenUserMenu} sx={{p: 0}}>
						<Avatar data-testid={"header-profile-image"}
								src={user?.image && "/images/profile/" + user?.image}/>
						<Typography sx={{marginLeft: 1, fontSize: "14px"}}
									color={"white"}>{user?.displayName}</Typography>
						<ArrowDropDown sx={{color: "white"}}/>
					</IconButton>
				</Tooltip>
				<Menu sx={{mt: '45px'}}
					  id="menu-appbar"
					  data-testid={"menu-appbar"}
					  anchorEl={anchorElUser}
					  anchorOrigin={{
						  vertical: 'top',
						  horizontal: 'right',
					  }}
					  keepMounted
					  transformOrigin={{
						  vertical: 'top',
						  horizontal: 'right',
					  }}
					  open={Boolean(anchorElUser)}
					  onClose={handleCloseUserMenu}>
					<Link data-testid={"profile-link"} to={"/users/" + user.username}>
						<MenuItem onClick={handleCloseUserMenu}> My profile </MenuItem>
					</Link>
					<MenuItem onClick={() => {
						handleCloseUserMenu();
						onClickLogout();
					}}> Logout </MenuItem>
				</Menu>
			</Box>);

		return (<>
			<MenuLink color={"#fff"} to={"/login"}>Login</MenuLink>
			<MenuLink color={"#fff"} to={"/signup"}>Register</MenuLink>
		</>);
	}

	return (
		<AppBar elevation={0} data-testid={"header"} component="nav" className={"header"}>
			<Container maxWidth={"xl"}>
				<Toolbar disableGutters>
					<Typography variant="h6"
								sx={{flexGrow: 1}}
								className={"nav-logo"}>
						<Link to={"/"}>
							<CenterFocusStrongIcon/>
							Dwitter
						</Link>
					</Typography>
					<Box className={"menu"}>
						{getUserMenu()}
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
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
