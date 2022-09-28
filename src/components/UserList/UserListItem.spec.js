import {act, render, screen} from "@testing-library/react";
import UserListItem from "./UserListItem";
import Header from "../Header/Header";
import {MemoryRouter} from "react-router-dom";

const setup = (user) => {
	render(
		<MemoryRouter>
			<UserListItem user={user}/>
		</MemoryRouter>
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
			const image = screen.getByTestId("UserImage");
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