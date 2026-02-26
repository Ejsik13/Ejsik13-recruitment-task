import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import Highcharts from "highcharts";

import HighchartsMoreModule from "highcharts/highcharts-more";
import AccessibilityModule from "highcharts/modules/accessibility";

const initModule = (mod: any) =>
  typeof mod === "function" ? mod : mod?.default;

const HighchartsMore = initModule(HighchartsMoreModule);
if (HighchartsMore) HighchartsMore(Highcharts);

const Accessibility = initModule(AccessibilityModule);
if (Accessibility) Accessibility(Highcharts);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
