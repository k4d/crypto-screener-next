import { Button, Card } from "@heroui/react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

/**
 * Not Found (404) page component.
 *
 * Displayed when a user navigates to a route that does not exist
 * or when `notFound()` is called within a route segment.
 *
 * Automatically rendered by Next.js within the root layout.
 */
export default function NotFound() {
	return (
		<div className="flex flex-1 items-center justify-center p-6">
			<Card
				variant="default"
				className="w-full max-w-md flex flex-col items-center space-y-2 rounded-xl bg-linear-to-br from-slate-50 to-white border-t border-l border-white shadow-xs"
			>
				<Card.Header className="text-center space-y-2">
					<h3 className="text-6xl font-black text-gray-300 tracking-tight">
						404
					</h3>
					<Card.Title className="text-2xl font-bold text-gray-800 tracking-tight">
						Page not found
					</Card.Title>
					<Card.Description className="font-light text-sm text-gray-600">
						The page you are looking for doesn't exist or has been moved.
					</Card.Description>
				</Card.Header>
				<Card.Footer>
					<Link href="/">
						<Button variant="outline">
							<ArrowLeft size={16} className="text-blue-500" />
							Go back home
						</Button>
					</Link>
				</Card.Footer>
			</Card>
		</div>
	);
}
