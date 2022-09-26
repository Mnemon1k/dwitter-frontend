import UserList from "./UserList";
import {act, render, screen} from "@testing-library/react";
import * as apiCalls from "../../api/apiCalls";


const setup = async () => {
	render(
		<UserList/>
	);
}

const mockedEmptySuccessResponse = {
	data: {
		content: [],
		number: 0,
		size: 3
	}
};
const mockedSuccessGetSinglePage = {
	data: {
		content: [
			{
				id: 1,
				username: 'user-1',
				displayName: 'display-name-1',
				image: ''
			},
			{
				id: 2,
				username: 'user-2',
				displayName: 'display-name-2',
				image: ''
			},
			{
				id: 3,
				username: 'user-3',
				displayName: 'display-name-3',
				image: ''
			},
		],
		number: 0,
		first: true,
		last: true,
		size: 3,
		totalPages: 1
	}
};

describe("UserList", () => {
	describe("Layout", () => {
		it('should have header with text "Users"', async function () {
			await act(async () => {
				setup();
			});
			expect(screen.getByText("Users")).toBeInTheDocument();
		});
		it('should display 3 items wher api returns 3 users', async function () {
			apiCalls.getUsers = jest.fn().mockResolvedValue(mockedSuccessGetSinglePage);
			await act(async () => {
				setup();
			});
			const userGroup = screen.queryByTestId("user-group");

			expect(userGroup.childElementCount).toBe(3);
		});
	});

	describe("Lifecycle", () => {
		it('should calls getUsers api when it is rendered', async function () {
			apiCalls.getUsers = jest.fn().mockResolvedValue(mockedEmptySuccessResponse);
			await act(async () => {
				setup();
			});
			expect(apiCalls.getUsers).toHaveBeenCalledTimes(2);
		});
		it('should calls getUsers wtih page 0 and size 3', async function () {
			apiCalls.getUsers = jest.fn().mockResolvedValue(mockedEmptySuccessResponse);
			await act(async () => {
				setup();
			});
			expect(apiCalls.getUsers).toHaveBeenCalledWith({page: 0, size: 3});
		});
	});
});
