import { Children, isValidElement } from "react";
import { cn } from "@/utils/cn";
import { tableClasses as cls } from "./styleClasses";
import { TableBody } from "./TableBody";
import { TableCaption } from "./TableCaption";
import { TableEmpty } from "./TableEmpty";
import { TableFooter } from "./TableFooter";
import { TableHead } from "./TableHead";
import { getCellClasses, getTableClasses } from "./utils";

type TableCell = string | number | React.ReactNode;
type TableRow = TableCell[];

interface TableProps {
	/** Table headers */
	headers?: TableCell[];
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
 * @param props.children - Custom children for hybrid/advanced mode (default: undefined)
 *
 * @example
 * ```tsx
 * // Basic mode (auto-generation)
 * <Table
 *   headers={['Coin', 'Price']}
 *   rows={[['Bitcoin', '$63,022']]}
 *   striped
 * />
 *
 * // Hybrid mode (auto + custom Footer)
 * <Table
 *   headers={['Coin', 'Price']}
 *   rows={[['Bitcoin', '$63,022']]}
 *   striped
 * >
 *   <Table.Footer colSpan={2}>
 *     <div className="font-bold">Total: $63,022</div>
 *   </Table.Footer>
 * </Table>
 *
 * // Hybrid mode (auto + custom Head + Footer)
 * <Table
 *   headers={['Coin', 'Price']}
 *   rows={[['Bitcoin', '$63,022']]}
 *   striped
 * >
 *   <Table.Head>
 *     <Table.Column columnKey="name">Custom Name</Table.Column>
 *   </Table.Head>
 *   <Table.Footer colSpan={2}>Custom Footer</Table.Footer>
 * </Table>
 *
 * // Advanced mode (fully custom)
 * <Table>
 *   <Table.Caption>Cryptocurrency prices</Table.Caption>
 *   <Table.Head>
 *     <Table.Column columnKey="name">Name</Table.Column>
 *   </Table.Head>
 *   <Table.Body>
 *     <Table.Row>
 *       <Table.Cell>Bitcoin</Table.Cell>
 *     </Table.Row>
 *   </Table.Body>
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
	const tableClass = getTableClasses({
		bordered,
		className,
	});

	// Header classes
	const headerCellClass = cn(cls.header, cls.headerCell, cls.headerCellText);

	// Cell classes
	const cellClass = getCellClasses({
		compact,
		bordered,
	});

	// Footer cell classes
	const footerCellClass = cellClass;

	// Filter children once (Hybrid mode)
	const childrenArray = Children.toArray(children);
	const filteredCaption = childrenArray.filter(
		(child) =>
			isValidElement(child) &&
			(child.type === TableCaption || child.type === Table.Caption),
	);
	const filteredHead = childrenArray.filter(
		(child) =>
			isValidElement(child) &&
			(child.type === TableHead || child.type === Table.Head),
	);
	const filteredBody = childrenArray.filter(
		(child) =>
			isValidElement(child) &&
			(child.type === TableBody || child.type === Table.Body),
	);
	const filteredFooter = childrenArray.filter(
		(child) =>
			isValidElement(child) &&
			(child.type === TableFooter || child.type === Table.Footer),
	);
	const filteredEmpty = childrenArray.filter(
		(child) =>
			isValidElement(child) &&
			(child.type === TableEmpty || child.type === TableBody.Empty),
	);

	// Check which components exist
	const hasCaption = filteredCaption.length > 0;
	const hasHead = filteredHead.length > 0;
	const hasBody = filteredBody.length > 0;
	const hasFooter = filteredFooter.length > 0;
	const hasEmpty = filteredEmpty.length > 0;

	return (
		<div className={cls.container}>
			<table
				className={tableClass}
				aria-label={captionContent}
				data-stripped={striped || undefined}
				data-compact={compact || undefined}
				data-bordered={bordered || undefined}
			>
				{/* Custom Caption → render if present */}
				{hasCaption && filteredCaption}

				{/* Caption: Auto */}
				{!hasCaption && captionContent && (
					<Table.Caption captionContent={captionContent} />
				)}

				{/* Custom Head → render if present */}
				{hasHead && filteredHead}

				{/* Head: Auto */}
				{!hasHead && headers && headers.length > 0 && (
					<Table.Head columns={headers} columnClassName={headerCellClass} />
				)}

				{/* If Table.Empty exists AND no rows → render Empty in tbody */}
				{hasEmpty && rows.length === 0 && !hasBody && (
					<tbody>{filteredEmpty}</tbody>
				)}

				{/* If no Empty and no Body → auto-generate Body */}
				{!hasBody && !hasEmpty && (
					<Table.Body
						rows={rows}
						striped={striped}
						hoverable={hoverable}
						cellClassName={cellClass}
						emptyContent={emptyContent}
						emptyColSpan={headers?.length ?? 1}
					/>
				)}

				{/* Custom Body → only if has rows */}
				{hasBody && rows.length > 0 && children}

				{/* Auto Body when Empty exists but has rows → render rows */}
				{hasEmpty && rows.length > 0 && !hasBody && (
					<Table.Body
						rows={rows}
						striped={striped}
						hoverable={hoverable}
						cellClassName={cellClass}
						emptyContent={emptyContent}
						emptyColSpan={headers?.length ?? 1}
					/>
				)}

				{/* Custom Footer → render if present */}
				{hasFooter && filteredFooter}

				{/* Footer: Auto */}
				{!hasFooter && !hasEmpty && footerContent && (
					<Table.Footer
						colSpan={headers?.length ?? 1}
						className={footerCellClass}
						footerContent={footerContent}
					/>
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

export type { TableProps };
export type { TableBodyProps } from "./TableBody";
export type { TableCaptionProps } from "./TableCaption";
export type { TableCellProps } from "./TableCell";
export type { TableColumnProps } from "./TableColumn";
export type { TableEmptyProps } from "./TableEmpty";
export type { TableFooterProps } from "./TableFooter";
export type { TableHeadProps } from "./TableHead";
export type { TableRowProps } from "./TableRow";

export default Table;
