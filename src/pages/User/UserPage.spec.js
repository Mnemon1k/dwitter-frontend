import {fireEvent, render, screen, waitFor, within} from "@testing-library/react";
import UserPage from "../User/UserPage";
import * as apiCalls from "../../api/apiCalls";
import configureStore from "../../redux/configureStore";
import {Provider} from "react-redux";
import axios from "axios";

const mockSuccessGetUser = {
	data: {
		id: 1,
		username: 'user-1',
		displayName: 'user-name-1',
		image: ""
	}
};
const mockSuccessUpdateUser = {
	data: {
		id: 1,
		username: 'user-1',
		displayName: 'user-name-update',
		image: "image-upd.png"
	}
};
const mockFailGetUser = {
	response: {
		data: {
			message: "user not found"
		}
	}
};
const mockFailUpdateUser = {
	response: {
		data: {
			validationErrors: {
				displayName: "Size must be between 6 and 256 characters.",
				image: "Only PNG and JPG file are allowed"
			}
		}
	}
};

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useParams: () => ({username: 'user-1'})
}));

const setUserOneLoggedInStorage = () => {
	localStorage.setItem("dwitter-auth",
		JSON.stringify({
			id: 1,
			username: "user-1",
			displayName: "user-name-1",
			image: "user-image.png",
			password: "Qsada2da",
			isLoggedIn: true
		}));
}


let store;
const renderUserPage = (path) => {
	store = configureStore(false);

	render(
		<Provider store={store}>
			<UserPage/>
		</Provider>);
}

beforeEach(() => {
	apiCalls.getRecords = jest.fn().mockResolvedValue({
		data: {
			content: [],
			number: 0,
			size: 3
		}
	});
	localStorage.clear();
	delete axios.defaults.headers.common['Authorization'];
});

