import axios from "axios";
import * as apiCalls from "./apiCalls";
import {BASE_PATH} from "./apiCalls";

describe('apiCalls', () => {
	describe('signup', () => {
		it('should calls /api/1.0`/users', function () {
			const mockSignup = jest.fn();
			axios.post = mockSignup;
			apiCalls.signup();

			const path = mockSignup.mock.calls[0][0];
			expect(path).toBe(BASE_PATH + '/users');
		});
	})

	describe('login', () => {
		it('should calls /api/1.0/login', function () {
			const mockSignup = jest.fn();
			axios.post = mockSignup;
			apiCalls.login({username: "test-user", password: "passworD1"});

			const path = mockSignup.mock.calls[0][0];
			expect(path).toBe(BASE_PATH + '/login');
		});
	})

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
	})
});
