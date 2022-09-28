import axios from "axios";

export const BASE_PATH = "/api/1.0";
export const USERS_API_PATH = BASE_PATH + "/users";

export const login = (credentials) => {
	return axios.post(BASE_PATH + '/login', {}, {
		auth: credentials
	});
}

export const signup = (user) => {
	return axios.post(USERS_API_PATH, user);
};

export const updateUser = (userId, body) => {
	return axios.put(USERS_API_PATH + '/' + userId, body);
};

export const getUsers = (params) => {
	const defaultPage = 0;
	const defaultPageSize = 3;
	return axios.get(USERS_API_PATH + `?page=${params?.page || defaultPage}&size=${params?.size || defaultPageSize}`);
};

export const getUser = (username) => {
	return axios.get(USERS_API_PATH + `/${username}`);
};


export const setAuthorizationHeader = ({username, password, isLoggedIn}) => {
	if (isLoggedIn) {
		axios.defaults.headers.common['Authorization'] = `Basic ${btoa(username + ":" + password)}`
	} else {
		delete axios.defaults.headers.common['Authorization'];
	}
};