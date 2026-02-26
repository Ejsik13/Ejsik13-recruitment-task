import { ReactNode } from "react";

export function ChartCard(props: {
  title: string;
  subtitle?: string;
  right?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="card">
      <header className="cardHeader">
        <div>
          <h2 className="cardTitle">{props.title}</h2>
          {props.subtitle ? (
            <p className="cardSubtitle">{props.subtitle}</p>
          ) : null}
        </div>
        {props.right ? <div className="cardRight">{props.right}</div> : null}
      </header>
      <div className="cardBody">{props.children}</div>
    </section>
  );
}
