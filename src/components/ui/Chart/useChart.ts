import { createChart, type IChartApi } from "lightweight-charts";
import { useEffect, useRef, useState } from "react";
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
 * Creates a chart with the specified configuration and sets up a ResizeObserver
 * to automatically adjust the chart width when the container resizes.
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

	useEffect(() => {
		if (!containerRef.current) return;

		const width = containerRef.current.clientWidth;
		setContainerWidth(width);

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

		const newChart = createChart(containerRef.current, {
			width,
			height,
			layout: {
				attributionLogo: false,
			},
			grid: gridOptions,
			rightPriceScale: {
				visible: showPriceAxis,
			},
			timeScale: {
				visible: showTimeAxis,
			},
		});

		setChart(newChart);

		const resizeObserver = new ResizeObserver((entries) => {
			for (const entry of entries) {
				const { width: newWidth } = entry.contentRect;
				newChart.applyOptions({ width: newWidth });
				setContainerWidth(newWidth);
			}
		});

		resizeObserver.observe(containerRef.current);

		return () => {
			resizeObserver.disconnect();
			newChart.remove();
		};
	}, [height, showGrid, showPriceAxis, showTimeAxis]);

	return { chart, containerRef, containerWidth };
};
