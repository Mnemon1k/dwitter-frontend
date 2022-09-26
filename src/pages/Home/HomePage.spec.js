import {render, screen} from "@testing-library/react";
import HomePage from "../Home/HomePage";

describe("HomePage", () => {
	describe("Layout", () => {
		it('should have homepage test id', async function () {
			render(<HomePage/>);
			const page = screen.getByTestId('homepage');
			expect(page).toBeInTheDocument();
		});
	});
});