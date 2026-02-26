"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Button, Kbd } from "@heroui/react";
import { useEffect } from "react";

interface SearchButtonProps {
	onPress?: () => void;
	className?: string;
}

/**
 * SearchButton component - button to trigger search functionality.
 *
 * Displays a magnifying glass icon with "Search" text and keyboard shortcut (⌘K).
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
	// Keyboard shortcut ⌘K or Ctrl+K
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if ((e.metaKey || e.ctrlKey) && e.key === "k") {
				e.preventDefault();
				onPress?.();
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [onPress]);

	return (
		<Button
			variant="outline"
			aria-label="Search"
			onPress={onPress}
			className={className}
		>
			<MagnifyingGlassIcon className="h-4 w-4" />
			<span className="font-light">Search</span>
			<Kbd className="p-1 text-xs">
				<Kbd.Abbr keyValue="command" title="Command" />
				<Kbd.Content>K</Kbd.Content>
			</Kbd>
		</Button>
	);
};
