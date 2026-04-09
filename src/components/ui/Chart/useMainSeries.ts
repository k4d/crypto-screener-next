import {
	AreaSeries,
	BarSeries,
	BaselineSeries,
	type CandlestickData,
	CandlestickSeries,
	type IChartApi,
	type ISeriesApi,
	LineSeries,
	type SeriesType,
} from "lightweight-charts";
import { type RefObject, useEffect, useRef } from "react";
import type { ChartType } from "./Chart";
import { BITCOIN_ORANGE, transformOhlcToLineData } from "./helpers";

interface UseMainSeriesProps {
	chart: IChartApi | null;
	type: ChartType;
	data: CandlestickData[];
	showVolume: boolean;
	title?: string;
}

interface UseMainSeriesReturn {
	seriesRef: RefObject<ISeriesApi<SeriesType> | null>;
}

/**
 * Hook for creating and managing the main chart series.
 *
 * Creates the primary data series based on the specified chart type
 * (candlestick, bar, line, area, or baseline). Automatically configures
 * series colors, scale margins, and data transformation.
 *
 * @param props - Hook configuration
 * @param props.chart - Chart instance (from useChart)
 * @param props.type - Chart visualization type
 * @param props.data - Array of OHLC data points
 * @param props.showVolume - Whether volume histogram is enabled (affects scale margins)
 * @param props.title - Title displayed in the tooltip for the main series
 * @returns Object containing the series ref for crosshair data collection
 *
 * @example
 * ```tsx
 * const { seriesRef } = useMainSeries({
 *   chart,
 *   type: "candlestick",
 *   data: ohlcData,
 *   showVolume: true,
 *   title: "BTC",
 * });
 * ```
 */
export const useMainSeries = ({
	chart,
	type,
	data,
	showVolume,
	title,
}: UseMainSeriesProps): UseMainSeriesReturn => {
	const seriesRef = useRef<ISeriesApi<SeriesType> | null>(null);

	useEffect(() => {
		if (!chart || data.length === 0) return;

		const mainSeriesOptions = {
			title,
			color: BITCOIN_ORANGE,
		};

		let series: ISeriesApi<SeriesType>;

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

		series.priceScale().applyOptions({
			scaleMargins: {
				top: 0.1,
				bottom: showVolume ? 0.3 : 0.1,
			},
		});

		if (type === "candlestick" || type === "bar") {
			series.setData(data);
		} else {
			series.setData(transformOhlcToLineData(data));
		}

		seriesRef.current = series;

		return () => {
			chart.removeSeries(series);
		};
	}, [chart, type, data, showVolume, title]);

	return { seriesRef };
};
