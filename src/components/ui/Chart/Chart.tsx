"use client";

import {
	AreaSeries,
	BarSeries,
	BaselineSeries,
	type CandlestickData,
	CandlestickSeries,
	createChart,
	HistogramSeries,
	type IChartApi,
	type ISeriesApi,
	LineSeries,
	type MouseEventParams,
	type SeriesType,
	type Time,
} from "lightweight-charts";
import { useEffect, useRef, useState } from "react";
import {
	type AdditionalSeriesPoint,
	ChartTooltip,
	type TooltipData,
} from "./ChartTooltip";

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
	mainSeriesTitle?: string;
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
 * @param props.mainSeriesTitle - Title for the main series (shown in tooltip)
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
 *   mainSeriesTitle="BTC"
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
	width,
	height = 300,
	timeframe = "30m",
	showGrid = true,
	showVolume = false,
	showPriceAxis = true,
	showTimeAxis = true,
	showTooltip = false,
	currency = "USD",
	mainSeriesTitle,
	additionalSeries,
	className,
}: ChartProps) => {
	const chartContainerRef = useRef<HTMLDivElement>(null);
	const chartRef = useRef<IChartApi | null>(null);
	const seriesRef = useRef<ISeriesApi<SeriesType> | null>(null);
	const volumeSeriesRef = useRef<ISeriesApi<SeriesType> | null>(null);
	const additionalSeriesRefs = useRef<Map<string, ISeriesApi<SeriesType>>>(
		new Map(),
	);

	// State for custom tooltip
	const [tooltipData, setTooltipData] = useState<TooltipData | null>(null);
	// State for chart container width (for tooltip positioning)
	const [containerWidth, setContainerWidth] = useState<number>(0);

	useEffect(() => {
		// Check if container exists
		if (!chartContainerRef.current) return;

		// Determine width: use prop if provided, else container width
		const chartWidth = width || chartContainerRef.current.clientWidth;

		// Store container width for tooltip positioning
		setContainerWidth(chartWidth);

		// Create chart with container width
		const chart = createChart(chartContainerRef.current, {
			width: chartWidth,
			height,
			layout: {
				attributionLogo: false,
			},
			grid: {
				vertLines: {
					visible: showGrid,
					color: "rgba(42, 46, 57, 0.06)",
				},
				horzLines: {
					visible: showGrid,
					color: "rgba(42, 46, 57, 0.06)",
				},
			},
			rightPriceScale: {
				visible: showPriceAxis,
			},
			timeScale: {
				visible: showTimeAxis,
			},
		});

		// Determine series type and options
		let series: ISeriesApi<SeriesType>;

		// Common options for the main series
		// biome-ignore lint/suspicious/noExplicitAny: Library options type complexity
		const mainSeriesOptions: any = {
			title: mainSeriesTitle,
			color: "#F7931A", // Bitcoin orange
		};

		switch (type) {
			case "bar":
				series = chart.addSeries(BarSeries, mainSeriesOptions);
				break;
			case "line":
				series = chart.addSeries(LineSeries, mainSeriesOptions);
				break;
			case "area":
				series = chart.addSeries(AreaSeries, {
					...mainSeriesOptions,
					topColor: "rgba(247, 147, 26, 0.4)",
					bottomColor: "rgba(247, 147, 26, 0.05)",
					lineColor: "rgba(247, 147, 26, 1)",
				});
				break;
			case "baseline":
				series = chart.addSeries(BaselineSeries, {
					...mainSeriesOptions,
					baseValue: { type: "price", price: data[0]?.close || 0 },
					topLineColor: "rgba(247, 147, 26, 1)",
					topFillColor1: "rgba(247, 147, 26, 0.28)",
					topFillColor2: "rgba(247, 147, 26, 0.05)",
					bottomLineColor: "rgba(239, 83, 80, 1)",
					bottomFillColor1: "rgba(239, 83, 80, 0.05)",
					bottomFillColor2: "rgba(239, 83, 80, 0.28)",
				});
				break;
			default:
				series = chart.addSeries(CandlestickSeries, mainSeriesOptions);
		}

		// Configure scale margins for main series
		series.priceScale().applyOptions({
			scaleMargins: {
				top: 0.1,
				bottom: showVolume ? 0.3 : 0.1,
			},
		});

		chartRef.current = chart;
		seriesRef.current = series;

		// Add volume histogram below chart if enabled
		if (showVolume) {
			volumeSeriesRef.current = chart.addSeries(HistogramSeries, {
				priceFormat: {
					type: "volume",
				},
				priceScaleId: "", // Overlay mode (no right axis)
			});

			// Configure volume scale margins (bottom 30%)
			volumeSeriesRef.current.priceScale().applyOptions({
				scaleMargins: {
					top: 0.7, // Start at 70% height
					bottom: 0,
				},
			});

			// Generate mock volume data based on candlestick data
			const volumeData = data.map((candle) => ({
				time: candle.time,
				value: Math.floor(Math.random() * 1000000) + 500000,
				color:
					candle.close >= candle.open
						? "rgba(38, 166, 154, 0.5)" // Green for bullish
						: "rgba(239, 83, 80, 0.5)", // Red for bearish
			}));

			volumeSeriesRef.current.setData(volumeData);
		}

		// Set data based on chart type
		if (type === "candlestick" || type === "bar") {
			series.setData(data);
		} else {
			// For line, area, baseline: map OHLC to LineData (using close price)
			const lineData = data.map((candle) => ({
				time: candle.time,
				value: candle.close,
			}));
			series.setData(lineData);
		}

		// Add additional series
		const additionalSeriesMap = new Map<string, ISeriesApi<SeriesType>>();
		additionalSeries?.forEach((config) => {
			// Build options, filtering out undefined to satisfy library types
			// biome-ignore lint/suspicious/noExplicitAny: Lightweight-charts uses complex union types
			const seriesOptions: any = {
				color: config.color,
				lineWidth: config.lineWidth,
				title: config.title,
				priceLineVisible: config.priceLineVisible ?? false,
				lastValueVisible: config.lastValueVisible ?? true,
			};

			// Remove undefined values to avoid type errors
			Object.keys(seriesOptions).forEach((key) => {
				if (seriesOptions[key] === undefined) {
					delete seriesOptions[key];
				}
			});

			let series: ISeriesApi<SeriesType>;

			if (config.type === "area") {
				series = chart.addSeries(AreaSeries, seriesOptions);
			} else {
				series = chart.addSeries(LineSeries, seriesOptions);
			}

			series.setData(config.data);
			additionalSeriesMap.set(
				config.title || `series-${additionalSeries.indexOf(config)}`,
				series,
			);
		});

		// Store additional series refs
		additionalSeriesRefs.current = additionalSeriesMap;

		// Handler for crosshair movement
		const handleCrosshairMove = (param: MouseEventParams) => {
			if (!showTooltip) {
				setTooltipData(null);
				return;
			}

			if (!param.time || !param.seriesData.size || !seriesRef.current) {
				setTooltipData(null);
				return;
			}

			const mainSeriesData = param.seriesData.get(seriesRef.current);
			const volSeriesData = volumeSeriesRef.current
				? param.seriesData.get(volumeSeriesRef.current)
				: null;

			if (mainSeriesData && param.point) {
				// Define a loose type to avoid 'any' casting everywhere
				interface LooseSeriesData {
					open?: number;
					high?: number;
					low?: number;
					close?: number;
					value?: number;
				}

				const data = mainSeriesData as LooseSeriesData;
				const volData = volSeriesData as LooseSeriesData | null;

				const hasOHLC = data.open !== undefined;

				// Collect additional series data
				const additionalSeriesData: AdditionalSeriesPoint[] = [];
				for (const [series, seriesData] of param.seriesData) {
					// Skip main series and volume
					if (
						series === seriesRef.current ||
						series === volumeSeriesRef.current
					) {
						continue;
					}

					// Check if this is one of our additional series
					if (seriesData && "value" in seriesData) {
						// Find the title and config for this series
						let foundTitle: string | undefined;
						let foundConfig: AdditionalSeriesConfig | undefined;
						for (const [title, ref] of additionalSeriesRefs.current) {
							if (ref === series) {
								foundTitle = title;
								foundConfig = additionalSeries?.find(
									(c) => (c.title || "") === title,
								);
								break;
							}
						}

						let displayValue = (seriesData as { value: number }).value;

						// Use original data value if available
						if (foundConfig?.originalData) {
							const originalPoint = foundConfig.originalData.find(
								(d) => d.time === param.time,
							);
							if (originalPoint) {
								displayValue = originalPoint.value;
							}
						}

						if (foundTitle) {
							additionalSeriesData.push({
								title: foundTitle,
								value: displayValue,
								color: foundConfig?.color,
							});
						}
					}
				}

				setTooltipData({
					time: String(param.time),
					mainSeriesTitle,
					open: hasOHLC ? data.open : undefined,
					high: hasOHLC ? data.high : undefined,
					low: hasOHLC ? data.low : undefined,
					close: hasOHLC ? data.close : data.value,
					volume: volData?.value,
					x: param.point.x,
					y: param.point.y,
					additionalSeries: additionalSeriesData,
				});
			} else {
				setTooltipData(null);
			}
		};

		// Subscribe to crosshair movement for custom tooltip
		chart.subscribeCrosshairMove(handleCrosshairMove);

		// Resize Observer for adaptive width (only if width prop is not set)
		const resizeObserver = new ResizeObserver((entries) => {
			if (!width) {
				for (const entry of entries) {
					const { width: newWidth } = entry.contentRect;
					chart.applyOptions({ width: newWidth });
					setContainerWidth(newWidth);
				}
			}
		});

		resizeObserver.observe(chartContainerRef.current);

		// Cleanup on unmount
		return () => {
			resizeObserver.disconnect();
			chart.unsubscribeCrosshairMove(handleCrosshairMove);
			chart.remove();
		};
	}, [
		width,
		height,
		data,
		showGrid,
		showVolume,
		type,
		showPriceAxis,
		showTimeAxis,
		showTooltip,
		additionalSeries,
		mainSeriesTitle,
	]);

	// Update data when data prop changes
	useEffect(() => {
		if (seriesRef.current) {
			if (type === "candlestick" || type === "bar") {
				seriesRef.current.setData(data);
			} else {
				const lineData = data.map((candle) => ({
					time: candle.time,
					value: candle.close,
				}));
				seriesRef.current.setData(lineData);
			}
		}
	}, [data, type]);

	return (
		<div className={`relative ${className || ""}`}>
			{title && (
				<h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
			)}
			<div ref={chartContainerRef} data-timeframe={timeframe} />

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
