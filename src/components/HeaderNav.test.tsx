import { render, screen } from "@testing-library/react";
import { HeaderNav } from "./HeaderNav";

describe("HeaderNav", () => {
	it("renders the search button", () => {
		render(<HeaderNav />);

		const searchButton = screen.getByRole("button", { name: /search/i });

		expect(searchButton).toBeInTheDocument();
	});

	it("renders the crypto list button", () => {
		render(<HeaderNav />);

		const cryptoListButton = screen.getByRole("button", {
			name: /coins list/i,
		});

		expect(cryptoListButton).toBeInTheDocument();
	});

	it("renders the theme toggle button", () => {
		render(<HeaderNav />);

		const themeButton = screen.getByRole("button", {
			name: /toggle theme/i,
		});

		expect(themeButton).toBeInTheDocument();
	});

	it("renders navigation with correct structure", () => {
		const { container } = render(<HeaderNav />);

		const nav = container.querySelector("nav");

		expect(nav).toBeInTheDocument();
		expect(nav).toHaveClass("flex", "items-center", "gap-x-2");
	});
});
