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
import type { CoinListItemData } from "@/types/crypto";

/**
 * Props for the CoinListItem component.
 */
interface CoinListItemProps {
	/** Standardized data for a single cryptocurrency item. */
	item: CoinListItemData;
}

/**
 * Renders a single row in a cryptocurrency list.
 * It displays the coin's avatar, name, symbol, rank (optional), price, and 24-hour price change.
 * It expects data in the `CoinListItemData` format.
 *
 * @param {CoinListItemProps} props - The component props.
 * @param {CoinListItemData} props.item - Standardized data for the cryptocurrency item.
 * @example
 * ```tsx
 * // Example of usage within CoinList component
 * <CoinListItem item={{
 *   id: "bitcoin",
 *   name: "Bitcoin",
 *   symbol: "btc",
 *   image: "https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png",
 *   rank: 1,
 *   price: 60000,
 *   priceChange: 1.5
 * }} />
 * ```
 */
export function CoinListItem({ item }: CoinListItemProps) {
	return (
		<List.Item hover className="pl-3.5 pr-4 py-2 rounded-lg">
			<div className="flex items-center gap-2">
				<CoinAvatar crypto={item} size="sm" />
				<div className="flex flex-col">
					<div className="flex items-center gap-1.5">
						<CoinName name={item.name} size="sm" />
						{item.rank && <CoinRank rank={item.rank} size="xs" />}
					</div>
					<CoinSymbol name={item.symbol} size="xs" />
				</div>
				<div className="flex flex-col text-right ml-auto">
					<CoinPrice price={item.price ?? null} size="sm" />
					<CoinPriceChange
						change={item.priceChange ?? null}
						size="sm"
						className="justify-end"
					/>
				</div>
			</div>
		</List.Item>
	);
}

CoinListItem.displayName = "CoinListItem";
