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

### Продвинутый режим

```tsx
import { Table } from "@/components/ui";

<Table>
  <Table.Caption>Cryptocurrency prices</Table.Caption>
  <Table.Head>
    <TableColumn columnKey="name">Name</TableColumn>
    <TableColumn columnKey="price" align="right">Price</TableColumn>
  </Table.Head>
  <Table.Body>
    <TableRow rowKey="1">
      <TableCell>Bitcoin</TableCell>
      <TableCell align="right">$63,022</TableCell>
    </TableRow>
  </Table.Body>
  <Table.Footer>
    <TableRow rowKey="footer">
      <TableCell colSpan={2}>Total: $63,022</TableCell>
    </TableRow>
  </Table.Footer>
</Table>
```

---

## 📋 Props

### Table

| Prop               | Тип                  | По умолчанию | Описание                                      |
| ------------------ | -------------------- | ------------ | --------------------------------------------- |
| **headers**        | `TableCell[]`        | —            | Заголовки таблицы (массив строк/чисел)        |
| **rows**           | `TableRow[]`         | —            | Строки таблицы (массив массивов)              |
| **className**      | `string`             | —            | Дополнительные CSS классы                     |
| **emptyContent**   | `string`             | `"No data"`  | Текст для пустого состояния                   |
| **striped**        | `boolean`            | `false`      | Чередование цветов строк (zebra striping)     |
| **hoverable**      | `boolean`            | `true`       | Hover эффект на строках                       |
| **bordered**       | `boolean`            | `false`      | Рамка вокруг таблицы и ячеек                  |
| **compact**        | `boolean`            | `false`      | Компактный режим (уменьшенные отступы)        |
| **captionContent** | `string`             | —            | Заголовок таблицы (accessibility)             |
| **footerContent**  | `ReactNode`          | —            | Содержимое подвала таблицы                    |
| **children**       | `ReactNode`          | —            | Кастомные дети (продвинутый режим)            |

### TableHead

| Prop                | Тип             | По умолчанию | Описание                          |
| ------------------- | --------------- | ------------ | --------------------------------- |
| **columns**         | `ReactNode[]`   | —            | Массив заголовков колонок         |
| **columnClassName** | `string`        | —            | Класс для всех ячеек заголовка    |
| **className**       | `string`        | —            | Класс для thead элемента          |
| **children**        | `ReactNode`     | —            | Кастомные дети (TableColumn)      |

### TableBody

| Prop            | Тип             | По умолчанию | Описание                          |
| --------------- | --------------- | ------------ | --------------------------------- |
| **rows**        | `ReactNode[][]` | —            | Массив строк (2D массив)          |
| **cellClassName** | `string`      | —            | Класс для каждой ячейки           |
| **striped**     | `boolean`       | `false`      | Полосатые строки                  |
| **hoverable**   | `boolean`       | `false`      | Hover эффект                      |
| **emptyContent** | `ReactNode`    | —            | Пустое состояние                  |
| **emptyColSpan** | `number`       | —            | ColSpan для пустого состояния     |
| **className**   | `string`        | —            | Класс для tbody элемента          |
| **children**    | `ReactNode`     | —            | Кастомные дети (TableRow)         |

### TableRow

| Prop        | Тип       | По умолчанию | Описание                    |
| ----------- | --------- | ------------ | --------------------------- |
| **index**   | `number`  | —            | Индекс строки (для striped) |
| **rowKey**  | `string`  | —            | Уникальный ключ строки      |
| **striped** | `boolean` | `false`      | Полосатая строка            |
| **hoverable** | `boolean` | `false`    | Hover эффект                |
| **className** | `string`  | —          | Дополнительные классы       |
| **children**  | `ReactNode` | —        | Содержимое строки (TableCell) |

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
| **colSpan**     | `number`        | —            | Количество колонок (обязательно)  |
| **footerContent** | `ReactNode`   | —            | Содержимое подвала                |
| **className**   | `string`        | —            | Дополнительные классы             |
| **children**    | `ReactNode`     | —            | Кастомные дети (переопределяет footerContent) |

### TableCaption

| Prop             | Тип       | По умолчанию | Описание                    |
| ---------------- | --------- | ------------ | --------------------------- |
| **captionContent** | `string` | —            | Текст заголовка таблицы     |

### TableEmpty

| Prop            | Тип             | По умолчанию | Описание                          |
| --------------- | --------------- | ------------ | --------------------------------- |
| **colSpan**     | `number`        | `1`          | Количество колонок                |
| **className**   | `string`        | —            | Дополнительные классы             |
| **emptyContent** | `ReactNode`    | —            | Содержимое пустого состояния      |

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

### Advanced Table with Custom Alignment

```tsx
<Table>
  <Table.Head>
    <TableColumn columnKey="name" align="left">Name</TableColumn>
    <TableColumn columnKey="price" align="right">Price</TableColumn>
    <TableColumn columnKey="change" align="right">24h Change</TableColumn>
  </Table.Head>
  <Table.Body>
    <TableRow rowKey="1">
      <TableCell>Bitcoin</TableCell>
      <TableCell align="right">$63,022</TableCell>
      <TableCell align="right" className="text-green-600">+2.5%</TableCell>
    </TableRow>
  </Table.Body>
</Table>
```

---

## 🔧 Утилиты

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
| `Table.tsx`                   | Основной компонент          |
| `TableHead.tsx`               | Заголовок таблицы           |
| `TableBody.tsx`               | Тело таблицы                |
| `TableRow.tsx`                | Строка таблицы              |
| `TableCell.tsx`               | Ячейка таблицы              |
| `TableColumn.tsx`             | Колонка таблицы             |
| `TableFooter.tsx`             | Подвал таблицы              |
| `TableCaption.tsx`            | Заголовок (accessibility)   |
| `TableEmpty.tsx`              | Пустое состояние            |
| `styleClasses.ts`             | Централизованные стили      |
| `Table.test.tsx`              | Тесты                       |
| `index.ts`                    | Экспорты                    |

---

## 🔗 Связанные компоненты

- [List](./List.md) — Гибкий список
- [cn() Utility](../../utils/cn.md) — Утилита для классов

---

**Дата:** 2025-03-02  
**Версия:** 1.0.0
