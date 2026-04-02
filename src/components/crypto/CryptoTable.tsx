import { Table } from "@/components/ui";
import type { Crypto } from "@/types/crypto";

interface CryptoTableProps {
	/** Additional CSS classes */
	className?: string;
	/** Array of cryptocurrency data */
	coins: Crypto[];
}

export const CryptoTable = ({ className, coins }: CryptoTableProps) => {
	// Format data for Table component
	const cryptoData = coins.map((coin) => [
		coin.name,
		`$${coin.current_price.toLocaleString()}`,
		coin.total_volume >= 1e9
			? `$${(coin.total_volume / 1e9).toFixed(2)}B`
			: `$${(coin.total_volume / 1e6).toFixed(2)}M`,
		coin.market_cap >= 1e9
			? `$${(coin.market_cap / 1e9).toFixed(2)}B`
			: `$${(coin.market_cap / 1e6).toFixed(2)}M`,
		coin.price_change_percentage_24h !== null
			? `${coin.price_change_percentage_24h >= 0 ? "+" : ""}${coin.price_change_percentage_24h.toFixed(2)}%`
			: "N/A",
	]);

	// Calculate total market cap
	const totalMarketCap = coins.reduce((sum, coin) => sum + coin.market_cap, 0);
	const formattedTotalMarketCap =
		totalMarketCap >= 1e12
			? `$${(totalMarketCap / 1e12).toFixed(2)}T`
			: `$${(totalMarketCap / 1e9).toFixed(2)}B`;

	return (
		<div className={`w-full ${className || ""}`}>
			<h2 className="text-2xl font-bold text-gray-800">Cryptocurrency List</h2>
			<p className="font-light text-sm text-gray-600">
				Top cryptocurrencies by market capitalization
			</p>

			{/* Hybrid Mode: Custom Footer */}
			<Table
				headers={["Name", "Price", "Volume (24h)", "Market Cap", "24h Change"]}
				rows={cryptoData}
				striped
				hoverable
				className="mt-8"
				emptyContent="No cryptocurrencies available"
			>
				<Table.Footer colSpan={5}>
					<div className="flex font-bold text-sm">
						<span>Total Market Cap:</span>
						<span className="text-green-600 ml-1">
							{formattedTotalMarketCap}
						</span>
					</div>
				</Table.Footer>
			</Table>
		</div>
	);
};

export default CryptoTable;
