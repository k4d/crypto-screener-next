"use client";

import { Button } from "@heroui/react";
import { useState } from "react";
import { SearchButton } from "./SearchButton";
import SearchModal from "./SearchModal";
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
	const [isOpen, setIsOpen] = useState(false);

	return (
		<nav className="flex items-center gap-x-2">
			<SearchButton onPress={() => setIsOpen(true)} />
			<SearchModal isOpen={isOpen} onOpenChange={setIsOpen} />
			<Button variant="ghost" aria-label="Coins List">
				Coins List
			</Button>
			<ThemeButton />
		</nav>
	);
};
