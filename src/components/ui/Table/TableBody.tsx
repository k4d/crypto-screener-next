import { TableCell } from "./TableCell";
import { TableEmpty } from "./TableEmpty";
import { TableRow } from "./TableRow";
import { getRowClasses } from "./utils";

type TableRowType = React.ReactNode[];

export interface TableBodyProps {
	/** Array of rows, each row is an array of cells (2D array) */
	rows?: TableRowType[];
	/** Class name for each cell */
	cellClassName?: string;
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
 * @param props.rows - Array of rows, each row is an array of cells (2D array)
 * @param props.cellClassName - Class name for each cell
 * @param props.striped - Enable striped rows (alternating colors) (default: false)
 * @param props.hoverable - Enable hover effect on rows (default: false)
 * @param props.emptyContent - Empty state content (renders when items is empty)
 * @param props.emptyColSpan - Number of columns to span for empty state (colSpan)
 * @param props.className - Class name for tbody element
 * @param props.children - Children for advanced mode (TableRow + TableCell)
 *
 * @example
 * ```tsx
 * // Simple mode with rows
 * <TableBody rows={rows} striped hoverable />
 *
 * // Simple mode with custom cell styles
 * <TableBody
 *   rows={rows}
 *   cellClassName="px-4 py-2 text-sm"
 *   striped
 *   hoverable
 * />
 *
 * // With empty state
 * <TableBody
 *   rows={[]}
 *   emptyContent="No data found"
 *   emptyColSpan={4}
 * />
 *
 * // Advanced mode with children
 * <TableBody>
 *   {rows.map((row, index) => (
 *     <TableRow rowKey={index} className="bg-gray-50">
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
	rows,
	cellClassName,
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
				(rows?.length
					? rows.map((row, rowIndex) => {
							const rowKey =
								row[0] !== undefined && row[0] !== null
									? String(row[0])
									: `row-${rowIndex}`;
							return (
								<TableBody.Row
									key={rowKey}
									rowKey={rowKey}
									className={getRowClasses({
										index: rowIndex,
										striped,
										hoverable,
									})}
								>
									{row.map((cell, cellIndex) => {
										const cellKey = `${rowKey}-cell-${cellIndex}`;
										return (
											<TableBody.Cell key={cellKey} className={cellClassName}>
												{cell}
											</TableBody.Cell>
										);
									})}
								</TableBody.Row>
							);
						})
					: emptyContent && (
							<TableBody.Empty
								colSpan={
									emptyColSpan !== undefined && emptyColSpan > 0
										? emptyColSpan
										: 1
								}
								emptyContent={emptyContent}
							/>
						))}
		</tbody>
	);
};

TableBody.Empty = TableEmpty;
TableBody.Row = TableRow;
TableBody.Cell = TableCell;
