# Table Component

Компонент таблицы данных для отображения структурированной информации.

---

## 📖 Обзор

**Table** — это универсальный компонент для создания таблиц. Поддерживает простые таблицы (headers/rows) и продвинутый режим с кастомными компонентами (TableHead, TableBody, TableRow, TableCell).

---

## 🚀 Использование

### Базовый пример

```tsx
import { Table } from "@/components/ui";

<Table
  headers={['Name', 'Price', 'Volume']}
  rows={[
    ['Bitcoin', '$63,022', '$62B'],
    ['Ethereum', '$3,456', '$29B'],
    ['XRP', '$0.62', '$5B'],
  ]}
/>
```

### Таблица с полосками

```tsx
<Table
  headers={['Coin', 'Price']}
  rows={[
    ['Bitcoin', '$63,022'],
    ['Ethereum', '$3,456'],
  ]}
  striped
  hoverable
/>
```

### Компактная таблица с рамкой

```tsx
<Table
  headers={['Coin', 'Price']}
  rows={[...]}
  compact
  bordered
  captionContent="Cryptocurrency prices"
/>
```

### Таблица с подвалом

```tsx
<Table
  headers={['Coin', 'Price']}
  rows={[...]}
  footerContent="Total: 2 coins"
/>
```

### Гибридный режим (Hybrid Mode)

Table поддерживает **гибридный режим** — комбинация auto-генерации и кастомных компонентов:

```tsx
// Hybrid: Auto Header + Auto Body + Custom Footer
<Table
  headers={['Coin', 'Price']}
  rows={[['Bitcoin', '$63,022']]}
  striped
>
  <Table.Footer colSpan={2}>
    <div className="font-bold">Total: $63,022</div>
  </Table.Footer>
</Table>

// Hybrid: Custom Header + Auto Body + Custom Footer
<Table
  headers={['Coin', 'Price']}
  rows={[['Bitcoin', '$63,022']]}
  striped
>
  <Table.Head>
    <Table.Column columnKey="name" align="left">Custom Name</Table.Column>
    <Table.Column columnKey="price" align="right">Custom Price</Table.Column>
  </Table.Head>
  <Table.Footer colSpan={2}>Custom Footer</Table.Footer>
</Table>

// Hybrid: Auto Header + Custom Empty + Auto Footer
<Table
  headers={['Coin', 'Price']}
  rows={[]}  // ← Пустые данные
  striped
>
  <Table.Empty colSpan={2}>
    <div className="flex flex-col items-center gap-2">
      <span className="text-4xl">😔</span>
      <p>No cryptocurrencies found</p>
    </div>
  </Table.Empty>
  <Table.Footer colSpan={2}>Footer content</Table.Footer>
</Table>
```

**Важно:** 
- `<Table.Empty>` рендерится **только когда `rows.length === 0`**
- Если `rows` с данными, Empty игнорируется, рендерятся данные
- `headers` **опционально** — можно использовать только кастомный `<Table.Head>`

### Продвинутый режим (Advanced Mode)

Полностью кастомная таблица с compound компонентами:

```tsx
import { Table } from "@/components/ui";

<Table>
  <Table.Caption>Cryptocurrency prices</Table.Caption>
  <Table.Head>
    <Table.Column columnKey="name" align="left">Name</Table.Column>
    <Table.Column columnKey="price" align="right">Price</Table.Column>
  </Table.Head>
  <Table.Body>
    {rows.map((row) => (
      <Table.Row rowKey={row.id}>
        <Table.Cell align="left">{row.name}</Table.Cell>
        <Table.Cell align="right">{row.price}</Table.Cell>
      </Table.Row>
    ))}
  </Table.Body>
  <Table.Footer colSpan={2}>
    <div className="font-bold">Total: $63,022</div>
  </Table.Footer>
</Table>
```

**Для тестирования:** используйте `data-row-key` для селекта строк:

```tsx
// В тестах
const row = screen.getByTestId('row-bitcoin'); // или [data-row-key="bitcoin"]
```

---

## 📋 Props

### Table

