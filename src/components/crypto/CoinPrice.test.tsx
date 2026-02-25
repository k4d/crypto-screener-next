import { render, screen } from "@testing-library/react";
import { CoinPrice } from "./CoinPrice";

describe("CoinPrice", () => {
	it("renders number price with $ symbol", () => {
		render(<CoinPrice price={63022.79} />);
		expect(screen.getByText("$63,022.79")).toBeInTheDocument();
	});

	it("renders string price as-is", () => {
		render(<CoinPrice price="$63,022.79" />);
		expect(screen.getByText("$63,022.79")).toBeInTheDocument();
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

	it("formats small prices with 4 decimal places", () => {
		render(<CoinPrice price={0.58} />);
		expect(screen.getByText("$0.5800")).toBeInTheDocument();
	});
});
