import { getTrendingSearches } from "@/api/coingecko";
import type { TrendingResponse } from "@/types/crypto";
import { TrendingCoinList as TrendingCoinListClient } from "./TrendingCoinList.client";

/**
 * Props for the TrendingCoinList server component.
 */
interface TrendingCoinListProps {
	/** Optional CSS classes to apply to the list container. */
	className?: string;
}

/**
 * A server component that fetches trending cryptocurrencies and
 * renders the client-side `TrendingCoinListClient` to display them.
 * This pattern encapsulates data fetching logic on the server while
 * delegating rendering to a client component. It includes error handling
 * for the API call.
 *
 * If data fetching fails, it renders a fallback message.
 *
 * @param {TrendingCoinListProps} props - The component props.
 * @param {string} [props.className] - Optional CSS classes for the container.
 * @example
 * <TrendingCoinList />
 */
export default async function TrendingCoinList({
	className,
}: TrendingCoinListProps) {
	let trendingCoinsData: TrendingResponse;
	let emptyText: string | undefined;

	try {
		trendingCoinsData = await getTrendingSearches();
		if (trendingCoinsData.coins.length === 0) {
			emptyText = "No trending coins found.";
		}
	} catch (error) {
		console.error(
			"Failed to load trending data in TrendingCoinListContainer:",
			error,
		);
		trendingCoinsData = { coins: [], nfts: [], categories: [] };
		emptyText = "Failed to load trending coins. Please try again later.";
	}

	return (
		<TrendingCoinListClient
			coins={trendingCoinsData.coins}
			className={className}
			emptyText={emptyText}
		/>
	);
}
