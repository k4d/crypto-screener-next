export interface TableClasses {
	// Container
	container: string;
	table: string;
	tableBordered: string;

	// Header
	header: string;
	headerCell: string;
	headerCellText: string;

	// Body
	body: string;

	// Row
	row: string;
	rowStriped: string;
	rowHover: string;
	rowHoverTransition: string;

	// Cell
	cell: string;
	cellText: string;
	cellDefault: string;
	cellCompact: string;
	cellBordered: string;
	cellEmpty: string;
	cellEmptyText: string;
	cellAlignLeft: string;
	cellAlignCenter: string;
	cellAlignRight: string;

	// Footer
	footer: string;
	footerCell: string;

	// Caption
	caption: string;
}

export const tableClasses: TableClasses = {
	// Container
	container: "overflow-x-auto",
	table: "min-w-full divide-y divide-gray-200",
	tableBordered: "border",

	// Header
	header: "bg-gray-50",
	headerCell: "p-4 text-left",
	headerCellText: "text-xs font-medium text-gray-400 uppercase tracking-wider",

	// Body
	body: "bg-white divide-y divide-gray-200",

	// Row
	row: "bg-white",
	rowStriped: "bg-gray-50",
	rowHover: "hover:bg-gray-100",
	rowHoverTransition: "transition-colors duration-150",

	// Cell
	cell: "px-4 whitespace-nowrap",
	cellText: "text-sm font-medium text-gray-600",
	cellDefault: "py-4",
	cellCompact: "py-2",
	cellBordered: "border",
	cellEmpty: "p-4",
	cellEmptyText: "text-center text-sm text-gray-500",
	cellAlignLeft: "text-left",
	cellAlignCenter: "text-center",
	cellAlignRight: "text-right",

	// Footer
	footer: "bg-gray-50 font-semibold",
	footerCell:
		"p-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider",

	// Caption
	caption: "sr-only",
};
