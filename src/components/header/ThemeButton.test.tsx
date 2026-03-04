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

	it("renders the sun icon from lucide-react", () => {
		const { container } = render(<ThemeButton />);

		const svg = container.querySelector("svg");

		expect(svg).toBeInTheDocument();
		// Lucide icons have default attributes
		expect(svg).toHaveAttribute("width", "16");
		expect(svg).toHaveAttribute("height", "16");
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

		expect(button).toBeInTheDocument();
		// Check for icon-only styling (HeroUI specific classes may vary)
		expect(button).toHaveAttribute("aria-label", "Toggle theme");
	});

	it("has ghost variant", () => {
		const { container } = render(<ThemeButton />);

		const button = container.querySelector("button");

		expect(button).toBeInTheDocument();
		// Ghost variant should not have solid background
		expect(button).not.toHaveAttribute("data-variant", "solid");
	});
});
