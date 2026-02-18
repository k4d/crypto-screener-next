"use client";

import { Button } from "@heroui/react";
import { SearchButton } from "./SearchButton";
import { ThemeButton } from "./ThemeButton";

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
