import {
	AreaSeries,
	type IChartApi,
	type ISeriesApi,
	LineSeries,
	type SeriesType,
} from "lightweight-charts";
import { type RefObject, useEffect, useRef } from "react";
import type { AdditionalSeriesConfig } from "./Chart";

interface UseAdditionalSeriesProps {
	chart: IChartApi | null;
	configs?: AdditionalSeriesConfig[];
}

interface UseAdditionalSeriesReturn {
	additionalSeriesRefs: RefObject<Map<string, ISeriesApi<SeriesType>>>;
}

/**
 * Hook for creating and managing additional series overlaid on the chart.
 *
 * Creates line or area series for indicators, comparisons, or overlays
 * (e.g., ETH/BTC comparison lines, SMA indicators). Automatically filters
 * undefined option values to satisfy lightweight-charts type requirements.
 *
 * @param props - Hook configuration
 * @param props.chart - Chart instance (from useChart)
 * @param props.configs - Array of additional series configurations
 * @returns Object containing refs map for crosshair data collection
 *
 * @example
 * ```tsx
 * const { additionalSeriesRefs } = useAdditionalSeries({
 *   chart,
 *   configs: [
 *     {
 *       type: "line",
 *       data: ethScaledData,
 *       color: "#627EEA",
 *       title: "ETH",
 *     },
 *   ],
 * });
 * ```
 */
export const useAdditionalSeries = ({
	chart,
	configs,
}: UseAdditionalSeriesProps): UseAdditionalSeriesReturn => {
	const additionalSeriesRefs = useRef<Map<string, ISeriesApi<SeriesType>>>(
		new Map(),
	);

	useEffect(() => {
		if (!chart || !configs?.length) return;

		const seriesMap = new Map<string, ISeriesApi<SeriesType>>();

		configs.forEach((config, index) => {
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

			const series =
				config.type === "area"
					? chart.addSeries(AreaSeries, seriesOptions)
					: chart.addSeries(LineSeries, seriesOptions);

			series.setData(config.data);
			const title = config.title || `series-${index}`;
			seriesMap.set(title, series);
		});

		additionalSeriesRefs.current = seriesMap;

		return () => {
			seriesMap.forEach((series) => {
				chart.removeSeries(series);
			});
		};
	}, [chart, configs]);

	return { additionalSeriesRefs };
};
