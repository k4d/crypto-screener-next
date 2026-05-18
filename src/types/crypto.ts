import { z } from "zod";

/**
 * Zod schema for a single cryptocurrency from CoinGecko API.
 * Validates and parses cryptocurrency market data with full metrics.
 */
export const CryptoSchema = z.object({
	/** Unique identifier for the cryptocurrency (e.g., "bitcoin", "ethereum") */
	id: z.string(),
	/** Symbol of the cryptocurrency in lowercase (e.g., "btc", "eth") */
	symbol: z.string().toLowerCase(),
	/** Full name of the cryptocurrency (e.g., "Bitcoin", "Ethereum") */
	name: z.string(),
	/** URL to the cryptocurrency logo image */
	image: z.url(),
	/** Current price in the specified currency (must be positive) */
	current_price: z.number().positive().nullable(),
	/** Market capitalization in USD (must be non-negative) */
	market_cap: z.number().nonnegative(),
	/** Market cap rank (must be a positive integer) */
	market_cap_rank: z.number().int().positive().nullable(),
	/** Fully diluted valuation in USD (null if not available) */
	fully_diluted_valuation: z.number().nullable(),
	/** Total trading volume in the last 24 hours (must be non-negative) */
	total_volume: z.number().nonnegative(),
	/** Highest price in the last 24 hours (null if not available) */
	high_24h: z.number().positive().nullable(),
	/** Lowest price in the last 24 hours (null if not available) */
	low_24h: z.number().positive().nullable(),
	/** Price change in the last 24 hours (null if not available) */
	price_change_24h: z.number().nullable(),
	/** Price change percentage in the last 24 hours (null if not available) */
	price_change_percentage_24h: z.number().nullable(),
	/** Market cap change in the last 24 hours (null if not available) */
	market_cap_change_24h: z.number().nullable(),
	/** Market cap change percentage in the last 24 hours (null if not available) */
	market_cap_change_percentage_24h: z.number().nullable(),
	/** Circulating supply (must be non-negative) */
	circulating_supply: z.number().nonnegative(),
	/** Total supply (null if not available) */
	total_supply: z.number().nullable(),
	/** Maximum supply (null if unlimited) */
	max_supply: z.number().nullable(),
	/** All-time high price (must be positive) */
	ath: z.number().positive(),
	/** All-time high change percentage */
	ath_change_percentage: z.number(),
	/** All-time high date (ISO 8601 string) */
	ath_date: z.string(),
	/** All-time low price (must be positive) */
	atl: z.number().positive(),
	/** All-time low change percentage */
	atl_change_percentage: z.number(),
	/** All-time low date (ISO 8601 string) */
	atl_date: z.string(),
	/** Last updated timestamp (ISO 8601 string) */
	last_updated: z.string(),
});

/**
 * Represents a single trending cryptocurrency found in CoinGecko's search results.
 * Note: This schema reflects the structure *within* the `item` object of the API response.
 */
export const TrendingCoinDataSchema = z.object({
	id: z.string(),
	coin_id: z.number(), // Added from API documentation
	name: z.string(),
	symbol: z.string().toLowerCase(),
	market_cap_rank: z.number().int().nullable(), // API docs confirm this can be null
	thumb: z.url(),
	small: z.url(),
	large: z.url(), // Added from API documentation
	slug: z.string(), // Added from API documentation
	price_btc: z.number(), // Added from API documentation
	score: z.number(), // Added from API documentation
	data: z.object({
		price: z.number(), // API returns this as number
		price_btc: z.string(), // API returns this as string
		price_change_percentage_24h: z.record(z.string(), z.number()), // API returns object with many currencies
		market_cap: z.string(), // API returns formatted string (e.g., "$1,234,567")
		market_cap_btc: z.string(), // API returns formatted string
		total_volume: z.string(), // API returns formatted string
		total_volume_btc: z.string(), // API returns formatted string
		sparkline: z.string(), // Added from API documentation (SVG URL)
		content: z
			.object({
				// API docs show this can be null
				title: z.string(),
				description: z.string(),
			})
			.nullable(),
	}),
});

/**
 * Zod schema for the trending search results response from CoinGecko API.
 * Contains lists of trending coins, NFTs, and categories.
 * Adjusted to match the actual API response structure.
 */
export const TrendingResponseSchema = z
	.object({
		coins: z.array(z.object({ item: TrendingCoinDataSchema })), // API returns coins as array of objects containing 'item'
		nfts: z.array(z.any()).optional(), // Make fields optional as per documentation
		categories: z.array(z.any()).optional(), // Make fields optional as per documentation
	})
	.catchall(z.any()); // Use catchall to allow any other unexpected fields

