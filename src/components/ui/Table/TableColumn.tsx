interface TableColumnProps {
	/** Unique key for the column (required for dynamic columns) */
	key: string;
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
 * Requires `key` prop when rendering in a map.
 *
 * @param props - Component props
 * @param props.key - Unique key for the column (required for dynamic columns)
 * @param props.align - Text alignment (default: "left")
 * @param props.className - Additional CSS classes for styling
 * @param props.children - Column header content (text, number, or ReactNode)
 *
 * @example
 * ```tsx
 * // Basic usage
 * <TableHead>
 *   <TableColumn key="name">Name</TableColumn>
 *   <TableColumn key="price" align="right">Price</TableColumn>
 * </TableHead>
 *
 * // With custom alignment
 * <TableHead>
 *   <TableColumn key="name" align="left">Name</TableColumn>
 *   <TableColumn key="price" align="right">Price</TableColumn>
 *   <TableColumn key="change" align="right">24h Change</TableColumn>
 * </TableHead>
 *
 * // With custom styling
 * <TableHead>
 *   <TableColumn
 *     key="name"
 *     className="font-semibold uppercase"
 *   >
 *     Name
 *   </TableColumn>
 *   <TableColumn
 *     key="price"
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
 *     <Table.Column key="name">Name</Table.Column>
 *     <Table.Column key="price" align="right">Price</Table.Column>
 *   </Table.Head>
 * </Table>
 * ```
 */
export const TableColumn = ({
	children,
	className,
	key,
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
			key={key}
			className={`${alignClasses[align]} ${className ?? ""}`}
		>
			{children}
		</th>
	);
};
