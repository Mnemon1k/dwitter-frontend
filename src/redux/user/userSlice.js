import {createSlice} from "@reduxjs/toolkit";
import {fetchUserThunk, updateUserThunk} from "../user/userThunk";
import {logout} from "../auth/authSlice";

const initialState = {
	data: {
		id: 0,
		username: "",
		displayName: "",
		image: ""
	},

	usersList: [],
	usersListLoading: false,
	usersListLoadingError: null,

	userLoading: false,
	userLoadingError: null,

	userUpdating: false,
	userUpdatingError: null,

	isEditMode: false,
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUserUpdatingError: (state, {payload}) => {
			state.userUpdatingError = payload;
		},
		setEditMode: (state, {payload}) => {
			state.isEditMode = payload;
			state.userUpdatingError = null;
		},
		resetUserState: (state) => {
			Object.assign(state, {...initialState});
		}
	},
	extraReducers: (builder) => {
		builder
			// logout
			.addCase(logout, (state) => {
				state.isEditMode = false;
			})
			// updateUserThunk
			.addCase(updateUserThunk.pending, (state) => {
				state.userUpdating = true;
				state.userUpdatingError = null;
			})
			.addCase(updateUserThunk.fulfilled, (state, action) => {
				state.userUpdating = false;
				state.isEditMode = false;
				state.data = action?.payload?.data;
			})
			.addCase(updateUserThunk.rejected, (state, {error}) => {
				state.userUpdating = false;
				try {
					state.userUpdatingError = JSON.parse(error?.message);
				} catch (e) {
					state.userUpdatingError = error?.message;
				}
				console.log(error);
			})

			// fetchUserThunk
			.addCase(fetchUserThunk.pending, (state) => {
				state.userLoading = true;
				state.userLoadingError = null;
			})
			.addCase(fetchUserThunk.fulfilled, (state, action) => {
				state.userLoading = false;
				state.data = action?.payload?.data;
			})
			.addCase(fetchUserThunk.rejected, (state, action) => {
				state.userLoading = false;
				state.userLoadingError = action?.error?.message;
				console.log(action);
			});
	},
});

export const {setEditMode, resetUserState, setUserUpdatingError} = userSlice.actions;

export const userReducer = userSlice.reducer;