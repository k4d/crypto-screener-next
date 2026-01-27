import Link from "next/link";
import type React from "react";

interface HeaderProps {
	className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
	return (
		<header className={`w-full text-white p-4 shadow-md ${className}`}>
			<div className="container mx-auto flex justify-between items-center">
				<Link href="/" className="font-bold">
					Crypto Screener
				</Link>
				<nav>
					{/* Navigation links will go here */}
					<ul className="flex space-x-4">
						<li>
							<Link href="/about" className="hover:underline">
								About
							</Link>
						</li>
						<li>
							<Link href="/contact" className="hover:underline">
								Contact
							</Link>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
};

export default Header;
