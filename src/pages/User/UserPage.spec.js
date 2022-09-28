import {render, screen} from "@testing-library/react";
import UserPage from "../User/UserPage";
import {getUser} from "../../api/apiCalls";
import * as apiCalls from "../../api/apiCalls";

const mockSuccessGetUser = {
	data: {
		id: 1,
		username: 'user-1',
		displayName: 'user-name-1',
		image: ""
	}
};

const mockFailGetUser = {
	response: {
		data: {
			message: "user not found"
		}
	}
};

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useParams: () => ({username: 'user-1'})
}));

describe("UserPage", () => {
	describe("Layout", () => {
		it('should render user page', async function () {
			render(<UserPage/>);
			const page = screen.getByTestId('userpage');
			expect(page).toBeInTheDocument();
		});
		it('should display name when user data recived', async function () {
			apiCalls.getUser = jest.fn().mockResolvedValueOnce(mockSuccessGetUser);
			render(<UserPage/>);
			const name = await screen.findByText("user-1");
			expect(name).toBeInTheDocument();
		});
		it('should display not found error when user not found', async function () {
			apiCalls.getUser = jest.fn().mockRejectedValue(mockFailGetUser);
			render(<UserPage/>);
			const error = await screen.findByText("user not found");
			expect(error).toBeInTheDocument();
		});
		it('should display skeleton while user data is loading and hide it when data successfully laded', async function () {
			apiCalls.getUser = jest.fn().mockResolvedValueOnce(mockSuccessGetUser);
			render(<UserPage/>);
			const skeletor = await screen.findByTestId("user-card-skeletor");
			const username = await screen.findByText("user-1");

			expect(username).toBeInTheDocument();
			expect(skeletor).not.toBeInTheDocument();
		});
	});

	describe("Lifecycle", () => {
		it('should calls getUser when it is rendered', function () {
			apiCalls.getUser = jest.fn().mockResolvedValueOnce(mockSuccessGetUser);
			render(<UserPage/>);
			expect(apiCalls.getUser).toBeCalledTimes(1);
		});
		it('should calls getUser with user-1 when it is rendered with user-1 in math', function () {
			apiCalls.getUser = jest.fn().mockResolvedValueOnce(mockSuccessGetUser);
			render(<UserPage/>);
			expect(apiCalls.getUser).toBeCalledWith("user-1");
		});
	})
});