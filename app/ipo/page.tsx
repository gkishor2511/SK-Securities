import type { Metadata } from "next";
import { ipoEducationSections } from "@/lib/content";

export const metadata: Metadata = { title: "IPO research & education" };

export default function IpoPage() {
  return (
    <>
      <section className="page-hero"><div className="container">
        <div className="breadcrumbs"><a href="/">Home</a> &nbsp;/&nbsp; IPO research</div>
        <span className="eyebrow">IPO research & education</span>
        <h1>Understand the offer, not just the headlines.</h1>
        <p>Learn how IPO disclosures, business fundamentals, issue details, and risks fit together. No unverified schedules or listing-gain predictions.</p>
      </div></section>
      <section className="section"><div className="container">
        <span className="demo-label">Verified issue data is not connected</span>
        <div className="ipo-state-grid">
          {ipoEducationSections.map((section) => <article className="ipo-state-card" key={section.title}><span>Issue information</span><h2>{section.title}</h2><p>{section.text}</p></article>)}
        </div>
        <div className="section-heading" style={{ marginTop: 70 }}>
          <span className="eyebrow">A research framework</span><h2>What careful IPO research can examine.</h2>
          <p>When verified documents and reliable issue information are available, analysis may cover:</p>
        </div>
        <div className="service-detail-list">
          <article className="service-detail"><span className="service-number">01</span><div><h2>Business overview</h2><p>Products, customers, operating model, sector position, and the factors that may influence the issuer’s business.</p></div></article>
          <article className="service-detail"><span className="service-number">02</span><div><h2>Strengths & risks</h2><p>Disclosed advantages considered alongside competition, concentration, regulatory, operational, and financial risks.</p></div></article>
          <article className="service-detail"><span className="service-number">03</span><div><h2>Issue details</h2><p>Offer structure, price band, proceeds, subscription information, and dates sourced from official and licensed providers.</p></div></article>
          <article className="service-detail"><span className="service-number">04</span><div><h2>Valuation context</h2><p>Relevant comparisons and assumptions, with clear acknowledgement of the limitations of valuation estimates.</p></div></article>
        </div>
        <div className="service-notice">IPO participation involves risk, and past or expected listing performance is not assured. This page does not constitute an offer, advice, or recommendation to invest. Consult official offer documents and exchange disclosures.</div>
      </div></section>
    </>
  );
}
