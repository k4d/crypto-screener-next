"use client";

import { List } from "@/components/ui";
import type { CoinListItemData } from "@/types/crypto";
import { CoinListItem } from "./CoinListItem";

/**
 * Props for the CoinList component.
 */
interface CoinListProps {
	/** Array of standardized cryptocurrency data to display. */
	items: CoinListItemData[];
	/** Additional CSS classes for the list container. */
	className?: string;
	/** Optional text to display when the list is empty. */
	emptyText?: string;
}

/**
 * Renders a list of cryptocurrencies, using the generic `List` component internally.
 * It maps `CoinListItemData` to `CoinListItem` components.
 * If the `items` array is empty, it delegates the empty state rendering to the base `List` component,
 * allowing it to display a custom `emptyText` message if provided.
 *
 * @param {CoinListProps} props - The component props.
 * @param {CoinListItemData[]} props.items - Array of standardized cryptocurrency data.
 * @param {string} [props.className] - Optional CSS classes for the list container.
 * @param {string} [props.emptyText] - Optional text to display when the list is empty.
 */
export function CoinList({ items, className, emptyText }: CoinListProps) {
	if (!items || items.length === 0) {
		return <List items={[]} className={className} emptyText={emptyText} />;
	}

	return (
		<List className={className}>
			{items.map((item) => (
				<CoinListItem key={item.id} item={item} />
			))}
		</List>
	);
}
CoinList.displayName = "CoinList";
