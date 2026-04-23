"use client";

import {
	CoinAvatar,
	CoinName,
	CoinPrice,
	CoinPriceChange,
	CoinRank,
	CoinSymbol,
} from "@/components/crypto";
import { List } from "@/components/ui";
import type { TrendingResponse } from "@/types/crypto";

interface TrendingCoinListProps {
	/**
	 * An array of trending coin data, as returned from the '/search/trending'
	 * CoinGecko endpoint. Each object in the array should have an 'item' property
	 * containing the coin's details.
	 */
	coins: TrendingResponse["coins"];
	/** Additional CSS classes to apply to the list container. */
	className?: string;
}

/**
 * Displays a list of trending cryptocurrencies with key metrics.
 *
 * This component iterates over a list of coins and renders each one with its
 * avatar, name, symbol, market cap rank, current price, and 24-hour price change.
 * It uses the generic List component for consistent styling and layout.
 *
 * Note: The 24-hour price change is currently hardcoded to display the 'usd' value.
 *
 * @param props - The component props.
 * @param props.coins - Array of trending coin data, where each element contains an 'item' object.
 * @param props.className - Additional CSS classes for the list container.
 *
 * @example
 * ```tsx
 * const trendingData = await fetchTrendingCoins();
 * <TrendingCoinList coins={trendingData.coins} />
 * ```
 */
export function TrendingCoinList({ coins, className }: TrendingCoinListProps) {
	return (
		<List className={className}>
			{coins.map(({ item }) => (
				<List.Item
					key={item.id}
					hover
					className="pl-3.5 pr-4 py-2 hover:rounded-lg"
				>
					<div className="flex items-center gap-2">
						<CoinAvatar crypto={{ ...item, image: item.thumb }} size="sm" />
						<div className="flex flex-col">
							<div className="flex items-center gap-1.5">
								<CoinName name={item.name} size="sm" />
								<CoinRank rank={item.market_cap_rank} size="xs" />
							</div>
							<CoinSymbol name={item.symbol} size="xs" />
						</div>
						<div className="flex flex-col text-right ml-auto">
							<CoinPrice price={item.data.price} size="sm" />
							<CoinPriceChange
								className="justify-end"
								change={item.data.price_change_percentage_24h?.usd ?? 0}
								size="sm"
							/>
						</div>
					</div>
				</List.Item>
			))}
		</List>
	);
}

export default TrendingCoinList;
