import { describe, expect, it } from "bun:test";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ChartLegend } from "./ChartLegend";

const mockItems = [
	{ label: "BTC", value: "$100,000", color: "#F7931A" },
	{ label: "ETH", value: "$5,000", color: "#627EEA" },
];

describe("ChartLegend", () => {
	it("renders items correctly", () => {
		render(<ChartLegend items={mockItems} />);
		expect(screen.getByText("BTC")).toBeInTheDocument();
		expect(screen.getByText("$100,000")).toBeInTheDocument();
		expect(screen.getByText("ETH")).toBeInTheDocument();
	});

	it("does not render when show is false", () => {
		const { container } = render(
			<ChartLegend items={mockItems} show={false} />,
		);
		expect(container.firstChild).toBeNull();
	});

	it("does not render when items array is empty", () => {
		const { container } = render(<ChartLegend items={[]} />);
		expect(container.firstChild).toBeNull();
	});

	it("displays fallback 'N/A' for missing label and value", () => {
		render(<ChartLegend items={[{}]} />);
		expect(screen.getAllByText("N/A")).toHaveLength(2);
	});

	it("applies correct classes for horizontal layout", () => {
		const { container } = render(
			<ChartLegend items={mockItems} position="horizontal" />,
		);
		const wrapper = container.firstChild;
		expect(wrapper).toHaveClass("items-center", "gap-4");
	});

	it("applies correct classes for vertical layout", () => {
		const { container } = render(
			<ChartLegend items={mockItems} position="vertical" />,
		);
		const wrapper = container.firstChild;
		expect(wrapper).toHaveClass("flex-col", "gap-0.5");
	});

	it("applies center positioning classes", () => {
		const { container } = render(
			<ChartLegend items={mockItems} align="center" />,
		);
		const wrapper = container.firstChild;
		expect(wrapper).toHaveClass("left-1/2", "-translate-x-1/2");
	});

	it("applies right positioning classes", () => {
		const { container } = render(
			<ChartLegend items={mockItems} align="right" />,
		);
		const wrapper = container.firstChild;
		expect(wrapper).toHaveClass("right-3");
	});

	it("applies custom color via inline style", () => {
		render(<ChartLegend items={mockItems} />);
		const label = screen.getByText("BTC");
		expect(label).toHaveStyle({ color: "#F7931A" });
	});
});
