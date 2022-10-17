import {createAsyncThunk} from "@reduxjs/toolkit/dist";
import {createRecord, getPrevRecords, getRecords} from "../../api/apiCalls";

export const fetchRecordsThunk = createAsyncThunk(
	"records/fetch",
	async (username, store) => {
		try {
			return await getRecords({username});
		} catch (error) {
			console.log(error?.response?.data?.message || error?.message || error);
			throw Error(error?.response?.data?.message || error?.message);
		}
	}
);

export const fetchPrevRecordsThunk = createAsyncThunk(
	"records/fetch-prev-records",
	async ({id, username}, store) => {
		try {
			return await getPrevRecords(id, username);
		} catch (error) {
			console.log(error?.response?.data?.message || error?.message || error);
			throw Error(error?.response?.data?.message || error?.message);
		}
	}
);

export const addRecordThunk = createAsyncThunk(
	"records/add",
	async (post, store) => {
		try {
			return await createRecord(post);
		} catch (error) {
			console.log(error);
			throw Error(JSON.stringify(error?.response?.data?.validationErrors) || error?.response?.data?.message || error?.message);
		}
	}
);