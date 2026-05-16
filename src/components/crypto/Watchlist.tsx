import { UserCoinList } from "./UserCoinList";

const watchlistCoinIds = ["zilliqa", "tron", "zcash", "solana"];

/**
 * Server component that displays the user's watchlist.
 * It defines a hardcoded list of `watchlistCoinIds` and renders them
 * using the generic `UserCoinList` component.
 *
 * @param {object} props - Component props.
 * @param {string} [props.className] - Optional CSS classes to apply to the list container.
 */
export async function WatchList({ className }: { className?: string }) {
	return (
		<UserCoinList
			coinIds={watchlistCoinIds}
			className={className}
			emptyText="Your watchlist is empty. Add coins to get started."
		/>
	);
}
