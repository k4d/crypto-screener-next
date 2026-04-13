"use client";

import {
	Button,
	CloseButton,
	Kbd,
	Modal,
	SearchField,
	Surface,
} from "@heroui/react";
import { useRef, useState } from "react";
import { cn } from "@/utils/cn";

interface SearchModalProps {
	isOpen: boolean;
	onOpenChange: (isOpen: boolean) => void;
}

interface QuickSearchItem {
	type: "button" | "text";
	label: string;
}

const quickSearchItems: QuickSearchItem[] = [
	{ type: "text", label: "Try searching:" },
	{ type: "button", label: "Bitcoin" },
	{ type: "button", label: "Ethereum" },
	{ type: "text", label: "or" },
	{ type: "button", label: "XRP" },
];

/**
 * SearchModal component - displays a modal for searching cryptocurrencies.
 *
 * Features a search field with clear button and quick access buttons.
 * Closes via close trigger, backdrop click, or ESC key.
 *
 * @param isOpen - Whether the modal is open
 * @param onOpenChange - Callback when open state changes
 *
 * @example
 * ```tsx
 * <SearchModal isOpen={isOpen} onOpenChange={setIsOpen} />
 * ```
 */
export default function SearchModal({
	isOpen,
	onOpenChange,
}: SearchModalProps) {
	const [value, setValue] = useState("");
	const [activeButton, setActiveButton] = useState<string | null>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	const handleOpenChange = (open: boolean) => {
		if (!open) {
			setValue("");
			setActiveButton(null); // Reset active button when closing
		}
		onOpenChange(open);
	};

	// Handle Enter key press
	const handleSearch = () => {
		if (value) {
			console.log(`🔍 Searching for: "${value}"`);
			// TODO: Implement real search logic here
			handleOpenChange(false); // Close the modal
		}
	};

	return (
		<Modal isOpen={isOpen} onOpenChange={handleOpenChange}>
			<Modal.Backdrop variant="blur">
				<Modal.Container placement="center" size="lg">
					<Modal.Dialog className="rounded-xl">
						<Modal.Body className="p-2">
							<SearchField fullWidth name="search" aria-label="Search coins">
								<SearchField.Group className="rounded-md">
									<SearchField.SearchIcon />
									<SearchField.Input
										ref={inputRef}
										placeholder="Search coins..."
										value={value}
										autoFocus
										onChange={(e) => setValue(e.target.value)}
										onKeyDown={(e) => {
											if (e.key === "Enter") {
												handleSearch();
											}
										}}
									/>
									{value && (
										<CloseButton
											onPress={() => {
												setValue("");
												setActiveButton(null);
											}}
											aria-label="Clear search"
										/>
									)}
									<Kbd
										className={cn(
											"ml-1 mr-2 p-1 text-xs cursor-pointer",
											"border border-zinc-300 rounded",
										)}
										onClick={() => handleOpenChange(false)}
									>
										<Kbd.Content>Esc</Kbd.Content>
									</Kbd>
								</SearchField.Group>
							</SearchField>
							<Surface variant="default" className="mt-1 p-4 text-center">
								<p className="text-zinc-600 font-light text-sm">
									{value
										? `Press Enter to search "${value}"`
										: "No recent searches"}
								</p>
							</Surface>
						</Modal.Body>
						<Modal.Footer className="justify-start gap-2">
							{quickSearchItems.map((item) =>
								item.type === "button" ? (
									<Button
										key={item.label}
										variant="tertiary"
										size="sm"
										className={cn(
											"h-8 px-4 text-xs border",
											activeButton === item.label
												? "bg-sky-100 text-sky-700 border-sky-300"
												: "border-transparent",
										)}
										onPress={() => {
											setValue(item.label);
											setActiveButton(item.label);
											// Return focus to input after button click
											inputRef.current?.focus();
										}}
									>
										{item.label}
									</Button>
								) : (
									<span
										key={item.label}
										className="text-zinc-600 font-light text-sm"
									>
										{item.label}
									</span>
								),
							)}
						</Modal.Footer>
					</Modal.Dialog>
				</Modal.Container>
			</Modal.Backdrop>
		</Modal>
	);
}
