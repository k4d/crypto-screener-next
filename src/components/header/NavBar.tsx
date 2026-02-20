"use client";

import { Button } from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SearchButton } from "./SearchButton";
import SearchModal from "./SearchModal";
import { ThemeButton } from "./ThemeButton";

interface NavBarItems {
	label: string;
	href: string;
}

const navBarItems: NavBarItems[] = [
	{
		label: "Dashboard",
		href: "/",
	},
	{
		label: "Coins",
		href: "/coins",
	},
];

/**
 * NavBar component - navigation menu in the header.
 *
 * Contains search button, dashboard link, coins list link, and theme toggle button.
 * Displays on the right side of the header with active state highlighting.
 *
 * @example
 * ```tsx
 * <NavBar />
 * ```
 */
export const NavBar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const pathname = usePathname();

	const isActive = (path: string) => pathname === path;

	return (
		<nav className="flex items-center gap-x-2">
			{navBarItems.map((item) => (
				<Link key={item.href} href={item.href} className="focus:outline-none">
					<Button
						variant={isActive(item.href) ? "primary" : "ghost"}
						aria-label={item.label}
						className="focus:outline-none focus:ring-0 focus:ring-offset-0 data-focus-visible:outline-none data-focus-visible:ring-0"
					>
						{item.label}
					</Button>
				</Link>
			))}
			<SearchButton onPress={() => setIsOpen(true)} />
			<SearchModal isOpen={isOpen} onOpenChange={setIsOpen} />
			<ThemeButton />
		</nav>
	);
};
