import { Card } from "@heroui/react";
import { List, Table } from "@/components/ui";

export default function UIkitPage() {
	return (
		<div className="min-h-screen">
			<div className="max-w-7xl mx-auto space-y-8">
				{/* Header */}
				<div className="text-center">
					<h1 className="text-4xl font-extrabold text-gray-800">
						UI Kit
						<span className="text-sm font-light text-gray-600 ml-1">
							v1.1.0
						</span>
					</h1>
					<p className="font-light text-base text-gray-600">
						Библиотека компонентов Crypto Screener Next
					</p>
				</div>

				{/* List Component */}
				<Card className="p-8 space-y-2 rounded-xl bg-linear-to-br from-slate-50 to-white shadow-xs">
					<div className="space-y-0">
						<h2 className="text-2xl font-bold text-gray-800">List Component</h2>
						<p className="font-light text-sm text-gray-600">
							Гибкий список для отображения элементов
						</p>
					</div>

					{/* Simple List */}
					<div className="space-y-2">
						<h3 className="text-lg font-semibold text-gray-900">Simple List</h3>
						<List
							items={[
								"Bitcoin (BTC) - $110,925",
								"Ethereum (ETH) - $2,776",
								"Solana (SOL) - $157",
								"XRP (XRP) - $2.44",
								"Cardano (ADA) - $1.05",
							]}
							divided
							bordered
						/>
					</div>

					{/* Hover List */}
					<div className="space-y-2">
						<h3 className="text-lg font-semibold text-gray-900">Hover List</h3>
						<List
							items={[
								"Bitcoin - Market Cap: $2.2T",
								"Ethereum - Market Cap: $334.63B",
								"Solana - Market Cap: $75.8B",
							]}
							hover
						/>
					</div>

					{/* Striped List */}
					<div className="space-y-2">
						<h3 className="text-lg font-semibold text-gray-900">
							Striped List
						</h3>
						<List
							items={[
								"BTC +2.5% ↗",
								"ETH +1.8% ↗",
								"SOL -0.5% ↘",
								"XRP +3.2% ↗",
								"ADA -1.1% ↘",
							]}
							striped
							bordered
						/>
					</div>

					{/* Compact List */}
					<div className="space-y-2">
						<h3 className="text-lg font-semibold text-gray-900">
							Compact List
						</h3>
						<List
							items={["Compact 1", "Compact 2", "Compact 3"]}
							compact
							divided
						/>
					</div>

					{/* Empty State */}
					<div className="space-y-2">
						<h3 className="text-lg font-semibold text-gray-900">Empty State</h3>
						<List items={[]} emptyText="No items to display." bordered />
					</div>

					{/* Custom Children */}
					<div className="space-y-2">
						<h3 className="text-lg font-semibold text-gray-900">
							Custom Children
						</h3>
						<List divided>
							<List.Item hover>Custom Item 1</List.Item>
							<List.Item>Custom Item 2</List.Item>
							<List.Item>Custom Item 3</List.Item>
						</List>
					</div>

					{/* Props Documentation */}
					<div className="space-y-2 pt-4 border-t">
						<h3 className="text-lg font-semibold text-gray-900">List Props</h3>
						<div className="overflow-x-auto">
							<table className="w-full text-sm border text-left">
								<thead>
									<tr className="bg-gray-50 border-b">
										<th className="px-3 py-2 font-semibold">Prop</th>
										<th className="px-3 py-2 font-semibold">Type</th>
										<th className="px-3 py-2 font-semibold">Default</th>
										<th className="px-3 py-2 font-semibold">Description</th>
									</tr>
								</thead>
								<tbody>
									<tr className="border-b hover:bg-gray-50">
										<td className="px-3 py-2 font-mono text-blue-600">items</td>
										<td className="px-3 py-2 font-mono text-gray-600">
											ReactNode[]
										</td>
										<td className="px-3 py-2 text-gray-500">—</td>
										<td className="px-3 py-2">Массив элементов</td>
									</tr>
									<tr className="border-b hover:bg-gray-50">
										<td className="px-3 py-2 font-mono text-blue-600">
											className
										</td>
										<td className="px-3 py-2 font-mono text-gray-600">
											string
										</td>
										<td className="px-3 py-2 text-gray-500">—</td>
										<td className="px-3 py-2">Дополнительные CSS классы</td>
									</tr>
									<tr className="border-b hover:bg-gray-50">
										<td className="px-3 py-2 font-mono text-blue-600">as</td>
										<td className="px-3 py-2 font-mono text-gray-600">
											"ul" | "ol" | "div"
										</td>
										<td className="px-3 py-2 text-gray-500">"ul"</td>
										<td className="px-3 py-2">HTML элемент контейнера</td>
									</tr>
									<tr className="border-b hover:bg-gray-50">
										<td className="px-3 py-2 font-mono text-blue-600">
											divided
										</td>
										<td className="px-3 py-2 font-mono text-gray-600">
											boolean
										</td>
										<td className="px-3 py-2 text-gray-500">false</td>
										<td className="px-3 py-2">Разделители между элементами</td>
									</tr>
									<tr className="border-b hover:bg-gray-50">
										<td className="px-3 py-2 font-mono text-blue-600">
											bordered
										</td>
										<td className="px-3 py-2 font-mono text-gray-600">
											boolean
										</td>
										<td className="px-3 py-2 text-gray-500">false</td>
										<td className="px-3 py-2">Рамка вокруг списка</td>
									</tr>
									<tr className="border-b hover:bg-gray-50">
										<td className="px-3 py-2 font-mono text-blue-600">
											striped
										</td>
										<td className="px-3 py-2 font-mono text-gray-600">
											boolean
										</td>
										<td className="px-3 py-2 text-gray-500">false</td>
										<td className="px-3 py-2">Чередование цветов</td>
									</tr>
									<tr className="border-b hover:bg-gray-50">
										<td className="px-3 py-2 font-mono text-blue-600">
											compact
										</td>
										<td className="px-3 py-2 font-mono text-gray-600">
											boolean
										</td>
										<td className="px-3 py-2 text-gray-500">false</td>
										<td className="px-3 py-2">Компактный режим</td>
									</tr>
									<tr className="border-b hover:bg-gray-50">
										<td className="px-3 py-2 font-mono text-blue-600">hover</td>
										<td className="px-3 py-2 font-mono text-gray-600">
											boolean
										</td>
										<td className="px-3 py-2 text-gray-500">false</td>
										<td className="px-3 py-2">Hover эффект</td>
									</tr>
									<tr className="border-b hover:bg-gray-50">
										<td className="px-3 py-2 font-mono text-blue-600">
											emptyText
										</td>
										<td className="px-3 py-2 font-mono text-gray-600">
											string
										</td>
										<td className="px-3 py-2 text-gray-500">"No items"</td>
										<td className="px-3 py-2">Текст пустого состояния</td>
									</tr>
									<tr className="border-b hover:bg-gray-50">
										<td className="px-3 py-2 font-mono text-blue-600">
											children
										</td>
										<td className="px-3 py-2 font-mono text-gray-600">
											ReactNode
										</td>
										<td className="px-3 py-2 text-gray-500">—</td>
										<td className="px-3 py-2">Кастомные дети</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</Card>

				{/* Table Component */}
				<Card className="p-8 space-y-2 rounded-xl bg-linear-to-br from-slate-50 to-white shadow-xs">
					<div className="space-y-0">
						<h2 className="text-2xl font-bold text-gray-800">
							Table Component
						</h2>
						<p className="font-light text-sm text-gray-600">
							Таблица данных с поддержкой Basic / Hybrid / Advanced режимов
						</p>
					</div>
					{/* Basic Table */}
					<div className="space-y-2">
						<h3 className="text-lg font-semibold text-gray-900">Basic Mode</h3>
						<Table
							headers={["Name", "Price", "Volume", "Market Cap"]}
							rows={[
								["Bitcoin", "$110,925", "$62B", "$2.2T"],
								["Ethereum", "$2,776", "$29B", "$334.63B"],
								["XRP", "$2.44", "$5.29B", "$144.59B"],
							]}
							striped
							hoverable
						/>
					</div>

					{/* Compact Table */}
					<div className="space-y-2">
						<h3 className="text-lg font-semibold text-gray-900">
							Compact Mode
						</h3>
						<Table
							headers={["Coin", "Price"]}
							rows={[
								["Bitcoin", "$110,925"],
								["Ethereum", "$2,776"],
							]}
							compact
							bordered
						/>
					</div>

					{/* Empty State */}
					<div className="space-y-2">
						<h3 className="text-lg font-semibold text-gray-900">Empty State</h3>
						<Table
							headers={["Name", "Price"]}
							rows={[]}
							emptyContent="No market data yet."
							striped
						/>
					</div>

					{/* Hybrid: Custom Footer */}
					<div className="space-y-2">
						<h3 className="text-lg font-semibold text-gray-900">
							Hybrid Mode: Custom Footer
						</h3>
						<Table
							headers={["Name", "Price"]}
							rows={[
								["Bitcoin", "$63,022"],
								["Ethereum", "$3,456"],
							]}
							striped
						>
							<Table.Footer colSpan={2}>
								<div className="flex items-center gap-2 font-bold">
									<span>Total:</span>
									<span className="text-green-600">$66,478</span>
								</div>
							</Table.Footer>
						</Table>
					</div>

					{/* Hybrid: Custom Header */}
					<div className="space-y-2">
						<h3 className="text-lg font-semibold text-gray-900">
							Hybrid Mode: Custom Header
						</h3>
						<Table rows={[["Bitcoin", "$63,022", "+2.5%"]]} striped>
							<Table.Head>
								<Table.Column columnKey="coin" align="left">
									Coin
								</Table.Column>
								<Table.Column columnKey="price" align="right">
									Price
								</Table.Column>
								<Table.Column columnKey="change" align="right">
									Change
								</Table.Column>
							</Table.Head>
						</Table>
					</div>

					{/* Hybrid: Custom Empty */}
					<div className="space-y-2">
						<h3 className="text-lg font-semibold text-gray-900">
							Hybrid Mode: Custom Empty
						</h3>
						<Table headers={["Name", "Price"]} rows={[]} striped>
							<Table.Empty colSpan={2}>
								<div className="flex flex-col items-center gap-2 py-8">
									<span className="text-4xl">😔</span>
									<p className="text-gray-500">No cryptocurrencies found</p>
								</div>
							</Table.Empty>
						</Table>
					</div>

					{/* Hybrid: Caption + Footer */}
					<div className="space-y-2">
						<h3 className="text-lg font-semibold text-gray-900">
							Hybrid Mode: Caption + Footer
						</h3>
						<Table
							headers={["Name", "Price", "Volume", "Market Cap"]}
							rows={[]}
							striped
						>
							<Table.Caption>Cryptocurrency prices</Table.Caption>
							<Table.Empty colSpan={4} className="text-red-600">
								No market data yet.
							</Table.Empty>
							<Table.Footer>
								Total: 5 coins{" "}
								<span className="text-green-600 font-extrabold">$2.53T</span>.
							</Table.Footer>
						</Table>
					</div>

					{/* Advanced: Full Custom */}
					<div className="space-y-2">
						<h3 className="text-lg font-semibold text-gray-900">
							Advanced Mode: Full Custom
						</h3>
						<Table rows={[]} striped>
							<Table.Caption>Custom Table Caption</Table.Caption>
							<Table.Head>
								<Table.Column columnKey="name" align="left">
									Name
								</Table.Column>
								<Table.Column columnKey="value" align="right">
									Value
								</Table.Column>
							</Table.Head>
							<Table.Body>
								<Table.Row rowKey="1">
									<Table.Cell>Custom Row 1</Table.Cell>
									<Table.Cell align="right">$100</Table.Cell>
								</Table.Row>
								<Table.Row rowKey="2">
									<Table.Cell>Custom Row 2</Table.Cell>
									<Table.Cell align="right">$200</Table.Cell>
								</Table.Row>
							</Table.Body>
							<Table.Footer colSpan={2}>
								<div className="font-bold text-right">Total: $300</div>
							</Table.Footer>
						</Table>
					</div>

					{/* Props Documentation: Main Table */}
					<div className="space-y-2 pt-4 border-t">
						<h3 className="text-lg font-semibold text-gray-900">Table Props</h3>
						<div className="overflow-x-auto">
							<table className="w-full text-sm border text-left">
								<thead>
									<tr className="bg-gray-50 border-b">
										<th className="px-3 py-2 font-semibold">Prop</th>
										<th className="px-3 py-2 font-semibold">Type</th>
										<th className="px-3 py-2 font-semibold">Default</th>
										<th className="px-3 py-2 font-semibold">Description</th>
									</tr>
								</thead>
								<tbody>
									<tr className="border-b hover:bg-gray-50">
										<td className="px-3 py-2 font-mono text-blue-600">
											headers
										</td>
										<td className="px-3 py-2 font-mono text-gray-600">
											TableCell[]
										</td>
										<td className="px-3 py-2 text-gray-500">—</td>
										<td className="px-3 py-2">
											Заголовки таблицы (опционально)
										</td>
									</tr>
									<tr className="border-b hover:bg-gray-50">
										<td className="px-3 py-2 font-mono text-blue-600">rows</td>
										<td className="px-3 py-2 font-mono text-gray-600">
											TableRow[]
										</td>
										<td className="px-3 py-2 text-gray-500">—</td>
										<td className="px-3 py-2">
											Строки таблицы (массив массивов)
										</td>
									</tr>
									<tr className="border-b hover:bg-gray-50">
										<td className="px-3 py-2 font-mono text-blue-600">
											className
										</td>
										<td className="px-3 py-2 font-mono text-gray-600">
											string
										</td>
										<td className="px-3 py-2 text-gray-500">—</td>
										<td className="px-3 py-2">Дополнительные CSS классы</td>
									</tr>
									<tr className="border-b hover:bg-gray-50">
										<td className="px-3 py-2 font-mono text-blue-600">
											emptyContent
										</td>
										<td className="px-3 py-2 font-mono text-gray-600">
											string
										</td>
										<td className="px-3 py-2 text-gray-500">"No data"</td>
										<td className="px-3 py-2">Текст пустого состояния</td>
									</tr>
									<tr className="border-b hover:bg-gray-50">
										<td className="px-3 py-2 font-mono text-blue-600">
											striped
										</td>
										<td className="px-3 py-2 font-mono text-gray-600">
											boolean
										</td>
										<td className="px-3 py-2 text-gray-500">false</td>
										<td className="px-3 py-2">Чередование цветов строк</td>
									</tr>
									<tr className="border-b hover:bg-gray-50">
										<td className="px-3 py-2 font-mono text-blue-600">
											hoverable
										</td>
										<td className="px-3 py-2 font-mono text-gray-600">
											boolean
										</td>
										<td className="px-3 py-2 text-gray-500">true</td>
										<td className="px-3 py-2">Hover эффект на строках</td>
									</tr>
									<tr className="border-b hover:bg-gray-50">
										<td className="px-3 py-2 font-mono text-blue-600">
											bordered
										</td>
										<td className="px-3 py-2 font-mono text-gray-600">
											boolean
										</td>
										<td className="px-3 py-2 text-gray-500">false</td>
										<td className="px-3 py-2">Рамка вокруг таблицы и ячеек</td>
									</tr>
									<tr className="border-b hover:bg-gray-50">
										<td className="px-3 py-2 font-mono text-blue-600">
											compact
										</td>
										<td className="px-3 py-2 font-mono text-gray-600">
											boolean
										</td>
										<td className="px-3 py-2 text-gray-500">false</td>
										<td className="px-3 py-2">Компактный режим</td>
									</tr>
									<tr className="border-b hover:bg-gray-50">
										<td className="px-3 py-2 font-mono text-blue-600">
											captionContent
										</td>
										<td className="px-3 py-2 font-mono text-gray-600">
											string
										</td>
										<td className="px-3 py-2 text-gray-500">—</td>
										<td className="px-3 py-2">Заголовок для accessibility</td>
									</tr>
									<tr className="border-b hover:bg-gray-50">
										<td className="px-3 py-2 font-mono text-blue-600">
											footerContent
										</td>
										<td className="px-3 py-2 font-mono text-gray-600">
											ReactNode
										</td>
										<td className="px-3 py-2 text-gray-500">—</td>
										<td className="px-3 py-2">Содержимое подвала</td>
									</tr>
									<tr className="border-b hover:bg-gray-50">
										<td className="px-3 py-2 font-mono text-blue-600">
											children
										</td>
										<td className="px-3 py-2 font-mono text-gray-600">
											ReactNode
										</td>
										<td className="px-3 py-2 text-gray-500">—</td>
										<td className="px-3 py-2">
											Кастомные дети (Hybrid/Advanced)
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>

					{/* Props Documentation: Sub-components */}
					<div className="space-y-2 pt-4 border-t">
						<h3 className="text-lg font-semibold text-gray-900">
							Table Sub-components
						</h3>
						<div className="overflow-x-auto">
							<table className="w-full text-sm border text-left">
								<thead>
									<tr className="bg-gray-50 border-b">
										<th className="px-3 py-2 font-semibold">Component</th>
										<th className="px-3 py-2 font-semibold">Props</th>
										<th className="px-3 py-2 font-semibold">Description</th>
									</tr>
								</thead>
								<tbody>
									<tr className="border-b hover:bg-gray-50">
										<td className="px-3 py-2 font-mono text-blue-600">
											Table.Caption
										</td>
										<td className="px-3 py-2 font-mono text-gray-600">
											captionContent?, children?
										</td>
										<td className="px-3 py-2">
											Подпись таблицы для accessibility
										</td>
									</tr>
									<tr className="border-b hover:bg-gray-50">
										<td className="px-3 py-2 font-mono text-blue-600">
											Table.Head
										</td>
										<td className="px-3 py-2 font-mono text-gray-600">
											columns?, columnClassName?, className?, children?
										</td>
										<td className="px-3 py-2">Заголовок таблицы</td>
									</tr>
									<tr className="border-b hover:bg-gray-50">
										<td className="px-3 py-2 font-mono text-blue-600">
											Table.Column
										</td>
										<td className="px-3 py-2 font-mono text-gray-600">
											columnKey, align?, className?, children
										</td>
										<td className="px-3 py-2">Колонка заголовка</td>
									</tr>
									<tr className="border-b hover:bg-gray-50">
										<td className="px-3 py-2 font-mono text-blue-600">
											Table.Body
										</td>
										<td className="px-3 py-2 font-mono text-gray-600">
											rows?, cellClassName?, striped?, hoverable?,
											emptyContent?, emptyColSpan?, className?, children?
										</td>
										<td className="px-3 py-2">Тело таблицы</td>
									</tr>
									<tr className="border-b hover:bg-gray-50">
										<td className="px-3 py-2 font-mono text-blue-600">
											Table.Row
										</td>
										<td className="px-3 py-2 font-mono text-gray-600">
											rowKey?, className?, children
										</td>
										<td className="px-3 py-2">Строка таблицы</td>
									</tr>
									<tr className="border-b hover:bg-gray-50">
										<td className="px-3 py-2 font-mono text-blue-600">
											Table.Cell
										</td>
										<td className="px-3 py-2 font-mono text-gray-600">
											align?, className?, children
										</td>
										<td className="px-3 py-2">Ячейка данных</td>
									</tr>
									<tr className="border-b hover:bg-gray-50">
										<td className="px-3 py-2 font-mono text-blue-600">
											Table.Empty
										</td>
										<td className="px-3 py-2 font-mono text-gray-600">
											colSpan?, className?, emptyContent?, children?
										</td>
										<td className="px-3 py-2">Пустое состояние</td>
									</tr>
									<tr className="border-b hover:bg-gray-50">
										<td className="px-3 py-2 font-mono text-blue-600">
											Table.Footer
										</td>
										<td className="px-3 py-2 font-mono text-gray-600">
											colSpan?, footerContent?, className?, children?
										</td>
										<td className="px-3 py-2">Подвал таблицы</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</Card>
			</div>
		</div>
	);
}
