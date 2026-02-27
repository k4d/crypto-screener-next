"use client";

import { Logo } from "./Logo";
import { NavBar } from "./NavBar";

/**
 * Header component - fixed navigation bar at the top of the page.
 *
 * Contains the Logo on the left and HeaderNav on the right.
 * Features a backdrop blur effect and fixed positioning.
 *
 * @example
 * ```tsx
 * <Header />
 * ```
 */
export const Header = () => {
	return (
		<header className="w-full h-24 px-6 fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-white/80 backdrop-blur-md border-b shadow-xs">
			<Logo />
			<NavBar />
		</header>
	);
};

export default Header;
