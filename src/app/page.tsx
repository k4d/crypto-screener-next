import { Card, Tabs } from "@heroui/react";
import type { CandlestickData, Time } from "lightweight-charts";

import {
	getCryptoList,
	getCryptoOHLC,
	getTrendingSearches,
} from "@/api/coingecko";
import {
	CoinAvatar,
	CoinName,
	CoinPrice,
	CoinPriceChange,
	CoinSymbol,
	CryptoListBox,
	TimeFrameButtons,
	TrendingCoinList,
} from "@/components/crypto";
import CryptoTable from "@/components/crypto/CryptoTable";
import { Chart } from "@/components/ui";
import type { TrendingResponse } from "@/types/crypto";

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
	const getTopCoins = await getCryptoList("usd", 10);
	const topCoinsData = getTopCoins;
	const topCoin = topCoinsData[0];

	// Fetch trending coins with error handling
	let trendingCoinsData: TrendingResponse = {
		coins: [],
		nfts: [],
		categories: [],
	};
	try {
		trendingCoinsData = await getTrendingSearches();
	} catch (error) {
		console.error("Failed to load trending data:", error);
	}

	// Fetch real OHLC data for the chart
	const ohlcData = await getCryptoOHLC(topCoin.id, 30);

	// Fetch ETH data for comparison
	const ethOhlcData = await getCryptoOHLC("ethereum", 30);

	// Fetch BNB data for comparison
	const bnbOhlcData = await getCryptoOHLC("binancecoin", 30);

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

	// Prepare ETH data scaled to BTC range for comparison
	const btcStartPrice = chartData[0]?.close || 1;
	const ethStartPrice = ethOhlcData[0] ? ethOhlcData[0][4] : 1;
	const scaleFactor = btcStartPrice / ethStartPrice;

	const ethSeriesData = ethOhlcData
		.map((candle) => ({
			time: Math.floor(candle[0] / 1000) as Time,
			value: candle[4] * scaleFactor, // Scale ETH price to match BTC start
		}))
		.sort((a, b) => (a.time as number) - (b.time as number));

	// Original ETH data for tooltip display
	const ethOriginalData = ethOhlcData
		.map((candle) => ({
			time: Math.floor(candle[0] / 1000) as Time,
			value: candle[4],
		}))
		.sort((a, b) => (a.time as number) - (b.time as number));

	// Prepare BNB data scaled to BTC range for comparison
	const bnbStartPrice = bnbOhlcData[0] ? bnbOhlcData[0][4] : 1;
	const bnbScaleFactor = btcStartPrice / bnbStartPrice;

	const bnbSeriesData = bnbOhlcData
		.map((candle) => ({
			time: Math.floor(candle[0] / 1000) as Time,
			value: candle[4] * bnbScaleFactor, // Scale BNB price to match BTC start
		}))
		.sort((a, b) => (a.time as number) - (b.time as number));

	// Original BNB data for tooltip display
	const bnbOriginalData = bnbOhlcData
		.map((candle) => ({
			time: Math.floor(candle[0] / 1000) as Time,
			value: candle[4],
		}))
		.sort((a, b) => (a.time as number) - (b.time as number));

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
							<CoinAvatar crypto={topCoin} />
							<div>
								<CoinName name={topCoin.name} size="md" />
								<CoinSymbol name={topCoin.symbol} size="sm" />
							</div>
							<div className="ml-4">
								<CoinPrice price={topCoin.current_price} />
								<CoinPriceChange
									size="md"
									change={topCoin.price_change_percentage_24h}
									showIcon
									period="24h"
								/>
							</div>
							<TimeFrameButtons className="ml-auto" />
						</div>
					</Card.Header>
					<Card.Content>
						<Chart
							data={chartData}
							type="area"
							title="BTC"
							showGrid
							showTooltip
							showPriceAxis={false}
							showTimeAxis={false}
							showLegend
							legendAlign="center"
							legendPosition="horizontal"
							overlays={[
								{
									type: "line",
									data: ethSeriesData,
									color: "#627EEA",
									lineWidth: 2,
									title: "ETH",
									originalData: ethOriginalData,
								},
								{
									type: "line",
									data: bnbSeriesData,
									color: "#F3BA2F",
									lineWidth: 2,
									title: "BNB",
									originalData: bnbOriginalData,
								},
							]}
						/>
					</Card.Content>
				</Card>

				{/* CryptoTable */}
				<Card
					variant="default"
					className="w-full rounded-xl bg-linear-to-br from-slate-50 to-white border-t border-l border-white shadow-xs"
				>
					<Card.Content>
						<CryptoTable coins={topCoinsData} />
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
								<CryptoListBox coins={topCoinsData} className="p-0" />
							</Tabs.Panel>
							<Tabs.Panel id="trending" className="p-0.5">
								{trendingCoinsData.coins.length > 0 ? (
									<TrendingCoinList coins={trendingCoinsData.coins} />
								) : (
									<p className="text-gray-500 text-sm">
										Failed to load trending coins.
									</p>
								)}
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
