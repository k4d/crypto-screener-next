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

	it("renders the crypto list button", () => {
		render(<Header />);

		const cryptoListButton = screen.getByRole("button", {
			name: /coins list/i,
		});

		expect(cryptoListButton).toBeInTheDocument();
	});

	it("renders the theme toggle button", () => {
		render(<Header />);

		const themeButton = screen.getByRole("button", {
			name: /toggle theme/i,
		});

		expect(themeButton).toBeInTheDocument();
	});
});
