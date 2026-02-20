/**
 * Cryptocurrency data interface from CoinGecko API.
 */
export interface Crypto {
	/** Unique identifier for the cryptocurrency */
	id: string;

	/** Symbol of the cryptocurrency (e.g., "btc") */
	symbol: string;

	/** Full name of the cryptocurrency (e.g., "Bitcoin") */
	name: string;

	/** Image URL for the cryptocurrency logo */
	image: string;

	/** Current price in USD */
	current_price: number;

	/** Market capitalization in USD */
	market_cap: number;

	/** Market cap rank */
	market_cap_rank: number;

	/** Fully diluted valuation in USD */
	fully_diluted_valuation: number | null;

	/** Total trading volume in 24h */
	total_volume: number;

	/** Highest price in 24h */
	high_24h: number;

	/** Lowest price in 24h */
	low_24h: number;

	/** Price change in 24h */
	price_change_24h: number;

	/** Price change percentage in 24h */
	price_change_percentage_24h: number;

	/** Market cap change in 24h */
	market_cap_change_24h: number;

	/** Market cap change percentage in 24h */
	market_cap_change_percentage_24h: number;

	/** Circulating supply */
	circulating_supply: number;

	/** Total supply */
	total_supply: number | null;

	/** Maximum supply */
	max_supply: number | null;

	/** All-time high price */
	ath: number;

	/** All-time high change percentage */
	ath_change_percentage: number;

	/** All-time high date */
	ath_date: string;

	/** All-time low price */
	atl: number;

	/** All-time low change percentage */
	atl_change_percentage: number;

	/** All-time low date */
	atl_date: string;

	/** Last updated timestamp */
	last_updated: string;
}

/**
 * API response type for cryptocurrency list.
 */
export type CryptoListResponse = Crypto[];

/**
 * Search result interface.
 */
export interface CryptoSearchResult {
	id: string;
	name: string;
	symbol: string;
	market_cap_rank: number;
	thumb: string;
	small: string;
	large: string;
}
