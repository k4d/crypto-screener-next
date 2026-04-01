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
						<span className="text-sm font-light text-gray-600 ml-1">v1.0</span>
					</h1>
					<p className="font-light text-base text-gray-600">
						Библиотека компонентов Crypto Screener Next
					</p>
				</div>

				{/* List Component */}
				<section>
					<Card className="p-8 space-y-2">
						<div className="space-y-0">
							<h2 className="text-2xl font-bold text-gray-800">
								List Component
							</h2>
							<p className="font-light text-base text-gray-600">
								Гибкий список для отображения элементов
							</p>
						</div>

						{/* Simple List */}
						<div className="space-y-2">
							<h3 className="text-lg font-semibold text-gray-900">
								Simple List
							</h3>
							<List
								items={[
									"Employee Management: CRUD operations, profiles, and department logic",
									"Leave Tracking: Application and approval workflow",
									"Payroll System: Generating payslips and managing salary structures",
									"Data Analysis",
									"Game Development Solutions",
								]}
								divided
								bordered
							/>
						</div>

						{/* Hover List */}
						<div className="space-y-2">
							<h3 className="text-lg font-semibold text-gray-900">
								Hover List
							</h3>
							<List
								items={[
									"Employee Management: CRUD operations",
									"Leave Tracking: Application workflow",
									"Payroll System: Generating payslips",
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
								items={["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"]}
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
							<h3 className="text-lg font-semibold text-gray-900">
								Empty State
							</h3>
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
					</Card>
				</section>

				{/* Table Component */}
				<section>
					<Card className="p-8 space-y-2">
						<div className="space-y-0">
							<h2 className="text-2xl font-bold text-gray-800">
								Table Component
							</h2>
							<p className="font-light text-base text-gray-600">
								Таблица данных с поддержкой Basic/Hybrid/Advanced режимов
							</p>
						</div>
						{/* Basic Table */}
						<div className="space-y-2">
							<h3 className="text-lg font-semibold text-gray-900">
								Basic Mode
							</h3>
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
							<h3 className="text-lg font-semibold text-gray-900">
								Empty State
							</h3>
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
					</Card>
				</section>
			</div>
		</div>
	);
}
