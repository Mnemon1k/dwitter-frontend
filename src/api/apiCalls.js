import axios from "axios";

export const login = (credentials) => {
	return axios.post('/api/1.0/login', {}, {
		auth: credentials
	});

}


export const signup = (user) => {
	return axios.post('/api/1.0/users', user);
};