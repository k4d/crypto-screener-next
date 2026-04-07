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
	type SeriesType,
} from "lightweight-charts";
import { useEffect, useRef } from "react";

/**
 * Available chart types.
 */
export type ChartType = "candlestick" | "bar" | "line" | "area" | "baseline";

/**
 * Props for the Chart component.
 */
interface ChartProps {
	/** Array of candlestick data points (OHLC) */
	data: CandlestickData[];
	/** Chart type (default: "candlestick") */
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
	/** Additional CSS classes for the chart container */
	className?: string;
}

/**
 * Chart component - displays financial chart using Lightweight Charts.
 *
 * Renders an interactive financial chart with OHLC data (Open, High, Low, Close).
 * Supports multiple chart types (Candlestick, Bar, Line, Area, Baseline),
 * adaptive width, custom height, timeframe, grid toggle, and volume histogram.
 *
 * @param props - Component props
 * @param props.data - Array of candlestick data points
 * @param props.type - Chart type (default: "candlestick")
 * @param props.title - Chart title (optional)
 * @param props.width - Chart width in pixels (default: 100% of container)
 * @param props.height - Chart height in pixels (default: 300)
 * @param props.timeframe - Timeframe for the chart (default: "30m")
 * @param props.showGrid - Show grid lines (default: true)
 * @param props.showVolume - Show volume histogram (default: false)
 * @param props.className - Additional CSS classes for the outer wrapper
 *
 * @example
 * ```tsx
 * // Basic usage with default settings
 * <Chart data={chartData} />
 *
 * // Line chart with title
 * <Chart data={chartData} type="line" title="BTC/USD" />
 *
 * // Area chart with volume
 * <Chart data={chartData} type="area" showVolume />
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
	className,
}: ChartProps) => {
	const chartContainerRef = useRef<HTMLDivElement>(null);
	const chartRef = useRef<IChartApi | null>(null);
	const seriesRef = useRef<ISeriesApi<SeriesType> | null>(null);

	useEffect(() => {
		// Check if container exists
		if (!chartContainerRef.current) return;

		// Determine width: use prop if provided, else container width
		const chartWidth = width || chartContainerRef.current.clientWidth;

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
		});

		// Determine series type and options
		let series: ISeriesApi<SeriesType>;

		switch (type) {
			case "bar":
				series = chart.addSeries(BarSeries);
				break;
			case "line":
				series = chart.addSeries(LineSeries);
				break;
			case "area":
				series = chart.addSeries(AreaSeries, {
					topColor: "rgba(38, 166, 154, 0.56)",
					bottomColor: "rgba(38, 166, 154, 0.04)",
					lineColor: "rgba(38, 166, 154, 1)",
				});
				break;
			case "baseline":
				series = chart.addSeries(BaselineSeries, {
					baseValue: { type: "price", price: data[0]?.close || 0 },
					topLineColor: "rgba(38, 166, 154, 1)",
					topFillColor1: "rgba(38, 166, 154, 0.28)",
					topFillColor2: "rgba(38, 166, 154, 0.05)",
					bottomLineColor: "rgba(239, 83, 80, 1)",
					bottomFillColor1: "rgba(239, 83, 80, 0.05)",
					bottomFillColor2: "rgba(239, 83, 80, 0.28)",
				});
				break;
			default:
				series = chart.addSeries(CandlestickSeries);
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
			const volumeSeries = chart.addSeries(HistogramSeries, {
				priceFormat: {
					type: "volume",
				},
				priceScaleId: "", // Overlay mode (no right axis)
			});

			// Configure volume scale margins (bottom 30%)
			volumeSeries.priceScale().applyOptions({
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

			volumeSeries.setData(volumeData);
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

		// Resize Observer for adaptive width (only if width prop is not set)
		const resizeObserver = new ResizeObserver((entries) => {
			if (!width) {
				for (const entry of entries) {
					const { width: newWidth } = entry.contentRect;
					chart.applyOptions({ width: newWidth });
				}
			}
		});

		resizeObserver.observe(chartContainerRef.current);

		// Cleanup on unmount
		return () => {
			resizeObserver.disconnect();
			chart.remove();
		};
	}, [width, height, data, showGrid, showVolume, type]);

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
		<div className={className}>
			{title && (
				<h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
			)}
			<div ref={chartContainerRef} data-timeframe={timeframe} />
		</div>
	);
};
