import { render, screen } from "@testing-library/react";
import { ThemeButton } from "./ThemeButton";

describe("ThemeButton", () => {
	it("renders the theme toggle button", () => {
		render(<ThemeButton />);

		const themeButton = screen.getByRole("button", {
			name: /toggle theme/i,
		});

		expect(themeButton).toBeInTheDocument();
	});

	it("renders the sun icon", () => {
		const { container } = render(<ThemeButton />);

		const svg = container.querySelector("svg");

		expect(svg).toBeInTheDocument();
		expect(svg).toHaveAttribute("class", "h-6 w-6");
	});

	it("has correct aria-label", () => {
		render(<ThemeButton />);

		const themeButton = screen.getByRole("button", {
			name: /toggle theme/i,
		});

		expect(themeButton).toHaveAttribute("aria-label", "Toggle theme");
	});

	it("is icon-only button", () => {
		const { container } = render(<ThemeButton />);

		const button = container.querySelector("button");

		expect(button).toHaveClass("button--icon-only");
	});
});
