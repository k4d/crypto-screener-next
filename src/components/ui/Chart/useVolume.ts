import type { CandlestickData } from "lightweight-charts";
import {
	HistogramSeries,
	type IChartApi,
	type ISeriesApi,
	type SeriesType,
} from "lightweight-charts";
import { type RefObject, useEffect, useRef } from "react";
import { generateVolumeData } from "./helpers";

interface UseVolumeProps {
	chart: IChartApi | null;
	data: CandlestickData[];
	showVolume: boolean;
}

interface UseVolumeReturn {
	volumeSeriesRef: RefObject<ISeriesApi<SeriesType> | null>;
}

/**
 * Hook for creating and managing the volume histogram series.
 *
 * Creates a volume histogram series at the bottom of the chart with
 * mock random data. The volume bars are colored based on the candle
 * direction (green for bullish, red for bearish).
 *
 * @param props - Hook configuration
 * @param props.chart - Chart instance (from useChart)
 * @param props.data - Array of OHLC data points (used for volume generation)
 * @param props.showVolume - Whether to display the volume histogram
 * @returns Object containing the volume series ref for crosshair data collection
 *
 * @example
 * ```tsx
 * const { volumeSeriesRef } = useVolume({
 *   chart,
 *   data: ohlcData,
 *   showVolume: true,
 * });
 * ```
 */
export const useVolume = ({
	chart,
	data,
	showVolume,
}: UseVolumeProps): UseVolumeReturn => {
	const volumeSeriesRef = useRef<ISeriesApi<SeriesType> | null>(null);

	useEffect(() => {
		if (!chart || !showVolume || data.length === 0) return;

		const volumeSeries = chart.addSeries(HistogramSeries, {
			priceFormat: { type: "volume" },
			priceScaleId: "", // Overlay mode (no right axis)
		});

		volumeSeries.priceScale().applyOptions({
			scaleMargins: {
				top: 0.7, // Start at 70% height
				bottom: 0,
			},
		});

		volumeSeries.setData(generateVolumeData(data));
		volumeSeriesRef.current = volumeSeries;

		return () => {
			chart.removeSeries(volumeSeries);
		};
	}, [chart, data, showVolume]);

	return { volumeSeriesRef };
};
