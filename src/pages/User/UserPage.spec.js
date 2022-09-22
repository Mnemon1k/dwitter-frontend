import {render, screen} from "@testing-library/react";
import UserPage from "../User/UserPage";

describe("UserPage", () => {
	describe("Layout", () => {
		it('should have h1', async function () {
			render(<UserPage/>);
			const heading = screen.getByRole('heading', {level: 1, name: 'User page'});
			expect(heading).toBeInTheDocument();
		});
	});
});