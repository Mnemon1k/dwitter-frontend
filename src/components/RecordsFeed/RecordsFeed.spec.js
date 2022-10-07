import * as apiCalls from "../../api/apiCalls";
import {act, render, screen, waitFor} from "@testing-library/react";
import RecordsFeed from "./RecordsFeed";

const setup = (props) => {
	render(<RecordsFeed {...props}/>);
}

const mockEmptyResponse = {
	data: {
		content: []
	}
};

const mockSuccessSinglePageResponse = {
	data: {
		content: [
			{
				id: 10,
				content: "qwe qwe qwe",
				date: 123124125125,
				user: {
					id: 1,
					username: "used-1",
					displayName: "display1",
					image: "profile.png"
				}
			}
		],
		number: 0,
		first: true,
		last: true,
		size: 5,
		totalPages: 1
	}
};

beforeEach(() => {
	apiCalls.getRecords = jest.fn().mockResolvedValue({
		data: {
			content: [],
			number: 0,
			size: 3
		}
	});
});

describe("RecordsFeed", () => {
	describe("Lifecycle", () => {
		it('should call getRecords when rendered', async function () {
			apiCalls.getRecords = jest.fn().mockResolvedValue({});
			setup();
			expect(apiCalls.getRecords).toBeCalledTimes(1);
		});
		it('should call getRecords with user parameter when it is rendered with user property', async function () {
			apiCalls.getRecords = jest.fn().mockResolvedValue({});
			setup({username: "user1"});
			expect(apiCalls.getRecords).toBeCalledWith({username: "user1"});
		});
		it('should call getRecords without user parameter when it is rendered without user property', async function () {
			apiCalls.getRecords = jest.fn().mockResolvedValue({});
			setup();
			const body = apiCalls.getRecords.mock.calls[0][0];
			expect(body.username).toBeUndefined();
		});
	});
	describe("Layout", () => {
		it('should display no records message when the response is empty', async function () {
			apiCalls.getRecords = jest.fn().mockResolvedValue(mockEmptyResponse);
			setup();
			await waitFor(() => {
				expect(screen.queryByText("There is no posts")).toBeInTheDocument();
			});
		});
		it('should not display "no posts" message when there are posts in response', async function () {
			apiCalls.getRecords = jest.fn().mockResolvedValue(mockSuccessSinglePageResponse);
			setup();
			await waitFor(() => {
				expect(screen.queryByText("There is no posts")).not.toBeInTheDocument();
			});
		});
		it('should display post content', async function () {
			apiCalls.getRecords = jest.fn().mockResolvedValue(mockSuccessSinglePageResponse);
			setup();
			await waitFor(() => {
				expect(screen.queryByText(mockSuccessSinglePageResponse.data.content)).toBeInTheDocument();
			});
		});
	});
});