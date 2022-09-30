import {fireEvent, render, screen} from "@testing-library/react";
import Header from "./Header";
import {MemoryRouter} from "react-router-dom";

import {Provider} from "react-redux";
import {createStore} from "redux";
import authReducer from "../../redux/authReducer";

const initialState = {
	id: 0,
	username: "",
	displayName: "",
	image: "",
	password: "",
	isLoggedIn: false
};

const loggedInState = {
	id: 1,
	username: "user1",
	displayName: "display1",
	image: "href",
	password: "1Password",
	isLoggedIn: true
};

describe("Header", () => {
	const renderHeader = (state = initialState) => {
		const store = createStore(authReducer, state);
		render(
			<Provider store={store}>
				<MemoryRouter>
					<Header/>
				</MemoryRouter>
			</Provider>);
	}

	describe("Layout", () => {
		it('should have logo', function () {
			renderHeader();
			const logo = screen.getByText("Dwitter");
			expect(logo).toBeInTheDocument();
		});
		it('should have link on logo', function () {
			renderHeader();
			const logoLink = screen.getByText("Dwitter").closest('a');
			expect(logoLink.getAttribute("href")).toBe("/");
		});
		it('should have register link', function () {
			renderHeader();
			const link = screen.getByText("Register");
			expect(link).toBeInTheDocument();
			expect(link.getAttribute("href")).toBe("/signup");
		});
		it('should have login link', function () {
			renderHeader();
			const link = screen.getByText("Login");
			expect(link).toBeInTheDocument();
			expect(link.getAttribute("href")).toBe("/login");
		});
		it('should have logout link when user logged in', function () {
			renderHeader(loggedInState);
			const link = screen.getByText("Logout");
			expect(link).toBeInTheDocument();
		});
		it('should have profile link when user logged in', async function () {
			renderHeader(loggedInState);
			const link = screen.getByTestId("profile-link");
			expect(link).toBeInTheDocument();
			expect(link.getAttribute("href")).toBe("/users/" + loggedInState.username);
		});
		it('should display displayName when user is loggen in', async function () {
			renderHeader(loggedInState);
			expect(await screen.findByText(loggedInState.displayName)).toBeInTheDocument();
		});
		it('should display profile image', function () {
			renderHeader(loggedInState);
			expect(screen.getByTestId("header-profile-image")).toBeInTheDocument();
		});
		it('should show user dropdown menu on click', async function () {
			renderHeader(loggedInState);

			const menuButton = screen.getByLabelText("Open menu");
			fireEvent.click(menuButton);

			const menu = await screen.findByTestId("menu-appbar");
			expect(menu.className.includes("MuiModal-hidden")).toBeFalsy();
		});
	});

	describe("Interactions", () => {
		it('should display login and signup links when user logout', function () {
			renderHeader(loggedInState);
			const logoutLink = screen.getByText("Logout");
			fireEvent.click(logoutLink);

			const loginLink = screen.getByText("Login");
			const signupLink = screen.getByText("Register");

			expect(loginLink).toBeInTheDocument();
			expect(signupLink).toBeInTheDocument();
		});
	});
});

console.error = null;