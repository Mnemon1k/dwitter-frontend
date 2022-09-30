import {initialState} from "./configureStore";

export default function authReducer(state, action) {
	switch (action.type) {
		case "LOGOUT_SUCCESS":
			return {...initialState};

		case "LOGIN_SUCCESS":
			return {
				...action.payload,
				isLoggedIn: true
			};
		case "UPDATE_SUCCESS":
			return {
				...state,
				...action.payload.user
			}

		default:
			return state;
	}
}