/**
 * Zod schema for cryptocurrency list response from CoinGecko API.
 * Array of cryptocurrency data with market metrics.
 */
export const CryptoListResponseSchema = z.array(CryptoSchema);

/**
 * Zod schema for a single cryptocurrency search result from CoinGecko API.
 * Contains basic information for search suggestions.
 */
export const CryptoSearchResultSchema = z.object({
	/** Unique identifier for the cryptocurrency */
	id: z.string(),
	/** Full name of the cryptocurrency */
	name: z.string(),
	/** Symbol of the cryptocurrency in lowercase */
	symbol: z.string().toLowerCase(),
	/** Market cap rank (must be a positive integer) */
	market_cap_rank: z.number().int().positive().nullable(),
	/** Thumbnail image URL (100x100) */
	thumb: z.url(),
	/** Small image URL (250x250) */
	small: z.url(),
	/** Large image URL (300x300) */
	large: z.url(),
});

/**
 * Zod schema for cryptocurrency search results response.
 * Wraps the actual results array in a `coins` field as returned by the API.
 */
export const CryptoSearchResultsSchema = z.object({
	coins: z.array(CryptoSearchResultSchema),
});

/**
 * Zod schema for cryptocurrency price history response.
 * Contains historical price data as timestamp-price pairs.
 */
export const CryptoHistorySchema = z.object({
	/** Array of [timestamp, price] pairs representing price history */
	prices: z.array(z.tuple([z.number(), z.number()])),
});

/**
 * Zod schema for cryptocurrency OHLC (Open, High, Low, Close) response.
 * Returns an array of [timestamp, open, high, low, close] tuples.
 */
export const CryptoOHLCResponseSchema = z.array(
	z.tuple([
		z.number(), // timestamp
		z.number(), // open
		z.number(), // high
		z.number(), // low
		z.number(), // close
	]),
);

/**
 * TypeScript types inferred from Zod schemas.
 * These types are automatically generated and stay in sync with schemas.
 */

/** Cryptocurrency data with full market metrics */
export type Crypto = z.infer<typeof CryptoSchema>;

/** Array of cryptocurrency data */
export type CryptoListResponse = z.infer<typeof CryptoListResponseSchema>;

/** Single search result with basic coin info */
export type CryptoSearchResult = z.infer<typeof CryptoSearchResultSchema>;

/** Price history data with timestamps */
export type CryptoHistory = z.infer<typeof CryptoHistorySchema>;

/** OHLC data array for candlestick charts */
export type CryptoOHLCResponse = z.infer<typeof CryptoOHLCResponseSchema>;

/** Single trending coin item's core data */
export type TrendingCoinData = z.infer<typeof TrendingCoinDataSchema>;

/** Flattened trending coin item, useful for frontend tables */
export type TrendingCoinItem = TrendingCoinData; // Alias for clarity, refers to the data within 'item'

/** Trending search results response */
export type TrendingResponse = z.infer<typeof TrendingResponseSchema>;

/**
 * Zod schema for detailed cryptocurrency data from CoinGecko API.
 * Extends CryptoSchema with additional fields returned by the /coins/{id} endpoint,
 * such as description and links.
 * Uses .catchall(z.any()) to allow any other unspecified fields from the API.
 */
export const CryptoDetailSchema = CryptoSchema.omit({ image: true })
	.extend({
		image: z.object({
			thumb: z.url(),
			small: z.url(),
			large: z.url(),
		}),
		description: z.object({
			en: z.string().optional(),
		}),
		links: z.object({
			homepage: z.array(z.string()).optional(),
			blockchain_site: z.array(z.string()).optional(),
			official_forum_url: z.array(z.string()).optional(),
			chat_url: z.array(z.string()).optional(),
			announcement_url: z.array(z.string()).optional(),
			twitter_screen_name: z.string().optional(),
			facebook_username: z.string().optional(),
			repos_url: z
				.object({
					github: z.array(z.string()).optional(),
				})
				.optional(),
		}),
	})
	.catchall(z.any());

/** Detailed cryptocurrency data type including all fields from /coins/{id} endpoint */
export type CryptoDetail = z.infer<typeof CryptoDetailSchema>;

/**
 * Standardized data structure for a single item in a crypto list.
 * This interface is used by the generic CryptoListItem component.
 */
export interface CoinListItemData {
	id: string;
	name: string;
	symbol: string;
	image: string;
	rank?: number;
	price?: number;
	priceChange?: number;
}
