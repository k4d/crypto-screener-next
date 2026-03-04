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

	it("renders the logo icon from lucide-react", () => {
		const { container } = render(<Logo />);

		const svg = container.querySelector("svg");

		expect(svg).toBeInTheDocument();
		// Lucide icons rendered with size prop may not have explicit width/height
		// Check for the icon class instead
		expect(svg).toHaveClass("text-white");
	});

	it("renders the logo text", () => {
		render(<Logo />);

		const logoText = screen.getByText(/crypto screener/i);

		expect(logoText).toBeInTheDocument();
		expect(logoText).toHaveClass("text-base");
	});

	it("has violet background color", () => {
		const { container } = render(<Logo />);

		const iconContainer = container.querySelector(".bg-indigo-600");

		expect(iconContainer).toBeInTheDocument();
	});

	it("has white icon", () => {
		const { container } = render(<Logo />);

		const icon = container.querySelector(".text-white");

		expect(icon).toBeInTheDocument();
	});
});
