import { createChart, type IChartApi } from "lightweight-charts";
import { useLayoutEffect, useRef, useState } from "react";
import { DEFAULT_GRID_OPTIONS } from "./helpers";

interface UseChartProps {
	height: number;
	width?: number;
	showGrid: boolean;
	showPriceAxis: boolean;
	showTimeAxis: boolean;
}

interface UseChartReturn {
	chart: IChartApi | null;
	containerRef: React.RefObject<HTMLDivElement | null>;
	containerWidth: number;
}

/**
 * Hook for initializing and managing the Lightweight Charts instance.
 *
 * Creates the chart once on mount using `useLayoutEffect` with an empty
 * dependency array, caching the instance to prevent recreation on prop
 * changes. This preserves all series instances and prevents "Value is
 * undefined" runtime errors that occurred when the chart was destroyed
 * before series cleanup could run.
 *
 * When configuration props change (`height`, `width`, `showGrid`,
 * `showPriceAxis`, `showTimeAxis`), the chart is updated via
 * `chart.applyOptions()` followed by `chart.timeScale().fitContent()`
 * to ensure the data scales correctly to the new dimensions.
 *
 * Responsive width is handled via `window.addEventListener('resize')`,
 * as recommended in the official Lightweight Charts tutorials. When a
 * fixed `width` is provided, auto-resize is disabled.
 *
 * @param props - Hook configuration
 * @param props.height - Chart height in pixels
 * @param props.width - Fixed chart width in pixels (optional, defaults to container width)
 * @param props.showGrid - Whether to show grid lines
 * @param props.showPriceAxis - Whether to show the right price axis
 * @param props.showTimeAxis - Whether to show the bottom time axis
 * @returns Object containing chart instance, container ref, and current container width
 *
 * @example
 * ```tsx
 * // Auto-responsive chart (fills container width)
 * const { chart, containerRef, containerWidth } = useChart({
 *   height: 300,
 *   showGrid: true,
 *   showPriceAxis: true,
 *   showTimeAxis: true,
 * });
 *
 * return <div ref={containerRef} className="w-full" />;
 *
 * // Fixed width chart
 * const { chart, containerRef, containerWidth } = useChart({
 *   height: 300,
 *   width: 800,
 *   showGrid: true,
 *   showPriceAxis: true,
 *   showTimeAxis: true,
 * });
 * ```
 */
export const useChart = ({
	height,
	width,
	showGrid,
	showPriceAxis,
	showTimeAxis,
}: UseChartProps): UseChartReturn => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [containerWidth, setContainerWidth] = useState(0);
	const [chart, setChart] = useState<IChartApi | null>(null);

	// Store initial values in refs to satisfy lint rules
	const initialWidth = useRef(width);
	const initialHeight = useRef(height);
	const initialShowGrid = useRef(showGrid);
	const initialShowPriceAxis = useRef(showPriceAxis);
	const initialShowTimeAxis = useRef(showTimeAxis);

	// Initialize chart once on mount using layoutEffect
	useLayoutEffect(() => {
		if (!containerRef.current) return;

		const computedWidth =
			initialWidth.current || containerRef.current.clientWidth;
		setContainerWidth(computedWidth);

		const gridOptions = initialShowGrid.current
			? {
					vertLines: {
						visible: true,
						color: DEFAULT_GRID_OPTIONS.vertLines.color,
					},
					horzLines: {
						visible: true,
						color: DEFAULT_GRID_OPTIONS.horzLines.color,
					},
				}
			: {
					vertLines: { visible: false },
					horzLines: { visible: false },
				};

		const newChart = createChart(containerRef.current, {
			width: computedWidth,
			height: initialHeight.current,
			layout: {
				attributionLogo: false,
			},
			grid: gridOptions,
			rightPriceScale: {
				visible: initialShowPriceAxis.current,
			},
			timeScale: {
				visible: initialShowTimeAxis.current,
			},
		});

		setChart(newChart);
		newChart.timeScale().fitContent();

		const handleResize = () => {
			// Only auto-resize if no fixed width is provided
			if (initialWidth.current) return;

			const newWidth = containerRef.current?.clientWidth || 0;
			if (newWidth > 0) {
				newChart.applyOptions({ width: newWidth });
				newChart.timeScale().fitContent();
				setContainerWidth(newWidth);
			}
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
			newChart.remove();
		};
	}, []);

	// Update layout and options via applyOptions when props change
	useLayoutEffect(() => {
		if (!chart) return;

		const gridOptions = showGrid
			? {
					vertLines: {
						visible: true,
						color: DEFAULT_GRID_OPTIONS.vertLines.color,
					},
					horzLines: {
						visible: true,
						color: DEFAULT_GRID_OPTIONS.horzLines.color,
					},
				}
			: {
					vertLines: { visible: false },
					horzLines: { visible: false },
				};

		chart.applyOptions({
			width: width || containerRef.current?.clientWidth,
			height,
			grid: gridOptions,
			rightPriceScale: {
				visible: showPriceAxis,
			},
			timeScale: {
				visible: showTimeAxis,
			},
		});
		chart.timeScale().fitContent();

		if (width) {
			setContainerWidth(width);
		}
	}, [chart, height, width, showGrid, showPriceAxis, showTimeAxis]);

	return { chart, containerRef, containerWidth };
};
