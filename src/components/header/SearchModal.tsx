"use client";

import {
	Button,
	CloseButton,
	Kbd,
	Modal,
	SearchField,
	Surface,
} from "@heroui/react";
import { useState } from "react";

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

	const handleOpenChange = (open: boolean) => {
		if (!open) {
			setValue(""); // Clear search when closing
		}
		onOpenChange(open);
	};

	return (
		<Modal isOpen={isOpen} onOpenChange={handleOpenChange}>
			<Modal.Backdrop variant="blur">
				<Modal.Container placement="center" size="lg">
					<Modal.Dialog>
						<Modal.Body className="p-2">
							<SearchField fullWidth name="search">
								<SearchField.Group>
									<SearchField.SearchIcon />
									<SearchField.Input
										placeholder="Search coins..."
										value={value}
										onChange={(e) => setValue(e.target.value)}
									/>
									{value && <CloseButton onPress={() => setValue("")} />}
									<Kbd
										className="ml-1 mr-2 p-1 text-xs cursor-pointer"
										onClick={() => handleOpenChange(false)}
									>
										<Kbd.Content>Esc</Kbd.Content>
									</Kbd>
								</SearchField.Group>
							</SearchField>
							<Surface variant="default" className="mt-1 p-4 text-center">
								<p className="text-zinc-600 font-light text-sm">
									{value ? `Searching: "${value}"` : "No recent searches"}
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
										onPress={() => setValue(item.label)}
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
