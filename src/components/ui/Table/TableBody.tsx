import type { ReactNode } from "react";
import { TableCell } from "./TableCell";
import { TableEmpty } from "./TableEmpty";
import { TableRow } from "./TableRow";

interface TableBodyProps {
	/** Array of rows, each row is an array of cells (2D array) */
	items?: ReactNode[][];
	/** Class name for each item cell */
	itemClassName?: string;
	/** Enable striped rows (alternating colors) */
	striped?: boolean;
	/** Enable hover effect on rows */
	hoverable?: boolean;
	/** Empty state content (renders when items is empty) */
	emptyContent?: React.ReactNode;
	/** Number of columns to span (colSpan) */
	emptyColSpan?: number;
	/** Class name for tbody element */
	className?: string;
	/** Children for advanced mode (TableRow + TableCell) */
	children?: React.ReactNode;
}

/**
 * TableBody component - renders table body with rows.
 *
 * Supports simple mode with items array and advanced mode with custom children.
 * Use with TableRow and TableCell for advanced mode.
 *
 * @param props - Component props
 * @param props.items - Array of rows, each row is an array of cells (2D array)
 * @param props.itemClassName - Class name for each item cell
 * @param props.striped - Enable striped rows (alternating colors) (default: false)
 * @param props.hoverable - Enable hover effect on rows (default: false)
 * @param props.emptyContent - Empty state content (renders when items is empty)
 * @param props.emptyColSpan - Number of columns to span for empty state (colSpan)
 * @param props.className - Class name for tbody element
 * @param props.children - Children for advanced mode (TableRow + TableCell)
 *
 * @example
 * ```tsx
 * // Simple mode with items
 * <TableBody items={rows} striped hoverable />
 *
 * // Simple mode with custom cell styles
 * <TableBody
 *   items={rows}
 *   itemClassName="px-4 py-2 text-sm"
 *   striped
 *   hoverable
 * />
 *
 * // With empty state
 * <TableBody
 *   items={[]}
 *   emptyContent="No data found"
 *   emptyColSpan={4}
 * />
 *
 * // Advanced mode with children
 * <TableBody>
 *   {rows.map((row, index) => (
 *     <TableRow key={index} index={index} striped>
 *       <TableCell>{row.name}</TableCell>
 *       <TableCell align="right">{row.price}</TableCell>
 *     </TableRow>
 *   ))}
 * </TableBody>
 *
 * // Advanced mode with compound components
 * <TableBody>
 *   <TableBody.Row>
 *     <TableBody.Cell>Bitcoin</TableBody.Cell>
 *     <TableBody.Cell>$63,022</TableBody.Cell>
 *   </TableBody.Row>
 *   <TableBody.Empty colSpan={2}>No data</TableBody.Empty>
 * </TableBody>
 * ```
 */
export const TableBody = ({
	items,
	itemClassName,
	className,
	striped = false,
	hoverable = false,
	emptyContent,
	children,
	emptyColSpan,
}: TableBodyProps) => {
	return (
		<tbody className={className}>
			{children ??
				(items && items.length > 0
					? items.map((row, rowIndex) => (
							<TableBody.Row
								key={`row-${rowIndex}`}
								index={rowIndex}
								striped={striped}
								hoverable={hoverable}
							>
								{row.map((cell, cellIndex) => (
									<TableBody.Cell
										key={`cell-${rowIndex}-${cellIndex}`}
										className={itemClassName}
									>
										{cell}
									</TableBody.Cell>
								))}
							</TableBody.Row>
						))
					: emptyContent && (
							<TableBody.Empty
								colSpan={emptyColSpan}
								emptyContent={emptyContent}
							/>
						))}
		</tbody>
	);
};

TableBody.Empty = TableEmpty;
TableBody.Row = TableRow;
TableBody.Cell = TableCell;
