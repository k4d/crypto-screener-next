/**
 * Chart helper constants and data transformation utilities.
 *
 * Contains color constants, grid options, and data transformers
 * used across chart hooks and the main Chart component.
 */

import type {
	CandlestickData,
	GridOptions,
	LineData,
	LineStyle,
} from "lightweight-charts";
import type { AdditionalSeriesConfig } from "./Chart";
import type { ChartLegendItem } from "./ChartLegend";

// ——— Colors ———

/** Default Bitcoin orange color for the main series. */
export const BITCOIN_ORANGE = "#F7931A";

/** Volume bar color for bullish candles (close >= open). */
export const VOLUME_GREEN = "rgba(38, 166, 154, 0.5)";

/** Volume bar color for bearish candles (close < open). */
export const VOLUME_RED = "rgba(239, 83, 80, 0.5)";

/** Grid line color for chart background. */
export const GRID_COLOR = "rgba(42, 46, 57, 0.06)";

// ——— Default Options ———

/** Default grid line configuration for chart background. */
export const DEFAULT_GRID_OPTIONS: GridOptions = {
	vertLines: {
		visible: true,
		color: GRID_COLOR,
		style: 0 as LineStyle,
	},
	horzLines: {
		visible: true,
		color: GRID_COLOR,
		style: 0 as LineStyle,
	},
};

// ——— Data Transformers ———

/**
 * Transforms candlestick OHLC data to line data using close prices.
 *
 * @param ohlc - Array of candlestick data points
 * @returns Array of line data points with close prices
 */
export const transformOhlcToLineData = (ohlc: CandlestickData[]): LineData[] =>
	ohlc.map((candle) => ({
		time: candle.time,
		value: candle.close,
	}));

/**
 * Generates mock volume data with bullish/bearish coloring.
 *
 * Creates random volume values (500k-1.5M) with color based on candle direction.
 *
 * @param data - Array of candlestick data points
 * @returns Array of volume data points with random values and directional colors
 */
export const generateVolumeData = (data: CandlestickData[]) =>
	data.map((candle) => ({
		time: candle.time,
		value: Math.floor(Math.random() * 1000000) + 500000,
		color: candle.close >= candle.open ? VOLUME_GREEN : VOLUME_RED,
	}));

// ——— Legend Helpers ———

/**
 * Resolves legend item properties (color, label, value) automatically
 * when they are not explicitly provided by the user.
 *
 * Resolution Logic:
 * - `color`: Extracted from `additionalSeries[index - 1]` for indices > 0.
 * - `label`: Falls back to `mainSeriesTitle` (index 0) or `additionalSeries[index - 1].title`.
 * - `value`: Computed from the last close price of the main series or the last
 *   value in `additionalSeries[index - 1].originalData`.
 *
 * @param legend - Partial legend items provided by the user
 * @param data - Main series candlestick data
 * @param additionalSeries - Configurations for overlay series
 * @param mainSeriesTitle - Display name for the primary series (index 0)
 * @returns Array of legend items with all missing properties resolved
 */
export const resolveLegendValues = (
	legend: ChartLegendItem[] | undefined,
	data: CandlestickData[],
	additionalSeries: AdditionalSeriesConfig[] | undefined,
	mainSeriesTitle?: string,
): ChartLegendItem[] => {
	if (!legend?.length) return [];

	return legend.map((item, index) => {
		const resolved = { ...item };

		// Resolve color if missing from additionalSeries
		if (!resolved.color) {
			const additionalConfig =
				index === 0
					? undefined // Main series usually doesn't have config in additionalSeries, or use default
					: additionalSeries?.[index - 1];

			resolved.color = additionalConfig?.color;
		}

		// Resolve label if missing
		if (!resolved.label) {
			if (index === 0) {
				resolved.label = mainSeriesTitle || "Main";
			} else {
				resolved.label =
					additionalSeries?.[index - 1]?.title || `Series ${index}`;
			}
		}

		// Resolve value if missing
		if (!resolved.value) {
			// 1. Main series (index 0 is usually the main coin, e.g., BTC)
			if (index === 0 && data.length > 0) {
				const lastCandle = data[data.length - 1];
				resolved.value = `$${lastCandle.close.toLocaleString()}`;
			}
			// 2. Additional series (shift index by -1 because legend[0] is main series)
			else {
				const additionalConfig = additionalSeries?.[index - 1];
				if (additionalConfig?.originalData?.length) {
					const lastPoint =
						additionalConfig.originalData[
							additionalConfig.originalData.length - 1
						];
					resolved.value = `$${lastPoint.value.toLocaleString()}`;
				}
			}
		}

		return resolved;
	});
};
