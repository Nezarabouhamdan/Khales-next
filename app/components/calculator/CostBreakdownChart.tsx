"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { CHART_COLORS } from "@/data/villaCalculator";
import type { BreakdownItem } from "@/lib/calculator/pricing";

ChartJS.register(ArcElement, Tooltip, Legend);

type CostBreakdownChartProps = {
  breakdownDetails: BreakdownItem[];
  isRTL: boolean;
  currencyLabel: string;
};

export default function CostBreakdownChart({
  breakdownDetails,
  isRTL,
  currencyLabel,
}: CostBreakdownChartProps) {
  const data = {
    labels: breakdownDetails.map((item) => item.name),
    datasets: [
      {
        data: breakdownDetails.map((item) => item.cost),
        backgroundColor: CHART_COLORS,
        borderColor: "#ffffff",
        borderWidth: 2,
        hoverOffset: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: "75%",
    plugins: {
      legend: { display: false },
      tooltip: {
        rtl: isRTL,
        textDirection: isRTL ? "rtl" : "ltr",
        callbacks: {
          label: (context: { label?: string; parsed?: number }) =>
            `${context.label || ""}: ${Math.round(context.parsed || 0).toLocaleString()} ${currencyLabel}`,
        },
      },
    },
    animation: { animateRotate: true, animateScale: true, duration: 1200 },
  };

  return <Doughnut data={data} options={options} />;
}
