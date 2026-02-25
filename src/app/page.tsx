"use client";

import { Card, ListBox, Tabs } from "@heroui/react";
import {
	CoinAvatar,
	CoinName,
	CoinPrice,
	CoinPriceChange,
	CoinSymbol,
	TimeFrameButtons,
} from "@/components/crypto";

export default function Dashboard() {
	interface TabListItem {
		id: string;
		label: string;
	}

	const tabListItems: TabListItem[] = [
		{
			id: "top-10",
			label: "Top 10",
		},
		{
			id: "trending",
			label: "Trending",
		},
		{
			id: "watchlist",
			label: "Watchlist",
		},
	];

	const tabListClass =
		"w-fit *:h-6 *:w-fit *:px-3 *:text-xs *:font-normal *:data-[selected=true]:text-accent-foreground bg-zinc-100";

	interface CryptoData {
		id: string;
		symbol: string;
		name: string;
		image: string;
		price: string;
		change24h: number;
	}

	const top10Cryptos: CryptoData[] = [
		{
			id: "bitcoin",
			symbol: "BTC",
			name: "Bitcoin",
			image: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png",
			price: "$63,022.79",
			change24h: -4.91,
		},
		{
			id: "ethereum",
			symbol: "ETH",
			name: "Ethereum",
			image: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
			price: "$3,456.12",
			change24h: 2.34,
		},
		{
			id: "tether",
			symbol: "USDT",
			name: "Tether",
			image: "https://assets.coingecko.com/coins/images/325/small/Tether.png",
			price: "$1.00",
			change24h: 0.01,
		},
		{
			id: "binancecoin",
			symbol: "BNB",
			name: "BNB",
			image:
				"https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png",
			price: "$589.45",
			change24h: -1.23,
		},
		{
			id: "solana",
			symbol: "SOL",
			name: "Solana",
			image: "https://assets.coingecko.com/coins/images/4128/small/solana.png",
			price: "$178.92",
			change24h: 5.67,
		},
		{
			id: "ripple",
			symbol: "XRP",
			name: "XRP",
			image:
				"https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png",
			price: "$0.62",
			change24h: -0.89,
		},
		{
			id: "cardano",
			symbol: "ADA",
			name: "Cardano",
			image: "https://assets.coingecko.com/coins/images/975/small/cardano.png",
			price: "$0.58",
			change24h: 1.45,
		},
		{
			id: "dogecoin",
			symbol: "DOGE",
			name: "Dogecoin",
			image: "https://assets.coingecko.com/coins/images/5/small/dogecoin.png",
			price: "$0.16",
			change24h: -2.34,
		},
		{
			id: "avalanche",
			symbol: "AVAX",
			name: "Avalanche",
			image:
				"https://assets.coingecko.com/coins/images/12559/small/coin-round-red.png",
			price: "$45.67",
			change24h: 3.21,
		},
		{
			id: "polkadot",
			symbol: "DOT",
			name: "Polkadot",
			image:
				"https://assets.coingecko.com/coins/images/12171/small/polkadot.png",
			price: "$8.92",
			change24h: -1.56,
		},
	];

	return (
		<div className="flex gap-8">
			<div className="w-3/4 flex">
				<div className="flex gap-2">
					<CoinAvatar
						crypto={{
							id: "bitcoin",
							symbol: "BTC",
							name: "Bitcoin",
							image:
								"https://assets.coingecko.com/coins/images/1/small/bitcoin.png",
						}}
					/>
					<div>
						<CoinName name="Bitcoin" size="md" />
						<CoinSymbol name="BTC" size="sm" />
					</div>
					<div className="ml-4">
						<CoinPrice price={63022.79} />
						<CoinPriceChange size="md" change={3.54} showIcon period="24h" />
					</div>
				</div>
				<div className="flex gap-2 ml-auto pt-1">
					<TimeFrameButtons />
				</div>
			</div>
			<Card variant="transparent" className="w-1/4 rounded-none p-0">
				<Card.Content>
					<Tabs className="w-full">
						<Tabs.ListContainer>
							<Tabs.List aria-label="Options" className={tabListClass}>
								{tabListItems.map((item) => (
									<Tabs.Tab key={item.id} id={item.id}>
										{item.label}
										<Tabs.Indicator className="bg-accent" />
									</Tabs.Tab>
								))}
							</Tabs.List>
						</Tabs.ListContainer>
						<Tabs.Panel id="top-10" className="p-0.5">
							<ListBox
								aria-label="Crypto"
								items={top10Cryptos}
								renderEmptyState={() => (
									<p className="text-zinc-500">No cryptocurrencies found</p>
								)}
								className="p-0"
							>
								{(crypto) => (
									<ListBox.Item
										key={crypto.id}
										id={crypto.id}
										className="pl-3.5 pr-4 py-2  hover:bg-zinc-100"
									>
										<CoinAvatar crypto={crypto} size="sm" />
										<div className="flex flex-col">
											<CoinName name={crypto.name} size="sm" />
											<CoinSymbol name={crypto.symbol} size="xs" />
										</div>
										<div className="flex flex-col text-right ml-auto">
											<CoinPrice price={crypto.price} size="sm" />
											<CoinPriceChange
												className="justify-end"
												change={crypto.change24h}
												size="sm"
											/>
										</div>
									</ListBox.Item>
								)}
							</ListBox>
						</Tabs.Panel>
						<Tabs.Panel id="trending" className="pt-4">
							Trending coins last 24 hours.
						</Tabs.Panel>
						<Tabs.Panel id="watchlist" className="pt-4">
							My Watchlist coins last 24 hours.
						</Tabs.Panel>
					</Tabs>
				</Card.Content>
			</Card>
		</div>
	);
}
