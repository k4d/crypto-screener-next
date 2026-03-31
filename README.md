# Crypto Screener Next

> 🚀 Modern cryptocurrency screener built with Next.js 16, TypeScript, and Tailwind CSS

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwind-css)
![Bun](https://img.shields.io/badge/Bun-1.3-fcf0e6?logo=bun)

---

## 📖 Оглавление

- [О проекте](#-о-проекте)
- [Возможности](#-возможности)
- [Технологии](#-технологии)
- [Структура проекта](#-структура-проекта)
- [Начало работы](#-начало-работы)
- [Документация](#-документация)
- [Компоненты](#-компоненты)
- [Разработка](#-разработка)
- [Тестирование](#-тестирование)
- [Деплой](#-деплой)

---

## 🎯 О проекте

**Crypto Screener Next** — это современное веб-приложение для фильтрации и поиска криптовалют. Приложение предоставляет удобный интерфейс для поиска, фильтрации и просмотра детальной информации о криптовалютах с использованием реальных данных из CoinGecko API.

### Ключевые особенности:

- ✅ **Реальные данные** — интеграция с CoinGecko API v3
- ✅ **Типобезопасность** — полная TypeScript типизация + Zod валидация
- ✅ **Server Components** — оптимизированная загрузка данных
- ✅ **Тёмная тема** — переключение светлой/тёмной темы
- ✅ **Адаптивность** — работает на всех устройствах
- ✅ **Тесты** — покрытие тестами критических компонентов

---

## ✨ Возможности

| Функция       | Статус      | Описание                                      |
| ------------- | ----------- | --------------------------------------------- |
| **Dashboard** | ✅ Готово   | Список топ-10 криптовалют с реальными данными |
| **Поиск**     | ✅ Готово   | Поиск криптовалют по названию/символу         |
| **Тренды**    | 🔜 Скоро    | Трендовые запросы (Top 15)                    |
| **Тема**      | ✅ Готово   | Переключение светлой/тёмной темы              |
| **Таблица**   | ✅ Готово   | Полная таблица (Basic/Hybrid/Advanced режимы) |
| **Графики**   | 🔜 Скоро    | Графики цен (Lightweight Charts)              |

---

## 🛠️ Технологии

### Основные:

| Технология                                    | Версия       | Назначение                   |
| --------------------------------------------- | ------------ | ---------------------------- |
| [Next.js](https://nextjs.org/)                | 16.1.5       | React фреймворк (App Router) |
| [TypeScript](https://www.typescriptlang.org/) | 5.9.3        | Типизация                    |
| [Tailwind CSS](https://tailwindcss.com/)      | 4.2.1        | Стилизация                   |
| [HeroUI](https://www.heroui.com/)             | 3.0.0-beta.7 | UI компоненты                |
| [Bun](https://bun.sh/)                        | 1.3.x        | Package manager + runtime    |

### Инструменты:

| Инструмент                                                 | Назначение               |
| ---------------------------------------------------------- | ------------------------ |
| [Biome](https://biomejs.dev/)                              | Линтер + форматтер       |
| [Husky](https://typicode.github.io/husky/)                 | Git hooks                |
| [Bun Test](https://bun.sh/docs/test)                       | Тестирование             |
| [React Testing Library](https://testing-library.com/react) | Тестирование компонентов |
| [Happy DOM](https://github.com/capricorn86/happy-dom)      | DOM среда для тестов     |
| [Zod](https://zod.dev/)                                    | Валидация схем           |
| [lucide-react](https://lucide.dev/)                        | Иконки                   |

---

## 📁 Структура проекта

```
crypto-screener-next/
├── docs/                      ← Документация
│   ├── api/
│   │   ├── coingecko.md       ← CoinGecko API клиент
│   │   └── endpoints.md       ← Список endpoint'ов
│   ├── components/
│   ├── guides/
│   └── architecture/
├── src/
│   ├── api/                   ← API клиенты
│   │   └── coingecko.ts       ← CoinGecko API + Zod валидация
│   ├── app/                   ← Next.js App Router
│   │   ├── layout.tsx         ← Корневой layout
│   │   ├── page.tsx           ← Dashboard страница
│   │   └── coins/             ← Страница криптовалют
│   ├── components/            ← React компоненты
│   │   ├── crypto/            ← Crypto компоненты
│   │   │   ├── CoinAvatar.tsx
│   │   │   ├── CoinPrice.tsx
│   │   │   ├── CoinPriceChange.tsx
│   │   │   ├── CoinSymbol.tsx
│   │   │   ├── CryptoListBox.tsx
│   │   │   └── ...
│   │   ├── footer/
│   │   ├── header/
│   │   └── ui/                ← UI компоненты
│   │       ├── List/          ← List компоненты
│   │       │   ├── List.tsx
│   │       │   ├── ListItem.tsx
│   │       │   └── styleClasses.ts
│   │       └── Table/         ← Table компоненты
│   │           ├── Table.tsx
│   │           ├── TableHead.tsx
│   │           ├── TableBody.tsx
│   │           ├── TableRow.tsx
│   │           ├── TableCell.tsx
│   │           ├── TableColumn.tsx
│   │           ├── TableFooter.tsx
│   │           ├── TableCaption.tsx
│   │           ├── TableEmpty.tsx
│   │           └── styleClasses.ts
│   ├── layouts/               ← Layout компоненты
│   │   └── RootLayout.tsx
│   ├── styles/                ← Глобальные стили
│   │   └── globals.css
│   ├── types/                 ← TypeScript типы + Zod схемы
│   │   └── crypto.ts
│   └── utils/                 ← Утилиты
│       └── cn.ts              ← cn() утилита для классов
├── test/                      ← Тестовые утилиты
├── public/                    ← Статические файлы
│   └── favicon.svg
├── .env.local                 ← Переменные окружения
├── package.json
└── README.md
```

---

## 🚀 Начало работы

### Требования:

- [Bun](https://bun.sh/) 1.3 или выше
- Node.js 20+ (опционально, Bun включает свой runtime)

### 1. Установка зависимостей:

```bash
bun install
```

### 2. Настройка окружения:

Создайте файл `.env.local` в корне проекта:

```bash
# CoinGecko API Key (опционально)
# Получи бесплатно: https://www.coingecko.com/api/pricing
COINGECKO_API_KEY=your_api_key_here

# Base API URL
BASE_API_URL=https://api.coingecko.com/api/v3
```

### 3. Запуск dev сервера:

```bash
bun run dev
```

Приложение будет доступно по адресу: **http://localhost:3000**

---

## 📚 Документация

Полная документация доступна в папке [`/docs`](./docs/):

| Документ                                 | Описание                     |
| ---------------------------------------- | ---------------------------- |
| [CoinGecko API](./docs/api/coingecko.md) | API клиент, функции, примеры |
| [Endpoints](./docs/api/endpoints.md)     | Список endpoint'ов CoinGecko |
| [Table Component](./docs/components/ui/Table.md) | Table компонент (v1.1.0) — Basic/Hybrid/Advanced режимы |
| [List Component](./docs/components/ui/List.md)   | List компонент (v1.0.1) — гибкий список |
| [Компоненты](./docs/components/)         | Документация компонентов     |
| [Гайды](./docs/guides/)                  | Пошаговые руководства        |

---

## 🧩 Компоненты

### UI Components:

| Компонент    | Описание                           | Путь                         |
| ------------ | ---------------------------------- | ---------------------------- |
| **List**     | Гибкий список (ul, ol, div)        | `@/components/ui/List`       |
| **ListItem** | Элемент списка                     | `@/components/ui/List`       |
| **Table**    | Таблица данных                     | `@/components/ui/Table`      |
| **TableHead** | Заголовок таблицы                 | `@/components/ui/Table`      |
| **TableBody** | Тело таблицы                      | `@/components/ui/Table`      |
| **TableRow**  | Строка таблицы                    | `@/components/ui/Table`      |
| **TableCell** | Ячейка таблицы                    | `@/components/ui/Table`      |
| **TableColumn** | Колонка таблицы                 | `@/components/ui/Table`      |
| **TableFooter** | Подвал таблицы                  | `@/components/ui/Table`      |
| **TableCaption** | Заголовок таблицы (accessibility) | `@/components/ui/Table`   |
| **TableEmpty** | Пустое состояние таблицы         | `@/components/ui/Table`      |

### Утилиты:

| Утилита        | Описание                          | Путь                    |
| -------------- | --------------------------------- | ----------------------- |
| **cn()**       | Объединение классов               | `@/utils/cn`            |
| **mergeClasses()** | Алиас для cn()                | `@/utils/cn`            |

### Style Classes:

| Компонент | Описание                    | П путь                              |
| --------- | --------------------------- | ----------------------------------- |
| **listClasses** | Классы для List     | `@/components/ui/List/styleClasses` |
| **tableClasses** | Классы для Table   | `@/components/ui/Table/styleClasses` |

### Основные компоненты:

| Компонент           | Описание                  | Путь                                      |
| ------------------- | ------------------------- | ----------------------------------------- |
| **Header**          | Хедер с лого и навигацией | `@/components/header`                     |
| **Logo**            | Логотип приложения        | `@/components/header/Logo.tsx`            |
| **NavBar**          | Навигационное меню        | `@/components/header/NavBar.tsx`          |
| **SearchModal**     | Модальное окно поиска     | `@/components/header/SearchModal.tsx`     |
| **ThemeButton**     | Переключатель темы        | `@/components/header/ThemeButton.tsx`     |
| **CoinAvatar**      | Аватар криптовалюты       | `@/components/crypto/CoinAvatar.tsx`      |
| **CoinPrice**       | Отображение цены          | `@/components/crypto/CoinPrice.tsx`       |
| **CoinPriceChange** | Изменение цены (%)        | `@/components/crypto/CoinPriceChange.tsx` |
| **CoinSymbol**      | Символ криптовалюты       | `@/components/crypto/CoinSymbol.tsx`      |
| **CryptoListBox**   | Список криптовалют        | `@/components/crypto/CryptoListBox.tsx`   |

### Импорт компонентов:

```tsx
// Импорт одного компонента
import { Header } from "@/components/header";

// Импорт нескольких компонентов
import { Header, Logo, SearchModal } from "@/components/header";

// Импорт из разных папок
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CoinPrice } from "@/components/crypto";
```

---

## 💻 Разработка

### Команды:

| Команда          | Описание                  |
| ---------------- | ------------------------- |
| `bun run dev`    | Запуск dev сервера        |
| `bun run build`  | Production сборка         |
| `bun run start`  | Запуск production сервера |
| `bun run lint`   | Проверка линтером         |
| `bun run format` | Форматирование кода       |
| `bun test`       | Запуск тестов             |

### Linting и Format:

Проект использует [Biome](https://biomejs.dev/) для линтинга и форматирования:

```bash
# Проверка кода
bun run lint

# Авто-форматирование
bun run format
```

### Git Hooks:

Настроен pre-commit hook с помощью Husky + lint-staged:

- ✅ Авто-форматирование `.ts`, `.tsx`, `.json` файлов
- ✅ Проверка линтером перед коммитом

---

## 🧪 Тестирование

Проект использует [Bun Test](https://bun.sh/docs/test) + [React Testing Library](https://testing-library.com/react):

```bash
# Запустить все тесты
bun test

# Запустить тесты с покрытием
bun test --coverage

# Запустить конкретный тест
bun test src/components/crypto/CoinPrice.test.tsx
```

### Покрытие тестами:

| Компонент         | Тестов | Статус |
| ----------------- | ------ | ------ |
| CoinPrice         | 10     | ✅     |
| CoinPriceChange   | 11     | ✅     |
| SearchModal       | 12     | ✅     |
| Logo              | 6      | ✅     |
| Header            | 4      | ✅     |
| NavBar            | 6      | ✅     |
| CoinGecko API     | 24     | ✅     |
| List              | 25     | ✅     |
| Table             | 14     | ✅     |

**Примечание:** 
- ListItem тестируется вместе с List (входит в 25 тестов)
- Table компонент прошёл полный Code Review (19 проблем исправлено, все режимы работают)

---

## 📦 Деплой

### Vercel (рекомендуется):

1. Запуш проект на GitHub
2. Импортируй проект в [Vercel](https://vercel.com)
3. Vercel автоматически соберёт и задеплоит проект

**Environment Variables на Vercel:**

```bash
COINGECKO_API_KEY=your_api_key
BASE_API_URL=https://api.coingecko.com/api/v3
```

### Production сборка локально:

```bash
# Сборка
bun run build

# Запуск
bun run start
```

---

### Коммиты:

Проект следует [Conventional Commits](https://www.conventionalcommits.org/):

```bash
feat: add new feature
fix: fix bug
docs: update documentation
style: format code
refactor: refactor code
test: add tests
chore: update dependencies
```

### Pull Request:

1. Создай PR с описанием изменений
2. Пройди CI проверку (lint + tests)
3. Дождись ревью
4. Мерж после аппрува

---

## 📄 Лицензия

MIT License — см. [LICENSE](./LICENSE) файл.

---

## 👥 Авторы

- **NickMajor** — Initial work

---

## 🙏 Благодарности

- [Next.js](https://nextjs.org/) — Фреймворк
- [HeroUI](https://www.heroui.com/) — UI компоненты
- [CoinGecko](https://www.coingecko.com/) — API данные
- [Tailwind CSS](https://tailwindcss.com/) — Стилизация
- [Zod](https://zod.dev/) — Валидация
