import { cn } from "@/utils/cn";
import { tableClasses as cls } from "./styleClasses";

/**
 * Options for generating row classes.
 */
export interface GetRowClassesOptions {
	/** Row index (for striped rows) */
	index?: number;
	/** Enable striped rows (alternating colors) */
	striped?: boolean;
	/** Enable hover effect on rows */
	hoverable?: boolean;
	/** Additional CSS classes */
	className?: string;
}

/**
 * Options for generating cell classes.
 */
export interface GetCellClassesOptions {
	/** Compact row height */
	compact?: boolean;
	/** Border around table and cells */
	bordered?: boolean;
	/** Text alignment (default: "left") */
	align?: "left" | "center" | "right";
	/** Additional CSS classes */
	className?: string;
}

/**
 * Options for generating table classes.
 */
export interface GetTableClassesOptions {
	/** Border around table and cells */
	bordered?: boolean;
	/** Additional CSS classes */
	className?: string;
}

/**
 * Get row classes with dynamic options.
 *
 * @param options - Row options
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
export function getRowClasses(options: GetRowClassesOptions): string {
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
export function getCellClasses(options: GetCellClassesOptions): string {
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
export function getTableClasses(options: GetTableClassesOptions): string {
	return cn(
		cls.table,
		options.bordered && cls.tableBordered,
		options.className,
	);
}
