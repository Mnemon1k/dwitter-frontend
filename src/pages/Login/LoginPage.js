import {Container, Stack, TextField} from "@mui/material";
import Menu from "../../Menu/Menu";
import CenterFocusStrongIcon from "@mui/icons-material/CenterFocusStrong";
import LoadingButton from "@mui/lab/LoadingButton";
import {useState} from "react";
import {Alert} from "@mui/lab";

const LoginPage = (props) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [apiError, setApiError] = useState(null);
	const [loginPending, setLoginPending] = useState(false);

	const formSubmit = () => {
		setLoginPending(true);
		setApiError(null);
		props.actions.postLogin({
			username,
			password
		})
			.then((data) => {

			})
			.catch((error) => {
				setApiError(error?.response?.data?.message);
			})
			.finally(() => {
				setLoginPending(false);
			});
	};

	return (
		<Container maxWidth="xs" className="full-height-centered">
			<Stack spacing={2} alignItems={"center"} width="100%">
				<CenterFocusStrongIcon className={"logo"}/>

				<h1>Login</h1>

				<TextField
					fullWidth
					size="small"
					value={username}
					onChange={(e) => {
						setApiError(null);
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
						setApiError(null);
						setPassword(e.target.value)
					}}
					name="password"
					label="Your password"
				/>

				<LoadingButton
					onClick={formSubmit}
					loading={loginPending}
					size="large"
					loadingIndicator="Loading…"
					variant="contained"
					data-testid={"login-button"}
					disabled={username === "" || password === ""}
				>
					Login
				</LoadingButton>

				{apiError && <Alert severity="error">{apiError}</Alert>}
			</Stack>
		</Container>
	);
};

export default LoginPage;
