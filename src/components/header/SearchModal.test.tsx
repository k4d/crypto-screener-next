import { render, screen } from "@testing-library/react";
import SearchModal from "./SearchModal";

describe("SearchModal", () => {
	const mockOnOpenChange = jest.fn();

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

	it("calls onOpenChange when modal is closed", () => {
		render(<SearchModal isOpen={true} onOpenChange={mockOnOpenChange} />);

		const closeButton = screen.getByRole("button", { name: /dismiss/i });

		closeButton.click();

		expect(mockOnOpenChange).toHaveBeenCalledWith(false);
	});

	it("displays 'No recent searches' when search is empty", () => {
		render(<SearchModal isOpen={true} onOpenChange={mockOnOpenChange} />);

		expect(screen.getByText("No recent searches")).toBeInTheDocument();
	});
});
