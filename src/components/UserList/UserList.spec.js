import UserList from "./UserList";
import {act, fireEvent, render, screen} from "@testing-library/react";
import * as apiCalls from "../../api/apiCalls";
import {MemoryRouter} from "react-router-dom";

const setup = () => {
	render(
		<MemoryRouter>
			<UserList/>
		</MemoryRouter>
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
const mockedSuccessGetMultiPageFirst = {
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
		last: false,
		size: 3,
		totalPages: 2
	}
};
const mockedSuccessGetMultiPageLast = {
	data: {
		content: [
			{
				id: 4,
				username: 'user-4',
				displayName: 'display-name-4',
				image: ''
			}
		],
		number: 1,
		first: false,
		last: true,
		size: 3,
		totalPages: 2
	}
};
const mockFailResponse = {
	response: {
		data: {
			message: "Loading error"
		}
	}
};

describe("UserList", () => {
	describe("Layout", () => {
		it('should display displayName when api return users', async function () {
			apiCalls.getUsers = jest.fn().mockResolvedValue(mockedSuccessGetSinglePage);
			await act(async () => {
				setup();
			});
			const userItem = await screen.findByText("display-name-1");

			expect(userItem).toBeInTheDocument();
		});
		it('should display Link to user page when api return users', async function () {
			apiCalls.getUsers = jest.fn().mockResolvedValue(mockedSuccessGetSinglePage);
			await act(async () => {
				setup();
			});
			const userItem = await screen.findByText("display-name-1");

			expect(userItem.getAttribute("href")).toBe("/users/user-1");
		});
	});

	describe("Lifecycle", () => {
		it('should display 3 items when api return 3 users', async function () {
			apiCalls.getUsers = jest.fn().mockResolvedValue(mockedSuccessGetSinglePage);
			await act(async () => {
				setup();
			});
			const userGroup = await screen.findAllByTestId("user-group-item");

			expect(userGroup.length).toBe(3);
		});
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
		it('should enable display next button when response has last value as false', async function () {
			apiCalls.getUsers = jest.fn().mockResolvedValue(mockedSuccessGetMultiPageFirst);
			await act(async () => {
				setup();
			});
			const nextLink = await screen.findByTestId("NavigateNextIcon");

			expect(nextLink).toBeInTheDocument();
		});
		it('should enable display prev button when response has first value as false', async function () {
			apiCalls.getUsers = jest.fn().mockResolvedValue(mockedSuccessGetMultiPageFirst);
			await act(async () => {
				setup();
			});
			const nextLink = await screen.findByTestId("NavigateBeforeIcon");

			expect(nextLink).toBeInTheDocument();
		});
	});

	describe("Interactions", () => {
		it('should load next page when clicked next button', async function () {
			apiCalls.getUsers = jest.fn().mockResolvedValueOnce(mockedSuccessGetMultiPageFirst)
				.mockResolvedValueOnce(mockedSuccessGetMultiPageLast);
			await act(async () => {
				setup();
			});
			const nextLink = await screen.findByTestId("NavigateNextIcon");
			fireEvent.click(nextLink);
			expect(await screen.findByText("display-name-4")).toBeInTheDocument();
		});
		it('should disable next button when there is no more pages', async function () {
			apiCalls.getUsers = jest.fn().mockResolvedValueOnce(mockedSuccessGetMultiPageFirst)
				.mockResolvedValueOnce(mockedSuccessGetMultiPageLast);
			await act(async () => {
				setup();
			});
			const nextLink = await screen.findByTestId("NavigateNextIcon");
			fireEvent.click(nextLink);
			expect(nextLink.closest("button").disabled).toBeTruthy();
		});
		it('should disable prev button when current pages is 1', async function () {
			apiCalls.getUsers = jest.fn().mockResolvedValueOnce(mockedSuccessGetMultiPageFirst);
			setup();
			const prevLink = await screen.findByTestId("NavigateBeforeIcon");
			expect(prevLink.closest("button").disabled).toBeTruthy();
		});
		it('should display error when request fails', async function () {
			apiCalls.getUsers = jest.fn().mockResolvedValueOnce(mockedSuccessGetMultiPageLast)
				.mockRejectedValueOnce(mockFailResponse);
			await act(async () => {
				setup();
			});
			const nextLink = await screen.findByTestId("NavigateNextIcon");
			fireEvent.click(nextLink);
			const notification = await screen.findByText("Loading error");
			expect(notification).toBeInTheDocument();
		});
	});
});