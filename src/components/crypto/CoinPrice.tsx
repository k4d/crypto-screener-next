interface CoinPriceProps {
	/** Price value (number for auto-formatting or pre-formatted string) */
	price: number | string;
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

	const formattedPrice =
		typeof price === "number"
			? currency === "USD" || currency === "EUR" || currency === "GBP"
				? price.toLocaleString("en-US", {
						style: "currency",
						currency,
						minimumFractionDigits: price < 1 ? 4 : 2,
						maximumFractionDigits: price < 1 ? 4 : 2,
					})
				: `${price.toLocaleString("en-US", {
						minimumFractionDigits: price < 1 ? 4 : 2,
						maximumFractionDigits: price < 1 ? 4 : 2,
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
