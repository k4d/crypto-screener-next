# CoinGecko API Endpoints

## 📋 Список endpoint'ов

| Endpoint | Метод | Описание | Кеширование | Функция |
|----------|-------|----------|-------------|---------|
| `/coins/markets` | GET | Список криптовалют | 60 сек | `getCryptoList()` |
| `/coins/search` | GET | Поиск по названию | Нет | `searchCrypto()` |
| `/coins/{id}` | GET | Детали криптовалюты | 300 сек | `getCryptoById()` |
| `/coins/{id}/market_chart` | GET | История цен | 300 сек | `getCryptoHistory()` |
| `/search/trending` | GET | Трендовые запросы | 600 сек | `getTrendingSearches()` |

---

## 🔍 Детальное описание

### 1. `/coins/markets`

Получить список криптовалют с рыночными данными.

**Параметры запроса:**

| Параметр | Тип | По умолчанию | Описание |
|----------|-----|--------------|----------|
| `vs_currency` | string | `usd` | Валюта (usd, eur, gbp, etc.) |
| `order` | string | `market_cap_desc` | Сортировка |
| `per_page` | number | `100` | Количество на страницу (1-250) |
| `page` | number | `1` | Номер страницы |
| `sparkline` | boolean | `false` | Включить sparkline данные |

**Пример запроса:**
```
GET /api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100
```

**Использование в коде:**
```typescript
const cryptos = await getCryptoList("usd", 100);
```

---

### 2. `/coins/search`

Поиск криптовалют по названию или символу.

**Параметры запроса:**

| Параметр | Тип | Обязательный | Описание |
|----------|-----|--------------|----------|
| `query` | string | ✅ Да | Поисковый запрос |

**Пример запроса:**
```
GET /api/v3/coins/search?query=bitcoin
```

**Использование в коде:**
```typescript
const results = await searchCrypto("bitcoin");
```

---

### 3. `/coins/{id}`

Получить детальную информацию о конкретной криптовалюте.

**Параметры запроса:**

| Параметр | Тип | Обязательный | Описание |
|----------|-----|--------------|----------|
| `id` | string | ✅ Да | CoinGecko ID (например, "bitcoin") |

**Пример запроса:**
```
GET /api/v3/coins/bitcoin
```

**Использование в коде:**
```typescript
const bitcoin = await getCryptoById("bitcoin");
```

---

### 4. `/coins/{id}/market_chart`

Получить историю цен криптовалюты.

**Параметры запроса:**

| Параметр | Тип | Обязательный | Описание |
|----------|-----|--------------|----------|
| `id` | string | ✅ Да | CoinGecko ID |
| `vs_currency` | string | ✅ Да | Валюта (usd, eur, gbp) |
| `days` | number/string | ✅ Да | Количество дней (1-365 или "max") |

**Пример запроса:**
```
GET /api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7
```

**Использование в коде:**
```typescript
const history = await getCryptoHistory("bitcoin", 7, "usd");
```

---

### 5. `/search/trending`

Получить трендовые поисковые запросы (монеты, NFT, категории).

**Параметры запроса:**

| Параметр | Тип | Обязательный | Описание |
|----------|-----|--------------|----------|
| — | — | — | Нет параметров |

**Пример запроса:**
```
GET /api/v3/search/trending
```

**Структура ответа (Тип: `TrendingResponse`):**
```typescript
{
  coins: [    // Top 15 trending coins (где 'item' имеет тип `TrendingCoinData`)
    {
      item: {
        id: "bitcoin",
        name: "Bitcoin",
        symbol: "btc",
        market_cap_rank: 1,
        score: 0,  // 0 = самый трендовый
        data: {
          price: 63022.79,
          price_change_percentage_24h: { usd: 2.5 }
        }
      }
    }
  ],
  nfts: [],      // Top 7 trending NFTs
  categories: [] // Top 5 trending categories
}
```

**Использование в коде:**
```typescript
const trending = await getTrendingSearches();
```

---

## 📊 HTTP Статус коды

| Код | Значение | Описание |
|-----|----------|----------|
| `200` | OK | Успешный запрос |
| `404` | Not Found | Ресурс не найден |
| `429` | Too Many Requests | Превышен лимит запросов |
| `500` | Internal Server Error | Ошибка сервера CoinGecko |
| `503` | Service Unavailable | Сервис временно недоступен |

---

## 🔒 Аутентификация

### Заголовки:

```http
Accept: application/json
x-cg-demo-api-key: YOUR_API_KEY
```

### Без ключа:
- ✅ Работает бесплатно
- ⚠️ Лимит: 10-50 запросов/минуту
- ⚠️ Нет доступа к некоторым endpoint'ам

### С ключом:
- ✅ Лимит: 30-100 запросов/минуту
- ✅ Доступ ко всем endpoint'ам
- ✅ Приоритет поддержки

**Получить ключ:** https://www.coingecko.com/api/pricing

---

## 🔄 Кеширование

| Endpoint | Частота обновления | Next.js revalidate |
|----------|-------------------|-------------------|
| `/coins/markets` | 1 минута | 60 сек |
| `/coins/search` | Реальное время | Нет (не кешируется) |
| `/coins/{id}` | 5 минут | 300 сек |
| `/coins/{id}/market_chart` | 5 минут | 300 сек |
| `/search/trending` | 10 минут | 600 сек |

---

## 📝 Примеры использования

### Получение списка криптовалют:

```typescript
// Top 10 криптовалют в USD
const top10 = await getCryptoList("usd", 10);

// Top 50 криптовалют в EUR
const top50Eur = await getCryptoList("eur", 50);
```

### Поиск криптовалют:

```typescript
// Поиск по названию
const bitcoinResults = await searchCrypto("bitcoin");

// Поиск по символу
const btcResults = await searchCrypto("BTC");
```

### Получение истории цен:

```typescript
// 7 дней истории
const weekHistory = await getCryptoHistory("bitcoin", 7, "usd");

// 30 дней истории
const monthHistory = await getCryptoHistory("bitcoin", 30, "usd");

// Вся история
const allHistory = await getCryptoHistory("bitcoin", "max", "usd");
```

---

## 🔗 Полезные ссылки

| Ресурс | Ссылка |
|--------|--------|
| Официальная документация | https://www.coingecko.com/en/api/documentation |
| CoinGecko API v3.0.1 | https://docs.coingecko.com/v3.0.1/ |
| Тарифные планы | https://www.coingecko.com/api/pricing |
| Статус API | https://status.coingecko.com/ |

---

**Последнее обновление:** 2025-03-02  
**Версия API:** v3
