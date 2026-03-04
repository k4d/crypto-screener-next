import { MoveDownRight, MoveUpRight } from "lucide-react";

interface CoinPriceChangeProps {
	/** Price change percentage (e.g., 4.91 for +4.91% or -2.34 for -2.34%) */
	change: number;
	/** Additional CSS classes */
	className?: string;
	/** Show up/down arrow icon (default: false) */
	showIcon?: boolean;
	/** Time period label (e.g., "24h", "7d") */
	period?: "1h" | "24h" | "7d" | "30d";
	/** Text and icon size (default: "md") */
	size?: "sm" | "md" | "lg";
}

/**
 * CoinPriceChange component displays price change percentage with optional icon.
 * Automatically colors green for positive changes and red for negative changes.
 *
 * @example
 * ```tsx
 * <CoinPriceChange change={4.91} />
 * <CoinPriceChange change={-2.34} showIcon period="24h" />
 * <CoinPriceChange change={15.67} showIcon size="lg" period="7d" />
 * ```
 */
export const CoinPriceChange = ({
	change,
	className,
	showIcon = false,
	period,
	size = "md",
}: CoinPriceChangeProps) => {
	const isPositive = change >= 0;
	const colorClass = isPositive ? "text-green-600" : "text-red-600";

	const sizeClasses = {
		sm: { text: "text-xs", icon: 10 },
		md: { text: "text-sm", icon: 12 },
		lg: { text: "text-base", icon: 16 },
	};

	return (
		<span
			className={`flex items-center gap-1 font-light ${colorClass} ${className || ""}`}
		>
			{showIcon &&
				(isPositive ? (
					<MoveUpRight
						size={sizeClasses[size].icon}
						strokeWidth={1.5}
						data-testid="arrow-up-icon"
					/>
				) : (
					<MoveDownRight
						size={sizeClasses[size].icon}
						strokeWidth={1.5}
						data-testid="arrow-down-icon"
					/>
				))}
			<span className={sizeClasses[size].text}>
				{isPositive ? "+" : ""}
				{change.toFixed(2)}%{period && ` (${period})`}
			</span>
		</span>
	);
};
