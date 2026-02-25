import { render, screen } from "@testing-library/react";
import { CoinPriceChange } from "./CoinPriceChange";

describe("CoinPriceChange", () => {
	it("renders positive change with + sign", () => {
		render(<CoinPriceChange change={4.91} />);
		expect(screen.getByText("+4.91%")).toBeInTheDocument();
	});

	it("renders negative change with - sign", () => {
		render(<CoinPriceChange change={-2.34} />);
		expect(screen.getByText("-2.34%")).toBeInTheDocument();
	});

	it("has green color for positive changes", () => {
		const { container } = render(<CoinPriceChange change={4.91} />);
		expect(container.firstChild).toHaveClass("text-green-600");
	});

	it("has red color for negative changes", () => {
		const { container } = render(<CoinPriceChange change={-2.34} />);
		expect(container.firstChild).toHaveClass("text-red-600");
	});

	it("has green color for zero change", () => {
		const { container } = render(<CoinPriceChange change={0} />);
		expect(container.firstChild).toHaveClass("text-green-600");
	});

	it("renders with icon when showIcon=true (positive)", () => {
		render(<CoinPriceChange change={4.91} showIcon />);
		const icon = screen.getByTestId("arrow-up-icon");
		expect(icon).toBeInTheDocument();
	});

	it("renders with icon when showIcon=true (negative)", () => {
		render(<CoinPriceChange change={-2.34} showIcon />);
		const icon = screen.getByTestId("arrow-down-icon");
		expect(icon).toBeInTheDocument();
	});

	it("renders with period when period prop is provided", () => {
		render(<CoinPriceChange change={4.91} period="24h" />);
		expect(screen.getByText("+4.91% (24h)")).toBeInTheDocument();
	});

	it("renders with different sizes", () => {
		const { rerender } = render(<CoinPriceChange change={4.91} size="sm" />);
		expect(screen.getByText("+4.91%")).toHaveClass("text-xs");

		rerender(<CoinPriceChange change={4.91} size="md" />);
		expect(screen.getByText("+4.91%")).toHaveClass("text-sm");

		rerender(<CoinPriceChange change={4.91} size="lg" />);
		expect(screen.getByText("+4.91%")).toHaveClass("text-base");
	});

	it("applies custom className to container", () => {
		const { container } = render(
			<CoinPriceChange change={4.91} className="justify-end" />,
		);
		expect(container.firstChild).toHaveClass("justify-end");
	});

	it("formats change with 2 decimal places", () => {
		render(<CoinPriceChange change={5.678} />);
		expect(screen.getByText("+5.68%")).toBeInTheDocument();
	});
});
