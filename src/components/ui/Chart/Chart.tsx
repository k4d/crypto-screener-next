"use client";

import type { CandlestickData, Time } from "lightweight-charts";
import { ChartLegend, type ChartLegendItem } from "./ChartLegend";
import { ChartTooltip } from "./ChartTooltip";
import { resolveLegendValues } from "./helpers";
import { useAdditionalSeries } from "./useAdditionalSeries";
import { useChart } from "./useChart";
import { useCrosshair } from "./useCrosshair";
import { useMainSeries } from "./useMainSeries";
import { useVolume } from "./useVolume";

/**
 * Available chart types.
 */
export type ChartType = "candlestick" | "bar" | "line" | "area" | "baseline";

/**
 * Configuration for additional series (lines/areas) overlaid on the chart.
 */
export interface AdditionalSeriesConfig {
	type: "line" | "area";
	data: { time: Time; value: number }[];
	color?: string;
	lineWidth?: number;
	title?: string;
	/** Show horizontal price line at last value (default: false) */
	priceLineVisible?: boolean;
	/** Show last value label on the right axis (default: true) */
	lastValueVisible?: boolean;
	/** Original data for tooltip display (when scaled data is used for chart) */
	originalData?: { time: Time; value: number }[];
}

/**
 * Props for the Chart component.
 */
interface ChartProps {
	/** Array of candlestick data points (OHLC) */
	data: CandlestickData[];
	/** Chart type (default: "line") */
	type?: ChartType;
	/** Chart title displayed above the chart (optional) */
	chartTitle?: string;
	/** Chart width in pixels (default: 100% of container) */
	width?: number;
	/** Chart height in pixels (default: 300) */
	height?: number;
	/** Timeframe for the chart (default: "30m") */
	timeframe?: `${number}${"m" | "H" | "D" | "W" | "M" | "Y"}`;
	/** Show grid lines (default: true) */
	showGrid?: boolean;
	/** Show volume histogram (default: false) */
	showVolume?: boolean;
	/** Show price axis (right side) (default: true) */
	showPriceAxis?: boolean;
	/** Show time axis (bottom) (default: true) */
	showTimeAxis?: boolean;
	/** Show custom tooltip on hover (default: false) */
	showTooltip?: boolean;
	/** Currency code for price formatting (default: "USD") */
	currency?: string;
	/** Title for the main series (displayed in tooltip) */
	title?: string;
	/** Array of additional series to overlay on the chart */
	additionalSeries?: AdditionalSeriesConfig[];
	/** Legend items displayed on the chart */
	legend?: ChartLegendItem[];
	/** Currency for price formatting (default: "USD") */
	legendCurrency?: string;
	/** Legend layout direction (default: "vertical") */
	legendPosition?: "vertical" | "horizontal";
	/** Legend alignment direction (default: "left") */
	legendAlign?: "left" | "right";
	/** Whether to show the legend (default: true when legend is provided) */
	showLegend?: boolean;
	/** Additional CSS classes for the chart container */
	className?: string;
}

