# 🔍 КОД РЕВЬЮ — crypto-screener-next

## 📊 ОБЩЕЕ РЕЗЮМЕ

Проект **crypto-screener-next** — это хорошо организованное приложение для отслеживания криптовалют. Архитектура чистая, типизация строгая (TypeScript + Zod), тестовое покрытие приличное. Найдено **8 критических и рекомендационных замечаний**.

---

## ✅ СИЛЬНЫЕ СТОРОНЫ

1. **Типизация и валидация** — Zod схемы отлично защищают от невалидных API данных
2. **Модульная архитектура** — компоненты хорошо разделены по функциям
3. **Error handling** — кастомные классы `ApiError` и `ValidationError` упрощают обработку ошибок
4. **Git hooks** — настроены pre-commit hooks через Husky для качества кода
5. **Документация** — подробный README и структурированная папка `/docs`
6. **Тестирование** — используется Bun Test + React Testing Library

---

## 🔴 КРИТИЧЕСКИЕ ПРОБЛЕМЫ

### 1. Утечка API Key в продакшене

**Файл:** `src/api/coingecko.ts`, строка 59

```typescript
function getHeaders(): HeadersInit {
	return {
		Accept: "application/json",
		"x-cg-demo-api-key": API_KEY || "", // ⚠️ ПРОБЛЕМА: пустая строка отправляется в заголовок
	};
}
```

**Проблема:** Если `COINGECKO_API_KEY` не установлен, отправляется пустая строка в заголовок. Это не критично для free плана CoinGecko, но плохо для безопасности. Плюс, с пустым ключом запросы могут быть заблокированы в будущем.

**Рекомендация:**

```typescript
function getHeaders(): HeadersInit {
	const headers: HeadersInit = {
		Accept: "application/json",
	};

	if (API_KEY) {
		headers["x-cg-demo-api-key"] = API_KEY;
	}

	return headers;
}
```

---

### 2. Проблема с типизацией в `handleResponse`

**Файл:** `src/api/coingecko.ts`, строка 86

```typescript
try {
	// biome-ignore lint/suspicious/noExplicitAny: Zod v4 type compatibility
	const result = await z.parse(schema as any, data);
	return result;
}
```

**Проблема:** Использование `as any` опасно. Это скрывает реальные проблемы типизации и может привести к런-таймовым ошибкам.

**Рекомендация:**

```typescript
try {
	const result = (schema as z.ZodSchema).parse(data);
	return result as T;
}
```

---

### 3. Некорректная обработка ошибок в `searchCrypto`

**Файл:** `src/api/coingecko.ts`, строка 150-152

```typescript
export async function searchCrypto(
	query: string,
): Promise<CryptoSearchResult[]> {
	if (!query.trim()) {
		return [];
	}
```

**Проблема:** Функция возвращает **пустой массив** для пустого запроса, но этот case не покрыт тестами явно. Из-за этого в компонентах может быть неопределённое поведение.

**Рекомендация:** Добавить явный тест и документировать это поведение в JSDoc.

---

## 🟡 СЕРЬЁЗНЫЕ ЗАМЕЧАНИЯ

### 4. Неправильная обработка данных в `page.tsx`

**Файл:** `src/app/page.tsx`, строка 56-64

```typescript
const chartData: CandlestickData[] = ohlcData
	.map((candle) => ({
		time: Math.floor(candle[0] / 1000) as Time,
		open: candle[1],
		high: candle[2],
		low: candle[3],
		close: candle[4],
	}))
	.sort((a, b) => (a.time as number) - (b.time as number));
```

**Проблема:** Зачем конвертировать миллисекунды в секунды, а потом типизировать как `number`? Lightweight Charts ожидает `Time` (число или строку), но в Lightweight Charts v5+ обычно используются миллисекунды.

**Рекомендация:**

```typescript
const chartData: CandlestickData[] = ohlcData
	.map((candle) => ({
		time: candle[0] as Time, // Оставить миллисекунды как есть
		open: candle[1],
		high: candle[2],
		low: candle[3],
		close: candle[4],
	}))
	.sort((a, b) => {
		const timeA = typeof a.time === "number" ? a.time : parseInt(a.time);
		const timeB = typeof b.time === "number" ? b.time : parseInt(b.time);
		return timeA - timeB;
	});
```

