"use client";

import type { CandlestickData, Time } from "lightweight-charts";
import { ChartTooltip } from "./ChartTooltip";
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
	/** Chart title (optional) */
	title?: string;
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
	/** Title for the main series (displayed on the chart) */
	seriesTitle?: string;
	/** Array of additional series to overlay on the chart */
	additionalSeries?: AdditionalSeriesConfig[];
	/** Additional CSS classes for the chart container */
	className?: string;
}

/**
 * Chart component — interactive financial chart using Lightweight Charts.
 *
 * Renders a fully-featured financial chart with support for multiple
 * visualization types (Candlestick, Bar, Line, Area, Baseline).
 * Includes adaptive sizing, smart tooltip positioning (avoids edge overflow),
 * volume histogram, customizable axes visibility, and multi-series overlay.
 *
 * Features:
 * - 5 chart types with Bitcoin orange (#F7931A) as the default main color
 * - Custom tooltip with OHLCV + additional series values
 * - `originalData` support for scaled series (real prices in tooltip)
 * - ResizeObserver for responsive width adaptation
 * - Optional volume histogram (mock data)
 *
 * @param props - Component props
 * @param props.data - Array of OHLC data points (must be sorted by time)
 * @param props.type - Chart visualization type (default: "line")
 * @param props.title - Optional chart title displayed above the chart
 * @param props.width - Fixed width in pixels (default: 100% of container)
 * @param props.height - Chart height in pixels (default: 300)
 * @param props.timeframe - Timeframe identifier for attribution (default: "30m")
 * @param props.showGrid - Toggle grid lines visibility (default: true)
 * @param props.showVolume - Toggle volume histogram (default: false)
 * @param props.showPriceAxis - Toggle right price axis visibility (default: true)
 * @param props.showTimeAxis - Toggle bottom time axis visibility (default: true)
 * @param props.showTooltip - Toggle custom tooltip on hover (default: false)
 * @param props.currency - Currency code for price formatting (default: "USD")
 * @param props.seriesTitle - Title for the main series (shown in tooltip)
 * @param props.additionalSeries - Array of additional series to overlay (lines/areas)
 * @param props.className - Additional CSS classes for the outer wrapper
 *
 * @example
 * ```tsx
 * // Basic line chart with default settings
 * <Chart data={priceData} />
 *
 * // Candlestick chart with volume and title
 * <Chart
 *   data={ohlcData}
 *   type="candlestick"
 *   title="BTC/USD"
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
 *   seriesTitle="BTC"
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
 * ```
 */
export const Chart = ({
	data,
	type = "line",
	title,
	width: _width,
	height = 300,
	timeframe = "30m",
	showGrid = true,
	showVolume = false,
	showPriceAxis = true,
	showTimeAxis = true,
	showTooltip = false,
	currency = "USD",
	seriesTitle,
	additionalSeries,
	className,
}: ChartProps) => {
	const { chart, containerRef, containerWidth } = useChart({
		height,
		showGrid,
		showPriceAxis,
		showTimeAxis,
	});

	const { seriesRef } = useMainSeries({
		chart,
		type,
		data,
		showVolume,
		seriesTitle,
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
		seriesTitle,
	});

	return (
		<div className={`relative ${className || ""}`}>
			{title && (
				<h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
			)}
			<div ref={containerRef} data-timeframe={timeframe} />

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
