import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import LoginPage from "./LoginPage";

describe("LoginPage", () => {
	describe("Layout", () => {
		it('should have "Login in" heading', async function () {
			render(<LoginPage/>);
			const heading = screen.getByRole('heading', {level: 1, name: 'Login'});
			expect(heading).toBeInTheDocument();
		});

		it('should have username input', async function () {
			render(<LoginPage/>);
			expect(screen.getByLabelText('Your username')).toBeInTheDocument();
		});

		it('should have password input', async function () {
			render(<LoginPage/>);
			expect(screen.getByLabelText('Your password')).toBeInTheDocument();
		});

		it('should have submit button', async () => {
			render(<LoginPage/>);
			expect(screen.getAllByRole("button", {name: "Login"}).length).not.toBe(0);
		});
	});

	describe("Interactions", () => {
		const changeEvent = (content) => ({target: {value: content}})
		let button, username, password, loginForm;

		const mockAsyncDelayed = () => {
			return jest.fn().mockImplementation(() => {
				return new Promise((resolve, reject) => {
					setTimeout(() => {
						resolve({});
					}, 300)
				})
			});
		}

		const setupForSubmit = (props) => {
			render(<LoginPage {...props} />);

			username = screen.getByLabelText('Your username');
			password = screen.getByLabelText('Your password');
			button = screen.getByTestId('login-button');

			fireEvent.change(username, changeEvent(("my-username")));
			fireEvent.change(password, changeEvent(("1My-password")));
		};
		it('should set the username value into state', async () => {
			render(<LoginPage/>);
			const input = screen.getByLabelText('Your username');
			fireEvent.change(input, changeEvent("my-username"));
			expect(input).toHaveValue("my-username");
		});
		it('should set the password value into state', async () => {
			render(<LoginPage/>);
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
		it('displays spinner when there is an ongoing api call', () => {
			const actions = {
				postLogin: mockAsyncDelayed()
			};
			setupForSubmit({actions});
			fireEvent.click(button);
			const spinner = screen.getByText('Loading…');
			expect(spinner).toBeInTheDocument();
		});
	})
});