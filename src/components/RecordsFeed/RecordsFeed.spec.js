import * as apiCalls from "../../api/apiCalls";
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import RecordsFeed from "./RecordsFeed";
import {MemoryRouter} from "react-router-dom";
import {getNewRecordsCount} from "../../api/apiCalls";

const setup = (props) => {
	render(
		<MemoryRouter>
			<RecordsFeed {...props}/>
		</MemoryRouter>);
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

const mockSuccessGetRecordsFirstOfMultiPageResponse = {
	data: {
		content: [
			{
				id: 10,
				content: "post 10",
				date: 123124125125,
				user: {
					id: 1,
					username: "used-1",
					displayName: "display1",
					image: "profile.png"
				}
			},
			{
				id: 9,
				content: "post 9",
				date: 12312412515,
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
		last: false,
		size: 5,
		totalPages: 2
	}
};

const mockSuccessGetRecordsLastOfMultiPageResponse = {
	data: {
		content: [
			{
				id: 1,
				content: "oldest post",
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
		totalPages: 2
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
		it('should call getNewRecordsCount with last record id', async function () {
			apiCalls.getRecords = jest.fn().mockResolvedValue(mockSuccessGetRecordsFirstOfMultiPageResponse);
			apiCalls.getNewRecordsCount = jest.fn().mockResolvedValue({data: {count: 1}});
			setup();
			await screen.findByText(mockSuccessGetRecordsFirstOfMultiPageResponse.data.content[0].content);
			await waitFor(() => {
				expect(apiCalls.getNewRecordsCount.mock.calls[0][0]).toBe(10);
			}, {timeout: 10000});
		});
		it('should call getNewRecordsCount with last record id and username when rendered with user property', async function () {
			apiCalls.getRecords = jest.fn().mockResolvedValue(mockSuccessGetRecordsFirstOfMultiPageResponse);
			apiCalls.getNewRecordsCount = jest.fn().mockResolvedValue(mockSuccessGetRecordsLastOfMultiPageResponse);
			setup({username: "user1"});
			const btn = await screen.findByText("Load more");
			fireEvent.click(btn);
			await waitFor(() => {
				expect(apiCalls.getNewRecordsCount).toBeCalledWith(10, "user1");
			}, {timeout: 10000});
		});
		it('should display new posts count as 1 after getNewRecordsCount success', async function () {
			apiCalls.getRecords = jest.fn().mockResolvedValue(mockSuccessGetRecordsFirstOfMultiPageResponse);
			apiCalls.getNewRecordsCount = jest.fn().mockResolvedValue({data: {count: 1}});
			setup({username: "user1"});
			await waitFor(async () => {
				const text = await screen.findByText("There is 1 new post");
				expect(text).toBeInTheDocument();
			}, {timeout: 10000});
		}, 20000);
		it('should display new posts count constantly', async function () {
			apiCalls.getRecords = jest.fn().mockResolvedValue(mockSuccessGetRecordsFirstOfMultiPageResponse);
			apiCalls.getNewRecordsCount = jest.fn().mockResolvedValueOnce({data: {count: 1}});
			setup({username: "user1"});
			await waitFor(async () => {
				const text = await screen.findByText("There is 1 new post");
				expect(text).toBeInTheDocument();
			}, {timeout: 10000});
			apiCalls.getNewRecordsCount = jest.fn().mockResolvedValueOnce({data: {count: 2}});
			await waitFor(async () => {
				const text = await screen.findByText("There are 2 new posts");
				expect(text).toBeInTheDocument();
			}, {timeout: 10000});
		}, 20000);
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
			expect(await screen.findByText(mockSuccessSinglePageResponse.data.content[0].content)).toBeInTheDocument();
		});
	});
	describe("Interactions", () => {
		it('should loadPrevRecords with last record id when clicking load more', async function () {
			apiCalls.getRecords = jest.fn().mockResolvedValue(mockSuccessGetRecordsFirstOfMultiPageResponse);
			apiCalls.getPrevRecords = jest.fn().mockResolvedValue(mockSuccessGetRecordsLastOfMultiPageResponse);
			setup();
			const btn = await screen.findByText("Load more");
			fireEvent.click(btn);
			expect(apiCalls.getPrevRecords.mock.calls[0][0]).toBe(9);
		});
		it('should loadPrevRecords when last record id and username when clicking load more when rendered with user property', async function () {
			apiCalls.getRecords = jest.fn().mockResolvedValue(mockSuccessGetRecordsFirstOfMultiPageResponse);
			apiCalls.getPrevRecords = jest.fn().mockResolvedValue(mockSuccessGetRecordsLastOfMultiPageResponse);
			setup({username: "user1"});
			const btn = await screen.findByText("Load more");
			fireEvent.click(btn);
			expect(apiCalls.getPrevRecords).toBeCalledWith(9, "user1");
		});
		it('should display loaded records when prev records successfully loaded', async function () {
			apiCalls.getRecords = jest.fn().mockResolvedValue(mockSuccessGetRecordsFirstOfMultiPageResponse);
			apiCalls.getPrevRecords = jest.fn().mockResolvedValue(mockSuccessGetRecordsLastOfMultiPageResponse);
			setup();
			const btn = await screen.findByText("Load more");
			fireEvent.click(btn);
			const prevRecord = await screen.findByText(mockSuccessGetRecordsLastOfMultiPageResponse.data.content[0].content);
			expect(prevRecord).toBeInTheDocument();
		});
		it('should hide load more button when load prev posts call return last page', async function () {
			apiCalls.getRecords = jest.fn().mockResolvedValue(mockSuccessGetRecordsFirstOfMultiPageResponse);
			apiCalls.getPrevRecords = jest.fn().mockResolvedValue(mockSuccessGetRecordsLastOfMultiPageResponse);
			setup();
			const btn = await screen.findByText("Load more");
			fireEvent.click(btn);
			await screen.findByText(mockSuccessGetRecordsLastOfMultiPageResponse.data.content[0].content);
			expect(btn).not.toBeInTheDocument();
		});
	});
});