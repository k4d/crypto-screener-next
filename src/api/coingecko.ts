import type { z } from "zod";
import { ZodError } from "zod";
import type {
	CryptoDetail,
	CryptoHistory,
	CryptoListResponse,
	CryptoOHLCResponse,
	CryptoSearchResult,
	TrendingResponse,
} from "@/types/crypto";
import {
	CryptoDetailSchema,
	CryptoHistorySchema,
	CryptoListResponseSchema,
	CryptoOHLCResponseSchema,
	CryptoSearchResultsSchema,
	TrendingResponseSchema,
} from "@/types/crypto";

const API_KEY = process.env.COINGECKO_API_KEY;
const BASE_URL = process.env.BASE_API_URL || "https://api.coingecko.com/api/v3";

/**
 * Error class for API-related errors.
 * Thrown when the CoinGecko API returns an error response.
 */
export class ApiError extends Error {
	constructor(
		/** HTTP status code from the API response */
		public status: number,
		/** Error message from the API */
		public message: string,
	) {
		super(message);
		this.name = "ApiError";
	}
}

/**
 * Error class for Zod validation errors.
 * Thrown when API response data fails schema validation.
 */
export class ValidationError extends Error {
	constructor(
		/** Field path that failed validation */
		public field: string,
		/** Validation error message */
		public message: string,
	) {
		super(message);
		this.name = "ValidationError";
	}
}

/**
 * Get default headers with API key for CoinGecko requests.
 * @returns Headers object with Accept and API key
 */
function getHeaders(): HeadersInit {
	const headers: HeadersInit = {
		Accept: "application/json",
	};

	if (!API_KEY) {
		console.warn(
			"COINGECKO_API_KEY is not set. Using CoinGecko API without a key may lead to rate limiting.",
		);
	} else {
		headers["x-cg-demo-api-key"] = API_KEY;
	}

	return headers;
}

/**
 * Handle API response errors and validate data with Zod schema.
 * @param response - Fetch API response object
 * @param schema - Zod schema to validate response data
 * @returns Validated and parsed data
 * @throws {ApiError} If response is not OK
 * @throws {ValidationError} If data fails schema validation
 */
async function handleResponse<T>(
	response: Response,
	schema: z.ZodSchema<T>, // Use the generic type T here
): Promise<T> {
	if (!response.ok) {
		let errorPayload: { message?: string } = {};
		try {
			// Attempt to parse JSON error response
			errorPayload = await response.json();
		} catch (parseError) {
			console.error("Failed to parse JSON error response:", parseError);
			// If parsing fails, use statusText as the message
			errorPayload.message = response.statusText || "Unknown API error";
		}
		// Throw ApiError with status and message
		throw new ApiError(
			response.status,
			errorPayload?.message ?? response.statusText,
		);
	}

	const data = await response.json();

	try {
		// Use the provided schema to parse and validate data
		return schema.parse(data);
	} catch (error) {
		if (error instanceof ZodError) {
			console.error("Validation error:", error.issues);
			// Extract the first issue path and message for ValidationError
			throw new ValidationError(
				error.issues[0]?.path.join(".") || "unknown",
				error.issues[0]?.message || "Invalid response format",
			);
		}
		// Re-throw any other unexpected errors
		throw error;
	}
}

/**
 * Fetch list of cryptocurrencies with market data from CoinGecko.
 * @param currency - Currency to display prices in (default: "usd")
 * @param limit - Number of cryptocurrencies to fetch (default: 100)
 * @returns Array of cryptocurrency data with market metrics
 * @throws {ApiError} If API request fails
 * @throws {ValidationError} If response data is invalid
 *
 * @example
 * ```tsx
 * const cryptos = await getCryptoList("usd", 50);
 * ```
 */
export async function getCryptoList(
	currency = "usd",
	limit = 100,
): Promise<CryptoListResponse> {
	const url = `${BASE_URL}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`;

	try {
		const response = await fetch(url, {
			headers: getHeaders(),
			next: { revalidate: 60 },
		});

		return handleResponse(response, CryptoListResponseSchema);
	} catch (error) {
		console.error("getCryptoList error:", error);
		if (error instanceof ApiError || error instanceof ValidationError) {
			throw error;
		}
		throw new ApiError(500, "Failed to fetch cryptocurrency list");
	}
}

/**
 * Search for cryptocurrencies by name or symbol.
 * @param query - Search query string (cryptocurrency name or symbol)
 * @returns Array of search results with basic coin info
 * @throws {ApiError} If API request fails
 * @throws {ValidationError} If response data is invalid
 *
 * @example
 * ```tsx
 * const results = await searchCrypto("bitcoin");
 * ```
 */
export async function searchCrypto(
	query: string,
): Promise<CryptoSearchResult[]> {
	if (!query.trim()) {
		return [];
	}

	const url = `${BASE_URL}/coins/search?query=${encodeURIComponent(query)}`;

	try {
		const response = await fetch(url, {
			headers: getHeaders(),
		});

		return handleResponse(response, CryptoSearchResultsSchema);
	} catch (error) {
		console.error("searchCrypto error:", error);
		if (error instanceof ApiError || error instanceof ValidationError) {
			throw error;
		}
		throw new ApiError(500, "Failed to search cryptocurrencies");
	}
}

