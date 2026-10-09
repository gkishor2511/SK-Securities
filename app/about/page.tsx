import type { Metadata } from "next";
import Image from "next/image";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = { title: "About us" };

const values = [
  ["Clarity", "Make complex financial ideas easier to follow, without removing important caveats."],
  ["Integrity", "Be clear about what is known, what is uncertain, and what has not been independently verified."],
  ["Responsibility", "Treat financial education with care and never promise returns or outcomes."],
];

export default function AboutPage() {
  return (
    <>
      <section className="page-hero"><div className="container">
        <div className="breadcrumbs"><a href="/">Home</a> &nbsp;/&nbsp; About us</div>
        <span className="eyebrow">About SK Securities</span>
        <h1>Better understanding is a worthwhile investment.</h1>
        <p>We are building a research and education platform grounded in curiosity, transparency, and respect for the complexity of financial markets.</p>
      </div></section>
      <section className="section"><div className="container">
        <div className="intro-grid">
          <SectionHeading eyebrow="Our company" title="A thoughtful voice in financial research." />
          <div className="body-copy">
            <p>SK Securities Private Limited focuses on stock-market research, financial education, equity analysis, and market insights. Our goal is to help people better understand businesses, markets, and the information that shapes financial decisions.</p>
            <p>We are committed to clear communication and responsible learning. Company credentials, regulatory registrations, and professional certifications have not been independently verified for this website and are not claimed here.</p>
          </div>
        </div>
        <div style={{ marginTop: 58 }}>
          <SectionHeading eyebrow="Leadership" title="Meet our leadership." />
          <div className="leadership-grid">
            <article className="leadership-card">
              <div className="leadership-photo">
                <Image
                  src="/images/kishor-reddy.png"
                  alt="Portrait of Kishor Reddy"
                  fill
                  sizes="(max-width: 760px) 42vw, 300px"
                  style={{ objectFit: "cover", objectPosition: "center 24%" }}
                />
              </div>
              <div className="leadership-info">
                <span>CHIEF EXECUTIVE OFFICER</span>
                <h3>Kishor Reddy</h3>
                <p>Chief Executive Officer, SK Securities Private Limited.</p>
              </div>
            </article>
            <article className="leadership-card">
              <div className="leadership-photo">
                <Image
                  src="/images/sumathi-reddy.jpg"
                  alt="Portrait of Sumathi Reddy"
                  fill
                  sizes="(max-width: 760px) 42vw, 300px"
                  style={{ objectFit: "cover", objectPosition: "center 28%" }}
                />
              </div>
              <div className="leadership-info">
                <span>CHIEF FINANCIAL OFFICER</span>
                <h3>Sumathi Reddy</h3>
                <p>Chief Financial Officer, SK Securities Private Limited.</p>
              </div>
            </article>
          </div>
        </div>
        <div className="value-grid">
          {values.map(([title, text], index) => <article className="value-card" key={title}><span>0{index + 1} / OUR VALUES</span><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </div></section>
      <section className="section section-wash"><div className="container">
        <SectionHeading eyebrow="Mission & vision" title="Knowledge without the noise." />
        <div className="service-detail-list">
          <article className="service-detail"><span className="service-number">01</span><div><h2>Our mission</h2><p>Make market research and financial concepts more accessible through balanced analysis, clear explanations, and education that acknowledges risk.</p></div></article>
          <article className="service-detail"><span className="service-number">02</span><div><h2>Our vision</h2><p>Contribute to a more informed financial ecosystem where people can engage with markets thoughtfully and understand the limits of any single perspective.</p></div></article>
          <article className="service-detail"><span className="service-number">03</span><div><h2>Our philosophy</h2><p>Ask better questions, examine assumptions, use reliable sources, and distinguish educational material from regulated advice or recommendations.</p></div></article>
          <article className="service-detail"><span className="service-number">04</span><div><h2>Professional standards</h2><p>Communicate transparently, protect personal information, respect data licensing, and avoid claims of authorization or expertise that have not been verified.</p></div></article>
        </div>
      </div></section>
    </>
  );
}