---

### 5. Magic numbers в `page.tsx`

**Файл:** `src/app/page.tsx`, строка 40-52

```typescript
const getCoins = await getCryptoList("usd", 10);
const selectedCoin = dataCoins[0];
const ohlcData = await getCryptoOHLC(selectedCoin.id, 30);
const ethOhlcData = await getCryptoOHLC("ethereum", 30);
const bnbOhlcData = await getCryptoOHLC("binancecoin", 30);
```

**Проблема:** Захардкодены значения: `10`, `30` дней, конкретные ID криптовалют (`ethereum`, `binancecoin`). Это плохо для гибкости и тестирования.

**Рекомендация:**

```typescript
const DAYS_HISTORY = 30;
const TOP_N_COINS = 10;
const COMPARISON_COINS = ["ethereum", "binancecoin"];

const getCoins = await getCryptoList("usd", TOP_N_COINS);
// ...rest of code
```

---

### 6. Отсутствие error boundaries в `page.tsx`

**Файл:** `src/app/page.tsx`, строка 40

**Проблема:** Если `getCryptoList` или `getCryptoOHLC` падают, весь dashboard упадёт без graceful fallback.

**Рекомендация:** Обёрнуть в Error Boundary компонент:

```typescript
export default async function DashboardPage() {
	try {
		const getCoins = await getCryptoList("usd", 10);
		// ...
	} catch (error) {
		return <ErrorComponent error={error} />;
	}
}
```

---

## 🟠 РЕКОМЕНДАЦИОННЫЕ ЗАМЕЧАНИЯ

### 7. Неправильное использование цены в `CryptoTable`

**Файл:** `src/components/crypto/CryptoTable.tsx`, строка 15

```typescript
const cryptoData = coins.map((coin) => [
	coin.name,
	`$${coin.current_price.toLocaleString()}`,
	coin.total_volume >= 1e9
		? `$${(coin.total_volume / 1e9).toFixed(2)}B`
		: `$${(coin.total_volume / 1e6).toFixed(2)}M`,
```

**Проблема:** Использование `toLocaleString()` без локали может вывести неправильный формат (разделители тысяч зависят от браузера). Для финансовых данных лучше использовать фиксированный формат.

**Рекомендация:**

```typescript
const formatPrice = (price: number) =>
	`$${price.toLocaleString('en-US', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	})}`;

const cryptoData = coins.map((coin) => [
	coin.name,
	formatPrice(coin.current_price),
	// ...
```

---

### 8. Отсутствие кэширования поиска в `SearchModal`

**Файл:** `src/components/header/SearchModal.tsx`, строка 63-68

```typescript
const handleSearch = () => {
	if (value) {
		console.log(`🔍 Searching for: "${value}"`);
		// TODO: Implement real search logic here
		handleOpenChange(false);
	}
};
```

**Проблема:** Поиск вообще не реализован, только console.log и закрытие модали.

**Рекомендация:**

```typescript
const handleSearch = async () => {
	if (!value) return;

	try {
		setIsLoading(true);
		const results = await searchCrypto(value);
		// Перенаправить на страницу с результатами
		window.location.href = `/search?q=${encodeURIComponent(value)}`;
	} catch (error) {
		console.error("Search error:", error);
		setError("Ошибка при поиске");
	} finally {
		setIsLoading(false);
	}
	handleOpenChange(false);
};
```

---

### 9. Валидация `market_cap_rank` — риск падения приложения

**Файл:** `src/types/crypto.ts`, схема `CryptoSchema`

**Проблема:** В схеме `CryptoSchema` поле `market_cap_rank` определено как `z.number().int().positive()`. Однако API CoinGecko часто возвращает `null` для монет с низким рейтингом или новых активов. Это приведет к ошибке валидации Zod и падению приложения при попытке обработать данные менее популярных криптовалют.

**Рекомендация:**

```typescript
market_cap_rank: z.number().int().positive().nullable(),
```

---