| Prop               | Тип                  | По умолчанию | Описание                                      |
| ------------------ | -------------------- | ------------ | --------------------------------------------- |
| **headers**        | `TableCell[]`        | —            | Заголовки таблицы (массив строк/чисел). **Опционально** (можно использовать только кастомный `<Table.Head>`) |
| **rows**           | `TableRow[]`         | —            | Строки таблицы (массив массивов)              |
| **className**      | `string`             | —            | Дополнительные CSS классы                     |
| **emptyContent**   | `string`             | `"No data"`  | Текст для пустого состояния                   |
| **striped**        | `boolean`            | `false`      | Чередование цветов строк (zebra striping)     |
| **hoverable**      | `boolean`            | `true`       | Hover эффект на строках                       |
| **bordered**       | `boolean`            | `false`      | Рамка вокруг таблицы и ячеек                  |
| **compact**        | `boolean`            | `false`      | Компактный режим (уменьшенные отступы)        |
| **captionContent** | `string`             | —            | Заголовок таблицы (accessibility)             |
| **footerContent**  | `ReactNode`          | —            | Содержимое подвала таблицы (auto-режим)       |
| **children**       | `ReactNode`          | —            | Кастомные дети (продвинутый/гибридный режим)  |

### TableHead

| Prop                | Тип             | По умолчанию | Описание                          |
| ------------------- | --------------- | ------------ | --------------------------------- |
| **columns**         | `ReactNode[]`   | —            | Массив заголовков колонок         |
| **columnClassName** | `string`        | —            | Класс для всех ячеек заголовка    |
| **className**       | `string`        | —            | Класс для thead элемента          |
| **children**        | `ReactNode`     | —            | Кастомные дети (`<Table.Column>`) |

### TableBody

| Prop            | Тип             | По умолчанию | Описание                          |
| --------------- | --------------- | ------------ | --------------------------------- |
| **rows**        | `TableRowType[]` | —            | Массив строк (2D массив)          |
| **cellClassName** | `string`      | —            | Класс для каждой ячейки           |
| **striped**     | `boolean`       | `false`      | Полосатые строки                  |
| **hoverable**   | `boolean`       | `false`      | Hover эффект                      |
| **emptyContent** | `ReactNode`    | —            | Пустое состояние                  |
| **emptyColSpan** | `number`       | —            | ColSpan для пустого состояния     |
| **className**   | `string`        | —            | Класс для tbody элемента          |
| **children**    | `ReactNode`     | —            | Кастомные дети (`<Table.Row>`)    |

### TableRow

| Prop          | Тип           | По умолчанию | Описание                          |
| ------------- | ------------- | ------------ | --------------------------------- |
| **rowKey**    | `string`      | —            | Уникальный ключ строки (используется как `key` и `data-row-key`) |
| **className** | `string`      | —            | Классы от `getRowClasses()`       |
| **children**  | `ReactNode`   | —            | Содержимое строки (`<TableCell>`) |

### TableCell

| Prop        | Тип                      | По умолчанию | Описание              |
| ----------- | ------------------------ | ------------ | --------------------- |
| **align**   | `"left" \| "center" \| "right"` | `"left"` | Выравнивание текста   |
| **className** | `string`               | —            | Дополнительные классы |
| **children**  | `ReactNode`            | —            | Содержимое ячейки     |

### TableColumn

| Prop        | Тип                      | По умолчанию | Описание              |
| ----------- | ------------------------ | ------------ | --------------------- |
| **columnKey** | `string`               | —            | Уникальный ключ       |
| **align**   | `"left" \| "center" \| "right"` | `"left"` | Выравнивание текста   |
| **className** | `string`               | —            | Дополнительные классы |
| **children**  | `ReactNode`            | —            | Содержимое колонки    |

### TableFooter

| Prop            | Тип             | По умолчанию | Описание                          |
| --------------- | --------------- | ------------ | --------------------------------- |
| **colSpan**     | `number`        | `1`          | Количество колонок (**опционально**) |
| **footerContent** | `ReactNode`   | —            | Содержимое подвала                |
| **className**   | `string`        | —            | Дополнительные классы             |
| **children**    | `ReactNode`     | —            | Кастомные дети (переопределяет footerContent) |

