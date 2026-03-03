"use client";

import { SunIcon } from "@heroicons/react/24/outline";
import { Button } from "@heroui/react";

/**
 * ThemeButton component - button to toggle light/dark theme.
 *
 * Displays a sun icon in an icon-only button.
 * Used for switching between light and dark color schemes.
 *
 * @example
 * ```tsx
 * <ThemeButton />
 * ```
 */
export const ThemeButton = () => {
	return (
		<Button isIconOnly variant="ghost" aria-label="Toggle theme">
			<SunIcon className="h-4 w-4" />
		</Button>
	);
};
