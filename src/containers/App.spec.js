import {render, screen} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import App from "./App";

describe("App", () => {
	it('should display homepage when url is /', function () {
		render(<MemoryRouter initialEntries={['/']}>
			<App/>
		</MemoryRouter>);

		expect(screen.getByTestId("homepage")).toBeInTheDocument();
	});
});