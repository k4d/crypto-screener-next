# CoinGecko API Client

## 📖 Обзор

Клиент CoinGecko API предоставляет типобезопасный доступ к данным о криптовалютах из CoinGecko API v3.

---

## 🏗️ Архитектура

```
src/api/coingecko.ts
├── Классы ошибок
│   ├── ApiError           ← HTTP ошибки (4xx, 5xx)
│   └── ValidationError    ← Ошибки валидации Zod схем
├── Вспомогательные функции
│   ├── getHeaders()       ← Заголовки API с ключом
│   └── handleResponse()   ← Валидация ответа
└── API функции
    ├── getCryptoList()    ← Список криптовалют
    ├── searchCrypto()     ← Поиск по названию/символу
    ├── getCryptoById()    ← Детальная информация
    └── getCryptoHistory() ← История цен
```

---

## 🔧 Конфигурация

### Переменные окружения

```bash
# .env.local
COINGECKO_API_KEY=ваш_api_ключ    # Опционально (бесплатно без ключа)
BASE_API_URL=https://api.coingecko.com/api/v3
```

**Значения по умолчанию:**

- `COINGECKO_API_KEY`: `""` (работает без ключа, ограниченный лимит)
- `BASE_API_URL`: `"https://api.coingecko.com/api/v3"`

---

## 📚 API Функции

### 1. `getCryptoList(currency, limit)`

Получить список криптовалют с рыночными данными.

**Параметры:**

| Имя        | Тип      | По умолчанию | Описание                   |
| ---------- | -------- | ------------ | -------------------------- |
| `currency` | `string` | `"usd"`      | Валюта цен (usd, eur, gbp) |
| `limit`    | `number` | `100`        | Количество монет           |

**Возвращает:** `Promise<CryptoListResponse>` — Массив данных криптовалют

**Ошибки:** `ApiError`, `ValidationError`

**Пример:**

```tsx
// Server Component
export default async function Dashboard() {
	const cryptos = await getCryptoList("usd", 10);

	return (
		<div>
			{cryptos.map((crypto) => (
				<div key={crypto.id}>
					{crypto.name}: ${crypto.current_price}
				</div>
			))}
		</div>
	);
}
```

**Данные ответа:**

```typescript
{
  id: "bitcoin",
  symbol: "btc",
  name: "Bitcoin",
  current_price: 63022.79,
  market_cap: 1234567890,
  market_cap_rank: 1,
  price_change_percentage_24h: 2.5,  // Может быть null
  high_24h: 64000,                   // Может быть null
  low_24h: 62000,                    // Может быть null
  price_change_24h: 1000,            // Может быть null
  market_cap_change_24h: 10000000,   // Может быть null
  market_cap_change_percentage_24h: 0.8, // Может быть null
  fully_diluted_valuation: null,     // Может быть null
  total_supply: null,                // Может быть null
  max_supply: null,                  // Может быть null
  // ... ещё 20+ полей
}
```

**Примечание:** Некоторые поля могут быть `null` если данные недоступны (например, `high_24h`, `low_24h`, `price_change_24h`).

---

### 2. `searchCrypto(query)`

Поиск криптовалют по названию или символу.

**Параметры:**

| Имя     | Тип      | Описание                                      |
| ------- | -------- | --------------------------------------------- |
| `query` | `string` | Поисковый запрос (например, "bitcoin", "BTC") |

**Возвращает:** `Promise<CryptoSearchResult[]>` — Массив результатов поиска

**Ошибки:** `ApiError`, `ValidationError`

**Пример:**

```tsx
// SearchModal компонент
const handleSearch = async (query: string) => {
	try {
		const results = await searchCrypto(query);
		setResults(results);
	} catch (error) {
		if (error instanceof ApiError) {
			console.error("API ошибка:", error.status);
		}
	}
};
```

**Данные ответа:**

```typescript
{
  id: "bitcoin",
  name: "Bitcoin",
  symbol: "btc",
  market_cap_rank: 1,
  thumb: "https://.../thumb/bitcoin.png",
  small: "https://.../small/bitcoin.png",
  large: "https://.../large/bitcoin.png"
}
```

---

### 3. `getCryptoById(id)`

Получить детальную информацию о конкретной криптовалюте.

**Параметры:**

| Имя  | Тип      | Описание                                       |
| ---- | -------- | ---------------------------------------------- |
| `id` | `string` | CoinGecko ID (например, "bitcoin", "ethereum") |

**Возвращает:** `Promise<Crypto>` — Полные данные криптовалюты

**Ошибки:** `ApiError`, `ValidationError`

**Пример:**

```tsx
// /coins/[id]/page.tsx
export default async function CoinPage({ params }) {
	const coin = await getCryptoById(params.id);

	return (
		<div>
			<h1>{coin.name}</h1>
			<p>Market Cap: ${coin.market_cap.toLocaleString()}</p>
			<p>All Time High: ${coin.ath}</p>
		</div>
	);
}
```

---

### 4. `getCryptoHistory(id, days, currency)`

Получить историю цен криптовалюты.

**Параметры:**

| Имя        | Тип      | По умолчанию | Описание             |
| ---------- | -------- | ------------ | -------------------- |
| `id`       | `string` | —            | CoinGecko ID         |
| `days`     | `number` | `30`         | Дней истории (1-365) |
| `currency` | `string` | `"usd"`      | Валюта цен           |

