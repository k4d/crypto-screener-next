import { Button } from "@heroui/react";
import Link from "next/link";
import type React from "react";

interface HeaderProps {
	className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
	return (
		<header className={`w-full p-4 shadow-md ${className}`}>
			<div className="container mx-auto flex justify-between items-center">
				<Link href="/" className="font-bold">
					Crypto Screener
				</Link>
				<nav className="flex space-x-2">
					<Button variant="outline">About</Button>
					<Button>Contact</Button>
				</nav>
			</div>
		</header>
	);
};

export default Header;
