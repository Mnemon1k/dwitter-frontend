import {createAsyncThunk} from "@reduxjs/toolkit/dist";
import {login, signup} from "../../api/apiCalls";

export const loginThunk = createAsyncThunk(
	"auth/login",
	async (credentials, store) => {
		try {
			return await login(credentials);
		} catch (error) {
			console.log(error?.response?.data?.message || error?.message || error);
			throw Error(error?.response?.data?.message || error?.message || error);
		}
	}
);

export const signupThunk = createAsyncThunk(
	"auth/register",
	async (data, store) => {
		try {
			return await signup(data);
		} catch (error) {
			console.log(error.response);
			throw Error(JSON.stringify(error?.response?.data?.validationErrors) || error?.response?.data?.message || error?.message);
		}
	}
);