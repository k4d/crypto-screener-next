"use client";

import type { CoinListItemData, TrendingResponse } from "@/types/crypto";
import { CoinList } from "./List/CoinList";

interface TrendingCoinListProps {
	coins: TrendingResponse["coins"];
	className?: string;
}

/**
 * Displays a list of trending cryptocurrencies by adapting the data
 * for the generic CryptoList component.
 *
 * @example
 * ```tsx
 * async function Page() {
 *   const trendingData = await fetchTrendingCoins();
 *   return <TrendingCoinList coins={trendingData.coins} />;
 * }
 * ```
 */
export function TrendingCoinList({ coins, className }: TrendingCoinListProps) {
	/**
	 * Maps the raw API data to the standardized `CryptoListItemData` format.
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
