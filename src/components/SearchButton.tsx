"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Button } from "@heroui/react";

/**
 * SearchButton component - button to trigger search functionality.
 *
 * Displays a magnifying glass icon with "Search" text.
 * Uses HeroUI outline button variant.
 *
 * @example
 * ```tsx
 * <SearchButton />
 * ```
 */
export const SearchButton = () => {
	return (
		<Button variant="outline" aria-label="Search">
			<MagnifyingGlassIcon className="h-4 w-4" />
			<span>Search</span>
		</Button>
	);
};
