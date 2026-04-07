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
} from "lightweight-charts";
import { useEffect, useRef, useState } from "react";
import { ChartTooltip, type TooltipData } from "./ChartTooltip";

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
	/** Additional CSS classes for the chart container */
	className?: string;
}

/**
 * Chart component - interactive financial chart using Lightweight Charts.
 *
 * Renders a fully-featured financial chart with support for multiple
 * visualization types (Candlestick, Bar, Line, Area, Baseline).
 * Includes adaptive sizing, custom tooltips, volume histogram,
 * and customizable axes visibility.
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
	className,
}: ChartProps) => {
	const chartContainerRef = useRef<HTMLDivElement>(null);
	const chartRef = useRef<IChartApi | null>(null);
	const seriesRef = useRef<ISeriesApi<SeriesType> | null>(null);
	const volumeSeriesRef = useRef<ISeriesApi<SeriesType> | null>(null);

	// State for custom tooltip
	const [tooltipData, setTooltipData] = useState<TooltipData | null>(null);

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
			rightPriceScale: {
				visible: showPriceAxis,
			},
			timeScale: {
				visible: showTimeAxis,
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

				setTooltipData({
					time: String(param.time),
					open: hasOHLC ? data.open : undefined,
					high: hasOHLC ? data.high : undefined,
					low: hasOHLC ? data.low : undefined,
					close: hasOHLC ? data.close : data.value,
					volume: volData?.value,
					x: param.point.x,
					y: param.point.y,
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
				<ChartTooltip data={tooltipData} type={type} />
			)}
		</div>
	);
};
