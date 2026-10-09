import type { Metadata } from "next";
import { services } from "@/lib/content";

export const metadata: Metadata = { title: "Research & education services" };
const descriptions = [
  "Independent company and industry research designed to help readers understand business performance, context, and key uncertainties.",
  "Examination of financial statements, business models, competitive position, management discussion, and relevant business risks.",
  "Educational interpretation of price trends, chart patterns, volume, and technical indicators. Technical tools cannot predict outcomes.",
  "An introduction to valuation approaches and the assumptions, limitations, and uncertainty involved in estimating value.",
  "Educational reviews of issuer disclosures, business context, issue structure, and risk factors based on verified public documents when available.",
  "Learning resources on derivative instruments, options, futures, and their mechanics—with particular attention to leverage and loss risk.",
  "Contextual research into industry structures, operating drivers, regulation, and themes affecting a sector.",
  "Accessible learning materials to support financial literacy and an understanding of how markets and investment products work.",
];

export default function ServicesPage() {
  return (
    <>
      <section className="page-hero"><div className="container">
        <div className="breadcrumbs"><a href="/">Home</a> &nbsp;/&nbsp; Services</div>
        <span className="eyebrow">Research & education</span>
        <h1>Useful perspective, responsibly delivered.</h1>
        <p>Explore our research and education areas. Each is designed to support understanding—not to guarantee performance or provide personalized recommendations.</p>
      </div></section>
      <section className="section"><div className="container">
        <div className="service-detail-list">
          {services.map((service, index) => <article className="service-detail" key={service.number}><span className="service-number">{service.number}</span><div><h2>{service.title}</h2><p>{descriptions[index]}</p></div></article>)}
        </div>
        <div className="service-notice">Services described here are informational and educational in nature. No personalized advice, securities recommendation, or assurance of returns is offered through this website. Regulatory authorization has not been verified.</div>
      </div></section>
    </>
  );
}
