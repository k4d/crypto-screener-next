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
	/** Alternating item colors */
	striped?: boolean;
	/** Compact item height */
	compact?: boolean;
	/** Hover effect on items */
	hover?: boolean;
	/** Empty state text */
	emptyText?: string;
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
	/** Compact item height */
	compact?: boolean;
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
	compact,
}: ListItemProps) => {
	const Component = as;

	const baseClasses = compact
		? "p-2 text-sm font-medium text-gray-600"
		: "p-4 text-sm font-medium text-gray-600";
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
 * Supports divided items, borders, striped rows, hover effects, empty state, and custom children.
 * Items can be strings, numbers, or ReactNode.
 * Uses combined classes approach for consistent styling.
 *
 * @param props - Component props
 * @param props.items - Array of items to render (strings, numbers, or ReactNodes)
 * @param props.className - Additional CSS classes
 * @param props.as - HTML element type: "ul", "ol", or "div" (default: "ul")
 * @param props.divided - Show dividers between items (default: false)
 * @param props.bordered - Show border around list (default: false)
 * @param props.striped - Alternating item colors (default: false)
 * @param props.compact - Compact item height (default: false)
 * @param props.hover - Hover effect on items (default: false)
 * @param props.emptyText - Empty state message (default: "No items")
 * @param props.children - Custom children (overrides items)
 *
 * @example
 * ```tsx
 * // Simple list with strings
 * <List
 *   items={['Item 1', 'Item 2', 'Item 3']}
 *   divided
 *   bordered
 * />
 *
 * // Ordered list
 * <List
 *   as="ol"
 *   items={['First', 'Second', 'Third']}
 *   divided
 * />
 *
 * // Striped list with hover
 * <List
 *   items={['A', 'B', 'C']}
 *   striped
 *   hover
 * />
 *
 * // List with custom children
 * <List divided>
 *   <div>Custom 1</div>
 *   <div>Custom 2</div>
 * </List>
 *
 * // Empty state
 * <List items={[]} emptyText="No items found" />
 *
 * // Using List.Item compound component
 * <List divided hover>
 *   <List.Item>Item 1</List.Item>
 *   <List.Item>Item 2</List.Item>
 * </List>
 * ```
 */
export function List({
	items,
	className,
	as = "ul",
	divided = false,
	bordered = false,
	striped = false,
	compact = false,
	hover = false,
	emptyText = "No items",
	children,
}: ListProps) {
	const Component = as;

	const baseClasses = "text-gray-700 rounded-lg";
	const dividedClasses = divided ? "divide-y divide-gray-200" : "";
	const borderClasses = bordered ? "border border-gray-200" : "";
	const emptyItemClasses = emptyText
		? "p-4 text-center text-sm font-medium text-gray-500"
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

	// Item classes with striped support
	const getItemClasses = (itemIndex: number) => {
		const classes = [
			striped && itemIndex % 2 === 1 ? "bg-gray-50" : "bg-white",
			hover && "hover:bg-gray-100",
			hover && "transition-colors",
			hover && "duration-150",
		]
			.filter(Boolean)
			.join(" ");

		return classes;
	};

	// Empty state
	if ((!items || items.length === 0) && !children) {
		return <p className={emptyClasses}>{emptyText}</p>;
	}

	const itemTag = as === "ul" || as === "ol" ? "li" : "div";

	return (
		<Component className={containerClasses}>
			{children ??
				items?.map((item, index) => (
					<List.Item
						as={itemTag}
						hover={hover}
						compact={compact}
						className={getItemClasses(index)}
						key={index}
					>
						{item}
					</List.Item>
				))}
		</Component>
	);
}

List.Item = ListItem;

export default List;
