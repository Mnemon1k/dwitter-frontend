import axios from "axios";

export const login = (credentials) => {
	return axios.post('/api/1.0/login', {}, {
		auth: credentials
	});
}

export const signup = (user) => {
	return axios.post('/api/1.0/users', user);
};

export const setAuthorizationHeader = ({username, password, isLoggedIn}) => {
	if (isLoggedIn) {
		axios.defaults.headers.common['Authorization'] = `Basic ${btoa(username + ":" + password)}`
	} else {
		delete axios.defaults.headers.common['Authorization'];
	}
};