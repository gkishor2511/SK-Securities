import type { Metadata } from "next";
import { InsightsList } from "@/components/insights-list";

export const metadata: Metadata = { title: "Market insights & journal" };

export default function InsightsPage() {
  return (
    <>
      <section className="page-hero"><div className="container">
        <div className="breadcrumbs"><a href="/">Home</a> &nbsp;/&nbsp; Insights</div>
        <span className="eyebrow">The journal</span>
        <h1>Ideas, explained with context.</h1>
        <p>Explore financial education and market concepts. Demonstration articles are clearly identified; no content below is presented as current investment research.</p>
      </div>      </section>
      <InsightsList />
    </>
  );
}
