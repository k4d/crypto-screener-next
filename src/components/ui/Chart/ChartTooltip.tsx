import type { ChartType } from "./Chart";

/**
 * Data structure for the custom chart tooltip.
 * Contains OHLCV data and cursor coordinates for positioning.
 */
export interface TooltipData {
	/** Time string (timestamp or formatted date) */
	time: string;
	/** Opening price (for candlestick/bar charts) */
	open?: number;
	/** Highest price (for candlestick/bar charts) */
	high?: number;
	/** Lowest price (for candlestick/bar charts) */
	low?: number;
	/** Closing price or current value */
	close?: number;
	/** Trading volume (if enabled) */
	volume?: number;
	/** X coordinate of the cursor */
	x: number;
	/** Y coordinate of the cursor */
	y: number;
}

/**
 * Props for the ChartTooltip component.
 */
interface ChartTooltipProps {
	/** Tooltip data containing OHLCV values and cursor position */
	data: TooltipData;
	/** Chart type to determine which fields to display */
	type: ChartType;
}

/**
 * Helper function to format time string for display.
 * Converts numeric timestamps to human-readable dates.
 *
 * @param time - Time string (timestamp or date string)
 * @returns Formatted date string (e.g., "Jan 1, 2024") or original string
 */
const formatTime = (time: string) => {
	// Check if the input is a numeric timestamp
	if (/^\d+$/.test(time)) {
		const timestamp = Number(time);
		// Handle both milliseconds (13 digits) and seconds (10 digits)
		const date = new Date(
			timestamp > 9999999999 ? timestamp : timestamp * 1000,
		);
		return date.toLocaleDateString(undefined, {
			year: "numeric",
			month: "short",
			day: "numeric",
		});
	}
	// Return original string if not a timestamp
	return time;
};

/**
 * ChartTooltip component - displays OHLCV data on cursor hover.
 *
 * Renders a floating tooltip that follows the cursor position on the chart.
 * Shows full OHLCV data for candlestick/bar charts, and simplified
 * value display for line/area/baseline charts.
 *
 * @param props - Component props
 * @param props.data - Tooltip data with OHLCV values and cursor coordinates
 * @param props.type - Chart type to determine display format
 *
 * @example
 * ```tsx
 * <ChartTooltip
 *   data={{ time: "2024-01-01", close: 42000, x: 100, y: 50 }}
 *   type="candlestick"
 * />
 * ```
 */
export const ChartTooltip = ({ data, type }: ChartTooltipProps) => {
	// Determine if the chart type supports OHLC data
	const isOhlc = type === "candlestick" || type === "bar";

	return (
		<div
			className="pointer-events-none absolute z-50 min-w-35 rounded-xl bg-white/95 p-3 text-xs text-gray-800 shadow-lg backdrop-blur-sm border border-gray-200"
			style={{
				left: data.x,
				top: data.y,
				transform: "translate(12px, -50%)", // Offset to avoid cursor overlap
			}}
		>
			<div className="mb-2 font-bold text-gray-500 pb-1">
				{formatTime(data.time)}
			</div>
			<div className="grid grid-cols-2 gap-x-4 gap-y-1">
				{isOhlc ? (
					// Full OHLC view for candlestick and bar charts
					<>
						<span className="text-gray-500">Open:</span>
						<span className="text-right font-medium">{data.open ?? "-"}</span>

						<span className="text-gray-500">High:</span>
						<span className="text-right font-medium text-green-600">
							{data.high ?? "-"}
						</span>

						<span className="text-gray-500">Low:</span>
						<span className="text-right font-medium text-red-600">
							{data.low ?? "-"}
						</span>

						<span className="text-gray-500">Close:</span>
						<span className="text-right font-medium">{data.close ?? "-"}</span>
					</>
				) : (
					// Simplified view for line, area, and baseline charts
					<>
						<span className="text-gray-500">Value:</span>
						<span className="text-right font-medium">{data.close ?? "-"}</span>
					</>
				)}

				{/* Always show volume if data is available */}
				{data.volume !== undefined && (
					<>
						<span className="text-gray-500">Vol:</span>
						<span className="text-right font-medium">
							{data.volume.toLocaleString()}
						</span>
					</>
				)}
			</div>
		</div>
	);
};

export default ChartTooltip;
