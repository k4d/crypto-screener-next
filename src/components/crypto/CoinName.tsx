interface CoinNameProps {
	/** Cryptocurrency name (e.g., "Bitcoin") */
	name: string;
	/** Additional CSS classes */
	className?: string;
	/** Text size (default: "md") */
	size?: "sm" | "md" | "lg";
}

/**
 * CoinName component displays cryptocurrency name with configurable size.
 *
 * @example
 * ```tsx
 * <CoinName name="Bitcoin" size="md" />
 * <CoinName name="Ethereum" className="font-semibold" />
 * ```
 */
export const CoinName = ({ name, className, size = "md" }: CoinNameProps) => {
	const sizeClasses = {
		sm: "text-sm",
		md: "text-md",
		lg: "text-lg",
	};

	const cssClasses = `${sizeClasses[size]} text-gray-800 font-bold ${className || ""}`;

	return <span className={cssClasses}>{name}</span>;
};
