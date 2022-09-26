import {applyMiddleware, createStore} from "redux";
import authReducer from "./authReducer";
import thunk from "redux-thunk";
import {logger} from "redux-logger";
import {setAuthorizationHeader} from "../api/apiCalls";

export let initialState = {
	id: 0,
	username: "",
	displayName: "",
	image: "",
	password: "",
	isLoggedIn: false
};

const configureStore = (addLogger = true) => {
	let store;
	let localStorageData = localStorage.getItem("dwitter-auth");
	let state = initialState;

	if (localStorageData) {
		try {
			state = JSON.parse(localStorageData);
			setAuthorizationHeader(initialState);
		} catch (e) {
		}
	}

	if (addLogger) {
		store = createStore(authReducer, state, applyMiddleware(thunk, logger))
	} else {
		store = createStore(authReducer, state, applyMiddleware(thunk))
	}

	store.subscribe(() => {
		localStorage.setItem("dwitter-auth", JSON.stringify(store.getState()));
		setAuthorizationHeader(store.getState());
	});
	return store;
};

export default configureStore;