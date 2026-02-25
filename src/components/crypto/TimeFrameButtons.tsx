import { Button } from "@heroui/react";

interface TimeFrameButtonsProps {
	/** Additional CSS classes */
	className?: string;
}

/**
 * TimeFrameButtons component displays a row of time frame selector buttons.
 *
 * Displays predefined time frames: 5m, 30m, 1h, 4h, 1d.
 * The 30m button is highlighted as primary by default.
 *
 * @example
 * ```tsx
 * <TimeFrameButtons />
 * <TimeFrameButtons className="ml-auto" />
 * ```
 */
export const TimeFrameButtons = ({ className }: TimeFrameButtonsProps) => {
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
		<div className={`flex gap-2 ${className || ""}`}>
			{timeFrameButtons.map((button) => (
				<Button
					key={button.label}
					variant={button.variant}
					className={buttonClass}
				>
					{button.label}
				</Button>
			))}
		</div>
	);
};
