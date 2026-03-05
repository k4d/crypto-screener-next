import "@/styles/globals.css";
import { ViewTransition } from "react";
import { fonts } from "@/components/Fonts";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

/**
 * Root layout props interface.
 */
interface RootLayoutProps {
	/** Child components rendered within the layout */
	children: React.ReactNode;
}

/**
 * Root layout component - wraps all pages in the application.
 *
 * Sets up the HTML structure with proper fonts, header, and main content area.
 * Uses a flexbox layout with minimum full viewport height.
 * Includes ViewTransition for smooth page animations.
 *
 * @param props - Component props
 * @param props.children - Child components rendered within the layout
 * @returns Root HTML structure with header, main content area, and footer
 *
 * @example
 * ```tsx
 * <RootLayout>
 *   <PageContent />
 * </RootLayout>
 * ```
 */
export function RootLayout({ children }: RootLayoutProps) {
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

export default RootLayout;
