"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Button } from "@heroui/react";

interface SearchButtonProps {
	onPress?: () => void;
	className?: string;
}

/**
 * SearchButton component - button to trigger search functionality.
 *
 * Displays a magnifying glass icon with "Search" text.
 * Uses HeroUI outline button variant.
 *
 * @param onPress - Callback when button is pressed
 * @param className - Additional CSS classes
 *
 * @example
 * ```tsx
 * <SearchButton onPress={() => setIsOpen(true)} />
 * ```
 */
export const SearchButton = ({ onPress, className }: SearchButtonProps) => {
	return (
		<Button
			variant="outline"
			aria-label="Search"
			onPress={onPress}
			className={className}
		>
			<MagnifyingGlassIcon className="h-4 w-4" />
			<span className="font-light">Search</span>
		</Button>
	);
};
