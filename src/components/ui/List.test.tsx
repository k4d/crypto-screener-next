import { describe, expect, it } from "bun:test";
import { render, screen } from "@testing-library/react";
import { List } from "@/components/ui";

describe("List", () => {
	it("renders items correctly", () => {
		render(<List items={["A", "B", "C"]} />);

		expect(screen.getByText("A")).toBeInTheDocument();
		expect(screen.getByText("B")).toBeInTheDocument();
		expect(screen.getByText("C")).toBeInTheDocument();
	});

	it("renders with as='div'", () => {
		const { container } = render(<List as="div" items={["A", "B"]} />);

		const list = container.firstChild as Element;
		expect(list?.tagName).toBe("DIV");
	});

	it("renders with as='ul' (default)", () => {
		const { container } = render(<List items={["A", "B"]} />);

		const list = container.firstChild as Element;
		expect(list?.tagName).toBe("UL");
	});

	it("renders with as='ol'", () => {
		const { container } = render(<List as="ol" items={["A", "B"]} />);

		const list = container.firstChild as Element;
		expect(list?.tagName).toBe("OL");
	});

	it("renders empty state when items is empty", () => {
		render(<List items={[]} emptyText="No items" />);

		expect(screen.getByText("No items")).toBeInTheDocument();
	});

	it("renders children instead of items", () => {
		render(
			<List>
				<div>Custom Child</div>
			</List>,
		);

		expect(screen.getByText("Custom Child")).toBeInTheDocument();
	});

	it("applies divided classes", () => {
		const { container } = render(<List items={["A"]} divided />);

		const list = container.firstChild as Element;
		expect(list).toHaveClass("divide-y");
	});

	it("applies bordered classes", () => {
		const { container } = render(<List items={["A"]} bordered />);

		const list = container.firstChild as Element;
		expect(list).toHaveClass("border");
	});

	it("applies striped classes to items", () => {
		render(<List items={["A", "B", "C"]} striped />);

		const listItems = screen.getAllByRole("listitem");

		expect(listItems[0]).toHaveClass("bg-white");
		expect(listItems[1]).toHaveClass("bg-gray-50");
		expect(listItems[2]).toHaveClass("bg-white");
	});

	it("applies hover classes to items", () => {
		render(<List items={["A"]} hover />);

		const listItem = screen.getByText("A").closest("li");
		expect(listItem).toHaveClass("hover:bg-gray-100");
		expect(listItem).toHaveClass("cursor-pointer");
	});

	it("applies custom className", () => {
		const { container } = render(
			<List items={["A"]} className="custom-class" />,
		);

		const list = container.firstChild as Element;
		expect(list).toHaveClass("custom-class");
	});

	it("applies typography classes to items", () => {
		render(<List items={["A"]} />);

		const listItem = screen.getByText("A").closest("li");

		expect(listItem).toHaveClass("text-sm");
		expect(listItem).toHaveClass("font-medium");
		expect(listItem).toHaveClass("text-gray-600");
	});

	it("applies typography classes to empty state", () => {
		render(<List items={[]} emptyText="No items" />);

		const emptyState = screen.getByText("No items");

		expect(emptyState).toHaveClass("text-sm");
		expect(emptyState).toHaveClass("font-medium");
		expect(emptyState).toHaveClass("text-gray-500");
	});

	it("applies compact classes to items", () => {
		render(<List items={["A", "B"]} compact />);

		const listItems = screen.getAllByRole("listitem");

		expect(listItems[0]).toHaveClass("p-2");
		expect(listItems[0]).not.toHaveClass("p-4");
		expect(listItems[1]).toHaveClass("p-2");
		expect(listItems[1]).not.toHaveClass("p-4");
	});
});

describe("List.Item", () => {
	it("renders with li by default", () => {
		const { container } = render(<List.Item>Item</List.Item>);

		const item = container.firstChild as Element;
		expect(item?.tagName).toBe("LI");
	});

	it("renders with div when as='div'", () => {
		const { container } = render(<List.Item as="div">Item</List.Item>);

		const item = container.firstChild as Element;
		expect(item?.tagName).toBe("DIV");
	});

	it("applies hover classes", () => {
		const { container } = render(<List.Item hover>Item</List.Item>);

		const item = container.firstChild as Element;
		expect(item).toHaveClass("hover:bg-gray-100");
		expect(item).toHaveClass("cursor-pointer");
	});

	it("applies custom className", () => {
		const { container } = render(
			<List.Item className="custom-class">Item</List.Item>,
		);

		const item = container.firstChild as Element;
		expect(item).toHaveClass("custom-class");
	});

	it("renders children content", () => {
		render(<List.Item>Test Content</List.Item>);

		expect(screen.getByText("Test Content")).toBeInTheDocument();
	});

	it("applies typography classes", () => {
		const { container } = render(<List.Item>Item</List.Item>);

		const item = container.firstChild as Element;

		expect(item).toHaveClass("text-sm");
		expect(item).toHaveClass("font-medium");
		expect(item).toHaveClass("text-gray-600");
	});

	it("applies compact classes", () => {
		const { container } = render(<List.Item compact>Item</List.Item>);

		const item = container.firstChild as Element;

		expect(item).toHaveClass("p-2");
		expect(item).not.toHaveClass("p-4");
	});
});
