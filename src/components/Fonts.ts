import { DM_Mono, DM_Sans, Manrope } from "next/font/google";

/**
 * Manrope font configuration.
 * Modern sans-serif font with excellent readability for numbers.
 * Used for body text and UI elements.
 */
export const manrope = Manrope({
	variable: "--font-manrope",
	subsets: ["latin"],
});

/**
 * DM Sans font configuration.
 * Modern sans-serif font for headings.
 */
export const dmSans = DM_Sans({
	variable: "--font-dm-sans",
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
});

/**
 * DM Mono font configuration.
 * Monospace font for code and data display.
 */
export const dmMono = DM_Mono({
	variable: "--font-dm-mono",
	subsets: ["latin"],
	weight: ["400", "500"],
});

/**
 * Combined font variables for use in layout.
 */
export const fonts = `${manrope.variable} ${dmSans.variable} ${dmMono.variable}`;
