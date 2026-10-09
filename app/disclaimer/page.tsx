import type { Metadata } from "next";

export const metadata: Metadata = { title: "Website disclaimer" };

export default function DisclaimerPage() {
  return (
    <>
      <section className="page-hero"><div className="container"><div className="breadcrumbs"><a href="/">Home</a> &nbsp;/&nbsp; Disclaimer</div><span className="eyebrow">Important information</span><h1>Website disclaimer.</h1><p>Please read this information before using content or data on this website.</p></div></section>
      <section className="section"><div className="container body-copy">
        <h2>General information only</h2><p>Website content is provided for general informational and educational purposes. It is not intended to be, and must not be treated as, investment, legal, tax, accounting, or other professional advice, a solicitation, or a recommendation to buy, sell, or hold any security or financial product.</p>
        <h2>No personalized advice or guaranteed outcome</h2><p>Content is not tailored to any individual’s objectives, financial situation, or needs. No returns, profits, listing gains, or future outcomes are promised or guaranteed. Securities investments are subject to market risk, including possible loss of principal.</p>
        <h2>Sources, accuracy, and market data</h2><p>Information may change and may be delayed, incomplete, or contain errors. Where market data is enabled, it is supplied by an identified third-party provider and is subject to that provider’s availability and licensing terms. Verify important information against official sources and documents.</p>
        <h2>Regulatory status</h2><p>No SEBI registration, NISM certification, or other regulatory authorization is claimed on this website. Any such details must be independently verified before publication. Content must not be interpreted as a regulated research analyst report or investment advisory service unless the relevant authorization is in place and the service is compliant with applicable law.</p>
        <h2>Independent decisions</h2><p>Users are responsible for their own decisions. Consider seeking guidance from an appropriately qualified and authorized professional who can assess your circumstances.</p>
        <p className="legal-updated">Last reviewed: October 2026. Have this notice reviewed by qualified Indian legal and compliance counsel before launch.</p>
      </div></section>
    </>
  );
}
