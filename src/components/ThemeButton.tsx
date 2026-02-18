"use client";

import { SunIcon } from "@heroicons/react/24/outline";
import { Button } from "@heroui/react";

export const ThemeButton = () => {
	return (
		<Button isIconOnly variant="outline" aria-label="Toggle theme">
			<SunIcon className="h-6 w-6" />
		</Button>
	);
};
