import {render, screen} from "@testing-library/react";
import HomePage from "../Home/HomePage";

describe("HomePage", () => {
	describe("Layout", () => {
		it('should have h1', async function () {
			render(<HomePage/>);
			const heading = screen.getByRole('heading', {level: 1, name: 'Home'});
			expect(heading).toBeInTheDocument();
		});
	});
});