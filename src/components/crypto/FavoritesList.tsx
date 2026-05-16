import { UserCoinList } from "./UserCoinList";

const favoriteCoinIds = ["ripple", "dogecoin", "shiba-inu"];

/**
 * Server component that displays the user's favorite coins.
 * It defines a hardcoded list of `favoriteCoinIds` and renders them
 * using the generic `UserCoinList` component.
 *
 * @param {object} props - Component props.
 * @param {string} [props.className] - Optional CSS classes to apply to the list container.
 */
export async function FavoritesList({ className }: { className?: string }) {
	return (
		<UserCoinList
			coinIds={favoriteCoinIds}
			className={className}
			emptyText="You have no favorite coins yet. Add some!"
		/>
	);
}
