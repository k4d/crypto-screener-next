"use client";

import { Button } from "@heroui/react";
import { SearchButton } from "./SearchButton";
import { ThemeButton } from "./ThemeButton";

/**
 * HeaderNav component - navigation menu in the header.
 *
 * Contains search button, crypto list button, and theme toggle button.
 * Displayed on the right side of the header.
 *
 * @example
 * ```tsx
 * <HeaderNav />
 * ```
 */
export const HeaderNav = () => {
	return (
		<nav className="flex items-center gap-x-2">
			<SearchButton />
			<Button variant="ghost" aria-label="Coins List">
				Coins List
			</Button>
			<ThemeButton />
		</nav>
	);
};
