import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import App from "./App";

import {Provider} from "react-redux";
import axios from "axios";
import configureStore from "../redux/configureStore";


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
	it('should display login page when url is /user', function () {
		renderApp("/user");
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
	it('should display header on "/user" url', function () {
		renderApp("/user");
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

		fireEvent.change(username, changeEvent(("user1")));
		fireEvent.change(password, changeEvent(("1Password")));

		axios.post = jest.fn().mockResolvedValue({
			data: {
				id: 1,
				username: "user1",
				displayName: "display1",
				image: "href"
			}
		});

		fireEvent.click(button);
		await waitFor(() => {
			const link = screen.getByText("My profile");
			expect(link).toBeInTheDocument();
		})
	});
	it('should display profile link on header after signup success', async function () {
		renderApp("/signup");

		const displayName = screen.getByLabelText("Your display name");
		const username = screen.getByLabelText('Your username');
		const password = screen.getByLabelText('Repeat your password');
		const passwordRepeat = screen.getByLabelText('Your password');
		const button = screen.getByTestId('signup-button');
		fireEvent.change(displayName, changeEvent(("User Name")));
		fireEvent.change(username, changeEvent(("user12")));
		fireEvent.change(password, changeEvent(("1Password")));
		fireEvent.change(passwordRepeat, changeEvent(("1Password")));
		axios.post = jest.fn().mockResolvedValueOnce({
			data: {
				message: "User saved"
			}
		});
		axios.post = jest.fn().mockResolvedValueOnce({
			data: {
				id: 1,
				username: "user1",
				displayName: "display1",
				image: "href"
			}
		});

		fireEvent.click(button);

		await waitFor(() => {
			const link = screen.getByTestId("qwe");
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
				displayName: "display1",
				image: "href"
			}
		});

		fireEvent.click(button);
		await waitFor(() => screen.findByText("My profile"));
		const authData = JSON.parse(localStorage.getItem("dwitter-auth"));

		expect(authData).toEqual({
			id: 1,
			username: "user1",
			displayName: "display1",
			image: "href",
			password: "1Password",
			isLoggedIn: true
		});
	});
});