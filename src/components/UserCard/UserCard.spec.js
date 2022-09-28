import {render, screen} from "@testing-library/react";
import UserCard from "./UserCard";

describe("UserCard", () => {
	describe("Layout", () => {
		it('should display username', function () {
			const user = {
				username: "user1",
				displayName: "name1",
				id: 1,
				image: ""
			};
			render(<UserCard user={user}/>);
			const username = screen.getByText(user.username);
			expect(username).toBeInTheDocument();
		});
	});
	describe("qwe", () => {

	});
});