### 10. Несоответствие схемы `getCryptoById`

**Файл:** `src/api/coingecko.ts`, функция `getCryptoById`

**Проблема:** Функция использует `CryptoSchema` для валидации ответа эндпоинта `/coins/{id}`. Однако этот эндпоинт возвращает **гораздо больше данных** (описание, ссылки, сообщество, детальные рынки), чем `/coins/markets`. `CryptoSchema` содержит только поля для списка рынков. Если API вернет лишние поля, Zod (в строгом режиме) выбросит ошибку. Даже если использовать `.passthrough()`, тип `Crypto` не будет содержать полезных полей (например, `description`).

**Рекомендация:** Создать отдельную схему `CryptoDetailSchema` для детального просмотра, которая включает все поля `CryptoSchema` плюс новые поля (`description`, `links` и т.д.), и использовать её в `getCryptoById`.

```typescript
// В crypto.ts
const CryptoDetailSchema = CryptoSchema.extend({
	description: z.object({ en: z.string() }).optional(),
	links: z
		.object({
			/* ... */
		})
		.optional(),
}).passthrough(); // или strict()

export type CryptoDetail = z.infer<typeof CryptoDetailSchema>;
```

---

## 📋 ИТОГОВАЯ ТАБЛИЦА ЗАМЕЧАНИЙ

| №   | Проблема                                 | Уровень         | Файл              | Строка |
| --- | ---------------------------------------- | --------------- | ----------------- | ------ |
| 1   | Утечка API Key                           | 🔴 Критичная    | `coingecko.ts`    | 59     |
| 2   | Типизация `as any`                       | 🔴 Критичная    | `coingecko.ts`    | 86     |
| 3   | Не покрыто тестом поведение searchCrypto | 🟡 Серьёзная    | `coingecko.ts`    | 150    |
| 4   | Неправильная конвертация времени         | 🟡 Серьёзная    | `page.tsx`        | 58     |
| 5   | Magic numbers                            | 🟡 Серьёзная    | `page.tsx`        | 40-52  |
| 6   | Отсутствие error boundaries              | 🟡 Серьёзная    | `page.tsx`        | 40     |
| 7   | Неправильное форматирование цены         | 🟠 Рекомендация | `CryptoTable.tsx` | 15     |
| 8   | TODO в SearchModal не реализовано        | 🟠 Рекомендация | `SearchModal.tsx` | 66     |
| 9   | Валидация `market_cap_rank`              | 🔴 Критичная    | `crypto.ts`       | 18     |
| 10  | Несоответствие схемы `getCryptoById`     | 🟡 Серьёзная    | `coingecko.ts`    | ...    |

---

## 💡 ОБЩИЕ РЕКОМЕНДАЦИИ

1. **Добавить Sentry или аналог** для мониторинга ошибок в продакшене
2. **Больше интеграционных тестов** — сейчас есть unit тесты, но нет e2e
3. **Добавить React Query** или SWR для кэширования API запросов
4. **Типизировать env переменные** через Zod в отдельном файле
5. **Добавить rate limiting** для API запросов (CoinGecko имеет лимиты)

---

## ✨ ИТОГОВАЯ ОЦЕНКА

**8/10** — Проект на хорошем уровне, архитектура правильная, но есть несколько важных замечаний по безопасности и обработке ошибок. После исправления критических проблем качество поднимется до 9/10.

### Приоритет исправлений:

1. ⚠️ **Срочно** (Sprint 0):
    - Исправить утечку API Key (замечание 1)
    - Убрать `as any` в handleResponse (замечание 2)
    - Добавить error boundaries (замечание 6)

2. 🔄 **Скоро** (Sprint 1):
    - Извлечь magic numbers в константы (замечание 5)
    - Исправить форматирование цены (замечание 7)
    - Добавить тесты для searchCrypto (замечание 3)

3. 📅 **Потом** (Sprint 2):
    - Реализовать поиск в SearchModal (замечание 8)
    - Исправить конвертацию времени (замечание 4)
    - Создать `CryptoDetailSchema` (замечание 10)
    - Внедрить рекомендации по мониторингу и тестированию
