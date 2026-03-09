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
	current_price: z.number().positive(),
	/** Market capitalization in USD (must be non-negative) */
	market_cap: z.number().nonnegative(),
	/** Market cap rank (must be a positive integer) */
	market_cap_rank: z.number().int().positive(),
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
	market_cap_rank: z.number().int().positive(),
	/** Thumbnail image URL (100x100) */
	thumb: z.url(),
	/** Small image URL (250x250) */
	small: z.url(),
	/** Large image URL (300x300) */
	large: z.url(),
});

/**
 * Zod schema for cryptocurrency search results array.
 * Multiple search results from CoinGecko search endpoint.
 */
export const CryptoSearchResultsSchema = z.array(CryptoSearchResultSchema);

/**
 * Zod schema for cryptocurrency price history response.
 * Contains historical price data as timestamp-price pairs.
 */
export const CryptoHistorySchema = z.object({
	/** Array of [timestamp, price] pairs representing price history */
	prices: z.array(z.tuple([z.number(), z.number()])),
});

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
