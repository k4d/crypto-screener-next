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
		<footer className="w-full py-8 mt-auto bg-slate-950">
			<div className="container mx-auto px-4">
				<p className="text-sm text-center text-slate-400 dark:text-slate-200">
					© 2026 Crypto Screener
				</p>
			</div>
		</footer>
	);
}
