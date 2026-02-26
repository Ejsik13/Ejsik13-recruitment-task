import Highcharts from "highcharts";
import type { Order } from "../types";
import { revenue, formatCurrency } from "../utils/analytics";

type CityAgg = {
  name: string;
  country: string;
  lat: number;
  lon: number;
  revenue: number;
  orders: number;
};

export function geoBubbleOptions(
  orders: Order[],
  currency: string,
): Highcharts.Options {
  const map = new Map<string, CityAgg>();

  for (const o of orders) {
    const key = `${o.country}-${o.city}`;
    const prev = map.get(key);

    if (!prev) {
      map.set(key, {
        name: o.city,
        country: o.country,
        lat: o.lat,
        lon: o.lon,
        revenue: revenue(o),
        orders: 1,
      });
    } else {
      prev.revenue += revenue(o);
      prev.orders += 1;
    }
  }

  const points = [...map.values()].sort((a, b) => b.revenue - a.revenue);

  return {
    chart: {
      type: "bubble",
      plotBorderWidth: 1,
      zoomType: "xy",
      height: 420,
      backgroundColor: "transparent",
    },
    title: { text: undefined },
    accessibility: { enabled: true },
    xAxis: {
      title: { text: "Longitude" },
      gridLineWidth: 1,
    },
    yAxis: {
      title: { text: "Latitude" },
      gridLineWidth: 1,
    },
    tooltip: {
      useHTML: true,
      pointFormatter: function () {
        const p = (this as any).point;
        return `
          <div style="min-width: 180px">
            <b>${p.city}, ${p.country}</b><br/>
            Revenue: <b>${formatCurrency(p.z, currency, 0)}</b>
            Orders: <b>${p.orders}</b>
          </div>
        `;
      },
    },
    plotOptions: {
      bubble: {
        minSize: 10,
        maxSize: 60,
      },
    },
    series: [
      {
        type: "bubble",
        name: "City revenue",
        data: points.map((c) => ({
          x: c.lon,
          y: c.lat,
          z: c.revenue,
          city: c.name,
          country: c.country,
          orders: c.orders,
        })) as any,
      },
    ],
    credits: { enabled: false },
    legend: { enabled: false },
  };
}
