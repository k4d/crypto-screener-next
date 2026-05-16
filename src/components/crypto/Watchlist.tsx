import { getCryptosByIds } from "@/api/coingecko";
import type { CoinListItemData } from "@/types/crypto";
import { CoinList } from "./List/CoinList";

const watchlistCoinIds = ["zilliqa", "tron", "zcash", "solana"];

/**
 * Server component for displaying a watchlist of cryptocurrencies.
 * Fetches a predefined list of coin IDs using `getCryptosByIds`,
 * transforms the data into the universal `CoinListItemData` format,
 * and then renders it using the `CoinList` component.
 * Handles cases where the watchlist is empty or data loading fails.
 *
 * @param {object} props - Component props.
 * @param {string} [props.className] - Optional CSS classes to apply to the list container.
 */
export async function Watchlist({ className }: { className?: string }) {
	let normalizedData: CoinListItemData[] = [];
	let emptyText: string | undefined;

	if (watchlistCoinIds.length > 0) {
		try {
			const coins = await getCryptosByIds(watchlistCoinIds);

			normalizedData = coins.map((coin) => ({
				id: coin.id,
				name: coin.name,
				symbol: coin.symbol,
				image: coin.image,
				rank: coin.market_cap_rank ?? undefined,
				price: coin.current_price ?? undefined,
				priceChange: coin.price_change_percentage_24h ?? undefined,
			}));

			if (normalizedData.length === 0) {
				emptyText = "Could not find data for watchlist coins.";
			}
		} catch (error) {
			console.error("An unexpected error occurred in Watchlist:", error);
			emptyText = "An unexpected error occurred. Please try again later.";
		}
	} else {
		emptyText = "Your watchlist is empty. Add coins to get started.";
	}

	return (
		<CoinList
			items={normalizedData}
			emptyText={emptyText}
			className={className}
		/>
	);
}
