import { describe, expect, it, spyOn } from "bun:test";
import {
	ApiError,
	getCryptoById,
	getCryptoHistory,
	getCryptoList,
	getTrendingSearches,
	searchCrypto,
	ValidationError,
} from "./coingecko";

// Mock data
const mockCryptoDataForList = {
	id: "bitcoin",
	symbol: "btc",
	name: "Bitcoin",
	image: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png",
	current_price: 63022.79,
	market_cap: 1234567890,
	market_cap_rank: 1,
	fully_diluted_valuation: null,
	total_volume: 123456789,
	high_24h: 64000,
	low_24h: 62000,
	price_change_24h: 1000,
	price_change_percentage_24h: 1.5,
	market_cap_change_24h: 10000000,
	market_cap_change_percentage_24h: 0.8,
	circulating_supply: 19000000,
	total_supply: 21000000,
	max_supply: 21000000,
	ath: 69000,
	ath_change_percentage: -8.5,
	ath_date: "2021-11-10T14:24:11.849Z",
	atl: 67.81,
	atl_change_percentage: 92800,
	atl_date: "2013-07-06T00:00:00.000Z",
	last_updated: "2024-01-01T00:00:00.000Z",
};

const mockCryptoDataForDetail = {
	...mockCryptoDataForList,
	image: {
		thumb: "https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png",
		small: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png",
		large: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
	},
	description: {
		en: "Bitcoin is a decentralized digital currency.",
	},
	links: {
		homepage: ["https://bitcoin.org"],
		blockchain_site: [],
		official_forum_url: [],
		chat_url: [],
		announcement_url: [],
		twitter_screen_name: "bitcoin",
		facebook_username: "",
		repos_url: {
			github: ["https://github.com/bitcoin/bitcoin"],
		},
	},
};

const mockSearchData = [
	{
		id: "bitcoin",
		name: "Bitcoin",
		symbol: "btc",
		market_cap_rank: 1,
		thumb: "https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png",
		small: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png",
		large: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
	},
];

const mockHistoryData = {
	prices: [
		[1704067200000, 42000],
		[1704153600000, 43000],
		[1704240000000, 44000],
	] as [number, number][],
};

const mockTrendingResponseData = {
	coins: [
		{
			item: {
				id: "bitcoin",
				coin_id: 1,
				name: "Bitcoin",
				symbol: "btc",
				market_cap_rank: 1,
				thumb: "https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png",
				small: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png",
				large: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
				slug: "bitcoin",
				price_btc: 1,
				score: 0,
				data: {
					price: 60000,
					price_btc: "1",
					price_change_percentage_24h: { usd: 1.5 },
					market_cap: "$1T",
					market_cap_btc: "1M",
					total_volume: "$10B",
					total_volume_btc: "100K",
					sparkline: "some_svg_url",
					content: {
						title: "Bitcoin (BTC)",
						description: "Digital gold",
					},
				},
			},
		},
		{
			item: {
				id: "ethereum",
				coin_id: 2,
				name: "Ethereum",
				symbol: "eth",
				market_cap_rank: 2,
				thumb:
					"https://assets.coingecko.com/coins/images/279/thumb/ethereum.png",
				small:
					"https://assets.coingecko.com/coins/images/279/small/ethereum.png",
				large:
					"https://assets.coingecko.com/coins/images/279/large/ethereum.png",
				slug: "ethereum",
				price_btc: 0.05,
				score: 1,
				data: {
					price: 3000,
					price_btc: "0.05",
					price_change_percentage_24h: { usd: 2.0 },
					market_cap: "$300B",
					market_cap_btc: "50K",
					total_volume: "$5B",
					total_volume_btc: "80K",
					sparkline: "some_eth_svg_url",
					content: null,
				},
			},
		},
	],
	nfts: [],
	categories: [],
};

/**
 * Creates a mock fetch response for successful API calls
 */
function createMockResponse(data: unknown): Response {
	return {
		ok: true,
		status: 200,
		statusText: "OK",
		json: () => Promise.resolve(data),
		headers: new Headers(),
	} as Response;
}

/**
 * Creates a mock fetch response for API errors
 */
function createMockErrorResponse(
	status: number,
	statusText: string,
	message?: string,
): Response {
	return {
		ok: false,
		status,
		statusText,
		json: () => Promise.resolve({ message: message || statusText }),
		headers: new Headers(),
	} as Response;
}

