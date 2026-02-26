import Highcharts from "highcharts";
import type { Order } from "../types";
import { groupStats, revenue, formatCurrency } from "../utils/analytics";

export function customerTypeOptions(
  orders: Order[],
  currency: string,
): Highcharts.Options {
  const stats = groupStats(
    orders,
    (o) => o.customerType,
    (o) => revenue(o),
  );

  const categories = stats.map((s) => (s.key === "new" ? "New" : "Returning"));

  return {
    chart: {
      zoomType: "xy",
      height: 360,
      backgroundColor: "transparent",
    },
    title: { text: undefined },
    accessibility: { enabled: true },
    xAxis: [{ categories }],
    yAxis: [
      {
        title: { text: "Revenue" },
        labels: {
          formatter: function () {
            return formatCurrency(Number(this.value), currency, 0);
          },
        },
      },
      {
        title: { text: "AOV" },
        opposite: true,
        labels: {
          formatter: function () {
            return formatCurrency(Number(this.value), currency, 2);
          },
        },
      },
    ],
    tooltip: {
      shared: true,
      valueDecimals: 2,
    },
    series: [
      {
        type: "column",
        name: "Revenue",
        data: stats.map((s) => s.sum),
      },
      {
        type: "spline",
        name: "AOV",
        yAxis: 1,
        data: stats.map((s) => s.avg),
      },
    ],
    credits: { enabled: false },
  };
}
