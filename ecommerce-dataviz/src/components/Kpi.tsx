export function Kpi(props: { label: string; value: string }) {
  return (
    <div className="kpi">
      <div className="kpiLabel">{props.label}</div>
      <div className="kpiValue">{props.value}</div>
    </div>
  );
}
