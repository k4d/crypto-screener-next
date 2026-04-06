import { Card, Tabs } from "@heroui/react";
import { getCryptoList } from "@/api/coingecko";
import {
	Chart,
	CoinAvatar,
	CoinName,
	CoinPrice,
	CoinPriceChange,
	CoinSymbol,
	CryptoListBox,
	TimeFrameButtons,
} from "@/components/crypto";
import CryptoTable from "@/components/crypto/CryptoTable";

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

// Mock data for chart (will be replaced with real API data later)
const chartData = [
	{ time: "2024-11-01", open: 68000, high: 70500, low: 67000, close: 69000 },
	{ time: "2024-11-05", open: 69000, high: 72500, low: 68500, close: 71500 },
	{ time: "2024-11-10", open: 71500, high: 74000, low: 71000, close: 73200 },
	{ time: "2024-11-15", open: 73200, high: 76500, low: 72800, close: 75800 },
	{ time: "2024-11-20", open: 75800, high: 79000, low: 75000, close: 78500 },
	{ time: "2024-11-25", open: 78500, high: 83000, low: 78000, close: 82000 },
	{ time: "2024-11-30", open: 82000, high: 86000, low: 81500, close: 85200 },
	{ time: "2024-12-05", open: 85200, high: 89500, low: 84800, close: 88500 },
	{ time: "2024-12-10", open: 88500, high: 93000, low: 88000, close: 92000 },
	{ time: "2024-12-15", open: 92000, high: 96500, low: 91500, close: 95500 },
	{ time: "2024-12-20", open: 95500, high: 99000, low: 95000, close: 98200 },
	{ time: "2024-12-25", open: 98200, high: 102000, low: 97800, close: 101000 },
	{
		time: "2024-12-30",
		open: 101000,
		high: 105500,
		low: 100500,
		close: 104500,
	},
	{
		time: "2025-01-05",
		open: 104500,
		high: 108000,
		low: 104000,
		close: 107200,
	},
	{
		time: "2025-01-10",
		open: 107200,
		high: 107800,
		low: 104500,
		close: 105800,
	},
	{
		time: "2025-01-15",
		open: 105800,
		high: 109500,
		low: 105000,
		close: 108500,
	},
	{
		time: "2025-01-20",
		open: 108500,
		high: 111000,
		low: 108000,
		close: 110200,
	},
	{
		time: "2025-01-25",
		open: 110200,
		high: 110800,
		low: 108500,
		close: 109500,
	},
	{
		time: "2025-01-30",
		open: 109500,
		high: 112000,
		low: 109000,
		close: 111000,
	},
	{
		time: "2025-02-05",
		open: 111000,
		high: 113500,
		low: 110500,
		close: 112500,
	},
	{
		time: "2025-02-10",
		open: 112500,
		high: 113000,
		low: 109500,
		close: 110925,
	},
];

export default async function DashboardPage() {
	const getCoins = await getCryptoList("usd", 10);
	const dataCoins = getCoins;
	const selectedCoin = dataCoins[0];

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
						<Chart data={chartData} />
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
