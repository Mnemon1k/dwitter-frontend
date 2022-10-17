import CenterFocusStrongIcon from "@mui/icons-material/CenterFocusStrong";
import {Alert, Container, Stack, TextField} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

import {loginThunk} from "../../redux/auth/authThunk";
import {setLoginError} from "../../redux/auth/authSlice";

export const LoginPage = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const auth = useSelector((state) => state.auth);
	const formSubmit = () => dispatch(loginThunk({username, password}))
		.then((action) => {
			if (action.type === "auth/login/fulfilled")
				navigate("/")
		});

	useEffect(() => {
		if (auth.isLoggedIn)
			navigate("/");
	}, []);

	useEffect(() => {
		setUsername("");
		setPassword("");

		return () => {
			setUsername("");
			setPassword("");
			dispatch(setLoginError(null));
		};
	}, [auth.user]);

	return (
		<Container data-testid={"loginpage"} maxWidth="xs" className="full-height-centered">
			<Stack spacing={2} alignItems={"center"} width="100%">
				<CenterFocusStrongIcon className={"logo"}/>

				<h1>Login</h1>

				<TextField
					fullWidth
					size="small"
					value={username}
					onChange={(e) => {
						setUsername(e.target.value);
					}}
					name="username"
					label="Your username"
				/>
				<TextField
					fullWidth
					size="small"
					type="password"
					value={password}
					onChange={(e) => {
						setPassword(e.target.value)
					}}
					name="password"
					label="Your password"
				/>

				<LoadingButton
					onClick={formSubmit}
					loading={auth.loginLoading}
					size="large"
					loadingIndicator="Loading…"
					variant="contained"
					data-testid={"login-button"}
					disabled={username === "" || password === ""}
				>
					Login
				</LoadingButton>

				{auth.loginError && <Alert data-testid={"login-error"} severity="error">{auth.loginError}</Alert>}
			</Stack>
		</Container>
	);
};

export default LoginPage;
