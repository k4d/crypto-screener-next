import type { ChartType } from "./Chart";

// ——— Constants ———

const TOOLTIP_WIDTH = 162;
const TOOLTIP_OFFSET = 12;

// ——— Types ———

/**
 * Data for an additional series point displayed in tooltip.
 */
export interface AdditionalSeriesPoint {
	/** Title of the series (e.g., "ETH", "BNB") */
	title: string;
	/** Value at the current time point */
	value: number;
	/** Color of the series (for styling) */
	color?: string;
}

/**
 * Data structure for the custom chart tooltip.
 * Contains OHLCV data and cursor coordinates for positioning.
 */
export interface TooltipData {
	/** Time string (timestamp or formatted date) */
	time: string;
	/** Title of the main series (e.g., "BTC") */
	mainSeriesTitle?: string;
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
	/** Data from additional series at this time point */
	additionalSeries?: AdditionalSeriesPoint[];
}

/**
 * Props for the ChartTooltip component.
 */
interface ChartTooltipProps {
	/** Tooltip data containing OHLCV values and cursor position */
	data: TooltipData;
	/** Chart type to determine which fields to display */
	type: ChartType;
	/** Width of the chart container to prevent overflow */
	containerWidth: number;
	/** Currency code for price formatting (default: "USD") */
	currency?: "USD" | "EUR" | "GBP" | "USDT" | "USDC" | string;
}

// ——— Helpers ———

/**
 * Formats a time string for tooltip display.
 * Converts Unix timestamps to human-readable dates (e.g., "Jan 1, 2024").
 */
const formatTime = (time: string) => {
	if (/^\d+$/.test(time)) {
		const timestamp = Number(time);
		const date = new Date(
			timestamp > 9999999999 ? timestamp : timestamp * 1000,
		);
		return date.toLocaleDateString(undefined, {
			year: "numeric",
			month: "short",
			day: "numeric",
		});
	}
	return time;
};

/**
 * Formats a price with currency-aware display.
 * USD/EUR/GBP use currency symbol ($63,022), others show code (1,234.56 USDT).
 * Adaptive decimal precision based on price magnitude.
 */
const formatPrice = (price: number | undefined, currency: string): string => {
	if (price === undefined) return "-";

	const options = {
		minimumFractionDigits: price < 1 ? 4 : price < 10 ? 2 : 0,
		maximumFractionDigits: price < 10 ? 4 : 2,
	};

	if (currency === "USD" || currency === "EUR" || currency === "GBP") {
		return price.toLocaleString("en-US", {
			style: "currency",
			currency,
			...options,
		});
	}

	return `${price.toLocaleString("en-US", options)} ${currency}`;
};

/**
 * Calculates tooltip position to prevent overflow beyond chart boundaries.
 * Switches from right-aligned to left-aligned when approaching the right edge.
 */
const getTooltipPosition = (cursorX: number, containerWidth: number) => {
	const isOverflowRight =
		cursorX + TOOLTIP_WIDTH + TOOLTIP_OFFSET > containerWidth;

	if (isOverflowRight) {
		return {
			left: cursorX - TOOLTIP_OFFSET,
			transform: "translate(-100%, -50%)" as const,
		};
	}

	return {
		left: cursorX + TOOLTIP_OFFSET,
		transform: "translate(0, -50%)" as const,
	};
};

// ——— Sub-components ———

/**
 * Single row in the tooltip: label + value pair.
 */
const TooltipPriceRow = ({
	label,
	value,
	labelColor,
}: {
	label: string;
	value: string;
	labelColor?: string;
}) => (
	<>
		<span
			className="font-semibold"
			style={labelColor ? { color: labelColor } : undefined}
		>
			{label}:
		</span>
		<span className="text-right font-medium text-gray-500">{value}</span>
	</>
);

/**
 * OHLCV display section for candlestick and bar charts.
 */