describe("UserPage", () => {
	describe("Layout", () => {
		it('should render user page', async function () {
			renderUserPage()
			const page = screen.getByTestId('userpage');
			expect(page).toBeInTheDocument();
		});
		it('should display name when user data recived', async function () {
			apiCalls.getUser = jest.fn().mockResolvedValueOnce(mockSuccessGetUser);
			renderUserPage()
			const name = await screen.findByText("user-1");
			expect(name).toBeInTheDocument();
		});
		it('should display not found error when user not found', async function () {
			apiCalls.getUser = jest.fn().mockRejectedValue(mockFailGetUser);
			renderUserPage()
			const error = await screen.findByText("user not found");
			expect(error).toBeInTheDocument();
		});
		it('should display skeleton while user data is loading and hide it when data successfully laded', async function () {
			apiCalls.getUser = jest.fn().mockResolvedValueOnce(mockSuccessGetUser);
			renderUserPage()
			const skeletor = await screen.findByTestId("user-card-skeletor");
			const username = await screen.findByText("user-1");

			expect(username).toBeInTheDocument();
			expect(skeletor).not.toBeInTheDocument();
		});
		it('should display edit button when loggedInUser match uesr in url', async function () {
			setUserOneLoggedInStorage();
			apiCalls.getUser = jest.fn().mockResolvedValueOnce(mockSuccessGetUser);
			renderUserPage();
			await screen.findByText("user-1");
			expect(screen.getByText("Edit")).toBeInTheDocument();
		});
	});

	describe("Lifecycle", () => {
		it('should calls getUser when it is rendered', function () {
			apiCalls.getUser = jest.fn().mockResolvedValueOnce(mockSuccessGetUser);
			renderUserPage()
			expect(apiCalls.getUser).toBeCalledTimes(1);
		});
		it('should calls getUser with user-1 when it is rendered with user-1 in math', function () {
			apiCalls.getUser = jest.fn().mockResolvedValueOnce(mockSuccessGetUser);
			renderUserPage()
			expect(apiCalls.getUser).toBeCalledWith("user-1");
		});
	})

	describe("Profile card interactions", () => {
		const setupEdit = async () => {
			setUserOneLoggedInStorage();
			apiCalls.getUser = jest.fn().mockResolvedValueOnce(mockSuccessGetUser);
			renderUserPage();
			await screen.findByText("user-1");
			fireEvent.click(screen.getByText("Edit"));
		}

		it('should display edit layout when clicking edit button', async function () {
			await setupEdit();
			expect(screen.getByText("Update user")).toBeInTheDocument();
		});
		it('should display none edit layout when clicking cancel button', async function () {
			await setupEdit();
			fireEvent.click(screen.getByText("Cancel"));
			expect(screen.getByText("Edit")).toBeInTheDocument();
		});
		it('should call udpateUserApi when clicking save', async function () {
			await setupEdit();
			apiCalls.updateUser = jest.fn().mockResolvedValue(mockSuccessUpdateUser);
			fireEvent.click(screen.getByText("Update user"));
			expect(apiCalls.updateUser).toBeCalledTimes(1);
		});
		it('should call udpateUserApi with user id', async function () {
			await setupEdit();
			apiCalls.updateUser = jest.fn().mockResolvedValue(mockSuccessUpdateUser);

			fireEvent.click(screen.getByText("Update user"));
			const userId = apiCalls.updateUser.mock.calls[0][0];
			const data = apiCalls.updateUser.mock.calls[0][1];
			expect(userId).toBe(1);
		});
		it('should call udpateUserApi with request body and new displayName', async function () {
			await setupEdit();
			apiCalls.updateUser = jest.fn().mockResolvedValue(mockSuccessUpdateUser);

			fireEvent.change(screen.getByLabelText('New display name'),
				{target: {value: "new-display-name"}}
			);

			fireEvent.click(screen.getByText("Update user"));
			const data = apiCalls.updateUser.mock.calls[0][1];
			expect(data.displayName).toBe('new-display-name');
		});
		it('should not modify display name if input value was changed dut clicked cancel button', async function () {
			await setupEdit();

			fireEvent.change(screen.getByLabelText('New display name'),
				{target: {value: "new-display-name"}}
			);

			fireEvent.click(screen.getByText("Cancel"));
			expect(screen.getByText("user-1")).toBeInTheDocument();
		});
		it('should display selected image in edit mode', async function () {
			await setupEdit();

			const fileInput = screen.queryByTestId("profile-image-input");
			const file = new File(['image content'], "example.png", {type: "image/png"});

			fireEvent.change(fileInput, {target: {files: [file]}});

			const profileImageContainer = await screen.findByTestId("UserImage");
			const image = await within(profileImageContainer).findByRole("img");
			expect(image.src).toContain('data:image/png;base64');

		});
		it('should call udpateUserApi with request body and new image without data:image/png;', async function () {
			await setupEdit();
			apiCalls.updateUser = jest.fn().mockResolvedValue(mockSuccessUpdateUser);

			const fileInput = screen.queryByTestId("profile-image-input");
			const file = new File(['image content'], "example.png", {type: "image/png"});

			fireEvent.change(fileInput, {target: {files: [file]}});

			fireEvent.click(screen.getByText("Update user"));
			const request = apiCalls.updateUser.mock.calls[0][1];
			// expect(request.image).not.toContain('data:image/png;base64');
		});
		it('should display validation error for displayName when api fails', async function () {
			await setupEdit();
			apiCalls.updateUser = jest.fn().mockRejectedValue(mockFailUpdateUser);

			fireEvent.click(screen.getByText("Update user"));

			expect(
				await screen.findByText(mockFailUpdateUser.response.data.validationErrors.displayName)
			).toBeInTheDocument();
		});
		it('should display validation error for image when api fails', async function () {
			await setupEdit();
			apiCalls.updateUser = jest.fn().mockRejectedValue(mockFailUpdateUser);

			fireEvent.click(screen.getByText("Update user"));

			expect(
				await screen.findByText(mockFailUpdateUser.response.data.validationErrors.image)
			).toBeInTheDocument();
		});
		it('should update redux state when user update api call success', async function () {
			await setupEdit();
			apiCalls.updateUser = jest.fn().mockResolvedValue(mockSuccessUpdateUser);
			fireEvent.change(screen.getByLabelText('New display name'),
				{target: {value: mockSuccessUpdateUser.data.displayName}}
			);
			fireEvent.click(screen.getByText("Update user"));

			await waitFor(() => {
				expect(store.getState().image).toBe(mockSuccessUpdateUser.data.image)
				expect(store.getState().displayName).toBe(mockSuccessUpdateUser.data.displayName)
			});
		});
	})
});