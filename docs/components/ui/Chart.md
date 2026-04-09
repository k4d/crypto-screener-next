# Chart Component

Интерактивный компонент графика для отображения финансовых данных.

---

## 📖 Обзор

**Chart** — это компонент для визуализации биржевых данных с использованием библиотеки **Lightweight Charts**. Поддерживает 5 типов графиков (свечи, линия, область, бары, baseline), гистограмму объема, адаптивный размер, **умное позиционирование тултипа** и наложение нескольких серий.

### Ключевые особенности

- 🟠 **Bitcoin Orange (#F7931A)** — цвет главной серии по умолчанию
- 📊 **5 типов графиков** — candlestick, bar, line, area, baseline
- 🎯 **Multi-series overlay** — наложение дополнительных линий/областей
- 💡 **Smart Tooltip** — OHLCV + дополнительные серии + реальные цены через `originalData`
- 📐 **Адаптивность** — автоматическая подстройка ширины под контейнер + `timeScale().fitContent()`
- 📏 **Фиксированная ширина** — проп `width` для задания точного размера
- 🔄 **Стабильность** — чарт создаётся один раз, пропсы обновляются через `applyOptions()` (без пересоздания)
- 📈 **Объём** — опциональная гистограмма объема (mock-данные)

---

## 🚀 Использование

### Базовый пример (Линейный график)

```tsx
import { Chart } from "@/components/ui";

// Данные должны быть отсортированы по времени
const data = [
  { time: '2023-01-01', open: 100, high: 105, low: 95, close: 102 },
  // ...
];

// По умолчанию используется тип "line"
<Chart data={data} />
```

### Свечной график (Candlestick)

```tsx
<Chart
  data={data}
  type="candlestick"
  title="Bitcoin / USD"
  showVolume
/>
```

### Multi-series с тултипом

```tsx
<Chart
  data={btcData}
  type="line"
  title="BTC"
  showTooltip
  currency="USD"
  additionalSeries={[
    {
      type: "line",
      data: ethScaled,
      originalData: ethOriginal,
      color: "#627EEA",
      title: "ETH",
    },
  ]}
/>
```

### График с заголовком

```tsx
<Chart
  data={data}
  chartTitle="Bitcoin / USD"
  showPriceAxis={false}
  showTimeAxis={false}
/>
```

### Минималистичный график (без осей)

```tsx
<Chart
  data={data}
  showPriceAxis={false}
  showTimeAxis={false}
/>
```

---

## 📋 Props

### Chart

| Prop | Тип | По умолчанию | Описание |
| ---- | --- | ------------ | -------- |
| **data** | `CandlestickData[]` | — | Массив данных OHLC (обязательно) |
| **type** | `ChartType` | `"line"` | Тип графика (`candlestick`, `bar`, `line`, `area`, `baseline`) |
| **chartTitle** | `string` | — | Заголовок графика над чартом (опционально) |
| **title** | `string` | — | Название главной серии (в тултипе) |
| **width** | `number` | `100%` | Фиксированная ширина графика в пикселях (по умолчанию — авто) |
| **height** | `number` | `300` | Высота графика в пикселях |
| **timeframe** | `string` | `"30m"` | Таймфрейм (используется для атрибуции) |
| **showGrid** | `boolean` | `true` | Показать сетку |
| **showVolume** | `boolean` | `false` | Показать гистограмму объема |
| **showPriceAxis** | `boolean` | `true` | Показать шкалу цен (справа) |
| **showTimeAxis** | `boolean` | `true` | Показать шкалу времени (снизу) |
| **showTooltip** | `boolean` | `false` | Показать кастомный тултип при наведении |
| **currency** | `string` | `"USD"` | Код валюты для форматирования цен |
| **additionalSeries** | `AdditionalSeriesConfig[]` | `[]` | Массив дополнительных серий (линии, области) |
| **className** | `string` | — | Дополнительные CSS классы для обертки |

---

## 📊 Формат данных

```typescript
interface CandlestickData {
  time: Time; // Строка "YYYY-MM-DD" или Unix timestamp (seconds)
  open: number;
  high: number;
  low: number;
  close: number;
}
```

**Важно:**
- Данные должны быть **отсортированы по времени** (по возрастанию)
- Временные метки должны быть **уникальными**
- Для типов `line`, `area`, `baseline` компонент автоматически использует цену `close`

---

## 🎨 Стилизация

### Внешний вид

Компонент принимает проп `className` для внешней обертки:

```tsx
<Chart
  data={data}
  className="rounded-xl shadow-lg border border-gray-200"
/>
```

### Цвет главной серии

По умолчанию используется **Bitcoin Orange (#F7931A)** для линейных графиков. Для Area/Baseline — оранжевые градиенты.

---

## 💡 Кастомный тултип

Включён по умолчанию: **отключён** (`showTooltip={false}`).

### Как включить

```tsx
<Chart data={data} showTooltip />
```

### Адаптивность

| Тип графика | Отображение |
|-------------|-------------|
| `candlestick`, `bar` | Заголовок (если задан) + Open, High, Low, Close + Volume |
| `line`, `area`, `baseline` | `Title: Price` (или `Price:`) + Volume |

### Дополнительные серии

При наведении показываются значения всех дополнительных серий:

```
Apr 8, 2024
──────────────────
BTC:      $84,750
──────────────────
ETH:      $3,245
BNB:      $612
```

Если для серии задан `originalData`, в тултипе отображаются **реальные** цены, а не масштабированные.

### Форматирование цен

| Валюта | Формат |
|--------|--------|
| USD, EUR, GBP | `$63,022.79` |
| USDT, USDC | `1,234.56 USDT` |

Точность зависит от цены: дешевле $1 — 4 знака, дороже $10 — 2 знака.

### Позиционирование

Тултип автоматически предотвращает выход за правую границу графика:
- **По умолчанию**: справа от курсора
- **У правого края**: переключается налево

Фиксированная ширина: `162px` (`w-40.5`).

---

## 📈 Несколько линий (Multi-series)

### Пример использования

```tsx
import type { AdditionalSeriesConfig } from "@/components/ui/Chart/Chart";

const smaData = chartData.map((d, i) => ({
  time: d.time,
  value: (d.close + (chartData[i - 1]?.close || d.close)) / 2,
}));

const additionalSeries: AdditionalSeriesConfig[] = [
  {
    type: "line",
    data: smaData,
    color: "#F7931A",
    lineWidth: 2,
    title: "SMA",
  },
];

<Chart data={chartData} additionalSeries={additionalSeries} />
```

### Параметры серии

| Параметр | Тип | По умолчанию | Описание |
|----------|-----|--------------|----------|
| **type** | `"line"` \| `"area"` | — | Тип графика |
| **data** | `{ time, value }[]` | — | Данные для отображения на графике |
| **originalData** | `{ time, value }[]` | — | Оригинальные данные для тултипа |
| **color** | `string` | — | Цвет линии |
| **lineWidth** | `number` | — | Толщина линии |
| **title** | `string` | — | Заголовок (в тултипе) |
| **priceLineVisible** | `boolean` | `false` | Горизонтальная линия цены |
| **lastValueVisible** | `boolean` | `true` | Метка последнего значения на оси |

### Масштабированные данные

Для сравнения роста активов используйте `data` для масштабированных значений и `originalData` для реальных цен в тултипе:

```tsx
const ethScaled = ethData.map(d => ({
  time: d.time,
  value: d.close * scaleFactor, // Масштабируем для визуализации
}));

const ethOriginal = ethData.map(d => ({
  time: d.time,
  value: d.close, // Реальная цена для тултипа
}));

<Chart
  data={btcData}
  additionalSeries={[
    {
      type: "line",
      data: ethScaled,
      originalData: ethOriginal,
      color: "#627EEA",
      title: "ETH",
    },
  ]}
  showTooltip
  title="BTC"
/>
```

---

## 📁 Файлы

| Файл | Описание |
| ---- | -------- |
| `Chart.tsx` | Основной компонент графика (221 строка) |
| `ChartTooltip.tsx` | Компонент кастомного тултипа (260 строк) |
| `helpers.ts` | Константы и хелперы (цвета, трансформеры данных) |
| `useChart.ts` | Хук инициализации чарта, resize и обновления настроек через `applyOptions()` |
| `useMainSeries.ts` | Хук управления главной серией |
| `useAdditionalSeries.ts` | Хук дополнительных серий (линии/области) |
| `useVolume.ts` | Хук гистограммы объема |
| `useCrosshair.ts` | Хук кроссхэира и сбора данных для тултипа |
| `index.ts` | Экспорт |

---

## 🧪 Тесты

| Файл | Тестов | Проверок |
| ---- | ------ | -------- |
| `helpers.test.ts` | 14 | 26 |
| `ChartTooltip.test.tsx` | 16 | 23 |
| **Итого** | **30** | **49** |

---

## 🔗 Связанные компоненты

- [List](./List.md) — Гибкий список
- [Table](./Table.md) — Таблица данных
- [cn() Utility](../../utils/cn.md) — Утилита для классов

---

**Дата:** 2026-04-09
**Версия:** 3.1.0
**Статус:** ✅ Production Ready
