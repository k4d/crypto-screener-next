"use client";

import { Square3Stack3DIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

/**
 * Logo component - application logo with icon and text.
 *
 * Displays the Crypto Screener brand with a stacked squares icon and text.
 * Links to the home page and supports dark theme.
 *
 * @example
 * ```tsx
 * <Logo />
 * ```
 */
export const Logo = () => {
	return (
		<Link href="/" className="flex items-center gap-2">
			<Square3Stack3DIcon className="h-6 w-6 text-indigo-800" />
			<span className="font-medium text-base text-zinc-800 dark:text-gray-200 tracking-tighter">
				Crypto Screener
			</span>
		</Link>
	);
};
