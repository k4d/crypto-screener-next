/**
 * Merge multiple class names into a single string.
 * Filters out falsy values (null, undefined, empty strings, false).
 *
 * @param classes - Class names to merge
 * @returns Merged class names as a single string
 *
 * @example
 * ```tsx
 * cn("base", "class1", undefined, null, "class2")
 * // Returns: "base class1 class2"
 * ```
 *
 * @example
 * ```tsx
 * cn("btn", isActive && "btn-active", isDisabled && "btn-disabled")
 * ```
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
	return classes.filter(Boolean).join(" ");
}

/**
 * Alias for cn - full name for clarity.
 *
 * @param classes - Class names to merge
 * @returns Merged class names as a single string
 *
 * @example
 * ```tsx
 * mergeClasses("base", isActive && "active", className)
 * ```
 */
export function mergeClasses(
	...classes: (string | undefined | null | false)[]
): string {
	return cn(...classes);
}
