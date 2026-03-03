import "./globals.css";
import type { Metadata } from "next";
import { ViewTransition } from "react";
import { fonts } from "@/components/Fonts";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

/**
 * Application metadata for SEO and page metadata.
 */
export const metadata: Metadata = {
	title: "Crypto Screener",
	description:
		"Crypto Screener is a web application that allows users to screen cryptocurrencies based on various criteria such as market capitalization, price, volume, and more.",
	icons: {
		icon: [
			{
				url: "/favicon.svg",
				type: "image/svg+xml",
				sizes: "any",
			},
		],
	},
};

/**
 * Root layout component - wraps all pages in the application.
 *
 * Sets up the HTML structure with proper fonts, header, and main content area.
 * Uses a flexbox layout with minimum full viewport height.
 *
 * @param children - Child components rendered within the layout
 * @returns Root HTML structure with header and main content
 *
 * @example
 * ```tsx
 * <RootLayout>
 *   <PageContent />
 * </RootLayout>
 * ```
 */
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${fonts} flex flex-col min-h-screen antialiased`}>
				<ViewTransition>
					<Header />
					<main className="flex-1 mt-24 p-6 bg-linear-to-b from-slate-200 to-slate-100">
						{children}
					</main>
					<Footer />
				</ViewTransition>
			</body>
		</html>
	);
}
