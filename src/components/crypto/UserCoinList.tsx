import { getCryptosByIds } from "@/api/coingecko";
import type { CoinListItemData } from "@/types/crypto";
import { CoinList } from "./List/CoinList";

interface UserCoinListProps {
	/** An array of cryptocurrency IDs to fetch and display. */
	coinIds: string[];
	/** Optional CSS classes to apply to the list container. */
	className?: string;
	/**
	 * Text to display when `coinIds` is empty or when the API returns no data.
	 * Note: API errors show a generic error message regardless of this prop.
	 */
	emptyText?: string;
}

/**
 * A generic server component designed to display a list of cryptocurrencies.
 * It dynamically fetches detailed data for a given array of `coinIds` using
 * the `getCryptosByIds` API function. The fetched data is then transformed
 * into the `CoinListItemData` format and rendered by the `CoinList` component.
 *
 * @param {UserCoinListProps} props - The component props.
 * @param {string[]} props.coinIds - An array of CoinGecko cryptocurrency IDs.
 * @param {string} [props.className] - Optional CSS classes for the container.
 * @param {string} [props.emptyText] - Text shown when `coinIds` is empty or API returns no data.
 */
export async function UserCoinList({
	coinIds,
	className,
	emptyText = "No coins found in this list.",
}: UserCoinListProps) {
	if (coinIds.length === 0) {
		return <CoinList items={[]} emptyText={emptyText} className={className} />;
	}

	try {
		const coins = await getCryptosByIds(coinIds);

		const normalizedData: CoinListItemData[] = coins.map((coin) => ({
			id: coin.id,
			name: coin.name,
			symbol: coin.symbol,
			image: coin.image,
			rank: coin.market_cap_rank ?? undefined,
			price: coin.current_price ?? undefined,
			priceChange: coin.price_change_percentage_24h ?? undefined,
		}));

		return (
			<CoinList
				items={normalizedData}
				emptyText={normalizedData.length === 0 ? emptyText : undefined}
				className={className}
			/>
		);
	} catch (error) {
		console.error("An unexpected error occurred in UserCoinList:", error);
		return (
			<CoinList
				items={[]}
				emptyText="An unexpected error occurred. Please try again later."
				className={className}
			/>
		);
	}
}
