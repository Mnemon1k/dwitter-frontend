import {createSlice} from "@reduxjs/toolkit";
import {loginThunk} from "./authThunk";

const initialState = {
	user: {
		id: 0,
		username: "",
		displayName: "",
		image: "",
		password: "",
		isLoggedIn: false
	},
	loginLoading: false,
	loginError: null
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			// loginThunk
			.addCase(loginThunk.pending, (state) => {
				state.loginLoading = true;
				state.loginError = null;
			})
			.addCase(loginThunk.fulfilled, (state, {payload}) => {
				state.loginLoading = false;
				console.log(payload);
			})
			.addCase(loginThunk.rejected, (state, action) => {
				state.loginLoading = false;
				console.log(action)
				state.loginError = action?.error?.message;
			});
	},
});

export const authReducer = authSlice.reducer;