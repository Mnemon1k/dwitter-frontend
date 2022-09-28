import axios from "axios";

export const BASE_PATH = "/api/1.0";

export let login = (credentials) => {
	return axios.post(BASE_PATH + '/login', {}, {
		auth: credentials
	});
}

export let signup = (user) => {
	return axios.post(BASE_PATH + '/users', user);
};

export let getUsers = (params) => {
	const defaultPage = 0;
	const defaultPageSize = 3;
	return axios.get(BASE_PATH + `/users?page=${params?.page || defaultPage}&size=${params?.size || defaultPageSize}`);
};

export let getUser = (username) => {
	return axios.get(BASE_PATH + `/users/${username}`);
};


export const setAuthorizationHeader = ({username, password, isLoggedIn}) => {
	if (isLoggedIn) {
		axios.defaults.headers.common['Authorization'] = `Basic ${btoa(username + ":" + password)}`
	} else {
		delete axios.defaults.headers.common['Authorization'];
	}
};