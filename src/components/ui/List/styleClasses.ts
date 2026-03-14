export interface ListClasses {
	// Container
	container: string;
	list: string;

	// Item
	item: string;
	itemText: string;
	itemCompact: string;

	// Item States
	itemEmpty: string;
	itemStriped: string;
	itemHover: string;

	// List Modifiers
	divided: string;
	bordered: string;

	// Utilities
	itemHoverTransition: string;
	itemHoverRounded: string;
}

export const listClasses: ListClasses = {
	// Container
	container: "",
	list: "rounded-lg",

	// Item
	item: "p-4",
	itemText: "text-sm font-medium text-gray-600",
	itemCompact: "px-2 py-1",

	// Item States
	itemEmpty: "p-4 text-center font-normal text-sm text-gray-500",
	itemStriped: "bg-gray-50",
	itemHover: "hover:bg-gray-100 cursor-pointer",

	// List Modifiers
	divided: "divide-y divide-gray-200",
	bordered: "border border-gray-200",

	// Utilities
	itemHoverTransition: "transition-colors duration-150",
	itemHoverRounded: "hover:rounded-lg",
};
