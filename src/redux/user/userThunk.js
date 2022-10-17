import {createAsyncThunk} from "@reduxjs/toolkit";
import {getUser, updateUser} from "../../api/apiCalls";

export const fetchUserThunk = createAsyncThunk(
	"user/fetch",
	async (username, store) => {
		try {
			return await getUser(username);
		} catch (error) {
			console.log(error?.response?.data?.message || error?.message || error);
			throw Error(error?.response?.data?.message || error?.message);
		}
	}
);

export const updateUserThunk = createAsyncThunk(
	"user/update",
	async ({userId, body}, store) => {
		try {
			return await updateUser(userId, body);
		} catch (error) {
			console.log(error);
			throw Error(JSON.stringify(error?.response?.data?.validationErrors) || error?.response?.data?.message || error?.message);
		}
	}
);