**Возвращает:** `Promise<CryptoHistory>` — История цен с временными метками

**Ошибки:** `ApiError`, `ValidationError`

**Пример:**

```tsx
// Компонент графика цен
const history = await getCryptoHistory("bitcoin", 7, "usd");

// history.prices: [[timestamp, price], ...]
history.prices.map(([timestamp, price]) => ({
	time: timestamp / 1000, // Конвертация в секунды
	price,
}));
```

**Данные ответа:**

```typescript
{
	prices: [
		[1704067200000, 42000],
		[1704153600000, 43000],
		// ... больше пар [timestamp, price]
	];
}
```

---

## ⚠️ Обработка ошибок

### ApiError

Выбрасывается при ошибке API.

```typescript
try {
	const cryptos = await getCryptoList();
} catch (error) {
	if (error instanceof ApiError) {
		console.error("Статус:", error.status); // 404, 500, etc.
		console.error("Сообщение:", error.message);
	}
}
```

**Частые коды статуса:**

| Код   | Значение                |
| ----- | ----------------------- |
| `404` | Монета не найдена       |
| `429` | Превышен лимит запросов |
| `500` | Ошибка сервера          |
| `503` | Сервис недоступен       |

---

### ValidationError

Выбрасывается при провале валидации данных Zod схемой.

```typescript
try {
	const cryptos = await getCryptoList();
} catch (error) {
	if (error instanceof ValidationError) {
		console.error("Поле:", error.field); // например, "0.current_price"
		console.error("Сообщение:", error.message);
	}
}
```

**Частые причины:**

- CoinGecko изменил формат ответа API
- Отсутствуют обязательные поля
- Неверные типы данных

---

## 🔄 Кеширование и Реалидация

### Next.js ISR (Incremental Static Regeneration)

| Функция              | Реалидация | Описание                                  |
| -------------------- | ---------- | ----------------------------------------- |
| `getCryptoList()`    | `60 сек`   | Рыночные данные обновляются каждую минуту |
| `getCryptoById()`    | `300 сек`  | Детали монеты обновляются каждые 5 минут  |
| `getCryptoHistory()` | `300 сек`  | История обновляется каждые 5 минут        |
| `searchCrypto()`     | `нет`      | Не кешируется (пользовательский ввод)     |

**Пример:**

```tsx
// Данные кешируются на 60 секунд
const response = await fetch(url, {
	next: { revalidate: 60 },
});
```

---

## 🛡️ Zod Валидация

Все ответы валидируются Zod схемами перед использованием.

**Схемы:**

- `CryptoSchema` — Одна криптовалюта
- `CryptoListResponseSchema` — Массив криптовалют
- `CryptoSearchResultsSchema` — Результаты поиска
- `CryptoHistorySchema` — История цен

**Пример валидации:**

```typescript
// Невалидные данные (отсутствует обязательное поле)
{
  id: "bitcoin",
  // current_price: отсутствует ❌
}

// ValidationError:
// "Invalid input: expected number, received undefined"
```

---

## 📝 Лучшие практики

### 1. **Всегда обрабатывайте ошибки**

```tsx
// ✅ Хорошо
try {
	const cryptos = await getCryptoList();
} catch (error) {
	if (error instanceof ApiError) {
		// Обработка ошибки API
	}
	if (error instanceof ValidationError) {
		// Обработка ошибки валидации
	}
}

// ❌ Плохо - необработанные ошибки
const cryptos = await getCryptoList(); // Может выбросить ошибку
```

---

### 2. **Используйте Server Components**

```tsx
// ✅ Хорошо - Server Component
export default async function Page() {
	const cryptos = await getCryptoList();
	return <div>{/* рендер */}</div>;
}

// ❌ Плохо - Client Component (если не нужно)
("use client");
const [cryptos, setCryptos] = useState([]);
useEffect(() => {
	getCryptoList().then(setCryptos);
}, []);
```

---

### 3. **Валидируйте пользовательский ввод**

```tsx
// ✅ Хорошо - валидация запроса
const searchCrypto = async (query: string) => {
	if (!query.trim()) return []; // Пустой запрос
	// ... вызов API
};

// ❌ Плохо - нет валидации
const searchCrypto = async (query: string) => {
	// Вызов API с пустым запросом
};
```

---

### 4. **Используйте TypeScript типы**

```tsx
// ✅ Хорошо - типизировано
import type { Crypto } from "@/types/crypto";

const coin: Crypto = await getCryptoById("bitcoin");

// ❌ Плохо - без типов
const coin = await getCryptoById("bitcoin");
```

---

## 🔗 Связанные файлы

| Файл                        | Описание                         |
| --------------------------- | -------------------------------- |
| `src/types/crypto.ts`       | Zod схемы и TypeScript типы      |
| `src/api/coingecko.test.ts` | Unit тесты для API функций       |
| `src/app/page.tsx`          | Пример использования в Dashboard |

---

## 📊 Лимиты запросов

| Тариф                     | Запросов/мин | Запросов/день |
| ------------------------- | ------------ | ------------- |
| **Бесплатно (без ключа)** | 10-50        | 1000          |
| **Бесплатно (с ключом)**  | 30-100       | 10,000        |
| **Платный**               | 100+         | 100,000+      |

**Примечание:** Лимиты могут меняться. Проверьте [документацию CoinGecko API](https://www.coingecko.com/en/api/documentation) для актуальных лимитов.
