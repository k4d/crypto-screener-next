import { getTrendingSearches } from "@/api/coingecko";
import type { CoinListItemData } from "@/types/crypto";
import { CoinList } from "../List/CoinList";

/**
 * A server component that fetches trending cryptocurrencies from the CoinGecko API,
 * normalizes the data into `CoinListItemData` format, and renders the resulting list
 * using the generic `CoinList` component.
 * This component encapsulates the entire logic for displaying the "Trending" list,
 * including data fetching, processing, and error/empty state handling.
 *
 * @param {object} props - Component props.
 * @param {string} [props.className] - Optional CSS classes to apply to the list container.
 */
export async function TrendingCoinList({ className }: { className?: string }) {
	try {
		const trendingData = await getTrendingSearches();
		const coins = trendingData.coins ?? []; // Defensive programming

		const normalizedData: CoinListItemData[] = coins.map(({ item }) => ({
			id: item.id,
			name: item.name,
			symbol: item.symbol,
			image: item.thumb,
			rank: item.market_cap_rank ?? undefined,
			price: item.data?.price,
			priceChange: item.data?.price_change_percentage_24h?.usd,
		}));

		return (
			<CoinList
				items={normalizedData}
				emptyText={
					normalizedData.length === 0 ? "No trending coins found." : undefined
				}
				className={className}
			/>
		);
	} catch (error) {
		console.error("Failed to load trending coins:", error);
		return (
			<CoinList
				items={[]}
				emptyText="Failed to load trending coins. Please try again later."
				className={className}
			/>
		);
	}
}
