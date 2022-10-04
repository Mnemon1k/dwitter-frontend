import axios from "axios";
import * as apiCalls from "./apiCalls";
import {BASE_PATH, RECORDS_API_PATH} from "./apiCalls";

describe('apiCalls', () => {
	describe('signup', () => {
		it('should calls /api/1.0`/users', function () {
			const mockSignup = jest.fn();
			axios.post = mockSignup;
			apiCalls.signup();

			const path = mockSignup.mock.calls[0][0];
			expect(path).toBe(BASE_PATH + '/users');
		});
	});
	describe('login', () => {
		it('should calls /api/1.0/login', function () {
			const mockSignup = jest.fn();
			axios.post = mockSignup;
			apiCalls.login({username: "test-user", password: "passworD1"});

			const path = mockSignup.mock.calls[0][0];
			expect(path).toBe(BASE_PATH + '/login');
		});
	});
	describe('getUsers', () => {
		it('should calls /api/1.0/users?page=0&size=3 when no param provided for getUsers', function () {
			const mockGetUsers = jest.fn();
			axios.get = mockGetUsers;
			apiCalls.getUsers();

			const path = mockGetUsers.mock.calls[0][0];
			expect(path).toBe(BASE_PATH + '/users?page=0&size=3');
		});
		it('should calls /api/1.0/users?page=5&size=10 when param provided for getUsers', function () {
			const mockGetUsers = jest.fn();
			axios.get = mockGetUsers;
			apiCalls.getUsers({page: 5, size: 10});

			const path = mockGetUsers.mock.calls[0][0];
			expect(path).toBe(BASE_PATH + '/users?page=5&size=10');
		});
		it('should calls /api/1.0/users?page=5&size=3 when only page param provided for getUsers', function () {
			const mockGetUsers = jest.fn();
			axios.get = mockGetUsers;
			apiCalls.getUsers({page: 5});

			const path = mockGetUsers.mock.calls[0][0];
			expect(path).toBe(BASE_PATH + '/users?page=5&size=3');
		});
		it('should calls /api/1.0/users?page=0&size=10 when only size param provided for getUsers', function () {
			const mockGetUsers = jest.fn();
			axios.get = mockGetUsers;
			apiCalls.getUsers({size: 10});

			const path = mockGetUsers.mock.calls[0][0];
			expect(path).toBe(BASE_PATH + '/users?page=0&size=10');
		});
	});
	describe("getUser", () => {
		it('should calls /api/1.0/users/user-5 when user-5 is provided for getUser', function () {
			const mockGetUser = jest.fn();
			axios.get = mockGetUser;
			apiCalls.getUser("user-5")
			expect(mockGetUser).toBeCalledTimes(1);
		});
	});
	describe("updateUser", () => {
		it('should calls /api/1.0/users/5 when 5 is provided for updateUser', function () {
			const mockUpdate = jest.fn();
			const usrIdToUpdate = 5;
			axios.put = mockUpdate;
			apiCalls.updateUser(usrIdToUpdate);

			const path = mockUpdate.mock.calls[0][0];
			expect(path).toBe(BASE_PATH + '/users/' + usrIdToUpdate);
		});
	});
	describe('createRecord', () => {
		it('should calls /api/1.0/records', function () {
			const mockCreateRecord = jest.fn();
			axios.post = mockCreateRecord;
			apiCalls.createRecord({content: "lorem lorem lorem"});

			const path = mockCreateRecord.mock.calls[0][0];
			expect(path).toBe(RECORDS_API_PATH);
		});
	});
	describe('loadRecords', () => {
		it('should calls /api/1.0/records?page=0&size=5&sort=id,desc when no param provided', function () {
			const mockGetRecords = jest.fn();
			axios.get = mockGetRecords;
			apiCalls.getRecords();

			const path = mockGetRecords.mock.calls[0][0];
			expect(path).toBe("/api/1.0/records?page=0&size=5&sort=id,desc");
		});
		it('should calls /api/1.0/users/user1/records?page=0&size=5&sort=id,desc when user param provided', function () {
			const mockGetRecords = jest.fn();
			axios.get = mockGetRecords;
			apiCalls.getRecords({username: "user1"});

			const path = mockGetRecords.mock.calls[0][0];
			expect(path).toBe("/api/1.0/users/user1/records?page=0&size=5&sort=id,desc");
		});
	});
});
