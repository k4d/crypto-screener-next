"use client";

import { ListBox } from "@heroui/react";
import {
	CoinAvatar,
	CoinName,
	CoinPrice,
	CoinPriceChange,
	CoinSymbol,
} from "@/components/crypto";
import type { Crypto } from "@/types/crypto";

interface CryptoListBoxProps {
	/** Array of cryptocurrency data to display */
	coins: Crypto[];
	/** Additional CSS classes */
	className?: string;
}

/**
 * CryptoListBox component - client-side rendered cryptocurrency list.
 *
 * Wrapper around HeroUI ListBox that handles hydration mismatch issues.
 * Displays a list of cryptocurrencies with avatar, name, symbol, price, and price change.
 *
 * @param props - Component props
 * @param props.coins - Array of cryptocurrency data to display
 * @param props.className - Additional CSS classes for the ListBox
 *
 * @example
 * ```tsx
 * <CryptoListBox coins={dataCoins} className="p-0" />
 * ```
 */
export function CryptoListBox({ coins, className }: CryptoListBoxProps) {
	return (
		<ListBox aria-label="Crypto" items={coins} className={className}>
			{coins.map((coin) => (
				<ListBox.Item
					key={coin.id}
					id={coin.id}
					className="pl-3.5 pr-4 py-2 hover:bg-zinc-100"
				>
					<CoinAvatar crypto={coin} size="sm" />
					<div className="flex flex-col">
						<CoinName name={coin.name} size="sm" />
						<CoinSymbol name={coin.symbol} size="xs" />
					</div>
					<div className="flex flex-col text-right ml-auto">
						<CoinPrice price={coin.current_price} size="sm" />
						<CoinPriceChange
							className="justify-end"
							change={coin.price_change_percentage_24h}
							size="sm"
						/>
					</div>
				</ListBox.Item>
			))}
		</ListBox>
	);
}

export default CryptoListBox;
