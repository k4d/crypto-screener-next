import { tableClasses as cls } from "./styleClasses";

export interface TableCaptionProps {
	/** Caption content text */
	captionContent?: string;
	/** Caption children */
	children?: React.ReactNode;
}

/**
 * TableCaption component - accessibility caption for tables.
 *
 * Renders a visually hidden caption for screen readers.
 * Use with Table.Caption for consistent API.
 *
 * @param props - Component props
 * @param props.captionContent - Caption content text for accessibility
 * @param props.children - Caption children (overrides captionContent)
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
 *
 * // With children
 * <Table>
 *   <Table.Caption>My caption</Table.Caption>
 * </Table>
 * ```
 */
export const TableCaption = ({
	captionContent,
	children,
}: TableCaptionProps) => {
	return (
		<caption className={cls.caption}>{children ?? captionContent}</caption>
	);
};
