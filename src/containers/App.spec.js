import {act, fireEvent, render, screen, waitFor} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import App from "./App";

import {Provider} from "react-redux";
import axios from "axios";
import configureStore from "../redux/configureStore";
import * as apiCalls from "../api/apiCalls";

const renderApp = (path) => {
	const store = configureStore(false);

	render(
		<Provider store={store}>
			<MemoryRouter initialEntries={[path]}>
				<App/>
			</MemoryRouter>
		</Provider>);
}

const changeEvent = (content) => ({
	target: {value: content}
})

beforeEach(() => {
	localStorage.clear();
	delete axios.defaults.headers.common['Authorization'];

	apiCalls.getRecords = jest.fn().mockResolvedValue({
		data: {
			content: [],
			number: 0,
			size: 3
		}
	});

	apiCalls.getUsers = jest.fn().mockResolvedValue({
		data: {
			content: [],
			number: 0,
			size: 3
		}
	});

	apiCalls.getUser = jest.fn().mockResolvedValue({
		data: {
			id: 1,
			username: "user-1",
			displayName: "display-1",
			image: "profile.png"
		}
	});
});

describe("App", () => {
	it('should display home page when url is /', function () {
		renderApp("/");
		expect(screen.getByTestId("homepage")).toBeInTheDocument();
	});
	it('should display login page when url is /login', function () {
		renderApp("/login");
		expect(screen.getByTestId("loginpage")).toBeInTheDocument();
	});
	it('should display user page when url is /users', function () {
		renderApp("/users/user1");
		expect(screen.getByTestId("userpage")).toBeInTheDocument();
	});
	it('should display login page when url is /signup', function () {
		renderApp("/signup");
		expect(screen.getByTestId("signuppage")).toBeInTheDocument();
	});
	it('should display header on "/" url', function () {
		renderApp("/");
		const header = screen.getByTestId("header");
		expect(header).toBeInTheDocument();
	});
	it('should display header on "/login" url', function () {
		renderApp("/login");
		const header = screen.getByTestId("header");
		expect(header).toBeInTheDocument();
	});
	it('should display header on "/signup" url', function () {
		renderApp("/signup");
		const header = screen.getByTestId("header");
		expect(header).toBeInTheDocument();
	});
	it('should open signup page when clicking signup link', function () {
		renderApp("/");

		const link = screen.getByText("Login");
		fireEvent.click(link);
		const loginpage = screen.getByTestId("loginpage");
	});
	it('should display profile link on header after login success', async function () {
		renderApp("/login");

		const username = screen.getByLabelText('Your username');
		const password = screen.getByLabelText('Your password');
		const button = screen.getByTestId('login-button');
		axios.post = jest.fn().mockResolvedValue({
			data: {
				id: 1,
				username: "user1",
				displayName: "display-1",
				image: "href"
			}
		});

		await act(() => {
			fireEvent.change(username, changeEvent(("user1")));
			fireEvent.change(password, changeEvent(("1Password")));
			fireEvent.click(button);
		});

		await waitFor(() => {
			const link = screen.getByText("My profile");
			expect(link).toBeInTheDocument();
		})
	});
	it('should save logged in user data to localstorage', async function () {
		renderApp("/login");

		const username = screen.getByLabelText('Your username');
		const password = screen.getByLabelText('Your password');
		const button = screen.getByTestId('login-button');

		fireEvent.change(username, changeEvent(("user1")));
		fireEvent.change(password, changeEvent(("1Password")));

		axios.post = jest.fn().mockResolvedValue({
			data: {
				id: 1,
				username: "user1",
				displayName: "display-1",
				image: "href"
			}
		});

		fireEvent.click(button);
		await waitFor(() => screen.findByText("My profile"));
		const authData = JSON.parse(localStorage.getItem("dwitter-auth"));

		expect(authData).toEqual({
			id: 1,
			username: "user1",
			displayName: "display-1",
			image: "href",
			password: "1Password",
			isLoggedIn: true
		});
	});
});

