"use client";

import type { CoinListItemData, Crypto } from "@/types/crypto";
import { CoinList } from "./List/CoinList";

/**
 * Props for the TopCoinList client component.
 */
interface TopCoinListProps {
	/** An array of cryptocurrency data, typically fetched from the CoinGecko API. */
	coins: Crypto[];
	/** Optional CSS classes to apply to the list container. */
	className?: string;
}

/**
 * A client component that displays a list of top cryptocurrencies.
 * It expects pre-fetched top coin data (from a server component) and
 * adapts it to render using the generic `CoinList` component.
 *
 * @param {TopCoinListProps} props - The component props.
 * @param {Array<Object>} props.coins - Array of top cryptocurrency data.
 * @param {string} [props.className] - Optional CSS classes for the container.
 * @example
 * ```tsx
 * // Example of usage within a server component
 * import { TopCoinListClient } from "@/components/crypto/TopCoinList.client";
 *
 * function ServerComponent({ topCoinsData }) {
 *   return <TopCoinListClient coins={topCoinsData} />;
 * }
 * ```
 */
export function TopCoinList({ coins, className }: TopCoinListProps) {
	/**
	 * Maps the raw API data to the standardized `CoinListItemData` format.
	 */
	const normalizedData: CoinListItemData[] = coins.map((item) => ({
		id: item.id,
		name: item.name,
		symbol: item.symbol,
		image: item.image,
		// Rank is available in Crypto type but omitted here; add if needed in future updates.
		price: item.current_price,
		priceChange: item.price_change_percentage_24h ?? undefined,
	}));

	return <CoinList items={normalizedData} className={className} />;
}
