interface CoinSymbolProps {
	/** Cryptocurrency symbol (e.g., "BTC") */
	name: string;
	/** Text size (default: "sm") */
	size?: "xs" | "sm" | "md" | "lg";
	/** Additional CSS classes */
	className?: string;
}

/**
 * CoinSymbol component displays cryptocurrency symbol (ticker) with configurable size.
 * Automatically converts symbol to uppercase for consistent display.
 *
 * @example
 * ```tsx
 * <CoinSymbol name="btc" size="sm" />  ← Displays "BTC"
 * <CoinSymbol name="eth" className="font-medium" />  ← Displays "ETH"
 * ```
 */
export const CoinSymbol = ({
	name,
	className,
	size = "sm",
}: CoinSymbolProps) => {
	const sizeClasses = {
		xs: "text-xs",
		sm: "text-sm",
		md: "text-md",
		lg: "text-lg",
	};

	const cssClasses = `${sizeClasses[size]} text-gray-600 font-light ${className || ""}`;

	return <h4 className={cssClasses}>{name.toUpperCase()}</h4>;
};
