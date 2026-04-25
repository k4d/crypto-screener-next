"use client";

import type { CoinListItemData, Crypto } from "@/types/crypto";
import { CoinList } from "./List/CoinList";

interface TopCoinListProps {
	/** Array of cryptocurrency data to display */
	coins: Crypto[];
	/** Additional CSS classes */
	className?: string;
}

/**
 * CryptoListBox component - adapts and displays a list of cryptocurrencies.
 * It transforms the raw `Crypto` type into the standardized `CryptoListItemData`
 * and renders the generic `CryptoList` component.
 */
export function TopCoinList({ coins, className }: TopCoinListProps) {
	/**
	 * Maps the raw API data to the standardized `CryptoListItemData` format.
	 */
	const normalizedData: CoinListItemData[] = coins.map((item) => ({
		id: item.id,
		name: item.name,
		symbol: item.symbol,
		image: item.image,
		// No rank is available in the standard Crypto type, so it's omitted.
		price: item.current_price,
		priceChange: item.price_change_percentage_24h ?? undefined,
	}));

	return <CoinList items={normalizedData} className={className} />;
}

TopCoinList.displayName = "TopCoinList";
