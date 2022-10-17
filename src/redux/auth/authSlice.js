import {createSlice} from "@reduxjs/toolkit";
import {loginThunk} from "./authThunk";
import {clearAuthorizationHeaderForToolkit, setAuthorizationHeaderForToolkit} from "../../api/apiCalls";
import {updateUserThunk} from "../user/userThunk";

let initialState = {
	user: {
		id: 0,
		username: "",
		displayName: "",
		image: ""
	},
	loginLoading: false,
	isLoggedIn: false,
	loginError: null
};

let localStorageAuth = localStorage.getItem("dwitter-auth");
let localStorageUser = localStorage.getItem("dwitter-user");

if (localStorageAuth && localStorageUser) {
	try {
		initialState.user = JSON.parse(localStorageUser);
		initialState.isLoggedIn = true;
		setAuthorizationHeaderForToolkit(localStorageAuth);
	} catch (e) {
	}
}

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		logout: (state, action) => {
			state.user = initialState.user;
			state.isLoggedIn = false;
			localStorage.removeItem("dwitter-auth");
			localStorage.removeItem("dwitter-user");
			clearAuthorizationHeaderForToolkit();
		}
	},
	extraReducers: (builder) => {
		builder
			// updateUserThunk
			.addCase(updateUserThunk.fulfilled, (state, action) => {
				state.user = action?.payload?.data;
				localStorage.setItem("dwitter-user", JSON.stringify(action?.payload?.data));
			})
			// loginThunk
			.addCase(loginThunk.pending, (state) => {
				state.loginLoading = true;
				state.loginError = null;
			})
			.addCase(loginThunk.fulfilled, (state, action) => {
				state.loginLoading = false;
				state.isLoggedIn = true;
				state.user = action?.payload?.data;

				const authValue = btoa(action.meta.arg.username + ":" + action.meta.arg.password);

				localStorage.setItem("dwitter-auth", authValue);
				localStorage.setItem("dwitter-user", JSON.stringify(action?.payload?.data));
				setAuthorizationHeaderForToolkit(authValue);
			})
			.addCase(loginThunk.rejected, (state, action) => {
				state.loginLoading = false;
				state.loginError = action?.error?.message;
				console.log(action);
			});
	},
});

export const {logout} = authSlice.actions;

export const authReducer = authSlice.reducer;