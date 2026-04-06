"use client";

import {
	type CandlestickData,
	CandlestickSeries,
	createChart,
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
	/** Chart height in pixels (default: 300) */
	height?: number;
}

/**
 * CryptoChart component - displays candlestick price chart using Lightweight Charts.
 *
 * Renders an interactive financial chart with OHLC data (Open, High, Low, Close).
 * Supports adaptive width and custom height.
 *
 * @param props - Component props
 * @param props.data - Array of candlestick data points
 * @param props.height - Chart height in pixels (default: 300)
 *
 * @example
 * ```tsx
 * // Basic usage with default height
 * <Chart data={chartData} />
 *
 * // Custom height
 * <Chart data={chartData} height={400} />
 * ```
 */
export const Chart = ({ data, height = 300 }: ChartProps) => {
	const chartContainerRef = useRef<HTMLDivElement>(null);
	const chartRef = useRef<IChartApi | null>(null);
	const seriesRef = useRef<ISeriesApi<SeriesType> | null>(null);

	useEffect(() => {
		// Check if container exists
		if (!chartContainerRef.current) return;

		// Create chart with container width
		const chart = createChart(chartContainerRef.current, {
			width: chartContainerRef.current.clientWidth,
			height,
			layout: {
				attributionLogo: false,
			},
		});

		const candleSeries = chart.addSeries(CandlestickSeries);

		chartRef.current = chart;
		seriesRef.current = candleSeries;

		// Resize Observer for adaptive width
		const resizeObserver = new ResizeObserver((entries) => {
			for (const entry of entries) {
				const { width } = entry.contentRect;
				chart.applyOptions({ width });
			}
		});

		resizeObserver.observe(chartContainerRef.current);

		// Cleanup on unmount
		return () => {
			resizeObserver.disconnect();
			chart.remove();
		};
	}, [height]);

	// Update data when data prop changes
	useEffect(() => {
		if (seriesRef.current) {
			seriesRef.current.setData(data);
		}
	}, [data]);

	return <div ref={chartContainerRef} />;
};