describe("CoinGecko API", () => {
	describe("getCryptoList", () => {
		it("should fetch cryptocurrency list successfully", async () => {
			const fetchSpy = spyOn(global, "fetch").mockImplementation(
				() =>
					// biome-ignore lint/suspicious/noExplicitAny: Mocking fetch requires type assertion
					Promise.resolve(createMockResponse([mockCryptoDataForList])) as any,
			);

			const result = await getCryptoList("usd", 1);

			expect(result).toHaveLength(1);
			expect(result[0].id).toBe("bitcoin");
			expect(result[0].symbol).toBe("btc");

			fetchSpy.mockRestore();
		});

		it("should use default parameters", async () => {
			const fetchSpy = spyOn(global, "fetch").mockImplementation(
				() =>
					// biome-ignore lint/suspicious/noExplicitAny: Mocking fetch requires type assertion
					Promise.resolve(createMockResponse([mockCryptoDataForList])) as any,
			);

			await getCryptoList();

			expect(fetchSpy).toHaveBeenCalledWith(
				expect.stringContaining(
					"/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100",
				),
				expect.any(Object),
			);

			fetchSpy.mockRestore();
		});

		it("should throw ApiError on API error", async () => {
			spyOn(global, "fetch").mockImplementation(
				// biome-ignore lint/suspicious/noExplicitAny: Mocking fetch requires type assertion
				() => Promise.resolve(createMockErrorResponse(404, "Not Found")) as any,
			);

			await expect(getCryptoList()).rejects.toThrow(ApiError);
			await expect(getCryptoList()).rejects.toHaveProperty("status", 404);
		});

		it("should throw ValidationError on invalid data", async () => {
			spyOn(global, "fetch").mockImplementation(
				// biome-ignore lint/suspicious/noExplicitAny: Mocking fetch requires type assertion
				() => Promise.resolve(createMockResponse([{ id: "bitcoin" }])) as any,
			);

			await expect(getCryptoList()).rejects.toThrow(ValidationError);
		});

		it("should throw ValidationError for negative price", async () => {
			const invalidData = [
				{
					...mockCryptoDataForList,
					current_price: -100,
				},
			];
			spyOn(global, "fetch").mockImplementation(
				// biome-ignore lint/suspicious/noExplicitAny: Mocking fetch requires type assertion
				() => Promise.resolve(createMockResponse(invalidData)) as any,
			);

			await expect(getCryptoList()).rejects.toThrow(ValidationError);
		});
	});

	describe("searchCrypto", () => {
		it("should search cryptocurrencies successfully", async () => {
			spyOn(global, "fetch").mockImplementation(
				// biome-ignore lint/suspicious/noExplicitAny: Mocking fetch requires type assertion
				() => Promise.resolve(createMockResponse(mockSearchData)) as any,
			);

			const result = await searchCrypto("bitcoin");

			expect(result).toHaveLength(1);
			expect(result[0].id).toBe("bitcoin");
			expect(result[0].symbol).toBe("btc");
		});

		it("should return empty array for empty query", async () => {
			const result = await searchCrypto("");
			expect(result).toEqual([]);
		});

		it("should return empty array for whitespace query", async () => {
			const result = await searchCrypto("   ");
			expect(result).toEqual([]);
		});

		it("should encode query parameter", async () => {
			const fetchSpy = spyOn(global, "fetch").mockImplementation(
				// biome-ignore lint/suspicious/noExplicitAny: Mocking fetch requires type assertion
				() => Promise.resolve(createMockResponse(mockSearchData)) as any,
			);

			await searchCrypto("bitcoin cash");

			expect(fetchSpy).toHaveBeenCalledWith(
				expect.stringContaining("query=bitcoin%20cash"),
				expect.any(Object),
			);

			fetchSpy.mockRestore();
		});

		it("should throw ApiError on API error", async () => {
			spyOn(global, "fetch").mockImplementation(
				() =>
					Promise.resolve(
						createMockErrorResponse(500, "Internal Server Error"),
						// biome-ignore lint/suspicious/noExplicitAny: Mocking fetch requires type assertion
					) as any,
			);

			await expect(searchCrypto("bitcoin")).rejects.toThrow(ApiError);
		});
	});

	describe("getCryptoById", () => {
		it("should fetch cryptocurrency by ID successfully", async () => {
			spyOn(global, "fetch").mockImplementation(
				() =>
					// biome-ignore lint/suspicious/noExplicitAny: Mocking fetch requires type assertion
					Promise.resolve(createMockResponse(mockCryptoDataForDetail)) as any,
			);

			const result = await getCryptoById("bitcoin");

			expect(result.id).toBe("bitcoin");
			expect(result.name).toBe("Bitcoin");
			expect(result.symbol).toBe("btc");
		});

		it("should use correct revalidate time", async () => {
			const fetchSpy = spyOn(global, "fetch").mockImplementation(
				() =>
					// biome-ignore lint/suspicious/noExplicitAny: Mocking fetch requires type assertion
					Promise.resolve(createMockResponse(mockCryptoDataForDetail)) as any,
			);

			await getCryptoById("bitcoin");

			expect(fetchSpy).toHaveBeenCalledWith(
				expect.stringContaining("/coins/bitcoin"),
				expect.objectContaining({
					next: { revalidate: 300 },
				}),
			);

			fetchSpy.mockRestore();
		});

		it("should throw ApiError on API error", async () => {
			spyOn(global, "fetch").mockImplementation(
				() =>
					Promise.resolve(
						createMockErrorResponse(404, "Coin not found"),
						// biome-ignore lint/suspicious/noExplicitAny: Mocking fetch requires type assertion
					) as any,
			);

			await expect(getCryptoById("unknown")).rejects.toThrow(ApiError);
			await expect(getCryptoById("unknown")).rejects.toHaveProperty(
				"status",
				404,
			);
		});

		it("should include coin ID in error message", async () => {
			spyOn(global, "fetch").mockImplementation(
				() =>
					Promise.resolve(
						createMockErrorResponse(
							404,
							"Not Found",
							"Coin 'bitcoin' not found",
						),
						// biome-ignore lint/suspicious/noExplicitAny: Mocking fetch requires type assertion
					) as any,
			);

			try {
				await getCryptoById("bitcoin");
			} catch (error) {
				expect((error as ApiError).message).toContain("bitcoin");
			}
		});
	});

	describe("getCryptoHistory", () => {
		it("should fetch price history successfully", async () => {
			spyOn(global, "fetch").mockImplementation(
				// biome-ignore lint/suspicious/noExplicitAny: Mocking fetch requires type assertion
				() => Promise.resolve(createMockResponse(mockHistoryData)) as any,
			);

			const result = await getCryptoHistory("bitcoin", 7, "usd");

			expect(result.prices).toHaveLength(3);
			expect(result.prices[0]).toEqual([1704067200000, 42000]);
		});

		it("should use default parameters", async () => {
			const fetchSpy = spyOn(global, "fetch").mockImplementation(
				// biome-ignore lint/suspicious/noExplicitAny: Mocking fetch requires type assertion
				() => Promise.resolve(createMockResponse(mockHistoryData)) as any,
			);

			await getCryptoHistory("bitcoin");

			expect(fetchSpy).toHaveBeenCalledWith(
				expect.stringContaining("days=30"),
				expect.any(Object),
			);

			fetchSpy.mockRestore();
		});

		it("should use default currency USD", async () => {
			const fetchSpy = spyOn(global, "fetch").mockImplementation(
				// biome-ignore lint/suspicious/noExplicitAny: Mocking fetch requires type assertion
				() => Promise.resolve(createMockResponse(mockHistoryData)) as any,
			);

			await getCryptoHistory("bitcoin", 7);

			expect(fetchSpy).toHaveBeenCalledWith(
				expect.stringContaining("vs_currency=usd"),
				expect.any(Object),
			);

			fetchSpy.mockRestore();
		});

		it("should throw ApiError on API error", async () => {
			spyOn(global, "fetch").mockImplementation(
				() =>
					Promise.resolve(
						createMockErrorResponse(404, "Coin not found"),
						// biome-ignore lint/suspicious/noExplicitAny: Mocking fetch requires type assertion
					) as any,
			);

			await expect(getCryptoHistory("unknown")).rejects.toThrow(ApiError);
		});

		it("should throw ValidationError on invalid history format", async () => {
			spyOn(global, "fetch").mockImplementation(
				// biome-ignore lint/suspicious/noExplicitAny: Mocking fetch requires type assertion
				() => Promise.resolve(createMockResponse({ prices: "invalid" })) as any,
			);

			await expect(getCryptoHistory("bitcoin")).rejects.toThrow(
				ValidationError,
			);
		});
	});

	describe("getTrendingSearches", () => {
		it("should fetch trending searches successfully", async () => {
			spyOn(global, "fetch").mockImplementation(
				() =>
					// biome-ignore lint/suspicious/noExplicitAny: Mocking fetch requires type assertion
					Promise.resolve(createMockResponse(mockTrendingResponseData)) as any,
			);

			const result = await getTrendingSearches();

			expect(result.coins).toHaveLength(2);
			expect(result.coins[0].item.id).toBe("bitcoin");
			expect(result.coins[1].item.name).toBe("Ethereum");
		});

		it("should throw ApiError on API error", async () => {
			spyOn(global, "fetch").mockImplementation(() =>
				Promise.resolve(
					createMockErrorResponse(403, "Forbidden", "Rate limit exceeded"),
				),
			);

			await expect(getTrendingSearches()).rejects.toThrow(ApiError);
			await expect(getTrendingSearches()).rejects.toHaveProperty("status", 403);
			await expect(getTrendingSearches()).rejects.toHaveProperty(
				"message",
				"Rate limit exceeded",
			);
		});

		it("should throw ValidationError on invalid data", async () => {
			spyOn(global, "fetch").mockImplementation(
				// biome-ignore lint/suspicious/noExplicitAny: Mocking fetch requires type assertion
				() => Promise.resolve(createMockResponse({ coins: "invalid" })) as any,
			);

			await expect(getTrendingSearches()).rejects.toThrow(ValidationError);
		});

		it("should throw ApiError for network failure", async () => {
			spyOn(global, "fetch").mockImplementation(
				// biome-ignore lint/suspicious/noExplicitAny: Mocking fetch requires type assertion
				() => Promise.reject(new TypeError("Failed to fetch")) as any,
			);

			await expect(getTrendingSearches()).rejects.toThrow(ApiError);
			await expect(getTrendingSearches()).rejects.toHaveProperty(
				"message",
				"Failed to fetch trending searches",
			);
		});

		it("should log error and throw ApiError if json parsing fails on API error", async () => {
			const consoleErrorSpy = spyOn(console, "error");
			spyOn(global, "fetch").mockImplementation(() =>
				Promise.resolve({
					ok: false,
					status: 500,
					statusText: "Internal Server Error",
					json: () => Promise.reject(new Error("Malformed JSON")),
				}),
			);

			await expect(getTrendingSearches()).rejects.toThrow(ApiError);
			await expect(getTrendingSearches()).rejects.toHaveProperty(
				"message",
				"Internal Server Error", // Should fall back to statusText
			);
			expect(consoleErrorSpy).toHaveBeenCalledWith(
				"Failed to parse JSON error response:",
				expect.any(Error),
			);
			consoleErrorSpy.mockRestore();
		});
	});

	describe("handleResponse validation", () => {
		it("should validate URL fields", async () => {
			const invalidData = [
				{
					...mockCryptoDataForList,
					image: "not-a-url",
				},
			];
			spyOn(global, "fetch").mockImplementation(
				// biome-ignore lint/suspicious/noExplicitAny: Mocking fetch requires type assertion
				() => Promise.resolve(createMockResponse(invalidData)) as any,
			);

			await expect(getCryptoList()).rejects.toThrow(ValidationError);
		});

		it("should validate positive numbers", async () => {
			const invalidData = [
				{
					...mockCryptoDataForList,
					current_price: 0,
				},
			];
			spyOn(global, "fetch").mockImplementation(
				// biome-ignore lint/suspicious/noExplicitAny: Mocking fetch requires type assertion
				() => Promise.resolve(createMockResponse(invalidData)) as any,
			);

			await expect(getCryptoList()).rejects.toThrow(ValidationError);
		});

		it("should validate non-negative numbers", async () => {
			const invalidData = [
				{
					...mockCryptoDataForList,
					market_cap: -1,
				},
			];
			spyOn(global, "fetch").mockImplementation(
				// biome-ignore lint/suspicious/noExplicitAny: Mocking fetch requires type assertion
				() => Promise.resolve(createMockResponse(invalidData)) as any,
			);

			await expect(getCryptoList()).rejects.toThrow(ValidationError);
		});

		it("should allow nullable fields", async () => {
			const validData = [
				{
					...mockCryptoDataForList,
					fully_diluted_valuation: null,
					total_supply: null,
					max_supply: null,
				},
			];
			spyOn(global, "fetch").mockImplementation(
				// biome-ignore lint/suspicious/noExplicitAny: Mocking fetch requires type assertion
				() => Promise.resolve(createMockResponse(validData)) as any,
			);

			const result = await getCryptoList();
			expect(result[0].fully_diluted_valuation).toBeNull();
		});

		it("should validate market_cap_rank as positive integer", async () => {
			const invalidData = [
				{
					...mockCryptoDataForList,
					market_cap_rank: 1.5,
				},
			];
			spyOn(global, "fetch").mockImplementation(
				// biome-ignore lint/suspicious/noExplicitAny: Mocking fetch requires type assertion
				() => Promise.resolve(createMockResponse(invalidData)) as any,
			);

			await expect(getCryptoList()).rejects.toThrow(ValidationError);
		});
	});
});