/**
 * Fetches multiple cryptocurrencies by their IDs in a single request from CoinGecko.
 * Utilizes the `/coins/markets` endpoint with the `ids` parameter.
 *
 * This function includes several robustness improvements:
 * - Deduplicates the input `ids` array to prevent redundant queries.
 * - Performs URL encoding on `currency` and `ids` parameters for safety and correctness.
 * - Returns an empty array immediately if the input `ids` list is empty, avoiding unnecessary API calls.
 *
 * @param ids - An array of CoinGecko cryptocurrency IDs (e.g., ["bitcoin", "ethereum"]). Duplicates are handled.
 * @param currency - The currency to display prices in (default: "usd").
 * @returns A promise that resolves to an array of cryptocurrency data with market metrics (`CryptoListResponse`).
 * @throws {ApiError} If the API request itself fails (e.g., network issues, invalid API key).
 * @throws {ValidationError} If the data received from the API does not conform to the expected schema.
 *
 * @example
 * ```tsx
 * const coins = await getCryptosByIds(["bitcoin", "solana"]);
 * ```
 */
export async function getCryptosByIds(
	ids: string[],
	currency = "usd",
): Promise<CryptoListResponse> {
	const uniqueIds = [...new Set(ids)];

	if (uniqueIds.length === 0) {
		return [];
	}

	const url = `${BASE_URL}/coins/markets?vs_currency=${encodeURIComponent(currency)}&ids=${encodeURIComponent(uniqueIds.join(","))}&order=market_cap_desc&sparkline=false`;

	try {
		const response = await fetch(url, {
			headers: getHeaders(),
			next: { revalidate: 300 },
		});

		return handleResponse(response, CryptoListResponseSchema);
	} catch (error) {
		console.error("getCryptosByIds error:", error);
		if (error instanceof ApiError || error instanceof ValidationError) {
			throw error;
		}
		throw new ApiError(500, "Failed to fetch cryptocurrencies");
	}
}

/**
 * Get detailed information about a specific cryptocurrency.
 * @param id - CoinGecko cryptocurrency ID (e.g., "bitcoin", "ethereum")
 * @returns Cryptocurrency data with full market metrics
 * @throws {ApiError} If API request fails
 * @throws {ValidationError} If response data is invalid
 *
 * @example
 * ```tsx
 * const bitcoin = await getCryptoById("bitcoin");
 * ```
 */
export async function getCryptoById(id: string): Promise<CryptoDetail> {
	const url = `${BASE_URL}/coins/${id}`;

	try {
		const response = await fetch(url, {
			headers: getHeaders(),
			next: { revalidate: 300 },
		});

		return handleResponse(response, CryptoDetailSchema);
	} catch (error) {
		console.error("getCryptoById error:", error);
		if (error instanceof ApiError || error instanceof ValidationError) {
			throw error;
		}
		throw new ApiError(500, `Failed to fetch cryptocurrency: ${id}`);
	}
}

/**
 * Get cryptocurrency price history from CoinGecko.
 * @param id - CoinGecko cryptocurrency ID (e.g., "bitcoin")
 * @param days - Number of days of history (default: 30)
 * @param currency - Currency for prices (default: "usd")
 * @returns Price history data with timestamps
 * @throws {ApiError} If API request fails
 * @throws {ValidationError} If response data is invalid
 *
 * @example
 * ```tsx
 * const history = await getCryptoHistory("bitcoin", 7, "usd");
 * ```
 */
export async function getCryptoHistory(
	id: string,
	days = 30,
	currency = "usd",
): Promise<CryptoHistory> {
	const url = `${BASE_URL}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;

	try {
		const response = await fetch(url, {
			headers: getHeaders(),
			next: { revalidate: 300 },
		});

		return handleResponse(response, CryptoHistorySchema);
	} catch (error) {
		console.error("getCryptoHistory error:", error);
		if (error instanceof ApiError || error instanceof ValidationError) {
			throw error;
		}
		throw new ApiError(500, `Failed to fetch price history for: ${id}`);
	}
}

/**
 * Get cryptocurrency OHLC (Open, High, Low, Close) data from CoinGecko.
 * @param id - CoinGecko cryptocurrency ID (e.g., "bitcoin")
 * @param days - Number of days of history (default: 30)
 * @returns OHLC data array for candlestick charts
 * @throws {ApiError} If API request fails
 * @throws {ValidationError} If response data is invalid
 *
 * @example
 * ```tsx
 * const ohlc = await getCryptoOHLC("bitcoin", 30);
 * ```
 */
export async function getCryptoOHLC(
	id: string,
	days = 30,
): Promise<CryptoOHLCResponse> {
	const url = `${BASE_URL}/coins/${id}/ohlc?vs_currency=usd&days=${days}`;

	try {
		const response = await fetch(url, {
			headers: getHeaders(),
			next: { revalidate: 300 },
		});

		return handleResponse(response, CryptoOHLCResponseSchema);
	} catch (error) {
		console.error("getCryptoOHLC error:", error);
		if (error instanceof ApiError || error instanceof ValidationError) {
			throw error;
		}
		throw new ApiError(500, `Failed to fetch OHLC data for: ${id}`);
	}
}

/**
 * Get trending search cryptocurrencies from CoinGecko.
 * @returns Trending cryptocurrencies and other trending items
 * @throws {ApiError} If API request fails
 * @throws {ValidationError} If response data is invalid
 *
 * @example
 * ```tsx
 * const trending = await getTrendingSearches();
 * console.log(trending.coins); // Access coins directly
 * ```
 */
export async function getTrendingSearches(): Promise<TrendingResponse> {
	const url = `${BASE_URL}/search/trending`;

	try {
		const response = await fetch(url, {
			headers: getHeaders(),
			next: { revalidate: 600 }, // Cache for 10 minutes as per CoinGecko docs
		});

		// Use the updated TrendingResponseSchema for validation
		return handleResponse(response, TrendingResponseSchema);
	} catch (error) {
		console.error("getTrendingSearches error:", error);
		// Re-throw specific errors or a generic one
		if (error instanceof ApiError || error instanceof ValidationError) {
			throw error;
		}
		throw new ApiError(500, "Failed to fetch trending searches");
	}
}
