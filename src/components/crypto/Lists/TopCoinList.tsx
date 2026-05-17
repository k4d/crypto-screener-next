import { getCryptoList } from "@/api/coingecko";
import type { CoinListItemData } from "@/types/crypto";
import { CoinList } from "../List/CoinList";

// Constants for fetching and displaying top coins
const FETCH_LIMIT = 11; // Fetch one more than display limit to account for filtering
const DISPLAY_LIMIT = 10; // Number of coins to actually display
const EXCLUDED_IDS = new Set(["figure-heloc"]); // IDs to exclude from the list

/**
 * A server component that fetches the top cryptocurrencies from the CoinGecko API,
 * filters out specific assets, normalizes the data into `CoinListItemData` format,
 * and renders the resulting list using the generic `CoinList` component.
 * This component encapsulates the entire logic for displaying the "Top 10" list,
 * including data fetching, processing, and error/empty state handling.
 *
 * @param {object} props - Component props.
 * @param {string} [props.className] - Optional CSS classes to apply to the list container.
 */
export async function TopCoinList({ className }: { className?: string }) {
	try {
		const topCoinsData = await getCryptoList("usd", FETCH_LIMIT);

		const normalizedData: CoinListItemData[] = topCoinsData
			.filter((item) => !EXCLUDED_IDS.has(item.id))
			.slice(0, DISPLAY_LIMIT)
			.map((item) => ({
				id: item.id,
				name: item.name,
				symbol: item.symbol,
				image: item.image,
				price: item.current_price ?? undefined,
				priceChange: item.price_change_percentage_24h ?? undefined,
			}));

		return (
			<CoinList
				items={normalizedData}
				emptyText={
					normalizedData.length === 0 ? "Could not load top coins." : undefined
				}
				className={className}
			/>
		);
	} catch (error) {
		console.error("Failed to load top coins:", error);
		return (
			<CoinList
				items={[]}
				emptyText="Failed to load coins. Please try again later."
				className={className}
			/>
		);
	}
}