const OhlcTooltipContent = ({
	data,
	currency,
}: {
	data: TooltipData;
	currency: string;
}) => (
	<>
		{data.mainSeriesTitle && (
			<span className="col-span-2 font-semibold text-gray-700">
				{data.mainSeriesTitle}
			</span>
		)}
		<TooltipPriceRow label="Open" value={formatPrice(data.open, currency)} />
		<TooltipPriceRow
			label="High"
			value={formatPrice(data.high, currency)}
			labelColor="#16a34a"
		/>
		<TooltipPriceRow
			label="Low"
			value={formatPrice(data.low, currency)}
			labelColor="#dc2626"
		/>
		<TooltipPriceRow label="Close" value={formatPrice(data.close, currency)} />
	</>
);

/**
 * Simplified price display for line, area, and baseline charts.
 */
const SimpleTooltipContent = ({
	data,
	currency,
}: {
	data: TooltipData;
	currency: string;
}) => (
	<>
		<span className="font-semibold text-gray-700">
			{data.mainSeriesTitle ? `${data.mainSeriesTitle}:` : "Price:"}
		</span>
		<span className="text-right font-medium text-gray-500">
			{formatPrice(data.close, currency)}
		</span>
	</>
);

/**
 * Additional series display section (ETH, BNB, etc.).
 */
const AdditionalSeriesSection = ({
	series,
	currency,
}: {
	series: AdditionalSeriesPoint[];
	currency: string;
}) => (
	<>
		<div className="mt-2 mb-1.5 border-t border-gray-200" />
		<div className="grid grid-cols-2 gap-x-4 gap-y-1">
			{series.map((item) => (
				<TooltipPriceRow
					key={item.title}
					label={item.title}
					value={formatPrice(item.value, currency)}
					labelColor={item.color}
				/>
			))}
		</div>
	</>
);

// ——— Main component ———

/**
 * ChartTooltip — interactive tooltip displayed on chart hover.
 *
 * Shows OHLCV data when the cursor hovers over the chart. Automatically adapts
 * to the chart type:
 * - **OHLC charts** (`candlestick`, `bar`): Open, High, Low, Close + Volume
 * - **Line charts** (`line`, `area`, `baseline`): Price (close) + Volume
 *
 * Supports displaying additional series (ETH, BNB, etc.) with real prices
 * (even when chart data is scaled for visualization).
 *
 * Automatically prevents overflow beyond the right chart edge.
 *
 * @param props - Component props
 * @param props.data - Tooltip data: OHLCV, cursor coordinates, additional series
 * @param props.type - Chart type to determine display format
 * @param props.containerWidth - Chart container width (px) for overflow detection
 * @param props.currency - Currency code (USD/EUR/GBP/USDT/USDC, etc.)
 *
 * @example
 * ```tsx
 * <ChartTooltip
 *   data={{
 *     time: "2024-01-01",
 *     close: 42000,
 *     x: 100,
 *     y: 50,
 *     additionalSeries: [
 *       { title: "ETH", value: 3245, color: "#627EEA" },
 *       { title: "BNB", value: 612, color: "#F3BA2F" },
 *     ],
 *   }}
 *   type="line"
 *   containerWidth={800}
 *   currency="USD"
 * />
 * ```
 */
export const ChartTooltip = ({
	data,
	type,
	containerWidth,
	currency = "USD",
}: ChartTooltipProps) => {
	const isOhlc = type === "candlestick" || type === "bar";
	const { left, transform } = getTooltipPosition(data.x, containerWidth);

	return (
		<div
			className="pointer-events-none absolute z-50 w-40.5 rounded-xl bg-white/95 p-3 text-xs text-gray-800 shadow-lg backdrop-blur-sm border border-gray-200"
			style={{ left, top: data.y, transform }}
		>
			<div className="mb-2 font-bold text-gray-500 pb-1">
				{formatTime(data.time)}
			</div>
			<div className="grid grid-cols-2 gap-x-4 gap-y-1">
				{isOhlc ? (
					<OhlcTooltipContent data={data} currency={currency} />
				) : (
					<SimpleTooltipContent data={data} currency={currency} />
				)}

				{data.volume !== undefined && (
					<TooltipPriceRow label="Vol" value={data.volume.toLocaleString()} />
				)}
			</div>

			{data.additionalSeries && data.additionalSeries.length > 0 && (
				<AdditionalSeriesSection
					series={data.additionalSeries}
					currency={currency}
				/>
			)}
		</div>
	);
};

export default ChartTooltip;
