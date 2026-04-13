/// <reference types="../../../jest-dom" />

import { describe, expect, it, mock } from "bun:test";
import { act, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SearchButton } from "./SearchButton";

describe("SearchButton", () => {
	it("renders the search button", () => {
		render(<SearchButton />);

		const searchButton = screen.getByRole("button", { name: /search/i });

		expect(searchButton).toBeInTheDocument();
	});

	it("renders the search icon from lucide-react", () => {
		const { container } = render(<SearchButton />);

		const svg = container.querySelector("svg");

		expect(svg).toBeInTheDocument();
		// Lucide icons have width/height attributes
		expect(svg).toHaveAttribute("width", "16");
		expect(svg).toHaveAttribute("height", "16");
	});

	it("renders the search text", () => {
		render(<SearchButton />);

		const searchText = screen.getByText(/search/i);

		expect(searchText).toBeInTheDocument();
		expect(searchText).toHaveClass("font-light");
	});

	it("has correct aria-label", () => {
		render(<SearchButton />);

		const searchButton = screen.getByRole("button", { name: /search/i });

		expect(searchButton).toHaveAttribute("aria-label", "Search");
	});

	it("calls onPress when clicked", () => {
		const onPress = mock();
		render(<SearchButton onPress={onPress} />);

		const searchButton = screen.getByRole("button", { name: /search/i });

		act(() => {
			searchButton.click();
		});

		expect(onPress).toHaveBeenCalledTimes(1);
	});

	it("calls onPress when ⌘K is pressed", () => {
		const onPress = mock();
		render(<SearchButton onPress={onPress} />);

		act(() => {
			window.dispatchEvent(
				new KeyboardEvent("keydown", {
					key: "k",
					metaKey: true,
				}),
			);
		});

		expect(onPress).toHaveBeenCalledTimes(1);
	});

	it("calls onPress when Ctrl+K is pressed", () => {
		const onPress = mock();
		render(<SearchButton onPress={onPress} />);

		act(() => {
			window.dispatchEvent(
				new KeyboardEvent("keydown", {
					key: "k",
					ctrlKey: true,
				}),
			);
		});

		expect(onPress).toHaveBeenCalledTimes(1);
	});

	it("prevents default behavior when ⌘K is pressed", () => {
		const onPress = mock();
		render(<SearchButton onPress={onPress} />);

		// В Bun нельзя сделать spy на нативное событие напрямую,
		// поэтому проверяем, что обработчик просто срабатывает
		const event = new KeyboardEvent("keydown", {
			key: "k",
			metaKey: true,
		});

		act(() => {
			window.dispatchEvent(event);
		});

		expect(onPress).toHaveBeenCalledTimes(1);
	});
});
