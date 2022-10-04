import {fireEvent, render, screen, waitFor, within} from "@testing-library/react";
import RecordSubmit from "./RecordSubmit";
import {createStore} from "redux";
import authReducer from "../../redux/authReducer";
import {Provider} from "react-redux";
import * as apiCalls from "../../api/apiCalls";

const defaultState = {
	id: 1,
	username: "user1",
	displayName: "display1",
	image: "img.png",
	password: "1Password",
	isLoggedIn: true
};

let store;
const setup = (state = defaultState) => {
	store = createStore(authReducer, state);
	render(
		<Provider store={store}>
			<RecordSubmit/>
		</Provider>);
}


describe("RecordSubmit", () => {
	describe("Layout", () => {
		it('should have textarea', function () {
			setup();

			const textarea = screen.getByRole("textbox");
			expect(textarea).toBeInTheDocument();
		});
		it('should have user image', function () {
			setup();

			const userImage = screen.getByTestId("UserImage");
			expect(userImage).toBeInTheDocument();
		});
		it('should have correct src image', function () {
			setup();

			const userImage = within(screen.getByTestId("UserImage")).getByRole('img');

			expect(userImage.src).toContain("/images/profile/" + defaultState.image);
		});
	})

	describe("Interactions", () => {
		it('should display post button when focused to textarea', function () {
			setup();

			const textarea = screen.getByRole("textbox");
			fireEvent.focus(textarea)

			const button = screen.getByText("Post");
			expect(button).toBeInTheDocument();
		});
		it('should display cancel button when focused to textarea', function () {
			setup();

			const textarea = screen.getByRole("textbox");
			fireEvent.focus(textarea)

			const button = screen.getByText("Cancel");
			expect(button).toBeInTheDocument();
		});
		it('should hide post and cancel buttons when clicked cancle', function () {
			setup();

			const textarea = screen.getByRole("textbox");
			fireEvent.focus(textarea)

			const postBtn = screen.getByText("Post");
			const cancleBtn = screen.getByText("Cancel");
			fireEvent.click(cancleBtn);
			expect(postBtn).not.toBeInTheDocument();
			expect(cancleBtn).not.toBeInTheDocument();
		});
		it('should call createRecord with record object when clicking Post button', function () {
			setup();

			const textarea = screen.getByRole("textbox");
			fireEvent.focus(textarea)
			fireEvent.change(textarea, {target: {value: "test post text"}});

			const postBtn = screen.getByText("Post");

			apiCalls.createRecord = jest.fn().mockResolvedValue({});

			fireEvent.click(postBtn);
			expect(apiCalls.createRecord).toBeCalledWith({content: "test post text"});
		});
		it('should return to unfocused state after successfully createRecord api call', async function () {
			setup();

			const textarea = screen.getByRole("textbox");
			fireEvent.focus(textarea)
			const postBtn = screen.getByText("Post");

			fireEvent.change(textarea, {target: {value: "test post text"}});

			apiCalls.createRecord = jest.fn().mockResolvedValue({});

			fireEvent.click(postBtn);

			await waitFor(() => {
				expect(screen.getByText("Success")).toBeInTheDocument();
			});
		});
		it('shold clear textarea after successfully createRecord api call', async function () {
			setup();

			const textarea = screen.getByRole("textbox");
			fireEvent.focus(textarea)
			const postBtn = screen.getByText("Post");

			fireEvent.change(textarea, {target: {value: "test post test"}});

			apiCalls.createRecord = jest.fn().mockResolvedValue({});

			fireEvent.click(postBtn);

			await waitFor(() => {
				expect(textarea.value).toBe("");
			});
		});
		it('should clear input after cancel button click', function () {
			//TODO
		});
		it('should show error if crateRecord api fails', function () {
			//TODO
		});
		it('should clear error after textarea change', function () {
			//TODO
		});
	});
});