import { Button } from "@heroui/react";

export const TimeFrameButtons = () => {
	interface TimeFrameButton {
		label: string;
		variant: "primary" | "outline";
	}

	const timeFrameButtons: TimeFrameButton[] = [
		{ label: "5m", variant: "outline" },
		{ label: "30m", variant: "primary" },
		{ label: "1h", variant: "outline" },
		{ label: "4h", variant: "outline" },
		{ label: "1d", variant: "outline" },
	];

	const buttonClass = "h-6 min-h-6 text-xs px-2";

	return (
		<>
			{timeFrameButtons.map((button) => (
				<Button
					key={button.label}
					variant={button.variant}
					className={buttonClass}
				>
					{button.label}
				</Button>
			))}
		</>
	);
};
