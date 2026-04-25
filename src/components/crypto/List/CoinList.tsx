"use client";

import { List } from "@/components/ui";
import type { CoinListItemData } from "@/types/crypto";
import { CoinListItem } from "./CoinListItem";

interface CoinListProps {
	/** Array of standardized cryptocurrency data to display */
	items: CoinListItemData[];
	/** Additional CSS classes for the list container */
	className?: string;
}

/** Renders a list of cryptocurrencies. */
export function CoinList({ items, className }: CoinListProps) {
	return (
		<List className={className}>
			{items.map((item) => (
				<CoinListItem key={item.id} item={item} />
			))}
		</List>
	);
}

CoinList.displayName = "CoinList";
