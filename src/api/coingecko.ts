import { ZodError, z } from "zod";
import type {
	Crypto,
	CryptoHistory,
	CryptoListResponse,
	CryptoOHLCResponse,
	CryptoSearchResult,
} from "@/types/crypto";
import {
	CryptoHistorySchema,
	CryptoListResponseSchema,
	CryptoOHLCResponseSchema,
	CryptoSchema,
	CryptoSearchResultsSchema,
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
	return {
		Accept: "application/json",
		"x-cg-demo-api-key": API_KEY || "",
	};
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
	schema: unknown,
): Promise<T> {
	if (!response.ok) {
		const error = await response
			.json()
			.catch(() => ({ message: "Unknown error" }));
		throw new ApiError(response.status, error.message || response.statusText);
	}

	const data = await response.json();

	try {
		// biome-ignore lint/suspicious/noExplicitAny: Zod v4 type compatibility
		const result = await z.parse(schema as any, data);
		return result;
	} catch (error) {
		if (error instanceof ZodError) {
			console.error("Validation error:", error.issues);
			throw new ValidationError(
				error.issues[0]?.path.join(".") || "unknown",
				error.issues[0]?.message || "Invalid response format",
			);
		}
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
export async function getCryptoById(id: string): Promise<Crypto> {
	const url = `${BASE_URL}/coins/${id}`;

	try {
		const response = await fetch(url, {
			headers: getHeaders(),
			next: { revalidate: 300 },
		});

		return handleResponse(response, CryptoSchema);
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
