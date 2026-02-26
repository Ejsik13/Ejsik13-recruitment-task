import { useEffect, useMemo, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

import type { DataFile, Order } from "./types";
import { revenueByCategoryOptions } from "./charts/revenueByCategory";
import { customerTypeOptions } from "./charts/customerType";
import { geoBubbleOptions } from "./charts/geoBubble";
import { formatCurrency } from "./utils/analytics";
import { ChartCard } from "./components/ChartCard";
import { Kpi } from "./components/Kpi";

export default function App() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [currency, setCurrency] = useState<string>("EUR");
  const [generatedAt, setGeneratedAt] = useState<string>("");

  useEffect(() => {
    fetch("/data.json")
      .then((r) => r.json())
      .then((data: DataFile) => {
        setOrders(data.orders);
        setCurrency(data.meta.currency ?? "EUR");
        setGeneratedAt(data.meta.generatedAt ?? "");
      })
      .catch((e) => {
        console.error("Failed to load data.json", e);
      });
  }, []);

  const kpis = useMemo(() => {
    const totalRevenue = orders.reduce(
      (acc, o) => acc + o.quantity * o.unitPrice,
      0,
    );
    const totalOrders = orders.length;
    const aov = totalOrders ? totalRevenue / totalOrders : 0;
    const uniqueCountries = new Set(orders.map((o) => o.country)).size;
    return {
      totalRevenue,
      totalOrders,
      aov,
      uniqueCountries,
    };
  }, [orders]);

  const opt1 = useMemo(
    () => revenueByCategoryOptions(orders, currency),
    [orders, currency],
  );
  const opt2 = useMemo(
    () => customerTypeOptions(orders, currency),
    [orders, currency],
  );
  const opt3 = useMemo(
    () => geoBubbleOptions(orders, currency),
    [orders, currency],
  );

  return (
    <div className="page">
      <header className="topbar">
        <div>
          <h1 className="title">E-commerce Orders — Revenue Drivers</h1>
          <p className="subtitle">
            3 views: category performance, customer value, geographic
            concentration
            {generatedAt ? ` • data generated: ${generatedAt}` : ""}
          </p>
        </div>
        <div className="kpis">
          <Kpi
            label="Total revenue"
            value={formatCurrency(kpis.totalRevenue, currency)}
          />
          <Kpi label="Orders" value={String(kpis.totalOrders)} />
          <Kpi label="AOV" value={formatCurrency(kpis.aov, currency)} />
          <Kpi label="Countries" value={String(kpis.uniqueCountries)} />
        </div>
      </header>

      <main className="grid">
        <ChartCard
          title="Revenue by category"
          subtitle="Sum(quantity × unitPrice). Focus: which segments drive sales."
        >
          <HighchartsReact highcharts={Highcharts} options={opt1} />
        </ChartCard>

        <ChartCard
          title="Customer value: New vs Returning"
          subtitle="Revenue + AOV to compare overall contribution vs average order value."
        >
          <HighchartsReact highcharts={Highcharts} options={opt2} />
        </ChartCard>

        <ChartCard
          title="Geographic concentration (city bubbles)"
          subtitle="Bubble size = revenue, positioned by lon/lat. Quick read on market hotspots."
        >
          <HighchartsReact highcharts={Highcharts} options={opt3} />
        </ChartCard>
      </main>
    </div>
  );
}
