import type { ReactNode } from "react";

export interface TableCellProps {
	/** Text alignment */
	align?: "left" | "center" | "right";
	/** Custom class name */
	className?: string;
	/** Cell content */
	children: ReactNode;
}

/**
 * TableCell component - renders a table data cell.
 *
 * Use with TableRow for advanced table mode.
 * Supports text alignment and custom styling.
 *
 * @param props - Component props
 * @param props.align - Text alignment (default: "left")
 * @param props.className - Custom class name for styling
 * @param props.children - Cell content (text, number, or ReactNode)
 *
 * @example
 * ```tsx
 * // Basic usage
 * <TableRow>
 *   <TableCell>Bitcoin</TableCell>
 *   <TableCell>$63,022</TableCell>
 * </TableRow>
 *
 * // With text alignment
 * <TableRow>
 *   <TableCell>Bitcoin</TableCell>
 *   <TableCell align="right">$63,022</TableCell>
 *   <TableCell align="right">+2.5%</TableCell>
 * </TableRow>
 *
 * // With custom styling
 * <TableRow>
 *   <TableCell className="font-semibold">Bitcoin</TableCell>
 *   <TableCell align="right" className="text-green-600">+2.5%</TableCell>
 * </TableRow>
 *
 * // With compound components
 * <TableBody>
 *   <TableBody.Row>
 *     <TableBody.Cell>Bitcoin</TableBody.Cell>
 *     <TableBody.Cell align="right">$63,022</TableBody.Cell>
 *   </TableBody.Row>
 * </TableBody>
 * ```
 */
export const TableCell = ({
	align = "left",
	className,
	children,
}: TableCellProps) => {
	const alignClasses = {
		left: "text-left",
		center: "text-center",
		right: "text-right",
	};

	return (
		<td className={`${alignClasses[align]} ${className ?? ""}`}>{children}</td>
	);
};
