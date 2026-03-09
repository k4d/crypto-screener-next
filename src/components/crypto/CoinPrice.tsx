interface CoinPriceProps {
	/** Price value (number for auto-formatting or pre-formatted string) */
	price: number | string | null;
	/** Additional CSS classes */
	className?: string;
	/** Text size (default: "md") */
	size?: "sm" | "md" | "lg";
	/** Currency code (default: "USD") */
	currency?: "USD" | "EUR" | "GBP" | "USDT" | "USDC" | string;
}

/**
 * CoinPrice component displays cryptocurrency price with automatic formatting.
 * Supports multiple currencies including USD, EUR, GBP, USDT, and USDC.
 *
 * @example
 * ```tsx
 * <CoinPrice price={63022.79} size="md" />
 * <CoinPrice price={0.58} currency="ADA" size="sm" />
 * <CoinPrice price="$63,022.79" />
 * ```
 */
export const CoinPrice = ({
	price,
	className,
	size = "md",
	currency = "USD",
}: CoinPriceProps) => {
	const sizeClasses = {
		sm: "text-sm",
		md: "text-base",
		lg: "text-lg",
	};

	// Handle null case
	if (price === null) {
		return (
			<span
				className={`${sizeClasses[size]} text-gray-400 font-bold ${className || ""}`}
			>
				N/A
			</span>
		);
	}

	const formattedPrice =
		typeof price === "number"
			? currency === "USD" || currency === "EUR" || currency === "GBP"
				? price.toLocaleString("en-US", {
						style: "currency",
						currency,
						minimumFractionDigits: price < 1 ? 4 : price < 10 ? 2 : 0,
						maximumFractionDigits: price < 10 ? 4 : 2,
					})
				: `${price.toLocaleString("en-US", {
						minimumFractionDigits: price < 1 ? 4 : price < 10 ? 2 : 0,
						maximumFractionDigits: price < 10 ? 4 : 2,
					})} ${currency}`
			: price;

	return (
		<span
			className={`${sizeClasses[size]} text-gray-800 font-bold ${className || ""}`}
		>
			{formattedPrice}
		</span>
	);
};
