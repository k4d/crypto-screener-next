import type { ReactNode } from "react";

export interface TableRowProps {
	/** Row index (for striped rows) */
	index?: number;
	/** Unique key for the row */
	key?: string;
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
 * @param props.key - Unique key for the row
 * @param props.striped - Enable striped rows (alternating colors) (default: false)
 * @param props.hoverable - Enable hover effect (default: false)
 * @param props.className - Custom class name for styling
 * @param props.children - Row content (TableCell components)
 *
 * @example
 * ```tsx
 * // Basic usage
 * <TableRow>
 *   <TableCell>Bitcoin</TableCell>
 *   <TableCell>$63,022</TableCell>
 * </TableRow>
 *
 * // With striped rows
 * <TableRow index={0} striped>
 *   <TableCell>Bitcoin</TableCell>
 *   <TableCell>$63,022</TableCell>
 * </TableRow>
 *
 * // With hover effect
 * <TableRow hoverable>
 *   <TableCell>Bitcoin</TableCell>
 *   <TableCell>$63,022</TableCell>
 * </TableRow>
 *
 * // With custom styling
 * <TableRow className="hover:bg-blue-50">
 *   <TableCell className="font-semibold">Bitcoin</TableCell>
 *   <TableCell>$63,022</TableCell>
 * </TableRow>
 *
 * // With compound components
 * <TableBody>
 *   <TableBody.Row index={0} striped hoverable>
 *     <TableBody.Cell>Bitcoin</TableBody.Cell>
 *     <TableBody.Cell>$63,022</TableBody.Cell>
 *   </TableBody.Row>
 * </TableBody>
 *
 * // With Table component
 * <Table>
 *   <Table.Body>
 *     <Table.Row>
 *       <Table.Cell>Bitcoin</Table.Cell>
 *       <Table.Cell>$63,022</Table.Cell>
 *     </Table.Row>
 *   </Table.Body>
 * </Table>
 * ```
 */
export const TableRow = ({
	index,
	key,
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
		<tr key={key} className={rowClasses}>
			{children}
		</tr>
	);
};
