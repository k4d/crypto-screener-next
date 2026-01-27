import CryptoTable from "@/components/CryptoTable";

export default function Home() {
	return (
		<div className="container mx-auto p-4 sm:p-6 md:p-8">
			<div className="flex flex-col items-center gap-4 text-center sm:items-start sm:text-left mb-8">
				<h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
					Hello, Crypto Screener!
				</h1>
				<p className="text-lg leading-8 text-zinc-600 dark:text-zinc-400 font-light">
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
