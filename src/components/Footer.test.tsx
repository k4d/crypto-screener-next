import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer", () => {
	it("renders the footer element", () => {
		render(<Footer />);

		const footer = screen.getByText(/© 2026 crypto screener/i);

		expect(footer).toBeInTheDocument();
	});

	it("renders the copyright text", () => {
		render(<Footer />);

		const copyrightText = screen.getByText(/© 2026 crypto screener/i);

		expect(copyrightText).toBeInTheDocument();
	});

	it("renders the footer with correct structure", () => {
		const { container } = render(<Footer />);

		const footer = container.querySelector("footer");

		expect(footer).toBeInTheDocument();
		expect(footer).toHaveClass(
			"w-full",
			"py-8",
			"mt-auto",
			"border-t",
			"border-gray-200",
			"dark:border-gray-800",
		);
	});

	it("renders centered text", () => {
		const { container } = render(<Footer />);

		const paragraph = container.querySelector("p");

		expect(paragraph).toHaveClass("text-center");
	});

	it("supports dark theme", () => {
		const { container } = render(<Footer />);

		const paragraph = container.querySelector("p");

		expect(paragraph).toHaveClass("text-gray-600", "dark:text-gray-400");
	});
});
