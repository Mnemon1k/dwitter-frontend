import {getByPlaceholderText, render, screen} from "@testing-library/react";
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
		it('should display displayName input when isEditable property set to true', function () {
			render(<UserCard user={user} editMode={true} isEditable={true}/>);
			expect(screen.getByLabelText('New display name')).toBeInTheDocument();
		});
		it('should display displayName input with current displayName value when isEditable property set to true', function () {
			render(<UserCard user={user} editMode={true} isEditable={true}/>);
			expect(screen.getByLabelText('New display name').value).toBe(user.displayName);
		});
		it('should hide user info in editMode', function () {
			render(<UserCard user={user} editMode={true} isEditable={true}/>);
			const username = screen.queryByText(user.username);
			expect(username).not.toBeInTheDocument();
		});
		it('should hide edit button in editMode', function () {
			render(<UserCard user={user} editMode={true} isEditable={true}/>);
			const btn = screen.queryByText("Edit");
			expect(btn).not.toBeInTheDocument();
		});
		it('should display save button in editMode', function () {
			render(<UserCard user={user} editMode={true} isEditable={true}/>);
			const btn = screen.queryByText("Update user");
			expect(btn).toBeInTheDocument();
		});
		it('should display cancel button in editMode', function () {
			render(<UserCard user={user} editMode={true} isEditable={true}/>);
			const btn = screen.queryByText("Cancel");
			expect(btn).toBeInTheDocument();
		});
		it('should display file input in editMode', function () {
			render(<UserCard user={user} editMode={true} isEditable={true}/>);
			const input = screen.queryByTestId("profile-image-input");
			expect(input).toBeInTheDocument();
			expect(input.type).toBe("file");
		});
	});
	describe("", () => {

	});
});