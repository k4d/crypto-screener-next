"use client";

import { HeaderNav } from "./HeaderNav";
import { Logo } from "./Logo";

export const Header = () => {
	return (
		<header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between w-full h-24 px-6 bg-white/80 backdrop-blur-md border-b">
			<Logo />
			<HeaderNav />
		</header>
	);
};

export default Header;
