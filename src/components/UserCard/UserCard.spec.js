import {render, screen} from "@testing-library/react";
import UserCard from "./UserCard";

const user = {
	username: "user1",
	displayName: "name1",
	id: 1,
	image: "https://vjoy.cc/wp-content/uploads/2020/03/bezymyannyjmsakk.jpg"
};

describe("UserCard", () => {
	describe("Layout", () => {
		it('should display username', function () {
			render(<UserCard user={user}/>);
			const username = screen.getByText(user.username);
			expect(username).toBeInTheDocument();
		});
		it('should display edit button when isEditable property set as true', function () {
			render(<UserCard isEditable={true} user={user}/>);
			const btn = screen.getByText("Edit");
			expect(btn).toBeInTheDocument();
		});
		it('should display edit button when isEditable property not provided', function () {
			render(<UserCard user={user}/>);
			const btn = screen.queryByText("Edit");
			expect(btn).not.toBeInTheDocument();
		});
	});
	describe("qwe", () => {

	});
});