### TableCaption

| Prop             | Тип       | По умолчанию | Описание                    |
| ---------------- | --------- | ------------ | --------------------------- |
| **captionContent** | `string` | —            | Текст заголовка таблицы     |
| **children**       | `ReactNode` | —         | Кастомные дети (переопределяет captionContent) |

### TableEmpty

| Prop            | Тип             | По умолчанию | Описание                          |
| --------------- | --------------- | ------------ | --------------------------------- |
| **colSpan**     | `number`        | `1`          | Количество колонок                |
| **className**   | `string`        | —            | Дополнительные классы             |
| **emptyContent** | `ReactNode`    | —            | Содержимое пустого состояния      |
| **children**    | `ReactNode`     | —            | Кастомные дети (переопределяет emptyContent) |

---

## 🎨 Стилизация

### Style Classes

Table использует централизованные классы из `styleClasses.ts`:

```tsx
import { tableClasses } from "@/components/ui/Table/styleClasses";

// Доступные классы:
tableClasses.container         // Контейнер
tableClasses.table             // Таблица
tableClasses.tableBordered     // Рамка таблицы
tableClasses.header            // Заголовок
tableClasses.headerCell        // Ячейка заголовка
tableClasses.headerCellText    // Текст заголовка
tableClasses.body              // Тело таблицы
tableClasses.row               // Строка
tableClasses.rowStriped        // Полосатая строка
tableClasses.rowHover          // Hover строки
tableClasses.rowHoverTransition // Hover transition
tableClasses.cell              // Ячейка
tableClasses.cellText          // Текст ячейки
tableClasses.cellDefault       // Стандартная ячейка
tableClasses.cellCompact       // Компактная ячейка
tableClasses.cellBordered      // Ячейка с рамкой
tableClasses.cellEmpty         // Пустая ячейка
tableClasses.cellEmptyText     // Текст пустой ячейки
tableClasses.cellAlignLeft     // Выравнивание слева
tableClasses.cellAlignCenter   // Выравнивание по центру
tableClasses.cellAlignRight    // Выравнивание справа
tableClasses.footer            // Подвал
tableClasses.footerCell        // Ячейка подвала
tableClasses.caption           // Заголовок (accessibility)
```

---

## 📚 Примеры

### Cryptocurrency Table

```tsx
<Table
  headers={['Coin', 'Price', '24h %']}
  rows={[
    ['Bitcoin', '$63,022', '+2.5%'],
    ['Ethereum', '$3,456', '+1.8%'],
    ['Solana', '$157', '-0.5%'],
  ]}
  striped
  hoverable
  captionContent="Cryptocurrency prices"
/>
```

### Table with Footer

```tsx
<Table
  headers={['Coin', 'Price']}
  rows={[
    ['Bitcoin', '$63,022'],
    ['Ethereum', '$3,456'],
  ]}
  footerContent="Total: 2 coins"
/>
```

### Hybrid Mode: Custom Footer

```tsx
<Table
  headers={['Coin', 'Price']}
  rows={[['Bitcoin', '$63,022']]}
  striped
>
  <Table.Footer colSpan={2}>
    <div className="flex items-center gap-2 font-bold">
      <span>Total:</span>
      <span className="text-green-600">$63,022</span>
    </div>
  </Table.Footer>
</Table>
```

### Hybrid Mode: Custom Header

```tsx
<Table
  rows={[['Bitcoin', '$63,022']]}
  striped
>
  <Table.Head>
    <Table.Column columnKey="coin" align="left">Coin</Table.Column>
    <Table.Column columnKey="price" align="right">Price</Table.Column>
  </Table.Head>
</Table>
```

### Hybrid Mode: Custom Empty State

```tsx
<Table
  headers={['Coin', 'Price']}
  rows={[]}  // ← Пустые данные
  striped
>
  <Table.Empty colSpan={2}>
    <div className="flex flex-col items-center gap-2 py-8">
      <span className="text-4xl">😔</span>
      <p className="text-gray-500">No cryptocurrencies found</p>
    </div>
  </Table.Empty>
</Table>
```

