import { cn } from "@/utils/cn";
import { tableClasses as cls } from "./styleClasses";

/**
 * Get row classes with dynamic options.
 *
 * @param options - Row options
 * @param options.index - Row index (for striped rows)
 * @param options.striped - Enable striped rows (alternating colors)
 * @param options.hoverable - Enable hover effect on rows
 * @param options.className - Additional CSS classes
 * @returns Merged class names for the row
 *
 * @example
 * ```tsx
 * const rowClasses = getRowClasses({
 *   index: 0,
 *   striped: true,
 *   hoverable: true,
 * });
 * ```
 */
export function getRowClasses(options: {
	index?: number;
	striped?: boolean;
	hoverable?: boolean;
	className?: string;
}): string {
	return cn(
		options.striped && options.index !== undefined && options.index % 2 === 1
			? cls.rowStriped
			: cls.row,
		options.hoverable && cls.rowHover,
		options.hoverable && cls.rowHoverTransition,
		options.className,
	);
}

/**
 * Get cell classes with dynamic options.
 *
 * @param options - Cell options
 * @param options.compact - Compact row height
 * @param options.bordered - Border around table and cells
 * @param options.align - Text alignment (default: "left")
 * @param options.className - Additional CSS classes
 * @returns Merged class names for the cell
 *
 * @example
 * ```tsx
 * const cellClass = getCellClasses({
 *   compact: true,
 *   bordered: false,
 *   align: "right",
 * });
 * ```
 */
export function getCellClasses(options: {
	compact?: boolean;
	bordered?: boolean;
	align?: "left" | "center" | "right";
	className?: string;
}): string {
	return cn(
		cls.cell,
		cls.cellText,
		options.compact ? cls.cellCompact : cls.cellDefault,
		options.bordered && cls.cellBordered,
		options.align === "center" && cls.cellAlignCenter,
		options.align === "right" && cls.cellAlignRight,
		options.className,
	);
}

/**
 * Get table classes with dynamic options.
 *
 * @param options - Table options
 * @param options.bordered - Border around table and cells
 * @param options.className - Additional CSS classes
 * @returns Merged class names for the table
 *
 * @example
 * ```tsx
 * const tableClass = getTableClasses({
 *   bordered: true,
 *   className: "custom-class",
 * });
 * ```
 */
export function getTableClasses(options: {
	bordered?: boolean;
	className?: string;
}): string {
	return cn(
		cls.table,
		options.bordered && cls.tableBordered,
		options.className,
	);
}
