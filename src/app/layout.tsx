import type { Metadata } from "next";
import { RootLayout } from "@/layouts";

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

export default RootLayout;
