import React from 'react';
import {Link} from "react-router-dom";
import Button from "@mui/material/Button";

function MenuLink({color, to, children, onClick}) {
	return (
		<Button onClick={onClick} sx={{color}}>
			<Link to={to}>{children}</Link>
		</Button>
	);
}

export default MenuLink;