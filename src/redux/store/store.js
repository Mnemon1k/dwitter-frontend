import {configureStore} from "@reduxjs/toolkit";
import {recordsReducer} from "../records/recordsSlice";
import {authReducer} from "../auth/authSlice";
import {userReducer} from "../user/userSlice";

export const store = configureStore({
	reducer: {
		auth: authReducer,
		records: recordsReducer,
		user: userReducer,
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware({serializableCheck: false})
});