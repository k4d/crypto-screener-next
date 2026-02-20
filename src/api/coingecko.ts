import type {
	Crypto,
	CryptoListResponse,
	CryptoSearchResult,
} from "@/types/crypto";

const API_KEY = process.env.COINGECKO_API_KEY;
const BASE_URL = process.env.BASE_API_URL || "https://api.coingecko.com/api/v3";

/**
 * Error class for API-related errors.
 */
export class ApiError extends Error {
	constructor(
		public status: number,
		public message: string,
	) {
		super(message);
		this.name = "ApiError";
	}
}

/**
 * Get default headers with API key.
 */
function getHeaders(): HeadersInit {
	return {
		Accept: "application/json",
		"x-cg-demo-api-key": API_KEY || "",
	};
}

/**
 * Handle API response errors.
 */
async function handleResponse<T>(response: Response): Promise<T> {
	if (!response.ok) {
		const error = await response
			.json()
			.catch(() => ({ message: "Unknown error" }));
		throw new ApiError(response.status, error.message || response.statusText);
	}
	return response.json();
}

/**
 * Fetch list of cryptocurrencies with market data.
 *
 * @param currency - Currency to display prices in (default: "usd")
 * @param limit - Number of cryptocurrencies to fetch (default: 100)
 * @returns Array of cryptocurrency data
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
			next: { revalidate: 60 }, // Revalidate every 60 seconds
		});

		return handleResponse<CryptoListResponse>(response);
	} catch (error) {
		if (error instanceof ApiError) {
			throw error;
		}
		throw new ApiError(500, "Failed to fetch cryptocurrency list");
	}
}

/**
 * Search for cryptocurrencies by name or symbol.
 *
 * @param query - Search query string
 * @returns Array of search results
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

		return handleResponse<CryptoSearchResult[]>(response);
	} catch (error) {
		if (error instanceof ApiError) {
			throw error;
		}
		throw new ApiError(500, "Failed to search cryptocurrencies");
	}
}

/**
 * Get detailed information about a specific cryptocurrency.
 *
 * @param id - Cryptocurrency ID (e.g., "bitcoin")
 * @returns Cryptocurrency data
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
			next: { revalidate: 300 }, // Revalidate every 5 minutes
		});

		return handleResponse<Crypto>(response);
	} catch (error) {
		if (error instanceof ApiError) {
			throw error;
		}
		throw new ApiError(500, `Failed to fetch cryptocurrency: ${id}`);
	}
}

/**
 * Get cryptocurrency price history.
 *
 * @param id - Cryptocurrency ID (e.g., "bitcoin")
 * @param days - Number of days of history (default: 30)
 * @param currency - Currency for prices (default: "usd")
 * @returns Price history data
 *
 * @example
 * ```tsx
 * const history = await getCryptoHistory("bitcoin", 7);
 * ```
 */
export async function getCryptoHistory(
	id: string,
	days = 30,
	currency = "usd",
): Promise<{ prices: [number, number][] }> {
	const url = `${BASE_URL}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;

	try {
		const response = await fetch(url, {
			headers: getHeaders(),
			next: { revalidate: 300 }, // Revalidate every 5 minutes
		});

		return handleResponse<{ prices: [number, number][] }>(response);
	} catch (error) {
		if (error instanceof ApiError) {
			throw error;
		}
		throw new ApiError(500, `Failed to fetch price history for: ${id}`);
	}
}
