import {createSlice} from "@reduxjs/toolkit";
import {addRecordThunk, fetchPrevRecordsThunk, fetchRecordsThunk} from "./recordsThunk";
import {authSlice, logout} from "../auth/authSlice";

const initialState = {
	records: [],
	recordsLoading: true,
	moreRecordsLoading: false,
	newRecordLoading: false,
	newRecordError: null,
	recordsLoadingError: null,
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