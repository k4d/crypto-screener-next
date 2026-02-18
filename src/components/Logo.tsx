"use client";

import { Square3Stack3DIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export const Logo = () => {
	return (
		<Link href="/" className="flex items-center gap-2 font-bold">
			<Square3Stack3DIcon className="h-6 w-6 text-blue-800" />
			<span className="font-extrabold text-base  text-gray-800 dark:text-gray-200">
				Crypto Screener
			</span>
		</Link>
	);
};
