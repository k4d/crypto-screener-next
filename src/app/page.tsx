import CryptoTable from "@/components/CryptoTable";

export default function Home() {
	return (
		<div className="container mx-auto p-4">
			<div className="mt-8 mb-16">
				<h1 className="text-3xl">Hello, Crypto Screener!</h1>
				<p className="text-lg text-zinc-600 font-light">
					Crypto Screener is a web application that allows users to screen
					cryptocurrencies based on various criteria such as market
					capitalization, price, volume, and more. It provides a user-friendly
					interface that enables users to easily search and filter
					cryptocurrencies, and view detailed information about each coin.
				</p>
			</div>
			<CryptoTable className="mt-8" />
		</div>
	);
}
