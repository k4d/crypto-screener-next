# cn() Utility

Утилита для объединения Tailwind CSS классов.

---

## 📖 Обзор

**cn()** — это utility функция для безопасного объединения классов. Автоматически фильтрует falsy значения (null, undefined, empty strings, false).

---

## 🚀 Использование

### Базовый пример

```tsx
import { cn } from "@/utils/cn";

cn("btn", "btn-primary", undefined, null, "btn-large")
// Returns: "btn btn-primary btn-large"
```

### Условные классы

```tsx
import { cn } from "@/utils/cn";

cn(
  "btn",
  isActive && "btn-active",
  isDisabled && "btn-disabled",
  className
)
```

### Со styleClasses

```tsx
import { cn } from "@/utils/cn";
import { listClasses as cls } from "@/components/ui/List/styleClasses";

const listClasses = cn(
  cls.list,
  divided && cls.divided,
  bordered && cls.bordered,
  className
);
```

---

## 📋 API

### cn()

```tsx
function cn(
  ...classes: (string | undefined | null | false)[]
): string
```

**Параметры:**
- `...classes` — Передаваемое количество классов (string, undefined, null, false)

**Возвращает:**
- `string` — Объединённые классы через пробел


---

## 📚 Примеры

### Component Classes

```tsx
import { cn } from "@/utils/cn";

const buttonClasses = cn(
  "px-4 py-2 rounded",
  isActive && "bg-blue-500",
  isDisabled && "opacity-50",
  className
);
```

### List Component

```tsx
import { cn } from "@/utils/cn";
import { listClasses as cls } from "@/components/ui/List/styleClasses";

const itemClasses = cn(
  cls.item,
  cls.itemText,
  compact && cls.itemCompact,
  striped && itemIndex % 2 === 1 && cls.itemStriped,
  hover && cls.itemHover,
  className
);
```

### Table Component

```tsx
import { cn } from "@/utils/cn";
import { tableClasses as cls } from "@/components/ui/Table/styleClasses";

const cellClass = cn(
  cls.cell,
  cls.cellText,
  compact ? cls.cellCompact : cls.cellDefault,
  bordered && cls.cellBordered,
  className
);
```

---

## 🔧 Преимущества

| Преимущество | Описание |
|--------------|----------|
| **Cleaner code** | Нет `.filter(Boolean).join(" ")` |
| **Shorter syntax** | `cn(...)` вместо массивов |
| **Consistency** | Стандартный паттерн во всех компонентах |
| **Reusability** | Доступно во всём проекте |
| **Type-safe** | Полная TypeScript поддержка |

---

## 📊 Сравнение

### До cn()

```tsx
const classes = [baseClass, hoverClass, className]
  .filter(Boolean)
  .join(" ");
```

### После cn()

```tsx
const classes = cn(baseClass, hoverClass, className);
```

---

## 📁 Файлы

| Файл              | Описание                    |
| ----------------- | --------------------------- |
| `cn.ts`           | Утилита cn()                |

---

## 🔗 Связанные компоненты

- [List](../components/ui/List.md) — Гибкий список
- [Table](../components/ui/Table.md) — Таблица данных

---

**Дата:** 2025-03-02  
**Версия:** 1.0.0
