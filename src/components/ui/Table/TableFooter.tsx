interface TableFooterProps {
	/** Number of columns to span (colSpan) */
	colSpan: number;
	/** Footer content (text or ReactNode) */
	footerContent?: React.ReactNode;
	/** Additional CSS classes */
	className?: string;
	/** Children to render inside the footer cell */
	children?: React.ReactNode;
}

/**
 * TableFooter component - table footer with summary content.
 *
 * Renders a footer row with colSpan set to the specified number of columns.
 * Use with Table.Footer for consistent API.
 * Supports both simple text content and custom ReactNode children.
 *
 * @param props - Component props
 * @param props.colSpan - Number of columns to span (required)
 * @param props.footerContent - Footer content (text or ReactNode)
 * @param props.className - Additional CSS classes for styling
 * @param props.children - Children to render inside the footer cell (overrides footerContent)
 *
 * @example
 * ```tsx
 * // Simple footer with text
 * <TableFooter colSpan={4} footerContent="Total: $100" />
 *
 * // Or with Table component
 * <Table>
 *   <Table.Footer colSpan={4} footerContent="Total: $100" />
 * </Table>
 *
 * // Custom footer with children
 * <Table.Footer colSpan={4}>
 *   <div className="flex items-center gap-2">
 *     <span>Total:</span>
 *     <span className="font-bold">$100</span>
 *   </div>
 * </Table.Footer>
 *
 * // With custom styling
 * <Table.Footer
 *   colSpan={4}
 *   className="bg-gray-50 font-semibold text-gray-700"
 *   footerContent="Total Market Cap: $2.53T"
 * />
 *
 * // With multiple columns
 * <Table.Footer colSpan={4}>
 *   <div className="flex justify-between items-center">
 *     <span>Total Coins:</span>
 *     <span className="font-bold">10</span>
 *   </div>
 * </Table.Footer>
 * ```
 */
export const TableFooter = ({
	colSpan,
	footerContent,
	className,
	children,
}: TableFooterProps) => {
	return (
		<tfoot>
			<tr>
				<td colSpan={colSpan} className={className}>
					{children ?? footerContent}
				</td>
			</tr>
		</tfoot>
	);
};
