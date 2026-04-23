import { cn } from "@/utils/cn";

interface CoinRankProps {
	/** Cryptocurrency market cap rank (e.g., 1, 2, or null) */
	rank: number | null;
	/** Text size (default: "sm") */
	size?: "xs" | "sm" | "md" | "lg";
	/** Additional CSS classes */
	className?: string;
}

/**
 * CoinRank component displays a cryptocurrency's market cap rank.
 *
 * @param props - Component props
 * @param props.rank - The market cap rank of the cryptocurrency. Can be null if not available.
 * @param props.size - Text size (default: "sm")
 * @param props.className - Additional CSS classes
 *
 * @example
 * ```tsx
 * <CoinRank rank={1} />
 * <CoinRank rank={null} className="text-red-500" />
 * ```
 */
export const CoinRank = ({ rank, className, size = "sm" }: CoinRankProps) => {
	const sizeClasses = {
		xs: "text-xs",
		sm: "text-sm",
		md: "text-md",
		lg: "text-lg",
	};

	const cssClasses = `
		${sizeClasses[size]} font-light text-gray-400
		${className ?? ""}
	`;

	return <span className={cn(cssClasses)}>#{rank ?? "N/A"}</span>;
};
