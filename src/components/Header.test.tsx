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
		// Render the Header component.
		render(<Header />);

		// Query for all elements with the role "button".
		// We expect 3 buttons: "About", "Contact", and the theme switcher.
		const buttons = screen.getAllByRole("button");

		// The theme switcher button is the third button in the current render order (index 2).
		// This approach is a bit fragile as order can change, a better approach would be
		// to add an `aria-label` to the button and query by that.
		const themeButton = buttons[2];

		// Assert that the theme switcher button is present in the document.
		expect(themeButton).toBeInTheDocument();
		// Further checks for icon presence or aria-label can be added here if needed.
	});
});
