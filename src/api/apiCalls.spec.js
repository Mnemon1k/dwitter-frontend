import axios from "axios";
import * as apiCalls from "./apiCalls";

describe('apiCalls', () => {
	describe('signup', () => {
		it('should calls /api/0.1/users', function () {
			const mockSignup = jest.fn();
			axios.post = mockSignup;
			apiCalls.signup();

			const path = mockSignup.mock.calls[0][0];
			expect(path).toBe('/api/1.0/users');
		});
	})

	describe('login', () => {
		it('should calls /api/0.1/login', function () {
			const mockSignup = jest.fn();
			axios.post = mockSignup;
			apiCalls.login({username: "test-user", password: "passworD1"});

			const path = mockSignup.mock.calls[0][0];
			expect(path).toBe('/api/1.0/login');
		});
	})
});