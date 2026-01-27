import type React from "react";

interface CryptoTableProps {
	className?: string;
}

const CryptoTable: React.FC<CryptoTableProps> = ({ className }) => {
	return (
		<div className={`w-full ${className}`}>
			<h2 className="text-2xl font-semibold mb-4">Cryptocurrency List</h2>
			<p className="text-lg text-zinc-600 dark:text-zinc-400">
				This is where the cryptocurrency table will be displayed.
			</p>
			{/* Placeholder for table */}
			<div className="mt-8 p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg">
				<p className="text-zinc-500 dark:text-zinc-500">
					Table content coming soon...
				</p>
			</div>
		</div>
	);
};

export default CryptoTable;
