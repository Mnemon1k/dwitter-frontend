import {configureStore} from "@reduxjs/toolkit";
import {recordsReducer} from "../records/recordsSlice";
import {authReducer} from "../auth/authSlice";

export const store = configureStore({
	reducer: {
		auth: authReducer,
		records: recordsReducer,
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware({serializableCheck: false})
});