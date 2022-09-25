import {fireEvent, render, screen, waitForElementToBeRemoved} from "@testing-library/react";
import LoginPage from "./LoginPage";
import {BrowserRouter, MemoryRouter, Route, Routes} from "react-router-dom";
import SignupPage from "../Signup/SignupPage";
import Header from "../../Menu/Header";
import {Provider} from "react-redux";
import {createStore} from "redux";
import authReducer from "../../redux/authReducer";
import configureStore from "../../redux/configureStore";

const mockedUsedNavigate = jest.fn();

// Mock navigate var of useNavigate() hook
jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => mockedUsedNavigate,
}));

describe("LoginPage", () => {
	const renderLoginPage = (props) => {
		const store = configureStore(false);

		render(<Provider store={store}>
				<MemoryRouter>
					<LoginPage {...props} />
				</MemoryRouter>
			</Provider>
		);
	}

	describe("Layout", () => {
		it('should have "Login in" heading', async function () {
			renderLoginPage();
			const heading = screen.getByRole('heading', {level: 1, name: 'Login'});
			expect(heading).toBeInTheDocument();
		});
		it('should have username input', async function () {
			renderLoginPage();
			expect(screen.getByLabelText('Your username')).toBeInTheDocument();
		});
		it('should have password input', async function () {
			renderLoginPage();
			expect(screen.getByLabelText('Your password')).toBeInTheDocument();
		});
		it('should have submit button', async () => {
			renderLoginPage();
			expect(screen.getAllByRole("button", {name: "Login"}).length).not.toBe(0);
		});
	});

	describe("Interactions", () => {
		const changeEvent = (content) => ({target: {value: content}});
		let button, username, password;

		const mockAsyncDelayed = () => {
			return jest.fn().mockImplementation(() => {
				return new Promise((resolve, reject) => {
					setTimeout(() => {
						resolve({});
					}, 300)
				})
			});
		};

		const setupForSubmit = (props) => {
			renderLoginPage(props);

			username = screen.getByLabelText('Your username');
			password = screen.getByLabelText('Your password');
			button = screen.getByTestId('login-button');

			fireEvent.change(username, changeEvent(("my-username")));
			fireEvent.change(password, changeEvent(("1My-password")));
		};
		it('should set the username value into state', async () => {
			renderLoginPage();
			const input = screen.getByLabelText('Your username');
			fireEvent.change(input, changeEvent("my-username"));
			expect(input).toHaveValue("my-username");
		});
		it('should set the password value into state', async () => {
			renderLoginPage();
			const input = screen.getByLabelText('Your password');
			fireEvent.change(input, changeEvent("1My-password"));
			expect(input).toHaveValue("1My-password");
		});
		it('should call postLogin when credentials in body', async () => {
			const actions = {postLogin: jest.fn().mockResolvedValueOnce({})};

			setupForSubmit({actions});
			fireEvent.click(button);

			const expectedUserObject = {
				username: "my-username",
				password: "1My-password"
			};

			expect(actions.postLogin).toHaveBeenCalledWith(expectedUserObject);
		});
		it('should enables the login button when username and password is not empty', async () => {
			setupForSubmit();
			expect(button).not.toBeDisabled();
		});
		it('should disable the login button when username is empty', async () => {
			setupForSubmit();
			fireEvent.change(username, changeEvent(""));
			expect(button).toBeDisabled();
		});
		it('should disable the login button when password is empty', async () => {
			setupForSubmit();
			fireEvent.change(password, changeEvent(""));
			expect(button).toBeDisabled();
		});
		it('should clear alert when username field was changed', async function () {
			const actions = {
				postLogin: jest.fn().mockRejectedValue({
					response: {
						data: {
							message: 'Login failed'
						}
					}
				})
			};
			setupForSubmit({actions});
			fireEvent.click(button);

			const errorMsg = await screen.findByText('Login failed');
			fireEvent.change(username, changeEvent("new-username"));
			expect(errorMsg).not.toBeInTheDocument();
		});
		it('should clear alert when password field was changed', async function () {
			const actions = {
				postLogin: jest.fn().mockRejectedValue({
					response: {
						data: {
							message: 'Login failed'
						}
					}
				})
			};
			setupForSubmit({actions});
			fireEvent.click(button);

			const errorMsg = await screen.findByText('Login failed');
			fireEvent.change(password, changeEvent("new-password"));
			expect(errorMsg).not.toBeInTheDocument();
		});
		it('should display spinner when there is an ongoing api call', () => {
			const actions = {
				postLogin: mockAsyncDelayed()
			};
			setupForSubmit({actions});
			fireEvent.click(button);
			const spinner = screen.getByText('Loading…');
			expect(spinner).toBeInTheDocument();
		});
		it('should redirect to homepage after successful login', async () => {
			const actions = {
				postLogin: jest.fn().mockResolvedValue({})
			};

			setupForSubmit({actions});
			fireEvent.click(button);
			const spinner = screen.getByText('Loading…');

			await waitForElementToBeRemoved(spinner);

			// TODO: test navigate("/") function

			// expect(mockedUsedNavigate).toBeCalledWith("/");
		});
	})
});