import axios from "axios";

export const BASE_PATH = "/api/1.0";
export const USERS_API_PATH = BASE_PATH + "/users";
export const RECORDS_API_PATH = BASE_PATH + "/records";


// Auth

export let login = (credentials) => {
	return axios.post(BASE_PATH + '/login', {}, {
		auth: credentials
	});
}

export let signup = (user) => {
	return axios.post(USERS_API_PATH, user);
};


// Users

export let updateUser = (userId, body) => {
	return axios.put(USERS_API_PATH + '/' + userId, body);
};


// NEW
export let getUsers = async (params) => {
	const defaultPage = 0;
	const defaultPageSize = 3;
	const response = axios.get(USERS_API_PATH + `?page=${params?.page || defaultPage}&size=${params?.size || defaultPageSize}`);

	return response?.data;
};

export let getUser = (username) => {
	return axios.get(USERS_API_PATH + `/${username}`);
};


//Records

export let createRecord = (record) => {
	return axios.post(RECORDS_API_PATH, record);
};

export let removeRecord = (recordId) => {
	return axios.delete(RECORDS_API_PATH + "/" + recordId);
};

// NEW
export const getRecords = async (params = {}) => {
	const {
		username,
		page = 0,
		size = 5
	} = params;

	// if username set path will bt /users/{username}/records?...pagintaionParams - and we get records by {usrename}
	// if username not set path will bt /records?...pagintaionParams - and we get records with pagination
	const path = username ? USERS_API_PATH + "/" + username + "/records" : RECORDS_API_PATH;
	const response = await axios.get(path + `?page=${page}&size=${size}&sort=id,desc`);

	return response?.data?.content;
};

// NEW
export let getPrevRecords = async (id, username) => {
	const query = "?direction=before&page=0&size=5&sort=id,desc";
	const basePath = `/api/1.0/records/${id}` + query;
	const userPath = `/api/1.0/users/${username}/records/${id}` + query;
	const response = await axios.get(username ? userPath : basePath);

	return response?.data;
};

// NEW
export let getNewRecords = async (id, username) => {
	const query = "?direction=after&sort=id,desc";
	const basePath = `/api/1.0/records/${id}` + query;
	const userPath = `/api/1.0/users/${username}/records/${id}` + query;
	const response = await axios.get(username ? userPath : basePath);

	return response?.data?.content;
};

export let getNewRecordsCount = (id, username) => {
	const query = "?direction=after&count=true";
	const basePath = `/api/1.0/records/${id}` + query;
	const userPath = `/api/1.0/users/${username}/records/${id}` + query;
	return axios.get(username ? userPath : basePath);
};


// Auth

export const setAuthorizationHeader = ({username, password, isLoggedIn}) => {
	if (isLoggedIn) {
		axios.defaults.headers.common['Authorization'] = `Basic ${btoa(username + ":" + password)}`
	} else {
		delete axios.defaults.headers.common['Authorization'];
	}
};