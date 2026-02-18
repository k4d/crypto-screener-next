"use client";

/**
 * Footer component - displays copyright information at the bottom of the page.
 *
 * Positioned at the bottom of the page using flexbox layout in the root layout.
 *
 * @example
 * ```tsx
 * <Footer />
 * ```
 */
export default function Footer() {
	return (
		<footer className="w-full py-8 mt-auto border-t border-gray-200 dark:border-gray-800">
			<div className="container mx-auto px-4">
				<p className="text-center text-gray-600 dark:text-gray-400">
					© 2026 Crypto Screener
				</p>
			</div>
		</footer>
	);
}
