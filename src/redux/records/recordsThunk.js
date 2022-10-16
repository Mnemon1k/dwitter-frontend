import {createAsyncThunk} from "@reduxjs/toolkit/dist";
import {getPrevRecords, getRecords} from "../../api/apiCalls";

export const fetchRecordsThunk = createAsyncThunk(
	"records/fetch",
	(username, store) => {
		try {
			return getRecords({username});
		} catch (error) {
			console.log(error?.response?.data?.message || error?.message || error);
			throw Error(error?.response?.data?.message || error?.message);
		}
	}
);

export const fetchPrevRecordsThunk = createAsyncThunk(
	"records/fetch-prev-records",
	({id, username}, store) => {

		try {
			return getPrevRecords(id, username);
		} catch (error) {
			console.log(error?.response?.data?.message || error?.message || error);
			throw Error(error?.response?.data?.message || error?.message);
		}
	}
);