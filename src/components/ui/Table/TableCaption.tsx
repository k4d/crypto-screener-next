interface TableCaptionProps {
	/** Caption content text */
	captionContent: string;
}

/**
 * TableCaption component - accessibility caption for tables.
 *
 * Renders a visually hidden caption for screen readers.
 * Use with Table.Caption for consistent API.
 *
 * @param props - Component props
 * @param props.captionContent - Caption content text for accessibility
 *
 * @example
 * ```tsx
 * // Simple usage
 * <TableCaption captionContent="Cryptocurrency prices" />
 *
 * // Or with Table component
 * <Table>
 *   <Table.Caption captionContent="Cryptocurrency prices" />
 * </Table>
 * ```
 */
export const TableCaption = ({ captionContent }: TableCaptionProps) => {
	return <caption className="sr-only">{captionContent}</caption>;
};
