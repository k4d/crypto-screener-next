"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Button } from "@heroui/react";

export const SearchButton = () => {
	return (
		<Button variant="outline" aria-label="Search">
			<MagnifyingGlassIcon className="h-4 w-4" />
			<span>Search</span>
		</Button>
	);
};
