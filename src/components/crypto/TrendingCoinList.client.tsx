"use client";

import type { CoinListItemData, TrendingResponse } from "@/types/crypto";
import { CoinList } from "./List/CoinList";

/**
 * Props for the TrendingCoinList client component.
 */
interface TrendingCoinListProps {
	/** An array of trending coin data, typically fetched from the CoinGecko API. */
	coins: TrendingResponse["coins"];
	/** Optional CSS classes to apply to the list container. */
	className?: string;
}

/**
 * A client component that displays a list of trending cryptocurrencies.
 * It expects pre-fetched trending coin data (from a server component) and
 * adapts it to render using the generic `CoinList` component.
 *
 * @param {TrendingCoinListProps} props - The component props.
 * @param {Array<Object>} props.coins - Array of trending coin data.
 * @param {string} [props.className] - Optional CSS classes for the container.
 * @example
 * ```tsx
 * // Example of usage within a server component
 * import { TrendingCoinList } from "@/components/crypto/TrendingCoinList.client";
 *
 * function ServerComponent({ trendingData }) {
 *   return <TrendingCoinList coins={trendingData.coins} />;
 * }
 * ```
 */
export function TrendingCoinList({ coins, className }: TrendingCoinListProps) {
	/**
	 * Maps the raw API data to the standardized `CoinListItemData` format.
	 */
	const normalizedData: CoinListItemData[] = coins.map((item) => ({
		id: item.item.id,
		name: item.item.name,
		symbol: item.item.symbol,
		image: item.item.thumb,
		rank: item.item.market_cap_rank ?? undefined,
		price: item.item.data?.price,
		priceChange: item.item.data?.price_change_percentage_24h?.usd,
	}));

	return <CoinList items={normalizedData} className={className} />;
}

TrendingCoinList.displayName = "TrendingCoinList";
