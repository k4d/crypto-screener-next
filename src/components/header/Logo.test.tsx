import { render, screen } from "@testing-library/react";
import { Logo } from "./Logo";

describe("Logo", () => {
	it("renders the logo link", () => {
		render(<Logo />);

		const logoLink = screen.getByRole("link", { name: /crypto screener/i });

		expect(logoLink).toBeInTheDocument();
	});

	it("has correct href", () => {
		render(<Logo />);

		const logoLink = screen.getByRole("link", { name: /crypto screener/i });

		expect(logoLink).toHaveAttribute("href", "/");
	});

	it("renders the logo icon", () => {
		const { container } = render(<Logo />);

		const svg = container.querySelector("svg");

		expect(svg).toBeInTheDocument();
		expect(svg).toHaveAttribute("class", "h-6 w-6 text-indigo-800");
	});

	it("renders the logo text", () => {
		render(<Logo />);

		const logoText = screen.getByText(/crypto screener/i);

		expect(logoText).toBeInTheDocument();
		expect(logoText).toHaveClass("text-base");
	});
});
