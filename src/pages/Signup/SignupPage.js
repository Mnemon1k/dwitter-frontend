import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {Container, Stack, TextField} from "@mui/material";
import CenterFocusStrongIcon from '@mui/icons-material/CenterFocusStrong';
import LoadingButton from '@mui/lab/LoadingButton';

import {loginThunk, signupThunk} from "../../redux/auth/authThunk";
import {setSignupError} from "../../redux/auth/authSlice";

import "./SignupPage.css"

export function SignupPage() {
	const [displayName, setDisplayName] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [passwordRepeat, setPasswordRepeat] = useState("");
	const navigate = useNavigate();

	const dispatch = useDispatch();
	const {signupLoading, loginLoading, signupErrors, isLoggedIn} = useSelector((state) => state.auth);

	const formSubmit = () => {
		dispatch(signupThunk({username, displayName, password, passwordRepeat}))
			.then((action) => {
				if (action.type === "auth/register/fulfilled") {
					dispatch(loginThunk({
						username: action?.meta?.arg?.username,
						password: action?.meta?.arg?.password
					}))
						.then((action) => {
							if (action.type === "auth/login/fulfilled")
								navigate("/");
						});
				}
			});
	};

	useEffect(() => {
		if (isLoggedIn)
			navigate("/");

		return () => {
			setUsername("");
			setDisplayName("");
			setPassword("");
			setPasswordRepeat("");
			dispatch(setSignupError(null));
		};
	}, [navigate, isLoggedIn, dispatch]);

	return (
		<Container data-testid={"signuppage"} maxWidth="xs" className="full-height-centered">
			<Stack spacing={2} alignItems={"center"} width="100%">
				<CenterFocusStrongIcon className={"logo"}/>

				<h1>Sign up</h1>

				<TextField
					fullWidth
					size="small"
					value={username}
					onChange={(e) => {
						setUsername(e?.target?.value);
						if (signupErrors?.username)
							dispatch(setSignupError({...signupErrors, username: null}));
					}}
					name="username"
					label="Your username"
					helperText={signupErrors?.username}
					error={!!signupErrors?.username}
				/>
				<TextField
					label="Your display name"
					fullWidth
					size="small"
					value={displayName}
					onChange={(e) => {
						setDisplayName(e?.target?.value);
						if (signupErrors?.displayName)
							dispatch(setSignupError({...signupErrors, displayName: null}));
					}}
					name="displayName"
					helperText={signupErrors?.displayName}
					error={!!signupErrors?.displayName}
				/>
				<TextField
					fullWidth
					size="small"
					type="password"
					value={password}
					onChange={(e) => {
						setPassword(e?.target?.value)
						dispatch(setSignupError({
							...signupErrors,
							password: null,
							passwordRepeat: passwordRepeat === e?.target?.value ? null : "Does not match to password."
						}));
					}}
					name="password"
					label="Your password"
					helperText={signupErrors?.password}
					error={!!signupErrors?.password}
				/>
				<TextField
					fullWidth
					size="small"
					type="password"
					value={passwordRepeat}
					onChange={(e) => {
						setPasswordRepeat(e?.target?.value)
						dispatch(setSignupError({
							...signupErrors,
							passwordRepeat: password === e?.target?.value ? null : "Does not match to password."
						}));
					}}
					name="passwordRepeat"
					label="Repeat your password"
					helperText={signupErrors?.passwordRepeat}
					error={!!signupErrors?.passwordRepeat}
				/>

				<LoadingButton
					onClick={formSubmit}
					loading={signupLoading || loginLoading}
					size="large"
					disabled={!((password === passwordRepeat) && (password !== "" || passwordRepeat !== ""))}
					loadingIndicator="Loading…"
					variant="contained"
					data-testid={"signup-button"}
				>
					Sign up
				</LoadingButton>
			</Stack>
		</Container>
	);
}

export default SignupPage;