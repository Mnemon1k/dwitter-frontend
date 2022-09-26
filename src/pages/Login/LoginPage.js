import {Container, Stack, TextField} from "@mui/material";
import CenterFocusStrongIcon from "@mui/icons-material/CenterFocusStrong";
import LoadingButton from "@mui/lab/LoadingButton";
import {useState} from "react";
import {Alert} from '@mui/material';
import {useNavigate} from "react-router-dom";
import {connect} from "react-redux";
import {loginHandler} from "../../redux/authActions";

export const LoginPage = ({actions, dispatch}) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [apiError, setApiError] = useState(null);
	const [loginPending, setLoginPending] = useState(false);
	const navigate = useNavigate();

	const formSubmit = () => {
		setLoginPending(true);
		setApiError(null);
		actions.postLogin({
			username,
			password
		})
			.then((response) => {
				navigate("/");
			})
			.catch((error) => {
				setApiError(error?.response?.data?.message);
			})
			.finally(() => {
				setLoginPending(false);
			});
	};

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

				{apiError && <Alert data-testid={"login-error"} severity="error">{apiError}</Alert>}
			</Stack>
		</Container>
	);
};

LoginPage.defaultProps = {
	actions: {
		postLogin: () => new Promise((resolve, reject) => resolve({}))
	},
	dispatch: () => {
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions: {
			postLogin: (body) => dispatch(loginHandler(body))
		}
	};
}

export default connect(null, mapDispatchToProps)(LoginPage);
