import { Card, Tabs } from "@heroui/react";
import type { CandlestickData, Time } from "lightweight-charts";

import { getCryptoList, getCryptoOHLC } from "@/api/coingecko";
import {
	CoinAvatar,
	CoinName,
	CoinPrice,
	CoinPriceChange,
	CoinSymbol,
	CryptoListBox,
	TimeFrameButtons,
} from "@/components/crypto";
import CryptoTable from "@/components/crypto/CryptoTable";
import { Chart } from "@/components/ui";

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

export default async function DashboardPage() {
	const getCoins = await getCryptoList("usd", 10);
	const dataCoins = getCoins;
	const selectedCoin = dataCoins[0];

	// Fetch real OHLC data for the chart
	const ohlcData = await getCryptoOHLC(selectedCoin.id, 30);

	// Transform API data [timestamp, open, high, low, close] to Chart format
	// Use numeric timestamp (seconds) for uniqueness and sort by time
	const chartData: CandlestickData[] = ohlcData
		.map((candle) => ({
			time: Math.floor(candle[0] / 1000) as Time, // Convert ms to seconds
			open: candle[1],
			high: candle[2],
			low: candle[3],
			close: candle[4],
		}))
		.sort((a, b) => (a.time as number) - (b.time as number)); // Ensure ascending order

	return (
		<div className="flex gap-4 items-start">
			{/* Left Column: Card + CryptoTable */}
			<div className="w-3/4 flex flex-col gap-4">
				{/* Main Coin Card */}
				<Card
					variant="default"
					className="w-full flex pt-2.5 rounded-xl bg-linear-to-br from-slate-50 to-white border-t border-l border-white shadow-xs"
				>
					<Card.Header>
						<div className="flex items-center gap-2">
							<CoinAvatar crypto={selectedCoin} />
							<div>
								<CoinName name={selectedCoin.name} size="md" />
								<CoinSymbol name={selectedCoin.symbol} size="sm" />
							</div>
							<div className="ml-4">
								<CoinPrice price={selectedCoin.current_price} />
								<CoinPriceChange
									size="md"
									change={selectedCoin.price_change_percentage_24h}
									showIcon
									period="24h"
								/>
							</div>
							<TimeFrameButtons className="ml-auto" />
						</div>
					</Card.Header>
					<Card.Content>
						<Chart data={chartData} title="Bitcoin Price Chart" />
					</Card.Content>
				</Card>

				{/* CryptoTable */}
				<Card
					variant="default"
					className="w-full rounded-xl bg-linear-to-br from-slate-50 to-white border-t border-l border-white shadow-xs"
				>
					<Card.Content>
						<CryptoTable coins={dataCoins} />
					</Card.Content>
				</Card>
			</div>

			{/* Right Column: Tabs Card + Future Cards */}
			<div className="w-1/4 flex flex-col gap-4">
				{/* Tabs Card */}
				<Card
					variant="default"
					className="w-full px-2.5 rounded-xl bg-linear-to-br from-slate-50 to-white border-t border-l border-white shadow-xs"
				>
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
								<CryptoListBox coins={dataCoins} className="p-0" />
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

				{/* Future Cards can be added here */}
				{/* <AnotherCard /> */}
				{/* <WatchlistCard /> */}
			</div>
		</div>
	);
}
