# List Component

Гибкий компонент списка для отображения элементов в различных форматах.

---

## 📖 Обзор

**List** — это универсальный компонент для создания списков. Поддерживает различные типы элементов (`ul`, `ol`, `div`), стилизацию (divided, bordered, striped), hover эффекты и пустое состояние.

---

## 🚀 Использование

### Базовый пример

```tsx
import { List } from "@/components/ui";

<List items={['Item 1', 'Item 2', 'Item 3']} />
```

### Простой список

```tsx
<List
  items={['Bitcoin', 'Ethereum', 'Solana']}
  divided
  bordered
/>
```

### Упорядоченный список

```tsx
<List
  as="ol"
  items={['First', 'Second', 'Third']}
  divided
/>
```

### Список с hover эффектом

```tsx
<List
  items={['A', 'B', 'C']}
  striped
  hover
/>
```

### Пустое состояние

```tsx
<List
  items={[]}
  emptyText="No items found"
/>
```

### Кастомные дети

```tsx
<List divided>
  <div>Custom Item 1</div>
  <div>Custom Item 2</div>
  <div>Custom Item 3</div>
</List>
```

### Компактный режим

```tsx
<List
  items={['A', 'B', 'C']}
  compact
/>
```

---

## 📋 Props

### List

| Prop          | Тип                  | По умолчанию | Описание                                      |
| ------------- | -------------------- | ------------ | --------------------------------------------- |
| **items**     | `ReactNode[]`        | —            | Массив элементов для отображения              |
| **className** | `string`             | —            | Дополнительные CSS классы                     |
| **as**        | `"ul" \| "ol" \| "div"` | `"ul"`     | HTML элемент контейнера                       |
| **divided**   | `boolean`            | `false`      | Показать разделители между элементами         |
| **bordered**  | `boolean`            | `false`      | Показать рамку вокруг списка                  |
| **striped**   | `boolean`            | `false`      | Чередование цветов строк (zebra striping)     |
| **compact**   | `boolean`            | `false`      | Компактный режим (уменьшенные отступы)        |
| **hover**     | `boolean`            | `false`      | Hover эффект на элементах                     |
| **emptyText** | `string`             | `"No items"` | Текст для пустого состояния                   |
| **children**  | `ReactNode`          | —            | Кастомные дети (переопределяет items)         |

### ListItem

| Prop          | Тип             | По умолчанию | Описание                          |
| ------------- | --------------- | ------------ | --------------------------------- |
| **as**        | `"li" \| "div"` | `"li"`       | HTML элемент элемента списка      |
| **children**  | `ReactNode`     | —            | Содержимое элемента списка        |
| **className** | `string`        | —            | Дополнительные CSS классы         |
| **hover**     | `boolean`       | `false`      | Hover эффект                      |
| **compact**   | `boolean`       | `false`      | Компактный режим                  |

---

## 🎨 Стилизация

### Style Classes

List использует централизованные классы из `styleClasses.ts`:

```tsx
import { listClasses } from "@/components/ui/List/styleClasses";

// Доступные классы:
listClasses.container      // Контейнер
listClasses.list           // Список
listClasses.item           // Элемент
listClasses.itemText       // Текст элемента
listClasses.itemCompact    // Компактный элемент
listClasses.itemEmpty      // Пустое состояние
listClasses.itemStriped    // Полосатый элемент
listClasses.itemHover      // Hover эффект
listClasses.divided        // Разделители
listClasses.bordered       // Рамка
```

**Примечание:** 
- Для строк и чисел используется значение как `key` (оптимизация React)
- Для объектов используется `item-${index}`

---

## 📚 Примеры

### Cryptocurrency List

```tsx
import { List } from "@/components/ui";

const cryptos = ['Bitcoin', 'Ethereum', 'Solana'];

<List
  items={cryptos}
  striped
  hover
  bordered
/>
```

### Navigation Menu

```tsx
<List
  as="div"
  items={['Dashboard', 'Watchlist', 'Settings']}
  divided
  hover
/>
```

### Compact List

```tsx
<List
  items={['Item 1', 'Item 2', 'Item 3']}
  compact
  divided
/>
```

---

## 🔧 Утилиты

### cn()

Для продвинутой кастомизации используйте утилиту `cn()`:

```tsx
import { cn } from "@/utils/cn";
import { listClasses as cls } from "@/components/ui/List/styleClasses";

const customClasses = cn(
  cls.list,
  divided && cls.divided,
  bordered && cls.bordered,
  className
);
```

---

## 📊 Тесты

List компонент имеет **25 тестов** с полным покрытием:

- ✅ Рендер элементов
- ✅ Различные типы (ul, ol, div)
- ✅ Пустое состояние
- ✅ Divided, bordered, striped стили
- ✅ Hover эффекты
- ✅ Compact режим
- ✅ Typography классы

---

## 📁 Файлы

| Файл                          | Описание                    |
| ----------------------------- | --------------------------- |
| `List.tsx`                    | Основной компонент          |
| `ListItem.tsx`                | Компонент элемента          |
| `styleClasses.ts`             | Централизованные стили      |
| `List.test.tsx`               | Тесты                       |
| `index.ts`                    | Экспорты                    |

---

## 🔗 Связанные компоненты

- [Table](./Table.md) — Таблица данных
- [cn() Utility](../../utils/cn.md) — Утилита для классов

---

**Дата:** 2026-03-23  
**Версия:** 1.0.1  
**Статус:** ✅ Production Ready
