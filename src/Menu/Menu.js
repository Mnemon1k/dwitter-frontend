import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CenterFocusStrongIcon from "@mui/icons-material/CenterFocusStrong";
import "./Menu.css"
import {Link} from "react-router-dom";

function Menu() {
	return (
		<Box sx={{display: 'flex'}}>
			<AppBar component="nav" className={"header"}>
				<Toolbar>
					<Typography
						variant="h6"
						sx={{flexGrow: 1}}
						className={"nav-logo"}
					>
						<CenterFocusStrongIcon/>
						Dwitter
					</Typography>
					<Box className={"menu"}>
						<Button sx={{color: '#fff'}}>
							<Link to={"/login"}>Login</Link>
						</Button>
						<Button sx={{color: '#fff'}}>
							<Link to={"/"}>Home</Link>
						</Button>
					</Box>
				</Toolbar>
			</AppBar>
		</Box>
	);
}


export default Menu;
