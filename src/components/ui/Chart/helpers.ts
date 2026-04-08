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
