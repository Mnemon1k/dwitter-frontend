import React from 'react';
import {Link} from "react-router-dom";
import Button from "@mui/material/Button";

function MenuLink(props) {
	return (
		<Button data-testid={props['data-testid']} onClick={props.onClick} sx={{color: props.color}}>
			<Link to={props.to}>{props.children}</Link>
		</Button>
	);
}

export default MenuLink;