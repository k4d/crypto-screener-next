"use client";

import { Button, Card } from "@heroui/react";
import { RefreshCw } from "lucide-react";
import { useEffect } from "react";

interface ErrorPageProps {
	/** The error object that caused the crash */
	error: Error & { digest?: string };
	/** Function to reset the error state and attempt re-rendering */
	reset: () => void;
}

/**
 * Global Error Boundary component for the application.
 *
 * Catches rendering errors in the app route segment and displays a user-friendly
 * fallback UI with the error details and a button to reset the component state.
 *
 * @param props - Component props
 * @param props.error - The error object that caused the crash
 * @param props.reset - Function to reset the error state and attempt re-rendering
 */
export default function ErrorPage({ error, reset }: ErrorPageProps) {
	useEffect(() => {
		console.error("App Error:", error);
	}, [error]);

	return (
		<div className="flex flex-1 items-center justify-center">
			<Card
				variant="default"
				className="w-full max-w-md flex flex-col items-center space-y-2 rounded-xl bg-linear-to-br from-slate-50 to-white border-t border-l border-white shadow-xs"
			>
				<Card.Header className="text-center space-y-2">
					<Card.Title className="text-2xl font-bold text-gray-800 tracking-tight">
						An unexpected error occurred
					</Card.Title>
					<Card.Description className="font-light text-sm text-gray-600">
						{error.message}
					</Card.Description>
				</Card.Header>
				<Card.Footer>
					<Button variant="outline" onPress={() => reset()}>
						<RefreshCw size={16} className="text-blue-500" />
						Try again
					</Button>
				</Card.Footer>
			</Card>
		</div>
	);
}
