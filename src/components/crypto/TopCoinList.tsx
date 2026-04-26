import { getCryptoList } from "@/api/coingecko";
import type { Crypto } from "@/types/crypto";
import { TopCoinList as TopCoinListClient } from "./TopCoinList.client";

/**
 * Props for the TopCoinList server component.
 */
interface TopCoinListProps {
	/** Optional CSS classes to apply to the list container. */
	className?: string;
}

/**
 * A server component that fetches the top 10 cryptocurrencies and
 * renders the client-side `TopCoinListClient` to display them.
 * This pattern encapsulates data fetching logic on the server while
 * delegating rendering to a client component. It includes error handling
 * for the API call.
 *
 * @param {TopCoinListProps} props - The component props.
 * @param {string} [props.className] - Optional CSS classes for the container.
 * @example
 * <TopCoinList />
 */
export default async function TopCoinList({ className }: TopCoinListProps) {
	let topCoinsData: Crypto[] = [];
	try {
		topCoinsData = await getCryptoList("usd", 10);
	} catch (error) {
		console.error("Failed to load top coins:", error);
	}

	return <TopCoinListClient coins={topCoinsData} className={className} />;
}
