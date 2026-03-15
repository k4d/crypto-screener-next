import type { ReactNode } from "react";

export interface TableRowProps {
	/** Row index (for striped rows) */
	index?: number;
	/** Unique key for the row */
	rowKey?: string;
	/** Enable striped rows (alternating colors) */
	striped?: boolean;
	/** Enable hover effect */
	hoverable?: boolean;
	/** Custom class name */
	className?: string;
	/** Row content (TableCell components) */
	children: ReactNode;
}

/**
 * TableRow component - renders a table row.
 *
 * Use with TableCell for advanced table mode.
 * Supports striped rows and hover effects.
 *
 * @param props - Component props
 * @param props.index - Row index (for striped rows)
 * @param props.rowKey - Unique key for the row
 * @param props.striped - Enable striped rows (alternating colors) (default: false)
 * @param props.hoverable - Enable hover effect (default: false)
 * @param props.className - Custom class name for styling
 * @param props.children - Row content (TableCell components)
 *
 * @example
 * ```tsx
 * // Basic usage
 * <TableRow rowKey="bitcoin">
 *   <TableCell>Bitcoin</TableCell>
 *   <TableCell>$63,022</TableCell>
 * </TableRow>
 *
 * // With striped rows
 * <TableRow rowKey="1" index={0} striped>
 *   <TableCell>Bitcoin</TableCell>
 *   <TableCell>$63,022</TableCell>
 * </TableRow>
 *
 * // With hover effect
 * <TableRow rowKey="bitcoin" hoverable>
 *   <TableCell>Bitcoin</TableCell>
 *   <TableCell>$63,022</TableCell>
 * </TableRow>
 *
 * // With custom styling
 * <TableRow rowKey="bitcoin" className="hover:bg-blue-50">
 *   <TableCell className="font-semibold">Bitcoin</TableCell>
 *   <TableCell>$63,022</TableCell>
 * </TableRow>
 *
 * // With compound components
 * <TableBody>
 *   <TableBody.Row rowKey="1" index={0} striped hoverable>
 *     <TableBody.Cell>Bitcoin</TableBody.Cell>
 *     <TableBody.Cell>$63,022</TableBody.Cell>
 *   </TableBody.Row>
 * </TableBody>
 *
 * // With Table component
 * <Table>
 *   <Table.Body>
 *     <Table.Row rowKey="bitcoin">
 *       <Table.Cell>Bitcoin</Table.Cell>
 *       <Table.Cell>$63,022</Table.Cell>
 *     </Table.Row>
 *   </Table.Body>
 * </Table>
 * ```
 */
export const TableRow = ({
	index,
	rowKey,
	striped = false,
	hoverable = false,
	className,
	children,
}: TableRowProps) => {
	const rowClasses = [
		striped && index !== undefined && index % 2 === 1
			? "bg-gray-50"
			: "bg-white",
		hoverable && "hover:bg-gray-100 transition-colors duration-150",
		className,
	]
		.filter(Boolean)
		.join(" ");

	return (
		<tr key={rowKey} className={rowClasses}>
			{children}
		</tr>
	);
};
