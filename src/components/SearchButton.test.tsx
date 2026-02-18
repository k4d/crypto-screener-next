import { render, screen } from "@testing-library/react";
import { SearchButton } from "./SearchButton";

describe("SearchButton", () => {
	it("renders the search button", () => {
		render(<SearchButton />);

		const searchButton = screen.getByRole("button", { name: /search/i });

		expect(searchButton).toBeInTheDocument();
	});

	it("renders the search icon", () => {
		const { container } = render(<SearchButton />);

		const svg = container.querySelector("svg");

		expect(svg).toBeInTheDocument();
		expect(svg).toHaveAttribute("class", "h-4 w-4");
	});

	it("renders the search text", () => {
		render(<SearchButton />);

		const searchText = screen.getByText(/search/i);

		expect(searchText).toBeInTheDocument();
	});

	it("has correct aria-label", () => {
		render(<SearchButton />);

		const searchButton = screen.getByRole("button", { name: /search/i });

		expect(searchButton).toHaveAttribute("aria-label", "Search");
	});
});
