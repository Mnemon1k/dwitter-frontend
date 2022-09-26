import {SignupPage} from './SignupPage';
import {act, fireEvent, render, screen, waitForElementToBeRemoved} from '@testing-library/react';

const mockedUsedNavigate = jest.fn();

// Mock navigate var of useNavigate() hook
jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => mockedUsedNavigate,
}));

describe('SignupPage', () => {
	const renderSignupPage = (props) => {
		render(
			<SignupPage {...props} />
		);
	}

	describe('Layout', () => {
		it('should have header of sign up', () => {
			renderSignupPage();
			const heading = screen.getByRole('heading', {level: 1, name: 'Sign up'});
			expect(heading).toBeInTheDocument();
		});
		it('should have input for display name', () => {
			renderSignupPage();
			expect(screen.getByLabelText('Your display name')).toBeInTheDocument();
		});
		it('should have input for password', () => {
			renderSignupPage();
			expect(screen.getByLabelText('Your password')).toBeInTheDocument();
		});
		it('should have input for password repeat', () => {
			renderSignupPage();
			expect(screen.getByLabelText('Repeat your password')).toBeInTheDocument();
		});
		it('should have input for username', () => {
			renderSignupPage();
			expect(screen.getByLabelText('Your username')).toBeInTheDocument();
		});
		it('should have password type for password input', () => {
			renderSignupPage();
			const input = screen.getByLabelText('Your password');
			expect(input.type).toBe("password");
		});
		it('should have password type for repeat password input', () => {
			renderSignupPage();
			const input = screen.getByLabelText('Repeat your password');
			expect(input.type).toBe("password");
		});
		it('should have submit button', () => {
			renderSignupPage();
			expect(screen.getByTestId('signup-button')).toBeInTheDocument();
		});
	});

	describe('Interactions', () => {
		const changeEvent = (content) => ({target: {value: content}});
		let button, username, password, passwordRepeat, displayName;

		const mockAsyncDelayed = () => {
			return jest.fn().mockImplementation(() => {
				return new Promise((resolve, reject) => {
					setTimeout(() => {
						resolve({});
					}, 300)
				})
			});
		}

		const setupForSubmit = async (props) => {
			renderSignupPage(props);

			displayName = screen.getByLabelText("Your display name");
			username = screen.getByLabelText('Your username');
			password = screen.getByLabelText('Repeat your password');
			passwordRepeat = screen.getByLabelText('Your password');
			button = screen.getByTestId('signup-button');

			await act(() => {
				fireEvent.change(displayName, changeEvent(("alex ross")));
				fireEvent.change(username, changeEvent(("alex")));
				fireEvent.change(password, changeEvent(("qweqwe")));
				fireEvent.change(passwordRepeat, changeEvent(("qweqwe")));
			});
		};

		it('should set the displayName value into state', () => {
			renderSignupPage();
			const input = screen.getByLabelText("Your display name");

			fireEvent.change(input, changeEvent("my-display-name"));

			expect(input).toHaveValue("my-display-name");
		});
		it('should set the username value into state', () => {
			renderSignupPage();
			const input = screen.getByLabelText('Your username');

			fireEvent.change(input, changeEvent("my-username"));

			expect(input).toHaveValue("my-username");
		});
		it('should set the password value into state', () => {
			renderSignupPage();
			const input = screen.getByLabelText('Your password');

			fireEvent.change(input, changeEvent("my-password"));

			expect(input).toHaveValue("my-password");
		});
		it('should set the password repeat value into state', () => {
			renderSignupPage();
			const input = screen.getByLabelText('Repeat your password');

			fireEvent.change(input, changeEvent("my-password"));

			expect(input).toHaveValue("my-password");
		});
		it('should call postSignup when the fields are valid and the actions are provided in props', async () => {
			const actions = {postSignup: jest.fn().mockResolvedValueOnce({})};
			setupForSubmit({actions});

			fireEvent.click(button);
			expect(actions.postSignup).toHaveBeenCalledTimes(1);
		});
		it('does not throw exception when clicking the button when actions not provided in props', () => {
			setupForSubmit();
			expect(() => {
				fireEvent.click(button)
			}).not.toThrow();
		});
		it('call post with user body when the fields are valid', () => {
			const actions = {postSignup: jest.fn().mockResolvedValueOnce({})};

			setupForSubmit({actions});
			fireEvent.click(button);

			const expectedUserObject = {
				username: 'alex',
				displayName: 'alex ross',
				password: 'qweqwe',
				passwordRepeat: 'qweqwe'
			}

			expect(actions.postSignup).toHaveBeenCalledWith(expectedUserObject);
		});
		it('does not allow user to click the sign up button when there is an ongoing api call', () => {
			const actions = {
				postSignup: mockAsyncDelayed()
			};

			setupForSubmit({actions});
			fireEvent.click(button);
			fireEvent.click(button);

			expect(actions.postSignup).toHaveBeenCalledTimes(1);
		});
		it('displays spinner when there is an ongoing api call', async () => {
			const actions = {
				postSignup: mockAsyncDelayed()
			};

			setupForSubmit({actions});
			fireEvent.click(button);

			const spinner = await screen.findByText('Loading…');

			expect(spinner).toBeInTheDocument();
		});
		it('hide spinner api call finishes', async () => {
			const actions = {
				postSignup: mockAsyncDelayed()
			};

			setupForSubmit({actions});
			fireEvent.click(button);

			const spinner = await screen.findByText('Loading…');

			await waitForElementToBeRemoved(spinner);

			expect(spinner).not.toBeInTheDocument();
		});
		it('should display validation error for display name when error is received for the fields', async function () {
			const actions = {
				postSignup: jest.fn().mockRejectedValue({
					response: {
						data: {
							validationErrors: {
								displayName: 'Size must be between 4 and 32.'
							}
						}
					}
				})
			};

			setupForSubmit({actions});
			fireEvent.click(button);

			const errorMsg = await screen.findByText('Size must be between 4 and 32.');
			expect(errorMsg).toBeInTheDocument();
		});
		it('should enable signup button when password and repeat password have same values', function () {
			setupForSubmit();
			expect(button).not.toBeDisabled();
		});
		it('should disable signup button when password and repeat password have different values', function () {
			setupForSubmit();
			fireEvent.change(passwordRepeat, changeEvent('new-pass'));
			expect(button).toBeDisabled();
		});
		it('should disable error when password and repeat password have different values', async function () {
			setupForSubmit();
			fireEvent.change(passwordRepeat, changeEvent('new-pass'));

			const errorMsg = await screen.findByText('Does not match to password.');
			expect(errorMsg).toBeInTheDocument();
		});
		it('should redirect to homepage after successful signup', async () => {
			// const actions = {
			// 	postSignup: jest.fn().mockResolvedValue({})
			// };
			// const history = {push: jest.fn()};
			//
			// setupForSubmit({actions, history});
			//
			// fireEvent.click(button);
			//
			// const spinner = screen.getByText('Loading…');
			//
			// await waitForElementToBeRemoved(spinner);
			//
			// expect(mockedUsedNavigate).toBeCalledWith("/");
		});
	});
});
