import {createSlice} from "@reduxjs/toolkit";
import {addRecordThunk, fetchPrevRecordsThunk, fetchRecordsThunk, removeRecordThunk} from "./recordsThunk";
import {logout} from "../auth/authSlice";
import {updateUserThunk} from "../user/userThunk";

const initialState = {
	records: [],
	recordsLoading: true,
	recordsLoadingError: null,

	moreRecordsLoading: false,

	newRecordLoading: false,
	newRecordError: null,

	removeRecordLoading: false,
	removeRecordError: null,

	pagination: {}
};

export const recordsSlice = createSlice({
	name: "records",
	initialState,
	reducers: {
		setNewRecordError: (state, {payload}) => {
			state.newRecordError = payload;
		}
	},
	extraReducers: (builder) => {
		builder
			// updateUserThunk
			.addCase(updateUserThunk.fulfilled, (state, action) => {
				state.records = state.records.map((record) => {
					if (record.user.id === action?.payload?.data?.id) {
						return {...record, user: action?.payload?.data}
					}
					return record
				});
			})

			// logout
			.addCase(logout, (state) => {
				state.newRecordError = null;
				state.recordsLoadingError = null;
			})

			// addRecordThunk
			.addCase(addRecordThunk.pending, (state) => {
				state.newRecordLoading = true;
				state.newRecordError = null;
			})
			.addCase(addRecordThunk.fulfilled, (state, {payload}) => {
				state.newRecordLoading = false;
				state.records = [payload?.data, ...state.records];
			})
			.addCase(addRecordThunk.rejected, (state, {error}) => {
				state.newRecordLoading = false;
				try {
					state.newRecordError = JSON.parse(error?.message);
				} catch (e) {
					state.newRecordError = error?.message;
				}
			})

			// removeRecordThunk
			.addCase(removeRecordThunk.pending, (state) => {
				state.removeRecordLoading = true;
				state.removeRecordError = null;
			})
			.addCase(removeRecordThunk.fulfilled, (state, payload) => {
				state.removeRecordLoading = false;
				state.records = state.records.filter(record => record.id !== payload?.meta?.arg);
			})
			.addCase(removeRecordThunk.rejected, (state, {error}) => {
				state.removeRecordLoading = false;
				alert(error?.message);
			})

			// fetchPrevRecordsThunk
			.addCase(fetchPrevRecordsThunk.pending, (state) => {
				state.moreRecordsLoading = true;
				state.recordsLoadingError = null;
			})
			.addCase(fetchPrevRecordsThunk.fulfilled, (state, {payload}) => {
				state.moreRecordsLoading = false;
				state.pagination = {last: payload.data.last};
				state.records = [...state.records, ...payload?.data?.content];
			})
			.addCase(fetchPrevRecordsThunk.rejected, (state, action) => {
				state.moreRecordsLoading = false;
				state.recordsLoadingError = action?.error?.message;
			})

			// fetchRecordsThunk
			.addCase(fetchRecordsThunk.pending, (state) => {
				state.recordsLoading = true;
				state.recordsLoadingError = null;
				state.newRecordError = null;
			})
			.addCase(fetchRecordsThunk.fulfilled, (state, {payload}) => {
				state.recordsLoading = false;
				state.pagination = {last: payload.data.last};
				state.records = payload?.data?.content;
			})
			.addCase(fetchRecordsThunk.rejected, (state, action) => {
				state.recordsLoading = false;
				state.recordsLoadingError = action?.error?.message;
			});
	},
});
export const {setNewRecordError} = recordsSlice.actions;

export const recordsReducer = recordsSlice.reducer;