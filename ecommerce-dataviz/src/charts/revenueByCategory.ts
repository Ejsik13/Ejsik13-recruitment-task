import Highcharts from "highcharts";
import type { Order } from "../types";
import { groupSum, revenue, formatCurrency } from "../utils/analytics";

export function revenueByCategoryOptions(
  orders: Order[],
  currency: string,
): Highcharts.Options {
  const data = groupSum(
    orders,
    (o) => o.category,
    (o) => revenue(o),
  );

  return {
    chart: {
      type: "bar",
      height: 360,
      backgroundColor: "transparent",
    },
    title: { text: undefined },
    accessibility: { enabled: true },
    xAxis: {
      categories: data.map((d) => d.key),
    },
    yAxis: {
      title: { text: "Revenue" },
      tickAmount: 5,
      labels: {
        formatter: function () {
          return formatCurrency(Number(this.value), currency, 0);
        },
      },
    },
    plotOptions: {
      series: {
        dataLabels: {
          enabled: true,
          formatter: function () {
            return formatCurrency(Number(this.y), currency, 0);
          },
        },
      },
    },
    series: [
      {
        type: "bar",
        name: "Revenue",
        data: data.map((d) => d.value),
      },
    ],
    credits: { enabled: false },
    legend: { enabled: false },
    tooltip: {
      pointFormatter: function () {
        return `Revenue: <b>${formatCurrency(Number(this.y), currency, 2)}</b>`;
      },
    },
  };
}
