interface TableColumnProps {
	/** Unique key for the column (required for dynamic columns) */
	columnKey: string;
	/** Text alignment */
	align?: "left" | "center" | "right";
	/** Additional CSS classes */
	className?: string;
	/** Column header content */
	children: React.ReactNode;
}

/**
 * TableColumn component - renders a single column header cell.
 *
 * Use with TableHead for advanced table mode with dynamic columns.
 * Requires `columnKey` prop when rendering in a map.
 *
 * @param props - Component props
 * @param props.columnKey - Unique key for the column (required for dynamic columns)
 * @param props.align - Text alignment (default: "left")
 * @param props.className - Additional CSS classes for styling
 * @param props.children - Column header content (text, number, or ReactNode)
 *
 * @example
 * ```tsx
 * // Basic usage
 * <TableHead>
 *   <TableColumn columnKey="name">Name</TableColumn>
 *   <TableColumn columnKey="price" align="right">Price</TableColumn>
 * </TableHead>
 *
 * // With custom alignment
 * <TableHead>
 *   <TableColumn columnKey="name" align="left">Name</TableColumn>
 *   <TableColumn columnKey="price" align="right">Price</TableColumn>
 *   <TableColumn columnKey="change" align="right">24h Change</TableColumn>
 * </TableHead>
 *
 * // With custom styling
 * <TableHead>
 *   <TableColumn
 *     columnKey="name"
 *     className="font-semibold uppercase"
 *   >
 *     Name
 *   </TableColumn>
 *   <TableColumn
 *     columnKey="price"
 *     align="right"
 *     className="text-gray-400"
 *   >
 *     Price
 *   </TableColumn>
 * </TableHead>
 *
 * // With compound components
 * <Table>
 *   <Table.Head>
 *     <Table.Column columnKey="name">Name</Table.Column>
 *     <Table.Column columnKey="price" align="right">Price</Table.Column>
 *   </Table.Head>
 * </Table>
 * ```
 */
export const TableColumn = ({
	columnKey,
	className,
	children,
	align = "left",
}: TableColumnProps) => {
	const alignClasses = {
		left: "text-left",
		center: "text-center",
		right: "text-right",
	};

	return (
		<th
			scope="col"
			key={columnKey}
			className={`${alignClasses[align]} ${className ?? ""}`}
		>
			{children}
		</th>
	);
};
