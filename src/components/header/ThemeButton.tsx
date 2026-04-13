"use client";

import { Button } from "@heroui/react";
import { Sun } from "lucide-react";
import { cn } from "@/utils/cn";

interface ThemeButtonProps {
	className?: string;
}

/**
 * ThemeButton component - button to toggle light/dark theme.
 *
 * Displays sun icon in an icon-only button.
 * Used for switching between light and dark color schemes.
 *
 * @param className - Additional CSS classes
 *
 * @example
 * ```tsx
 * <ThemeButton />
 * ```
 */
export const ThemeButton = ({ className }: ThemeButtonProps) => {
	return (
		<Button
			isIconOnly
			variant="ghost"
			aria-label="Toggle theme"
			className={cn(className)}
		>
			<Sun size={16} strokeWidth={1.5} />
		</Button>
	);
};
