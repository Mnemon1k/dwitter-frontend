import {act, render, screen} from "@testing-library/react";
import UserListItem from "./UserListItem";

const setup = (user) => {
	render(
		<UserListItem user={user}/>
	);
}

const user = {
	id: 1,
	username: "user1",
	displayName: "name-1",
	image: "profile.png"
};

describe("UserListItem", () => {
	describe("Layout", () => {
		it('should have image', async function () {
			setup(user);
			const image = screen.getByRole("img");
			expect(image).toBeInTheDocument();
		});
		it('should display default icon when user dont have image', async function () {
			setup({...user, image: undefined});
			const image = screen.getByTestId("ImageIcon");
			expect(image).toBeInTheDocument();
		});
		it('should display user image when user have it', function () {
			setup(user);
			const image = screen.getByRole("img");
			expect(image.src).toContain("profile.png");
		});
	});

	describe("Lifecycle", () => {
	});
});