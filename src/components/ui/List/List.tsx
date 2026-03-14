import type { ReactNode } from "react";
import { ListItem } from "./ListItem";
import { listClasses as cls } from "./styleClasses";

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

/**
 * List component - flexible unordered or ordered list.
 *
 * Supports divided items, borders, striped rows, hover effects, empty state, and custom children.
 * Items can be strings, numbers, or ReactNode.
 * Uses combined classes approach for consistent styling.
 *
 * @param props - Component props
 * @param props.items - Array of items to render (strings, numbers, or ReactNodes)
 * @param props.className - Additional CSS classes for styling
 * @param props.as - HTML element type: "ul", "ol", or "div" (default: "ul")
 * @param props.divided - Show dividers between items (default: false)
 * @param props.bordered - Show border around list (default: false)
 * @param props.striped - Alternating item colors (default: false)
 * @param props.compact - Compact item height (default: false)
 * @param props.hover - Hover effect on items (default: false). For plain lists (without divided/bordered/striped), adds rounded corners on hover.
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
 *
 * // Compact mode
 * <List items={['A', 'B', 'C']} compact />
 *
 * // Plain list with hover (rounded corners)
 * <List items={['A', 'B', 'C']} hover />
 *
 * // Mixed: some items with hover
 * <List divided>
 *   <List.Item hover>Hoverable Item</List.Item>
 *   <List.Item>Static Item</List.Item>
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

	// Classes for the List component
	const dividedClass = divided ? cls.divided : "";
	const borderedClass = bordered ? cls.bordered : "";
	const emptyClass = emptyText ? cls.itemEmpty : "";

	// Combined classes for the list container
	const listClasses = [cls.list, dividedClass, borderedClass, className]
		.filter(Boolean)
		.join(" ");

	// Combined classes for empty state
	const emptyStateClasses = [cls.list, borderedClass, emptyClass, className]
		.filter(Boolean)
		.join(" ");

	// Item classes with striped support
	const getItemClasses = (itemIndex: number) => {
		// Check if it's a plain list (no dividers, borders, or stripes)
		const isPlainList = !divided && !bordered && !striped;

		const classes = [
			cls.itemText,
			// Striped background
			striped && itemIndex % 2 === 1 ? cls.itemStriped : "",
			// Hover transition
			hover && cls.itemHoverTransition,
			// Hover with border radius for plain lists
			hover && isPlainList && cls.itemHoverRounded,
		]
			.filter(Boolean)
			.join(" ");

		return classes;
	};

	// Empty state
	if ((!items || items.length === 0) && !children) {
		return <p className={emptyStateClasses}>{emptyText}</p>;
	}

	const itemTag = as === "ul" || as === "ol" ? "li" : "div";

	return (
		<div className={cls.container}>
			<Component className={listClasses}>
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
		</div>
	);
}

List.Item = ListItem;

export default List;
