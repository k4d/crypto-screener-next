import { memo } from "react";
import { cn } from "@/utils/cn";

const sizeClasses = {
	xs: "text-xs",
	sm: "text-sm",
	md: "text-base",
	lg: "text-lg",
} as const;

type Size = keyof typeof sizeClasses;

interface CoinRankProps {
	/** Cryptocurrency market cap rank */
	rank: number | undefined;
	/** Text size (default: "sm") */
	size?: Size;
	/** Additional CSS classes */
	className?: string;
}

/**
 * CoinRank component displays a cryptocurrency's market cap rank.
 *
 * @param props - Component props
 * @param props.rank - The market cap rank of the cryptocurrency. Can be undefined if not available.
 * @param props.size - Text size (default: "sm")
 * @param props.className - Additional CSS classes
 *
 * @example
 * ```tsx
 * <CoinRank rank={1} />
 * <CoinRank rank={undefined} className="text-red-500" />
 * ```
 */
export const CoinRank = memo(
	({ rank, className, size = "sm" }: CoinRankProps) => {
		return (
			<span
				className={cn("font-light text-gray-400", sizeClasses[size], className)}
			>
				#{rank ?? "N/A"}
			</span>
		);
	},
);

CoinRank.displayName = "CoinRank";
