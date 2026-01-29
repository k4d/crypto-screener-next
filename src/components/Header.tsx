import { SunIcon } from "@heroicons/react/24/outline";
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
				<nav className="flex items-center space-x-4">
					<Button variant="outline">About</Button>
					<Button>Contact</Button>
					<Button isIconOnly variant="outline">
						<SunIcon className="h-6 w-6" />
					</Button>
				</nav>
			</div>
		</header>
	);
};

export default Header;
