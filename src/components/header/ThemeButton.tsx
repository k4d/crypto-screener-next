"use client";

import { Button } from "@heroui/react";
import { Sun } from "lucide-react";

/**
 * ThemeButton component - button to toggle light/dark theme.
 *
 * Displays sun icon in an icon-only button.
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
			<Sun size={16} strokeWidth={1.5} />
		</Button>
	);
};
