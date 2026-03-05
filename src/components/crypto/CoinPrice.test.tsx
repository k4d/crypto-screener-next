import { render, screen } from "@testing-library/react";
import { CoinPrice } from "./CoinPrice";

describe("CoinPrice", () => {
	it("renders large price without trailing zeros", () => {
		render(<CoinPrice price={72996} />);
		expect(screen.getByText("$72,996")).toBeInTheDocument();
	});

	it("renders price with cents", () => {
		render(<CoinPrice price={63022.79} />);
		expect(screen.getByText("$63,022.79")).toBeInTheDocument();
	});

	it("renders string price as-is", () => {
		render(<CoinPrice price="$63,022.79" />);
		expect(screen.getByText("$63,022.79")).toBeInTheDocument();
	});

	it("renders price equal to 1 with 2 decimals", () => {
		render(<CoinPrice price={1} />);
		expect(screen.getByText("$1.00")).toBeInTheDocument();
	});

	it("renders small price (< 1) with 4 decimal places", () => {
		render(<CoinPrice price={0.58} />);
		expect(screen.getByText("$0.5800")).toBeInTheDocument();
	});

	it("renders price between 1 and 10 with 2 decimals", () => {
		render(<CoinPrice price={5.99} />);
		expect(screen.getByText("$5.99")).toBeInTheDocument();
	});

	it("renders price between 1 and 10 with 4 decimals if needed", () => {
		render(<CoinPrice price={9.9999} />);
		expect(screen.getByText("$9.9999")).toBeInTheDocument();
	});

	it("renders with different sizes", () => {
		const { rerender } = render(<CoinPrice price={63022.79} size="sm" />);
		expect(screen.getByText("$63,022.79")).toHaveClass("text-sm");

		rerender(<CoinPrice price={63022.79} size="md" />);
		expect(screen.getByText("$63,022.79")).toHaveClass("text-base");

		rerender(<CoinPrice price={63022.79} size="lg" />);
		expect(screen.getByText("$63,022.79")).toHaveClass("text-lg");
	});

	it("applies custom className to container", () => {
		const { container } = render(
			<CoinPrice price={63022.79} className="text-right" />,
		);
		expect(container.firstChild).toHaveClass("text-right");
	});

	it("renders with bold font weight", () => {
		render(<CoinPrice price={100} />);
		expect(screen.getByText("$100")).toHaveClass("font-bold");
	});
});
