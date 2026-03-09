import type { ReactNode } from "react";

interface ListProps {
	/** Array of items to render (strings, numbers, or ReactNode) */
	items?: ReactNode[];
	/** Additional CSS classes */
	className?: string;
	/** HTML element type (default: "ul", supports "ol" or "div") */
	as?: "ul" | "ol" | "div";
	/** Show dividers between items */
	divided?: boolean;
	/** Show border around list */
	bordered?: boolean;
	/** Show hover effect on list items */
	hover?: boolean;
	/** Empty state message */
	emptyMessage?: string;
	/** Custom children (overrides items) */
	children?: ReactNode;
}

interface ListItemProps {
	/** HTML element type (default: "li", supports "div") */
	as?: "li" | "div";
	/** Content of the list item */
	children: ReactNode;
	/** Additional CSS classes */
	className?: string;
	/** Show hover effect on list item */
	hover?: boolean;
}

/**
 * List Item component - individual list item.
 *
 * Can be used as a standalone component or as List.Item.
 * Supports dynamic element type (li or div).
 * Uses combined classes approach for consistent styling.
 *
 * @example
 * ```tsx
 * // Standalone with li (default)
 * <ListItem hover>Item</ListItem>
 *
 * // Standalone with div
 * <ListItem as="div" hover>Item</ListItem>
 *
 * // As List.Item
 * <List hover>
 *   <List.Item>Item 1</List.Item>
 *   <List.Item>Item 2</List.Item>
 * </List>
 *
 * // As List.Item with div
 * <List as="div" hover>
 *   <List.Item>Item 1</List.Item>
 *   <List.Item>Item 2</List.Item>
 * </List>
 * ```
 */
export const ListItem = ({
	children,
	className,
	as = "li",
	hover,
}: ListItemProps) => {
	const Component = as;

	const baseClasses = "px-4 py-2";
	const hoverClasses = hover ? "hover:bg-gray-100 cursor-pointer" : "";

	// Combined classes for the list item
	const itemClasses = [baseClasses, className, hoverClasses]
		.filter(Boolean)
		.join(" ");

	return <Component className={itemClasses}>{children}</Component>;
};

/**
 * List component - flexible unordered or ordered list.
 *
 * Supports divided items, borders, hover effects, empty state, and custom children.
 * Items can be strings, numbers, or ReactNode.
 * Uses combined classes approach for consistent styling.
 *
 * @example
 * ```tsx
 * // Simple list with strings (ul)
 * <List items={['Item 1', 'Item 2']} divided bordered />
 *
 * // Ordered list (ol)
 * <List as="ol" items={['First', 'Second', 'Third']} divided />
 *
 * // Div list (for non-semantic lists)
 * <List as="div" items={['A', 'B', 'C']} divided bordered hover />
 *
 * // List with hover effect
 * <List items={['A', 'B', 'C']} hover />
 *
 * // List with List.Item
 * <List divided hover>
 *   <List.Item>Item 1</List.Item>
 *   <List.Item>Item 2</List.Item>
 * </List>
 *
 * // List with custom children
 * <List divided>
 *   <div>Custom 1</div>
 *   <div>Custom 2</div>
 * </List>
 *
 * // Empty state
 * <List items={[]} emptyMessage="No items" />
 * ```
 */
export function List({
	items,
	className,
	as = "ul",
	divided = false,
	bordered = false,
	hover = false,
	emptyMessage = "No items",
	children,
}: ListProps) {
	const Component = as;

	const baseClasses = "text-gray-700 rounded-lg";
	const dividedClasses = divided ? "divide-y divide-gray-200" : "";
	const borderClasses = bordered ? "border border-gray-200" : "";
	const emptyItemClasses = emptyMessage
		? "px-4 py-2 text-center text-gray-500"
		: "";

	// Combined classes for the list container
	const containerClasses = [
		className,
		baseClasses,
		dividedClasses,
		borderClasses,
	]
		.filter(Boolean)
		.join(" ");

	// Combined classes for empty state
	const emptyClasses = [className, baseClasses, borderClasses, emptyItemClasses]
		.filter(Boolean)
		.join(" ");

	// Empty state
	if ((!items || items.length === 0) && !children) {
		return <p className={emptyClasses}>{emptyMessage}</p>;
	}

	const itemTag = as === "ul" || as === "ol" ? "li" : "div";

	return (
		<Component className={containerClasses}>
			{children ??
				items?.map((item, index) => (
					<List.Item
						as={itemTag}
						hover={hover}
						key={index as unknown as string}
					>
						{item}
					</List.Item>
				))}
		</Component>
	);
}

List.Item = ListItem;

export default List;
