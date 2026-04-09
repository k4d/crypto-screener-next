import type {
	IChartApi,
	ISeriesApi,
	MouseEventParams,
	SeriesType,
} from "lightweight-charts";
import { type RefObject, useEffect, useState } from "react";
import type { AdditionalSeriesConfig } from "./Chart";
import type { AdditionalSeriesPoint, TooltipData } from "./ChartTooltip";

interface UseCrosshairProps {
	chart: IChartApi | null;
	seriesRef: RefObject<ISeriesApi<SeriesType> | null>;
	volumeSeriesRef: RefObject<ISeriesApi<SeriesType> | null>;
	additionalSeriesRefs: RefObject<Map<string, ISeriesApi<SeriesType>>>;
	additionalSeriesConfig?: AdditionalSeriesConfig[];
	showTooltip: boolean;
	title?: string;
}

interface UseCrosshairReturn {
	tooltipData: TooltipData | null;
}

interface LooseSeriesData {
	open?: number;
	high?: number;
	low?: number;
	close?: number;
	value?: number;
}

/**
 * Hook for handling crosshair movement and collecting tooltip data.
 *
 * Subscribes to the chart's crosshair movement events and aggregates
 * OHLCV data from the main series, volume series, and additional series.
 * Supports `originalData` for scaled series to display real prices in tooltips.
 *
 * @param props - Hook configuration
 * @param props.chart - Chart instance (from useChart)
 * @param props.seriesRef - Ref to the main series
 * @param props.volumeSeriesRef - Ref to the volume series
 * @param props.additionalSeriesRefs - Ref to the map of additional series
 * @param props.additionalSeriesConfig - Config array for additional series (used for originalData lookup)
 * @param props.showTooltip - Whether to display the tooltip
 * @param props.title - Title for the main series in the tooltip
 * @returns Object containing the current tooltip data
 *
 * @example
 * ```tsx
 * const { tooltipData } = useCrosshair({
 *   chart,
 *   seriesRef,
 *   volumeSeriesRef,
 *   additionalSeriesRefs,
 *   additionalSeriesConfig: additionalSeries,
 *   showTooltip: true,
 *   title: "BTC",
 * });
 * ```
 */
export const useCrosshair = ({
	chart,
	seriesRef,
	volumeSeriesRef,
	additionalSeriesRefs,
	additionalSeriesConfig,
	showTooltip,
	title,
}: UseCrosshairProps): UseCrosshairReturn => {
	const [tooltipData, setTooltipData] = useState<TooltipData | null>(null);

	useEffect(() => {
		if (!chart || !showTooltip) return;

		const handleCrosshairMove = (param: MouseEventParams) => {
			if (!param.time || !param.seriesData.size || !seriesRef.current) {
				setTooltipData(null);
				return;
			}

			const mainSeriesData = param.seriesData.get(seriesRef.current);
			const volSeriesData = volumeSeriesRef.current
				? param.seriesData.get(volumeSeriesRef.current)
				: null;

			if (!mainSeriesData || !param.point) {
				setTooltipData(null);
				return;
			}

			const data = mainSeriesData as LooseSeriesData;
			const volData = (volSeriesData as LooseSeriesData) || null;
			const hasOHLC = data.open !== undefined;

			// Collect additional series data
			const additionalSeriesData: AdditionalSeriesPoint[] = [];
			for (const [series, seriesData] of param.seriesData) {
				if (
					series === seriesRef.current ||
					series === volumeSeriesRef.current
				) {
					continue;
				}

				if (seriesData && "value" in seriesData) {
					let foundTitle: string | undefined;
					let foundConfig: AdditionalSeriesConfig | undefined;

					for (const [title, ref] of additionalSeriesRefs.current) {
						if (ref === series) {
							foundTitle = title;
							foundConfig = additionalSeriesConfig?.find(
								(c) => (c.title || "") === title,
							);
							break;
						}
					}

					if (foundTitle) {
						let displayValue = (seriesData as { value: number }).value;

						if (foundConfig?.originalData) {
							const originalPoint = foundConfig.originalData.find(
								(d) => d.time === param.time,
							);
							if (originalPoint) {
								displayValue = originalPoint.value;
							}
						}

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
				seriesTitle: title,
				open: hasOHLC ? data.open : undefined,
				high: hasOHLC ? data.high : undefined,
				low: hasOHLC ? data.low : undefined,
				close: hasOHLC ? data.close : data.value,
				volume: volData?.value,
				x: param.point.x,
				y: param.point.y,
				additionalSeries: additionalSeriesData,
			});
		};

		chart.subscribeCrosshairMove(handleCrosshairMove);

		return () => {
			chart.unsubscribeCrosshairMove(handleCrosshairMove);
		};
	}, [
		chart,
		showTooltip,
		seriesRef,
		volumeSeriesRef,
		additionalSeriesRefs,
		additionalSeriesConfig,
		title,
	]);

	return { tooltipData };
};
