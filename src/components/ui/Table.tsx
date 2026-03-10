import type { ReactNode } from "react";

type TableCell = string | number | ReactNode;
type TableRow = TableCell[];

interface TableProps {
	/** Table headers */
	headers: TableCell[];
	/** Table rows (array of arrays) */
	rows: TableRow[];
	/** Additional CSS classes */
	className?: string;
	/** Empty state message */
	emptyText?: string;
	/** Alternating row colors */
	striped?: boolean;
	/** Hover effect on rows */
	hoverable?: boolean;
	/** Border around table and cells */
	bordered?: boolean;
	/** Compact row height */
	compact?: boolean;
	/** Table caption (for accessibility) */
	caption?: string;
}

/**
 * Table component - simple data table with basic styling.
 *
 * For advanced features (sorting, filtering, pagination),
 * use TanStack Table instead.
 *
 * @param props - Component props
 * @param props.headers - Table headers (array of strings/numbers/ReactNodes)
 * @param props.rows - Table rows (array of arrays)
 * @param props.className - Additional CSS classes
 * @param props.emptyText - Empty state message (default: "No data")
 * @param props.striped - Alternating row colors (default: false)
 * @param props.hoverable - Hover effect on rows (default: true)
 * @param props.bordered - Border around table and cells (default: false)
 * @param props.compact - Compact row height (default: false)
 * @param props.caption - Table caption for accessibility (default: undefined)
 *
 * @example
 * ```tsx
 * // Basic table
 * <Table
 *   headers={['Coin', 'Price', '24h %']}
 *   rows={[
 *     ['Bitcoin', '$63,022', '+2.5%'],
 *     ['Ethereum', '$3,456', '+1.8%'],
 *   ]}
 * />
 *
 * // Striped table with hover
 * <Table
 *   headers={['Coin', 'Price']}
 *   rows={[...]}
 *   striped
 *   hoverable
 * />
 *
 * // Compact bordered table
 * <Table
 *   headers={['Coin', 'Price']}
 *   rows={[...]}
 *   compact
 *   bordered
 *   caption="Cryptocurrency prices"
 * />
 * ```
 */
export function Table({
	headers,
	rows,
	className,
	emptyText = "No data",
	striped = false,
	hoverable = true,
	bordered = false,
	compact = false,
	caption,
}: TableProps) {
	// Container classes
	const containerClasses = "overflow-x-auto";

	// Base table classes
	const tableClasses =
		`min-w-full divide-y divide-gray-200 ${bordered ? "border" : ""} ${className ?? ""}`.trim();

	// Header classes
	const headerClasses =
		"bg-gray-50 p-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider";

	// Row classes
	const getRowClasses = (rowIndex: number) => {
		return `${striped && rowIndex % 2 === 1 ? "bg-gray-50" : "bg-white"} ${hoverable ? "hover:bg-gray-100 transition-colors duration-150" : ""}`.trim();
	};

	// Cell classes
	const cellClasses =
		`px-4 ${compact ? "py-2" : "py-4"} whitespace-nowrap text-sm font-medium text-gray-600 ${bordered ? "border" : ""}`.trim();

	const emptyClasses = "p-4 text-center text-gray-500";

	return (
		<div className={containerClasses}>
			<table className={tableClasses}>
				{caption && <caption className="sr-only">{caption}</caption>}

				<thead>
					<tr>
						{headers.map((header, index) => (
							<th key={`header-${index}`} scope="col" className={headerClasses}>
								{header}
							</th>
						))}
					</tr>
				</thead>

				<tbody>
					{rows.length > 0 ? (
						rows.map((row, rowIndex) => (
							<tr key={`row-${rowIndex}`} className={getRowClasses(rowIndex)}>
								{row.map((cell, cellIndex) => (
									<td
										key={`cell-${rowIndex}-${cellIndex}`}
										className={cellClasses}
									>
										{cell}
									</td>
								))}
							</tr>
						))
					) : (
						<tr>
							<td colSpan={headers.length} className={emptyClasses}>
								{emptyText}
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
}

export default Table;
