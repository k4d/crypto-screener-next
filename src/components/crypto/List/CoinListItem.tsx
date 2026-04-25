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

interface CoinListItemProps {
	item: CoinListItemData;
}

/** Renders a list of cryptocurrencies using `CryptoListItem` for each entry. */
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
