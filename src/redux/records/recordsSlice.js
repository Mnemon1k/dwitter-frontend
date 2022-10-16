import {createSlice} from "@reduxjs/toolkit";
import {fetchPrevRecordsThunk, fetchRecordsThunk} from "./recordsThunk";

const initialState = {
	records: [],
	recordsLoading: true,
	moreRecordsLoading: false,
	recordsLoadingError: null,
	pagination: {}
};

export const recordsSlice = createSlice({
	name: "records",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
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

export const recordsReducer = recordsSlice.reducer;