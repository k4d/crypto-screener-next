import { Spinner } from "@heroui/react";

/**
 * Loading indicator component displayed while pages are loading.
 *
 * Used by Next.js App Router to show a fallback UI during server component data fetching.
 * Features a centered layout with a HeroUI spinner and descriptive text.
 *
 * @example
 * Automatically triggered by Next.js when loading `page.tsx`
 */
export default function Loading() {
	return (
		<div className="flex flex-1 min-h-100 items-center justify-center">
			<div className="flex flex-col items-center gap-1">
				<Spinner size="md" color="accent" />
				<p className="font-light text-sm text-gray-600">Loading data...</p>
			</div>
		</div>
	);
}
