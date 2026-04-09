import { describe, expect, it } from "bun:test";
import type { CandlestickData, Time } from "lightweight-charts";
import {
	BITCOIN_ORANGE,
	DEFAULT_GRID_OPTIONS,
	GRID_COLOR,
	generateVolumeData,
	transformOhlcToLineData,
	VOLUME_GREEN,
	VOLUME_RED,
} from "./helpers";

describe("helpers constants", () => {
	it("should export BITCOIN_ORANGE", () => {
		expect(BITCOIN_ORANGE).toBe("#F7931A");
	});

	it("should export VOLUME_GREEN", () => {
		expect(VOLUME_GREEN).toBe("rgba(38, 166, 154, 0.5)");
	});

	it("should export VOLUME_RED", () => {
		expect(VOLUME_RED).toBe("rgba(239, 83, 80, 0.5)");
	});

	it("should export GRID_COLOR", () => {
		expect(GRID_COLOR).toBe("rgba(42, 46, 57, 0.06)");
	});

	it("should export DEFAULT_GRID_OPTIONS", () => {
		expect(DEFAULT_GRID_OPTIONS.vertLines.visible).toBe(true);
		expect(DEFAULT_GRID_OPTIONS.vertLines.color).toBe(GRID_COLOR);
		expect(DEFAULT_GRID_OPTIONS.horzLines.visible).toBe(true);
		expect(DEFAULT_GRID_OPTIONS.horzLines.color).toBe(GRID_COLOR);
	});
});

describe("transformOhlcToLineData", () => {
	const mockOhlc: CandlestickData[] = [
		{ time: 1000 as Time, open: 100, high: 110, low: 95, close: 105 },
		{ time: 1001 as Time, open: 105, high: 120, low: 100, close: 115 },
		{ time: 1002 as Time, open: 115, high: 130, low: 110, close: 125 },
	];

	it("should transform OHLC data to line data using close prices", () => {
		const result = transformOhlcToLineData(mockOhlc);

		expect(result).toHaveLength(3);
		expect(result[0]).toEqual({ time: 1000, value: 105 });
		expect(result[1]).toEqual({ time: 1001, value: 115 });
		expect(result[2]).toEqual({ time: 1002, value: 125 });
	});

	it("should return empty array for empty input", () => {
		const result = transformOhlcToLineData([]);
		expect(result).toHaveLength(0);
	});

	it("should preserve time values", () => {
		const result = transformOhlcToLineData(mockOhlc);
		expect(result.map((d) => d.time)).toEqual([1000, 1001, 1002]);
	});
});

describe("generateVolumeData", () => {
	const mockOhlc: CandlestickData[] = [
		{ time: 1000 as Time, open: 100, high: 110, low: 95, close: 105 },
		{ time: 1001 as Time, open: 105, high: 120, low: 100, close: 100 },
		{ time: 1002 as Time, open: 100, high: 130, low: 90, close: 125 },
	];

	it("should generate volume data with same length as input", () => {
		const result = generateVolumeData(mockOhlc);
		expect(result).toHaveLength(3);
	});

	it("should use VOLUME_GREEN for bullish candles (close >= open)", () => {
		const result = generateVolumeData(mockOhlc);
		expect(result[0].color).toBe(VOLUME_GREEN); // 105 >= 100
		expect(result[2].color).toBe(VOLUME_GREEN); // 125 >= 100
	});

	it("should use VOLUME_RED for bearish candles (close < open)", () => {
		const result = generateVolumeData(mockOhlc);
		expect(result[1].color).toBe(VOLUME_RED); // 100 < 105
	});

	it("should generate volume values between 500k and 1.5M", () => {
		const result = generateVolumeData(mockOhlc);
		result.forEach((item) => {
			expect(item.value).toBeGreaterThanOrEqual(500000);
			expect(item.value).toBeLessThanOrEqual(1500000);
		});
	});

	it("should preserve time values", () => {
		const result = generateVolumeData(mockOhlc);
		expect(result.map((d) => d.time)).toEqual([1000, 1001, 1002]);
	});

	it("should return empty array for empty input", () => {
		const result = generateVolumeData([]);
		expect(result).toHaveLength(0);
	});
});
