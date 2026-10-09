import type { Metadata } from "next";
import { MarketsPanel } from "@/components/markets-panel";

export const metadata: Metadata = { title: "Live market dashboard" };

export default function MarketsPage() {
  return (
    <>
      <section className="page-hero"><div className="container">
        <div className="breadcrumbs"><a href="/">Home</a> &nbsp;/&nbsp; Market dashboard</div>
        <span className="eyebrow">Market dashboard</span>
        <h1>Market information, with clear sourcing.</h1>
        <p>Explore selected Indian market instruments. Quotes and chart history appear only when the authorized provider connection is configured.</p>
      </div></section>
      <section className="section"><div className="container">
        <span className="demo-label">Provider data only · No sample prices</span>
        <MarketsPanel />
        <div className="service-notice">Market information may be delayed or incomplete and is subject to the data provider’s licensing terms. This dashboard is for general information only—not investment advice or a solicitation. Verify information independently before relying on it.</div>
      </div></section>
    </>
  );
}
