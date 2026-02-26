import "./globals.css";
import type { Metadata } from "next";
import { DM_Mono, DM_Sans, Manrope } from "next/font/google";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

/**
 * Manrope font configuration.
 * Modern sans-serif font with excellent readability for numbers.
 * Used for body text and UI elements.
 */
const manrope = Manrope({
	variable: "--font-manrope",
	subsets: ["latin"],
});

/**
 * DM Sans font configuration.
 * Modern sans-serif font for headings.
 */
const dmSans = DM_Sans({
	variable: "--font-dm-sans",
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
});

/**
 * DM Mono font configuration.
 * Monospace font for code and data display.
 */
const dmMono = DM_Mono({
	variable: "--font-dm-mono",
	subsets: ["latin"],
	weight: ["400", "500"],
});

/**
 * Application metadata for SEO and page metadata.
 */
export const metadata: Metadata = {
	title: "Crypto Screener",
	description:
		"Crypto Screener is a web application that allows users to screen cryptocurrencies based on various criteria such as market capitalization, price, volume, and more.",
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
	const className = `${manrope.variable} ${dmSans.variable} ${dmMono.variable}`;

	return (
		<html lang="en">
			<body className={`${className} flex flex-col min-h-screen antialiased`}>
				<Header />
				<main className="mt-24 flex-1 px-6 py-8">{children}</main>
				<Footer />
			</body>
		</html>
	);
}
