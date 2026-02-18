import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

/**
 * Inter font configuration.
 * Used for UI text and headings.
 */
const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
});

/**
 * Geist Sans font configuration.
 * Modern sans-serif font for body text.
 */
const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

/**
 * Geist Mono font configuration.
 * Monospace font for code blocks.
 */
const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
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
	const className = `${inter.variable} ${geistSans.variable} ${geistMono.variable}`;

	return (
		<html lang="en">
			<body className={`${className} flex flex-col min-h-screen antialiased`}>
				<Header />
				<main className="pt-24 flex-1">{children}</main>
				<Footer />
			</body>
		</html>
	);
}