### Advanced Mode: Custom Body с утилитами

```tsx
import { Table } from "@/components/ui";
import { getRowClasses, getCellClasses } from "@/components/ui/Table/utils";

<Table>
  <Table.Head>
    <Table.Column columnKey="name" align="left">Name</Table.Column>
    <Table.Column columnKey="price" align="right">Price</Table.Column>
  </Table.Head>
  <Table.Body>
    {rows.map((row, i) => (
      <Table.Row rowKey={row.id}>
        <Table.Cell className={getCellClasses({ align: "left" })}>
          {row.name}
        </Table.Cell>
        <Table.Cell className={getCellClasses({ align: "right" })}>
          {row.price}
        </Table.Cell>
      </Table.Row>
    ))}
  </Table.Body>
</Table>
```

---

## 🔧 Утилиты

### getRowClasses()

Генерация классов для строки с учётом striped, hover:

```tsx
import { getRowClasses } from "@/components/ui/Table/utils";

const rowClasses = getRowClasses({
  index: 0,
  striped: true,
  hoverable: true,
});

// Returns: "bg-gray-50 hover:bg-gray-100 transition-colors duration-150"
```

### getCellClasses()

Генерация классов для ячейки с учётом compact, bordered, align:

```tsx
import { getCellClasses } from "@/components/ui/Table/utils";

const cellClass = getCellClasses({
  compact: true,
  bordered: false,
  align: "right",
});

// Returns: "px-4 whitespace-nowrap text-sm font-medium text-gray-600 py-2 text-right"
```

### getTableClasses()

Генерация классов для таблицы:

```tsx
import { getTableClasses } from "@/components/ui/Table/utils";

const tableClass = getTableClasses({
  bordered: true,
  className: "custom-class",
});

// Returns: "min-w-full divide-y divide-gray-200 border custom-class"
```

### cn()

Для продвинутой кастомизации используйте утилиту `cn()`:

```tsx
import { cn } from "@/utils/cn";
import { tableClasses as cls } from "@/components/ui/Table/styleClasses";

const cellClass = cn(
  cls.cell,
  cls.cellText,
  compact ? cls.cellCompact : cls.cellDefault,
  bordered && cls.cellBordered,
);
```

---

## 📊 Тесты

Table компонент имеет **14 тестов** с полным покрытием:

- ✅ Рендер заголовков
- ✅ Рендер строк
- ✅ Пустое состояние
- ✅ Divided, bordered, striped стили
- ✅ Hover эффекты
- ✅ Compact режим
- ✅ Caption для accessibility
- ✅ Footer rendering
- ✅ Typography классы

---

## 📁 Файлы

| Файл                          | Описание                    |
| ----------------------------- | --------------------------- |
| `Table.tsx`                   | Основной компонент (263 строки) |
| `TableHead.tsx`               | Заголовок таблицы (83 строки) |
| `TableBody.tsx`               | Тело таблицы (139 строк) |
| `TableRow.tsx`                | Строка таблицы (45 строк) |
| `TableCell.tsx`               | Ячейка таблицы (54 строки) |
| `TableColumn.tsx`             | Колонка таблицы (87 строк) |
| `TableFooter.tsx`             | Подвал таблицы (70 строк) |
| `TableCaption.tsx`            | Заголовок (accessibility) (44 строки) |
| `TableEmpty.tsx`              | Пустое состояние (80 строк) |
| `styleClasses.ts`             | Централизованные стили (81 строка) |
| `utils.ts`                    | Утилиты для классов (68 строк) |
| `Table.test.tsx`              | Тесты (14 тестов) |
| `index.ts`                    | Экспорты компонентов |

---

## 🔗 Связанные компоненты

- [List](./List.md) — Гибкий список
- [cn() Utility](../../utils/cn.md) — Утилита для классов

---

**Дата:** 2026-03-23  
**Версия:** 1.1.0  
**Статус:** ✅ Production Ready
