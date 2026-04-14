import { cn } from "@/utils/cn";

/**
 * Legend item displayed on the chart.
 *
 * All properties are optional. When used with the `Chart` component,
 * missing values are automatically resolved from the chart's data
 * and series configurations.
 */
export interface ChartLegendItem {
	/** Label text (e.g., "BTC", "ETH"). */
	label?: string;
	/** Value text (e.g., "$84,750"). */
	value?: string;
	/** Color indicator (hex, rgb, or CSS color). */
	color?: string;
}

/**
 * Props for the ChartLegend component.
 */
interface ChartLegendProps {
	/** Legend items to display */
	items: ChartLegendItem[];
	/** Layout direction (default: "vertical") */
	position?: "vertical" | "horizontal";
	/** Alignment direction (default: "left") */
	align?: "left" | "center" | "right";
	/** Whether to show the legend (default: true) */
	show?: boolean;
}

/**
 * ChartLegend — overlay component for displaying chart legends.
 *
 * Renders color indicators, labels, and values in a customizable layout.
 * Supports absolute positioning at the top of the parent container with
 * flexible alignment (`left`, `center`, `right`) and layout direction
 * (`vertical`, `horizontal`).
 *
 * When integrated with the `Chart` component, missing properties (like
 * label or value) are automatically inferred from active series configurations.
 *
 * @param props - Component props
 * @param props.items - Array of legend items to display
 * @param props.position - Layout direction: `"vertical"` (default) or `"horizontal"`
 * @param props.align - Horizontal alignment: `"left"` (default), `"center"`, or `"right"`
 * @param props.show - Visibility toggle (default: `true`)
 *
 * @example
 * ```tsx
 * // Basic usage with auto-resolved values
 * <ChartLegend items={[{ label: "BTC" }, { label: "ETH", color: "#627EEA" }]} />
 *
 * // Centered horizontal legend
 * <ChartLegend items={[...]} position="horizontal" align="center" />
 *
 * // Right-aligned vertical legend
 * <ChartLegend items={[...]} position="vertical" align="right" />
 * ```
 */
export const ChartLegend = ({
	items,
	position = "vertical",
	align = "left",
	show = true,
}: ChartLegendProps) => {
	if (!show || items.length === 0) return null;

	return (
		<div
			className={cn(
				"absolute z-10 top-3 flex",
				// Block positioning
				align === "right"
					? "right-3"
					: align === "center"
						? "left-1/2 -translate-x-1/2"
						: "left-3",
				// Internal element layout
				position === "horizontal" ? "items-center gap-4" : "flex-col gap-0.5",
				// Content alignment
				align === "right"
					? position === "horizontal"
						? "justify-end"
						: "items-end"
					: align === "center"
						? position === "horizontal"
							? "justify-center"
							: "items-center"
						: "",
			)}
		>
			{items.map((item) => (
				<div
					key={item.label || `value-${item.value}`}
					className="flex items-center gap-2"
				>
					<span
						className={cn(
							"text-xs font-semibold",
							!item.color && "text-gray-700",
						)}
						{...(item.color && { style: { color: item.color } })}
					>
						{item.label || "N/A"}
					</span>
					<span className="text-xs font-normal text-gray-500">
						{item.value || "N/A"}
					</span>
				</div>
			))}
		</div>
	);
};

export default ChartLegend;
