import {useState} from "react";
import {Container, Stack, TextField} from "@mui/material";
import CenterFocusStrongIcon from '@mui/icons-material/CenterFocusStrong';
import "./SignupPage.css"
import LoadingButton from '@mui/lab/LoadingButton';
import {useNavigate} from "react-router-dom";
import {connect} from "react-redux";
import {signupHandler} from "../../redux/authActions";

export function SignupPage({actions}) {
	const [displayName, setDisplayName] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [passwordRepeat, setPasswordRepeat] = useState("");
	const [singupPending, setSingupPending] = useState(false);
	const [validationErrors, setValidationErrors] = useState({});
	const navigate = useNavigate();

	const formSubmit = () => {
		const user = {username, displayName, password, passwordRepeat};
		setSingupPending(true);
		actions?.postSignup(user)
			.then((data) => {
				setValidationErrors({});
				setUsername("");
				setDisplayName("");
				setPassword("");
				setPasswordRepeat("");
				navigate("/");
			})
			.catch(({response}) => {
				if (response?.data?.validationErrors) {
					setValidationErrors(response.data.validationErrors);
				}
			})
			.finally(() => setSingupPending(false));
	};

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
						setUsername(e.target.value);
						delete validationErrors.username;
						setValidationErrors({...validationErrors, username: null})
					}}
					name="username"
					label="Your username"
					helperText={validationErrors?.username}
					error={!!validationErrors?.username}
				/>
				<TextField
					label="Your display name"
					fullWidth
					size="small"
					value={displayName}
					onChange={(e) => {
						setDisplayName(e.target.value);
						setValidationErrors({...validationErrors, displayName: null});
					}}
					name="displayName"
					helperText={validationErrors?.displayName}
					error={!!validationErrors?.displayName}
				/>
				<TextField
					fullWidth
					size="small"
					type="password"
					value={password}
					onChange={(e) => {
						setPassword(e.target.value)
						setValidationErrors({
							...validationErrors,
							password: null,
							passwordRepeat: passwordRepeat === e.target.value ? null : "Does not match to password."
						})
					}}
					name="password"
					label="Your password"
					helperText={validationErrors?.password}
					error={!!validationErrors?.password}
				/>
				<TextField
					fullWidth
					size="small"
					type="password"
					value={passwordRepeat}
					onChange={(e) => {
						setPasswordRepeat(e.target.value)
						setValidationErrors({
							...validationErrors,
							passwordRepeat: password === e.target.value ? null : "Does not match to password."
						})
					}}
					name="passwordRepeat"
					label="Repeat your password"
					helperText={validationErrors?.passwordRepeat}
					error={!!validationErrors?.passwordRepeat}
				/>

				<LoadingButton
					onClick={formSubmit}
					loading={singupPending}
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

const mapDispatchToProps = (dispatch) => {
	return {
		actions: {
			postSignup: (user) => dispatch(signupHandler(user))
		}
	}

}

export default connect(null, mapDispatchToProps)(SignupPage);