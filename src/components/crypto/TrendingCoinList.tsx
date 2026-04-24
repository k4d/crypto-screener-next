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
	coins: TrendingResponse["coins"];
	className?: string;
}

/**
 * Displays a list of trending cryptocurrencies with key metrics.
 *
 * Note: The 24-hour price change is currently hardcoded to display the 'usd' value.
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
	return (
		<List className={className}>
			{coins.map(({ item }) => (
				<List.Item key={item.id} hover className="pl-3.5 pr-4 py-2 rounded-lg">
					<div className="flex items-center gap-2">
						<CoinAvatar
							crypto={{
								id: item.id,
								name: item.name,
								symbol: item.symbol,
								image: item.thumb,
							}}
							size="sm"
						/>
						<div className="flex flex-col">
							<div className="flex items-center gap-1.5">
								<CoinName name={item.name} size="sm" />
								<CoinRank rank={item.market_cap_rank ?? undefined} size="xs" />
							</div>
							<CoinSymbol name={item.symbol} size="xs" />
						</div>
						<div className="flex flex-col text-right ml-auto">
							<CoinPrice price={item.data?.price} size="sm" />
							<CoinPriceChange
								change={item.data?.price_change_percentage_24h?.usd}
								size="sm"
							/>
						</div>
					</div>
				</List.Item>
			))}
		</List>
	);
}
