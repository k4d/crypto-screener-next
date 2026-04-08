import type { ChartType } from "./Chart";

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
 * ChartTooltip component — интерактивный тултип при наведении на график.
 *
 * Отображает OHLCV-данные при наведении курсора. Автоматически подстраивается
 * под тип графика:
 * - **OHLC-графики** (`candlestick`, `bar`): Open, High, Low, Close + Volume
 * - **Линейные графики** (`line`, `area`, `baseline`): Price (закрытие) + Volume
 *
 * Поддерживает отображение дополнительных серий (ETH, BNB и т.д.) с реальными
 * ценами (даже если данные масштабированы для визуализации).
 *
 * Автоматически предотвращает выход за правую границу графика.
 *
 * @param props - Component props
 * @param props.data - Данные тултипа: OHLCV, координаты курсора, доп.серии
 * @param props.type - Тип графика для определения формата отображения
 * @param props.containerWidth - Ширина контейнера графика (px) для overflow detection
 * @param props.currency - Код валюты (USD/EUR/GBP/USDT/USDC и др.)
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
	// Determine if the chart type supports OHLC data
	const isOhlc = type === "candlestick" || type === "bar";

	// Helper function to format price with currency
	const formatPrice = (price: number | undefined) => {
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

	// Tooltip width and positioning
	const tooltipWidth = 162;
	const offset = 12;

	// Default: open to the right
	let leftPosition = data.x + offset;
	let transform = "translate(0, -50%)";

	// Check if tooltip would overflow the right edge
	if (data.x + tooltipWidth + offset > containerWidth) {
		// Switch to left
		leftPosition = data.x - offset;
		transform = "translate(-100%, -50%)";
	}

	return (
		<div
			className="pointer-events-none absolute z-50 w-40.5 rounded-xl bg-white/95 p-3 text-xs text-gray-800 shadow-lg backdrop-blur-sm border border-gray-200"
			style={{
				left: leftPosition,
				top: data.y,
				transform,
			}}
		>
			<div className="mb-2 font-bold text-gray-500 pb-1">
				{formatTime(data.time)}
			</div>
			<div className="grid grid-cols-2 gap-x-4 gap-y-1">
				{isOhlc ? (
					// Full OHLC view for candlestick and bar charts
					<>
						{data.mainSeriesTitle && (
							<span className="col-span-2 font-semibold text-gray-700">
								{data.mainSeriesTitle}
							</span>
						)}
						<span className="text-gray-500">Open:</span>
						<span className="text-right font-medium">
							{formatPrice(data.open)}
						</span>

						<span className="text-gray-500">High:</span>
						<span className="text-right font-medium text-green-600">
							{formatPrice(data.high)}
						</span>

						<span className="text-gray-500">Low:</span>
						<span className="text-right font-medium text-red-600">
							{formatPrice(data.low)}
						</span>

						<span className="text-gray-500">Close:</span>
						<span className="text-right font-medium">
							{formatPrice(data.close)}
						</span>
					</>
				) : (
					// Simplified view for line, area, and baseline charts
					<>
						<span
							className="font-semibold"
							style={{
								color: "#374151",
							}}
						>
							{data.mainSeriesTitle ? `${data.mainSeriesTitle}:` : "Price:"}
						</span>
						<span className="text-right font-medium">
							{formatPrice(data.close)}
						</span>
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

			{/* Additional Series Section */}
			{data.additionalSeries && data.additionalSeries.length > 0 && (
				<>
					<div className="mt-2 mb-1.5 border-t border-gray-200" />
					<div className="grid grid-cols-2 gap-x-4 gap-y-1">
						{data.additionalSeries.map((series) => (
							<div key={series.title} className="contents">
								<span
									className="font-semibold"
									style={{
										color: series.color || "#6b7280",
									}}
								>
									{series.title}:
								</span>
								<span className="text-right font-medium">
									{formatPrice(series.value)}
								</span>
							</div>
						))}
					</div>
				</>
			)}
		</div>
	);
};

export default ChartTooltip;
