import { TableColumn } from "./TableColumn";

interface TableHeadProps {
	/** Array of column headers (strings, numbers, or ReactNodes) */
	columns: React.ReactNode[];
	/** Common class name for all column cells */
	columnClassName?: string;
	/** Class name for thead element */
	className?: string;
	/** Children for advanced mode (TableColumn components) */
	children?: React.ReactNode;
}

/**
 * TableHead component - renders table header row with columns.
 *
 * Supports two modes:
 * - Simple mode: Pass `columns` array for quick header creation
 * - Advanced mode: Pass `children` with TableColumn components
 *
 * @param props - Component props
 * @param props.columns - Array of column headers (strings, numbers, or ReactNodes)
 * @param props.columnClassName - Common class name for all column cells
 * @param props.className - Class name for thead element
 * @param props.children - Children for advanced mode (TableColumn components)
 *
 * @example
 * ```tsx
 * // Simple mode with string columns
 * <TableHead columns={["Name", "Price", "Volume"]} />
 *
 * // Simple mode with custom styles
 * <TableHead
 *   columns={["Name", "Price"]}
 *   columnClassName="text-left text-xs font-medium text-gray-400 uppercase"
 * />
 *
 * // Advanced mode with TableColumn
 * <TableHead>
 *   <TableColumn key="name" align="left">Name</TableColumn>
 *   <TableColumn key="price" align="right">Price</TableColumn>
 * </TableHead>
 *
 * // With compound components
 * <Table>
 *   <Table.Head columns={["Name", "Price", "Volume"]} />
 * </Table>
 *
 * // Advanced mode with custom columns
 * <Table>
 *   <Table.Head>
 *     <Table.Column key="name" align="left">Name</Table.Column>
 *     <Table.Column key="price" align="right">Price</Table.Column>
 *   </Table.Head>
 * </Table>
 * ```
 */
export const TableHead = ({
	columns,
	columnClassName,
	className,
	children,
}: TableHeadProps) => {
	return (
		<thead className={className}>
			<tr>
				{children ??
					columns.map((column, index) => (
						<TableHead.Column
							key={`column-${index}`}
							className={columnClassName}
						>
							{column}
						</TableHead.Column>
					))}
			</tr>
		</thead>
	);
};

TableHead.Column = TableColumn;
