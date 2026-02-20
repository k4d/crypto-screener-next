import { render, screen } from "@testing-library/react";
import { NavBar } from "./NavBar";

describe("NavBar", () => {
	it("renders the search button", () => {
		render(<NavBar />);

		const searchButton = screen.getByRole("button", { name: /search/i });

		expect(searchButton).toBeInTheDocument();
	});

	it("renders the coins button", () => {
		render(<NavBar />);

		const coinsButton = screen.getByRole("button", {
			name: /coins/i,
		});

		expect(coinsButton).toBeInTheDocument();
	});

	it("renders the theme toggle button", () => {
		render(<NavBar />);

		const themeButton = screen.getByRole("button", {
			name: /toggle theme/i,
		});

		expect(themeButton).toBeInTheDocument();
	});

	it("renders navigation with correct structure", () => {
		const { container } = render(<NavBar />);

		const nav = container.querySelector("nav");

		expect(nav).toBeInTheDocument();
		expect(nav).toHaveClass("flex", "items-center", "gap-x-2");
	});
});
