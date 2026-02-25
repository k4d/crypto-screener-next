import { Avatar } from "@heroui/react";

interface CoinAvatar {
	id: string;
	symbol: string;
	name: string;
	image: string;
}

interface CoinAvatarProps {
	/** Cryptocurrency data object */
	crypto: CoinAvatar;
	/** Additional CSS classes */
	className?: string;
	/** Avatar size (default: "md") */
	size?: "sm" | "md" | "lg";
}

/**
 * CoinAvatar component displays cryptocurrency logo with fallback symbol.
 *
 * @example
 * ```tsx
 * <CoinAvatar
 *   crypto={{
 *     id: "bitcoin",
 *     symbol: "BTC",
 *     name: "Bitcoin",
 *     image: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png",
 *   }}
 *   size="md"
 * />
 * ```
 */
export const CoinAvatar = ({
	crypto,
	className,
	size = "md",
}: CoinAvatarProps) => {
	const sizeClasses = {
		sm: "w-8 h-8",
		md: "w-10 h-10",
		lg: "w-12 h-12",
	};

	return (
		<Avatar
			key={crypto.id}
			className={`${sizeClasses[size]} ${className || ""}`}
			size={size}
		>
			<Avatar.Image alt={crypto.name} src={crypto.image} />
			<Avatar.Fallback>{crypto.symbol}</Avatar.Fallback>
		</Avatar>
	);
};