/**
 * Chart component — interactive financial chart using Lightweight Charts.
 *
 * Renders a fully-featured financial chart with support for multiple
 * visualization types (Candlestick, Bar, Line, Area, Baseline). The chart
 * instance is created once on mount and updated via `applyOptions()` when
 * props change, preventing series cleanup errors and ensuring smooth
 * transitions. Data automatically scales to fill the container width using
 * `timeScale().fitContent()`.
 *
 * Features:
 * - 5 chart types with Bitcoin orange (#F7931A) as the default main color
 * - Custom tooltip with OHLCV + additional series values
 * - `originalData` support for scaled series (real prices in tooltip)
 * - Auto-responsive width (fills container) or fixed width via `width` prop
 * - `timeScale().fitContent()` ensures data scales correctly on resize
 * - Optional volume histogram (mock data)
 * - Multi-series overlay (lines/areas) for comparisons/indicators
 *
 * @param props - Component props
 * @param props.data - Array of OHLC data points (must be sorted by time)
 * @param props.type - Chart visualization type (default: "line")
 * @param props.chartTitle - Optional chart title displayed above the chart
 * @param props.title - Title for the main series (shown in tooltip)
 * @param props.width - Fixed width in pixels (default: 100% of container)
 * @param props.height - Chart height in pixels (default: 300)
 * @param props.timeframe - Timeframe identifier for attribution (default: "30m")
 * @param props.showGrid - Toggle grid lines visibility (default: true)
 * @param props.showVolume - Toggle volume histogram (default: false)
 * @param props.showPriceAxis - Toggle right price axis visibility (default: true)
 * @param props.showTimeAxis - Toggle bottom time axis visibility (default: true)
 * @param props.showTooltip - Toggle custom tooltip on hover (default: false)
 * @param props.currency - Currency code for price formatting (default: "USD")
 * @param props.additionalSeries - Array of additional series to overlay (lines/areas)
 * @param props.legend - Legend items displayed on the chart. If not provided, items are auto-generated for active series.
 * @param props.legendPosition - Legend layout direction (default: "vertical")
 * @param props.legendAlign - Legend alignment direction (default: "left")
 * @param props.showLegend - Whether to show the legend (default: true when legend is provided)
 * @param props.className - Additional CSS classes for the outer wrapper
 *
 * @example
 * ```tsx
 * // Basic line chart with default settings (auto-responsive)
 * <Chart data={priceData} />
 *
 * // Candlestick chart with volume and chart title
 * <Chart
 *   data={ohlcData}
 *   type="candlestick"
 *   chartTitle="BTC/USD"
 *   showVolume
 * />
 *
 * // Area chart with hidden axes
 * <Chart
 *   data={priceData}
 *   type="area"
 *   showPriceAxis={false}
 *   showTimeAxis={false}
 * />
 *
 * // Fixed size baseline chart
 * <Chart
 *   data={priceData}
 *   type="baseline"
 *   width={800}
 *   height={400}
 * />
 *
 * // Multi-series chart with tooltip and scaled data
 * <Chart
 *   data={btcData}
 *   type="line"
 *   title="BTC"
 *   showTooltip
 *   currency="USD"
 *   additionalSeries={[
 *     {
 *       type: "line",
 *       data: ethScaled,           // Scaled for visual alignment
 *       originalData: ethOriginal, // Real prices for tooltip
 *       color: "#627EEA",
 *       title: "ETH",
 *     },
 *   ]}
 * />
 *
 * // Chart with auto-generated legend (values resolved from additionalSeries)
 * <Chart
 *   data={btcData}
 *   additionalSeries={[
 *     { type: "line", data: ethData, color: "#627EEA" },
 *     { type: "line", data: bnbData, color: "#F3BA2F" },
 *   ]}
 *   legendPosition="horizontal"
 *   legendAlign="right"
 * />
 * ```
 */
export const Chart = ({
	data,
	type = "line",
	chartTitle,
	title,
	width,
	height = 300,
	timeframe = "30m",
	showGrid = true,
	showVolume = false,
	showPriceAxis = true,
	showTimeAxis = true,
	showTooltip = false,
	currency = "USD",
	additionalSeries,
	legend,
	legendPosition = "vertical",
	legendAlign = "left",
	showLegend = true,
	className,
}: ChartProps) => {
	// If legend is not explicitly passed, create placeholders for auto-filling
	// 1 item for the main series + one for each additionalSeries
	const legendPlaceholder = legend
		? legend
		: [{}, ...(additionalSeries?.map(() => ({})) || [])];

	// Automatically calculate legend values from data if not provided
	const resolvedLegend = resolveLegendValues(
		legendPlaceholder,
		data,
		additionalSeries,
		title,
	);

	const { chart, containerRef, containerWidth } = useChart({
		height,
		width,
		showGrid,
		showPriceAxis,
		showTimeAxis,
	});

	const { seriesRef } = useMainSeries({
		chart,
		type,
		data,
		showVolume,
		title,
	});

	const { additionalSeriesRefs } = useAdditionalSeries({
		chart,
		configs: additionalSeries,
	});

	const { volumeSeriesRef } = useVolume({
		chart,
		data,
		showVolume,
	});

	const { tooltipData } = useCrosshair({
		chart,
		seriesRef,
		volumeSeriesRef,
		additionalSeriesRefs,
		additionalSeriesConfig: additionalSeries,
		showTooltip,
		title,
	});

	return (
		<div className={`relative w-full ${className || ""}`}>
			{chartTitle && (
				<h3 className="text-lg font-semibold text-gray-800 mb-2">
					{chartTitle}
				</h3>
			)}

			{/* Legend */}
			<ChartLegend
				items={resolvedLegend || []}
				position={legendPosition}
				align={legendAlign}
				show={showLegend}
			/>

			<div ref={containerRef} className="w-full" data-timeframe={timeframe} />

			{/* Custom Tooltip */}
			{showTooltip && tooltipData && (
				<ChartTooltip
					data={tooltipData}
					type={type}
					containerWidth={containerWidth}
					currency={currency}
				/>
			)}
		</div>
	);
};
