"use client";

import {
	type CandlestickData,
	CandlestickSeries,
	createChart,
	HistogramSeries,
	type IChartApi,
	type ISeriesApi,
	type SeriesType,
} from "lightweight-charts";
import { useEffect, useRef } from "react";

/**
 * Props for the Chart component.
 */
interface ChartProps {
	/** Array of candlestick data points (OHLC) */
	data: CandlestickData[];
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
 * CryptoChart component - displays candlestick price chart using Lightweight Charts.
 *
 * Renders an interactive financial chart with OHLC data (Open, High, Low, Close).
 * Supports adaptive width, custom height, timeframe, grid toggle, and volume histogram.
 *
 * @param props - Component props
 * @param props.data - Array of candlestick data points
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
 * // With title and custom dimensions
 * <Chart data={chartData} title="BTC/USD" width={800} height={400} />
 *
 * // With volume and timeframe
 * <Chart data={chartData} timeframe="1Y" showVolume />
 *
 * // Without grid
 * <Chart data={chartData} showGrid={false} />
 * ```
 */
export const Chart = ({
	data,
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

		const candleSeries = chart.addSeries(CandlestickSeries);

		// Configure candlestick scale margins (top 70%)
		candleSeries.priceScale().applyOptions({
			scaleMargins: {
				top: 0.1,
				bottom: 0.3, // Leave space for volume
			},
		});

		chartRef.current = chart;
		seriesRef.current = candleSeries;

		// Add volume histogram below candles if enabled
		if (showVolume) {
			const volumeSeries = chart.addSeries(HistogramSeries, {
				priceFormat: {
					type: "volume",
				},
				priceScaleId: "", // Overlay mode (без оси справа)
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
	}, [width, height, data, showGrid, showVolume]);

	// Update data when data prop changes
	useEffect(() => {
		if (seriesRef.current) {
			seriesRef.current.setData(data);
		}
	}, [data]);

	return (
		<div className={className}>
			{title && (
				<h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
			)}
			<div ref={chartContainerRef} data-timeframe={timeframe} />
		</div>
	);
};
