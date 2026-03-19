import { describe, expect, it } from "bun:test";
import { render, screen } from "@testing-library/react";
import { Table } from "@/components/ui";

describe("Table", () => {
	const headers = ["Name", "Price", "Volume"];
	const rows = [
		["Bitcoin", "$63,022", "$62B"],
		["Ethereum", "$3,456", "$29B"],
		["XRP", "$0.62", "$5B"],
	];

	it("renders headers correctly", () => {
		render(<Table headers={headers} rows={rows} />);

		expect(screen.getByText("Name")).toBeInTheDocument();
		expect(screen.getByText("Price")).toBeInTheDocument();
		expect(screen.getByText("Volume")).toBeInTheDocument();
	});

	it("renders rows correctly", () => {
		render(<Table headers={headers} rows={rows} />);

		expect(screen.getByText("Bitcoin")).toBeInTheDocument();
		expect(screen.getByText("$63,022")).toBeInTheDocument();
		expect(screen.getByText("Ethereum")).toBeInTheDocument();
		expect(screen.getByText("$3,456")).toBeInTheDocument();
	});

	it("renders empty state when rows is empty", () => {
		render(<Table headers={headers} rows={[]} emptyContent="No data" />);

		expect(screen.getByText("No data")).toBeInTheDocument();
	});

	it("renders with custom className", () => {
		const { container } = render(
			<Table headers={headers} rows={rows} className="custom-class" />,
		);

		const table = container.querySelector("table");
		expect(table).toHaveClass("custom-class");
	});

	it("applies striped classes to rows", () => {
		const { container } = render(
			<Table headers={headers} rows={rows} striped />,
		);

		const tableRows = container.querySelectorAll("tbody tr");

		expect(tableRows[0]).toHaveClass("bg-white");
		expect(tableRows[1]).toHaveClass("bg-gray-50");
		expect(tableRows[2]).toHaveClass("bg-white");
	});

	it("applies hover classes to rows", () => {
		const { container } = render(
			<Table headers={headers} rows={rows} hoverable />,
		);

		const tableRows = container.querySelectorAll("tbody tr");

		expect(tableRows[0]).toHaveClass("hover:bg-gray-100");
		expect(tableRows[0]).toHaveClass("transition-colors");
		expect(tableRows[0]).toHaveClass("duration-150");
	});

	it("applies bordered classes", () => {
		const { container } = render(
			<Table headers={headers} rows={rows} bordered />,
		);

		const table = container.querySelector("table");
		expect(table).toHaveClass("border");

		const firstCell = container.querySelector("td");
		expect(firstCell).toHaveClass("border");
	});

	it("applies compact classes", () => {
		const { container } = render(
			<Table headers={headers} rows={rows} compact />,
		);

		const firstCell = container.querySelector("td");
		expect(firstCell).toHaveClass("py-2");
	});

	it("renders caption for accessibility", () => {
		render(
			<Table
				headers={headers}
				rows={rows}
				captionContent="Cryptocurrency prices"
			/>,
		);

		const caption = screen.getByText("Cryptocurrency prices");
		expect(caption).toHaveClass("sr-only");
	});

	it("renders footer with footerContent", () => {
		render(
			<Table headers={headers} rows={rows} footerContent="Total: 3 coins" />,
		);

		expect(screen.getByText("Total: 3 coins")).toBeInTheDocument();
	});

	it("renders correct number of columns", () => {
		const { container } = render(<Table headers={headers} rows={rows} />);

		const headerCells = container.querySelectorAll("thead th");
		const bodyCells = container.querySelectorAll("tbody tr:first-child td");

		expect(headerCells).toHaveLength(3);
		expect(bodyCells).toHaveLength(3);
	});

	it("renders empty state with correct colspan", () => {
		const { container } = render(
			<Table headers={headers} rows={[]} emptyContent="No data" />,
		);

		const emptyCell = container.querySelector("td");
		expect(emptyCell).toHaveAttribute("colspan", "3");
	});

	it("applies typography classes to cells", () => {
		const { container } = render(<Table headers={headers} rows={rows} />);

		const firstCell = container.querySelector("td");

		expect(firstCell).toHaveClass("text-sm");
		expect(firstCell).toHaveClass("font-medium");
		expect(firstCell).toHaveClass("text-gray-600");
	});

	it("applies header typography classes", () => {
		const { container } = render(<Table headers={headers} rows={rows} />);

		const firstHeader = container.querySelector("th");

		expect(firstHeader).toHaveClass("text-xs");
		expect(firstHeader).toHaveClass("font-medium");
		expect(firstHeader).toHaveClass("text-gray-400");
		expect(firstHeader).toHaveClass("uppercase");
		expect(firstHeader).toHaveClass("tracking-wider");
	});
});
