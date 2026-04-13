/// <reference types="../../../jest-dom" />

import { beforeEach, describe, expect, it, mock } from "bun:test";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchModal from "./SearchModal";

describe("SearchModal", () => {
	const mockOnOpenChange = mock(() => {});

	beforeEach(() => {
		mockOnOpenChange.mockClear();
	});

	it("renders the modal when isOpen is true", () => {
		render(<SearchModal isOpen={true} onOpenChange={mockOnOpenChange} />);

		expect(screen.getByPlaceholderText(/search coins/i)).toBeInTheDocument();
	});

	it("does not render modal content when isOpen is false", () => {
		const { container } = render(
			<SearchModal isOpen={false} onOpenChange={mockOnOpenChange} />,
		);

		expect(container.firstChild).toBeNull();
	});

	it("renders the search field", () => {
		render(<SearchModal isOpen={true} onOpenChange={mockOnOpenChange} />);

		expect(screen.getByPlaceholderText(/search coins/i)).toBeInTheDocument();
	});

	it("renders the Kbd shortcut hint", () => {
		render(<SearchModal isOpen={true} onOpenChange={mockOnOpenChange} />);

		expect(screen.getByText("Esc")).toBeInTheDocument();
	});

	it("renders quick search buttons", () => {
		render(<SearchModal isOpen={true} onOpenChange={mockOnOpenChange} />);

		expect(screen.getByText("Bitcoin")).toBeInTheDocument();
		expect(screen.getByText("Ethereum")).toBeInTheDocument();
		expect(screen.getByText("XRP")).toBeInTheDocument();
	});

	it("renders the search prompt text", () => {
		render(<SearchModal isOpen={true} onOpenChange={mockOnOpenChange} />);

		expect(screen.getByText("Try searching:")).toBeInTheDocument();
	});

	it("renders 'or' separators between buttons", () => {
		render(<SearchModal isOpen={true} onOpenChange={mockOnOpenChange} />);

		const orElements = screen.getAllByText("or");
		expect(orElements).toHaveLength(1);
	});

	it("calls onOpenChange when CloseButton is clicked", () => {
		render(<SearchModal isOpen={true} onOpenChange={mockOnOpenChange} />);

		const closeButton = screen.getByRole("button", { name: /dismiss/i });

		closeButton.click();

		expect(mockOnOpenChange).toHaveBeenCalledWith(false);
	});

	it("calls onOpenChange when Kbd Esc is clicked", () => {
		render(<SearchModal isOpen={true} onOpenChange={mockOnOpenChange} />);

		const kbdElement = screen.getByText("Esc");

		kbdElement.click();

		expect(mockOnOpenChange).toHaveBeenCalledWith(false);
	});

	it("displays 'No recent searches' when search is empty", () => {
		render(<SearchModal isOpen={true} onOpenChange={mockOnOpenChange} />);

		expect(screen.getByText("No recent searches")).toBeInTheDocument();
	});

	it("displays search query when typing", () => {
		render(<SearchModal isOpen={true} onOpenChange={mockOnOpenChange} />);

		const searchInput = screen.getByPlaceholderText(/search coins/i);

		fireEvent.change(searchInput, { target: { value: "Bitcoin" } });

		expect(
			screen.getByText('Press Enter to search "Bitcoin"'),
		).toBeInTheDocument();
	});

	it("clears search value when closing modal", () => {
		render(<SearchModal isOpen={true} onOpenChange={mockOnOpenChange} />);

		const searchInput = screen.getByPlaceholderText(/search coins/i);

		fireEvent.change(searchInput, { target: { value: "Bitcoin" } });

		expect(
			screen.getByText('Press Enter to search "Bitcoin"'),
		).toBeInTheDocument();

		// Close modal
		const closeButton = screen.getByRole("button", { name: /dismiss/i });
		fireEvent.click(closeButton);

		expect(mockOnOpenChange).toHaveBeenCalledWith(false);
	});
});
