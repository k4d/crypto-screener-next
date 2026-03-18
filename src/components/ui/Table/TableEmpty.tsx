import { cn } from "@/utils/cn";
import { tableClasses as cls } from "./styleClasses";

interface TableEmptyProps {
	/** Number of columns to span (colSpan) */
	colSpan?: number;
	/** Custom class name for styling */
	className?: string;
	/** Empty state content (text or ReactNode) */
	emptyContent: React.ReactNode;
}

/**
 * TableEmpty component - renders an empty state row for tables.
 *
 * Use with TableBody.Empty or Table.Empty for consistent API.
 * Displays a full-width row with centered text when no data is available.
 *
 * @param props - Component props
 * @param props.colSpan - Number of columns to span (default: 1)
 * @param props.className - Custom class name for styling
 * @param props.emptyContent - Empty state content (text or ReactNode)
 *
 * @example
 * ```tsx
 * // Basic usage
 * <TableBody>
 *   <TableBody.Empty colSpan={4} emptyContent="No data found" />
 * </TableBody>
 *
 * // With custom styling
 * <TableBody>
 *   <TableBody.Empty
 *     colSpan={4}
 *     className="text-red-500"
 *     emptyContent="No results found"
 *   />
 * </TableBody>
 *
 * // With ReactNode content
 * <TableBody>
 *   <TableBody.Empty
 *     colSpan={4}
 *     emptyContent={
 *       <div className="flex items-center gap-2">
 *         <span>⚠️</span>
 *         <span>No data available</span>
 *       </div>
 *     }
 *   />
 * </TableBody>
 *
 * // With Table component
 * <Table>
 *   <Table.Body>
 *     <Table.Empty colSpan={4}>No data found</Table.Empty>
 *   </Table.Body>
 * </Table>
 * ```
 */
export const TableEmpty = ({
	colSpan = 1,
	className,
	emptyContent,
}: TableEmptyProps) => {
	return (
		<tr>
			<td
				colSpan={colSpan}
				className={cn(cls.cellEmpty, cls.cellEmptyText, className)}
			>
				{emptyContent}
			</td>
		</tr>
	);
};
