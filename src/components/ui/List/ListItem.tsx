import type { ReactNode } from "react";
import { listClasses as cls } from "./styleClasses";

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
 * @param props - Component props
 * @param props.as - HTML element type: "li" or "div" (default: "li")
 * @param props.children - Content of the list item
 * @param props.className - Additional CSS classes for styling
 * @param props.hover - Show hover effect on list item (default: false)
 * @param props.compact - Compact item height (default: false)
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
 *
 * // With compact mode
 * <List>
 *   <List.Item compact>Compact Item</List.Item>
 * </List>
 *
 * // With custom className
 * <List>
 *   <List.Item className="text-red-600">Custom Style</List.Item>
 * </List>
 * ```
 */
export const ListItem = ({
	as = "li",
	hover,
	compact,
	className,
	children,
}: ListItemProps) => {
	const Component = as;

	// Classes for the ListItem component
	const itemClass = compact ? cls.itemCompact : cls.item;
	const hoverClass = hover ? cls.itemHover : "";

	// Combined classes for the list item
	const classes = [itemClass, hoverClass, className].filter(Boolean).join(" ");

	return <Component className={classes}>{children}</Component>;
};
