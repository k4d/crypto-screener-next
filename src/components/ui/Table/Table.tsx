import { cn } from "@/utils/cn";
import { tableClasses as cls } from "./styleClasses";
import { TableBody } from "./TableBody";
import { TableCaption } from "./TableCaption";
import { TableFooter } from "./TableFooter";
import { TableHead } from "./TableHead";

type TableCell = string | number | React.ReactNode;
type TableRow = TableCell[];

interface TableProps {
	/** Table headers */
	headers: TableCell[];
	/** Table rows (array of arrays) */
	rows: TableRow[];
	/** Additional CSS classes */
	className?: string;
	/** Empty state message */
	emptyContent?: string;
	/** Alternating row colors */
	striped?: boolean;
	/** Hover effect on rows */
	hoverable?: boolean;
	/** Border around table and cells */
	bordered?: boolean;
	/** Compact row height */
	compact?: boolean;
	/** Table caption (for accessibility) */
	captionContent?: string;
	/** Table footer content */
	footerContent?: React.ReactNode;
	/** Table children */
	children?: React.ReactNode;
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
 * @param props.emptyContent - Empty state message (default: "No data")
 * @param props.striped - Alternating row colors (default: false)
 * @param props.hoverable - Hover effect on rows (default: true)
 * @param props.bordered - Border around table and cells (default: false)
 * @param props.compact - Compact row height (default: false)
 * @param props.captionContent - Table caption for accessibility (default: undefined)
 * @param props.footerContent - Table footer content (default: undefined)
 * @param props.children - Custom children for advanced mode (default: undefined)
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
 * // Compact bordered table with caption
 * <Table
 *   headers={['Coin', 'Price']}
 *   rows={[...]}
 *   compact
 *   bordered
 *   captionContent="Cryptocurrency prices"
 * />
 *
 * // Table with footer
 * <Table
 *   headers={['Coin', 'Price']}
 *   rows={[...]}
 *   footerContent="Total: 2 coins"
 * />
 *
 * // Advanced mode with custom components
 * <Table>
 *   <Table.Caption>Cryptocurrency prices</Table.Caption>
 *   <Table.Head>
 *     <TableColumn columnKey="name">Name</TableColumn>
 *     <TableColumn columnKey="price">Price</TableColumn>
 *   </Table.Head>
 *   <Table.Body>
 *     <TableRow rowKey="1">
 *       <TableCell>Bitcoin</TableCell>
 *       <TableCell>$63,022</TableCell>
 *     </TableRow>
 *   </Table.Body>
 *   <Table.Footer>
 *     <TableRow rowKey="footer">
 *       <TableCell colSpan={2}>Total: $63,022</TableCell>
 *     </TableRow>
 *   </Table.Footer>
 * </Table>
 * ```
 */
export function Table({
	headers,
	rows,
	className,
	emptyContent = "No data",
	striped = false,
	hoverable = true,
	bordered = false,
	compact = false,
	captionContent,
	footerContent,
	children,
}: TableProps) {
	// Base table classes
	const tableClass = cn(cls.table, bordered && cls.tableBordered, className);

	// Header classes
	const headerCellClass = cn(cls.header, cls.headerCell, cls.headerCellText);

	// Cell classes
	const cellClass = cn(
		cls.cell,
		cls.cellText,
		compact ? cls.cellCompact : cls.cellDefault,
		bordered && cls.cellBordered,
	);

	// Footer cell classes (without uppercase)
	const footerCellClass = cellClass;

	return (
		<div className={cls.container}>
			<table
				className={tableClass}
				aria-label={captionContent}
				data-stripped={striped || undefined}
				data-compact={compact || undefined}
				data-bordered={bordered || undefined}
			>
				{children ?? (
					<>
						{/* Caption component */}
						{captionContent && (
							<Table.Caption captionContent={captionContent} />
						)}
						{/* Head component */}
						<Table.Head columns={headers} columnClassName={headerCellClass} />
						{/* Body component */}
						<Table.Body
							rows={rows}
							striped={striped}
							hoverable={hoverable}
							cellClassName={cellClass}
							emptyContent={emptyContent}
							emptyColSpan={headers.length}
						/>
						{/* Footer component */}
						{footerContent && (
							<Table.Footer
								colSpan={headers.length}
								className={footerCellClass}
								footerContent={footerContent}
							/>
						)}
					</>
				)}
			</table>
		</div>
	);
}

Table.Caption = TableCaption;
Table.Head = TableHead;
Table.Column = TableHead.Column;
Table.Body = TableBody;
Table.Row = TableBody.Row;
Table.Cell = TableBody.Cell;
Table.Empty = TableBody.Empty;
Table.Footer = TableFooter;

export default Table;
