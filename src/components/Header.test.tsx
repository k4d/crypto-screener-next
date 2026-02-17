import { render, screen } from "@testing-library/react";
import Header from "./Header";

// `describe` is used to group related tests together.
// Here, we're grouping all tests related to the `Header` component.
describe("Header", () => {
	// `it` (or `test`) defines a single test case.
	it("renders the Crypto Screener title", () => {
		// 1. Arrange: Render the Header component into a virtual DOM.
		render(<Header />);

		// 2. Act: Query the DOM for the element we want to test.
		//    `screen.getByRole` is a user-centric query, looking for elements by their ARIA role.
		//    `"link"` role for <a> tags. `name` option is for accessible text.
		const titleLink = screen.getByRole("link", { name: /crypto screener/i });

		// 3. Assert: Check if the element is present and has the correct attributes.
		//    `toBeInTheDocument` is a matcher from @testing-library/jest-dom.
		expect(titleLink).toBeInTheDocument();
		//    `toHaveAttribute` checks for specific HTML attributes.
		expect(titleLink).toHaveAttribute("href", "/");
	});

	it("renders the navigation buttons", () => {
		// Render the Header component.
		render(<Header />);

		// Query for buttons with specific accessible names ("About" and "Contact").
		const aboutButton = screen.getByRole("button", { name: /about/i });
		const contactButton = screen.getByRole("button", { name: /contact/i });

		// Assert that both buttons are present in the document.
		expect(aboutButton).toBeInTheDocument();
		expect(contactButton).toBeInTheDocument();
	});

	it("renders the theme switcher button", () => {
		render(<Header />);

		const themeButton = screen.getByRole("button", { name: /toggle theme/i });

		expect(themeButton).toBeInTheDocument();
	});
});
