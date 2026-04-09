import { createChart, type IChartApi } from "lightweight-charts";
import { useLayoutEffect, useRef, useState } from "react";
import { DEFAULT_GRID_OPTIONS } from "./helpers";

interface UseChartProps {
	height: number;
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
 * Creates the chart once on mount using `useLayoutEffect` and caches
 * the instance to avoid recreation on prop changes. When configuration
 * props change (`height`, `showGrid`, `showPriceAxis`, `showTimeAxis`),
 * the chart is updated via `chart.applyOptions()` instead of being
 * destroyed and recreated — this preserves all series instances and
 * prevents "Value is undefined" errors during cleanup.
 *
 * Uses `window.addEventListener('resize')` for responsive width
 * adjustments, as recommended in the official Lightweight Charts tutorials.
 *
 * @param props - Hook configuration
 * @param props.height - Chart height in pixels
 * @param props.showGrid - Whether to show grid lines
 * @param props.showPriceAxis - Whether to show the right price axis
 * @param props.showTimeAxis - Whether to show the bottom time axis
 * @returns Object containing chart instance, container ref, and current container width
 *
 * @example
 * ```tsx
 * const { chart, containerRef, containerWidth } = useChart({
 *   height: 300,
 *   showGrid: true,
 *   showPriceAxis: true,
 *   showTimeAxis: true,
 * });
 *
 * return <div ref={containerRef} className="w-full" />;
 * ```
 */
export const useChart = ({
	height,
	showGrid,
	showPriceAxis,
	showTimeAxis,
}: UseChartProps): UseChartReturn => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [containerWidth, setContainerWidth] = useState(0);
	const [chart, setChart] = useState<IChartApi | null>(null);

	// Store initial values in refs to satisfy lint rules
	const initialHeight = useRef(height);
	const initialShowGrid = useRef(showGrid);
	const initialShowPriceAxis = useRef(showPriceAxis);
	const initialShowTimeAxis = useRef(showTimeAxis);

	// Initialize chart once on mount using layoutEffect
	useLayoutEffect(() => {
		if (!containerRef.current) return;

		const width = containerRef.current.clientWidth;
		setContainerWidth(width);

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
			width,
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

		const handleResize = () => {
			const newWidth = containerRef.current?.clientWidth || 0;
			if (newWidth > 0) {
				newChart.applyOptions({ width: newWidth });
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
			height,
			grid: gridOptions,
			rightPriceScale: {
				visible: showPriceAxis,
			},
			timeScale: {
				visible: showTimeAxis,
			},
		});
	}, [chart, height, showGrid, showPriceAxis, showTimeAxis]);

	return { chart, containerRef, containerWidth };
};
