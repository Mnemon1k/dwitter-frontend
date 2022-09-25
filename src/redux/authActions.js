import {login, signup} from "../api/apiCalls";

export const loginSuccess = (payload) => {
	return {
		type: "LOGIN_SUCCESS",
		payload
	}
}

export const loginHandler = (credentials) => {
	return function (dispatch) {
		return login(credentials)
			.then(response => {
				dispatch(loginSuccess({
					...response.data,
					password: credentials.password
				}));
				return response;
			});
	}
}

export const signupHandler = (user) => {
	return function (dispatch) {
		return signup(user)
			.then((response) => {
				return dispatch(loginHandler((user)));
			})
	}
}