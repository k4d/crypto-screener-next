import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import Header from "@/components/Header"; // Import the Header component

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
});

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Crypto Screener",
	description:
		"Crypto Screener is a web application that allows users to screen cryptocurrencies based on various criteria such as market capitalization, price, volume, and more.",
};

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
				<main className="pt-24">{children}</main>
			</body>
		</html>
	);
}
