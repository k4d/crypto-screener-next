"use client";

import { Activity } from "lucide-react";
import Link from "next/link";

/**
 * Logo component - application logo with icon and text.
 *
 * Displays the Crypto Screener brand with an activity icon and text.
 * Links to the home page.
 *
 * @example
 * ```tsx
 * <Logo />
 * ```
 */
export const Logo = () => {
	return (
		<Link href="/" className="flex items-center gap-2">
			<div className="flex shrink-0 h-8 w-8 items-center justify-center rounded-md bg-indigo-600">
				<Activity size={16} className="text-white" />
			</div>
			<div className="flex flex-col gap-0.5">
				<span className="leading-none text-base text-zinc-800 dark:text-gray-200 tracking-tighter">
					<span className="font-extrabold">Crypto</span>
					<span className="font-medium">Screener</span>
				</span>
				<span className="font-normal text-xs text-zinc-500">
					Real-time asset monitoring
				</span>
			</div>
		</Link>
	);
};
