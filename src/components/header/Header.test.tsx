import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Header", () => {
	it("renders the Crypto Screener logo link", () => {
		render(<Header />);

		const logoLink = screen.getByRole("link", { name: /crypto screener/i });

		expect(logoLink).toBeInTheDocument();
		expect(logoLink).toHaveAttribute("href", "/");
	});

	it("renders the search button", () => {
		render(<Header />);

		const searchButton = screen.getByRole("button", { name: /search/i });

		expect(searchButton).toBeInTheDocument();
	});

	it("renders the coins button", () => {
		render(<Header />);

		const coinsButton = screen.getByRole("button", {
			name: /coins/i,
		});

		expect(coinsButton).toBeInTheDocument();
	});

	it("renders the theme toggle button", () => {
		render(<Header />);

		const themeButton = screen.getByRole("button", {
			name: /toggle theme/i,
		});

		expect(themeButton).toBeInTheDocument();
	});
});
