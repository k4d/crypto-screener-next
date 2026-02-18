"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Button } from "@heroui/react";

interface SearchButtonProps {
	onPress?: () => void;
}

/**
 * SearchButton component - button to trigger search functionality.
 *
 * Displays a magnifying glass icon with "Search" text.
 * Uses HeroUI outline button variant.
 *
 * @param onPress - Callback when button is pressed
 *
 * @example
 * ```tsx
 * <SearchButton onPress={() => setIsOpen(true)} />
 * ```
 */
export const SearchButton = ({ onPress }: SearchButtonProps) => {
	return (
		<Button variant="outline" aria-label="Search" onPress={onPress}>
			<MagnifyingGlassIcon className="h-4 w-4" />
			<span>Search</span>
		</Button>
	);
};
