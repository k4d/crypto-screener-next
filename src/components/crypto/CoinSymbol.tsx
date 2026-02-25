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
 *
 * @example
 * ```tsx
 * <CoinSymbol name="BTC" size="sm" />
 * <CoinSymbol name="ETH" className="font-medium" />
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

	return <h4 className={cssClasses}>{name}</h4>;
};
