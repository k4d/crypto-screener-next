"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Button, InputGroup, Modal, TextField } from "@heroui/react";

interface SearchModalProps {
	isOpen: boolean;
	onOpenChange: (isOpen: boolean) => void;
}

/**
 * SearchModal component - displays a modal for searching cryptocurrencies.
 *
 * Features a blurred backdrop, top placement, and a text field with search icon.
 * Closes via close trigger (X button), backdrop click, or ESC key.
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
	return (
		<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
			<Modal.Backdrop variant="blur">
				<Modal.Container placement="top" size="lg">
					<Modal.Dialog>
						<Modal.Header>
							<Modal.Heading>Search Cryptocurrencies</Modal.Heading>
							<Modal.CloseTrigger />
						</Modal.Header>
						<Modal.Body>
							<TextField className="w-full" name="search">
								<InputGroup>
									<InputGroup.Prefix>
										<MagnifyingGlassIcon className="h-4 w-4" />
									</InputGroup.Prefix>
									<InputGroup.Input
										className="w-full"
										placeholder="Search Cryptocurrencies"
									/>
								</InputGroup>
							</TextField>
						</Modal.Body>
						<Modal.Footer>
							<Button variant="primary">Search</Button>
						</Modal.Footer>
					</Modal.Dialog>
				</Modal.Container>
			</Modal.Backdrop>
		</Modal>
	);
}
