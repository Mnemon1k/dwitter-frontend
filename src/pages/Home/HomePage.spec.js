import {render, screen} from "@testing-library/react";
import HomePage from "../Home/HomePage";
import {createStore} from "redux";
import authReducer from "../../redux/authReducer";
import {Provider} from "react-redux";

const defaultState = {
	id: 1,
	username: "user1",
	displayName: "display1",
	image: "img.png",
	password: "1Password",
	isLoggedIn: true
};

const notLoggedInState = {
	id: 0,
	username: "",
	displayName: "",
	image: "",
	password: "",
	isLoggedIn: false
};

let store;
const setup = (state = defaultState) => {
	store = createStore(authReducer, state);
	render(
		<Provider store={store}>
			<HomePage/>
		</Provider>);
}


describe("HomePage", () => {
	describe("Layout", () => {
		it('should have homepage test id', async function () {
			setup();
			const page = screen.getByTestId('homepage');
			expect(page).toBeInTheDocument();
		});
		it('should display record submit form when user logged in', function () {
			setup();

			const textarea = screen.getByRole("textbox");
			expect(textarea).toBeInTheDocument();
		});
		it('should not display record submit form when user not logged in', function () {
			setup(notLoggedInState);

			const textarea = screen.queryByRole("textbox");
			expect(textarea).not.toBeInTheDocument();
		});
	});
});