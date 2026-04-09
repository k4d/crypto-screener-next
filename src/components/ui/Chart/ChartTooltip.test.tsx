import { describe, expect, it } from "bun:test";
import { render, screen } from "@testing-library/react";
import { ChartTooltip, type TooltipData } from "./ChartTooltip";

const mockOhlcData: TooltipData = {
	time: "1704067200",
	seriesTitle: "BTC",
	open: 42000,
	high: 43000,
	low: 41000,
	close: 42500,
	volume: 1500000,
	x: 100,
	y: 50,
	additionalSeries: [
		{ title: "ETH", value: 3245, color: "#627EEA" },
		{ title: "BNB", value: 612, color: "#F3BA2F" },
	],
};

const mockLineData: TooltipData = {
	time: "1704067200",
	seriesTitle: "BTC",
	close: 42500,
	x: 100,
	y: 50,
};

const mockDataNoTitle: TooltipData = {
	time: "1704067200",
	close: 42500,
	x: 100,
	y: 50,
};

describe("ChartTooltip", () => {
	describe("time display", () => {
		it("should format numeric timestamp to readable date", () => {
			render(
				<ChartTooltip data={mockOhlcData} type="line" containerWidth={800} />,
			);
			expect(screen.getByText(/Jan 1, 2024/)).toBeTruthy();
		});

		it("should display non-numeric time as-is", () => {
			render(
				<ChartTooltip
					data={{ ...mockOhlcData, time: "2024-01-01" }}
					type="line"
					containerWidth={800}
				/>,
			);
			expect(screen.getByText("2024-01-01")).toBeTruthy();
		});
	});

	describe("OHLC display", () => {
		it("should show OHLCV data for candlestick type", () => {
			render(
				<ChartTooltip
					data={mockOhlcData}
					type="candlestick"
					containerWidth={800}
				/>,
			);
			expect(screen.getByText("Open:")).toBeTruthy();
			expect(screen.getByText("High:")).toBeTruthy();
			expect(screen.getByText("Low:")).toBeTruthy();
			expect(screen.getByText("Close:")).toBeTruthy();
			expect(screen.getByText("Vol:")).toBeTruthy();
		});

		it("should show main series title for candlestick type", () => {
			render(
				<ChartTooltip
					data={mockOhlcData}
					type="candlestick"
					containerWidth={800}
				/>,
			);
			// Title is displayed in the OHLC view
			const titleEl = screen.getByText("BTC");
			expect(titleEl).toBeTruthy();
			expect(titleEl.className).toContain("col-span-2");
		});

		it("should show OHLCV data for bar type", () => {
			render(
				<ChartTooltip data={mockOhlcData} type="bar" containerWidth={800} />,
			);
			expect(screen.getByText("Open:")).toBeTruthy();
			expect(screen.getByText("High:")).toBeTruthy();
		});
	});

	describe("line display", () => {
		it("should show Price label for line type", () => {
			render(
				<ChartTooltip
					data={{ ...mockLineData, seriesTitle: "BTC" }}
					type="line"
					containerWidth={800}
				/>,
			);
			expect(screen.getByText(/BTC/)).toBeTruthy();
		});

		it("should show Price label when no seriesTitle", () => {
			render(
				<ChartTooltip
					data={mockDataNoTitle}
					type="line"
					containerWidth={800}
				/>,
			);
			expect(screen.getByText("Price:")).toBeTruthy();
		});

		it("should show Price label for area type", () => {
			render(
				<ChartTooltip
					data={{ ...mockLineData, seriesTitle: "BTC" }}
					type="area"
					containerWidth={800}
				/>,
			);
			expect(screen.getByText(/BTC/)).toBeTruthy();
		});

		it("should show Price label for baseline type", () => {
			render(
				<ChartTooltip
					data={{ ...mockLineData, seriesTitle: "BTC" }}
					type="baseline"
					containerWidth={800}
				/>,
			);
			expect(screen.getByText(/BTC/)).toBeTruthy();
		});
	});

	describe("additional series", () => {
		it("should display additional series values", () => {
			render(
				<ChartTooltip data={mockOhlcData} type="line" containerWidth={800} />,
			);
			expect(screen.getByText("ETH:")).toBeTruthy();
			expect(screen.getByText("BNB:")).toBeTruthy();
		});

		it("should not render additional series section when empty", () => {
			const { container } = render(
				<ChartTooltip data={mockLineData} type="line" containerWidth={800} />,
			);
			const borders = container.querySelectorAll(".border-t");
			expect(borders.length).toBe(0);
		});
	});

	describe("price formatting", () => {
		it("should format USD with currency symbol", () => {
			render(
				<ChartTooltip
					data={mockLineData}
					type="line"
					containerWidth={800}
					currency="USD"
				/>,
			);
			expect(screen.getByText(/\$42,500/)).toBeTruthy();
		});

		it("should format USDT with currency code", () => {
			render(
				<ChartTooltip
					data={mockLineData}
					type="line"
					containerWidth={800}
					currency="USDT"
				/>,
			);
			expect(screen.getByText(/42,500 USDT/)).toBeTruthy();
		});

		it("should display dash for undefined price", () => {
			render(
				<ChartTooltip
					data={{
						time: "1704067200",
						open: 100,
						high: 110,
						low: 95,
						close: undefined,
						x: 100,
						y: 50,
					}}
					type="candlestick"
					containerWidth={800}
				/>,
			);
			const closeValues = screen.getAllByText("-");
			expect(closeValues.length).toBeGreaterThan(0);
		});
	});

	describe("positioning", () => {
		it("should position tooltip to the right by default", () => {
			const { container } = render(
				<ChartTooltip data={mockLineData} type="line" containerWidth={800} />,
			);
			const tooltip = container.firstChild as HTMLElement;
			expect(tooltip.style.transform).toBe("translate(0, -50%)");
		});

		it("should switch to left position near right edge", () => {
			const { container } = render(
				<ChartTooltip
					data={{ ...mockLineData, x: 750 }}
					type="line"
					containerWidth={800}
				/>,
			);
			const tooltip = container.firstChild as HTMLElement;
			expect(tooltip.style.transform).toBe("translate(-100%, -50%)");
		});
	});
});
