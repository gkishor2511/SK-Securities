import Link from "next/link";
import { ArrowUpRight, BookOpenCheck, Compass, ShieldCheck, Sparkles } from "lucide-react";
import { ArticleCard } from "@/components/article-card";
import { SectionHeading } from "@/components/section-heading";
import { ServiceCard } from "@/components/service-card";
import { articles, services } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">Clarity for considered decisions</span>
            <h1>Research. Analyze.<br /><em>Invest with</em> Knowledge.</h1>
            <p>Independent thinking, thoughtful market research, and financial education to help you understand the forces behind the market.</p>
            <div className="hero-actions">
              <Link className="button button-primary" href="/insights">Explore our research <ArrowUpRight size={16} /></Link>
              <Link className="button button-secondary" href="/contact">Contact us</Link>
            </div>
            <div className="hero-note"><span />Research-led perspective. No promises, just clarity.</div>
          </div>
          <div className="hero-visual" aria-label="Abstract financial research illustration">
            <div className="hero-card">
              <div className="visual-top">
                <div><small>Perspective, not prediction</small><strong>Make sense of the market.</strong></div>
                <span className="visual-badge">RESEARCH NOTES</span>
              </div>
              <div className="visual-abstract">
                <svg viewBox="0 0 440 198" preserveAspectRatio="none" role="img" aria-label="Decorative abstract market line">
                  <defs><linearGradient id="area" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#77ad87" stopOpacity=".23" /><stop offset="1" stopColor="#77ad87" stopOpacity="0" /></linearGradient></defs>
                  <path d="M0 150 C25 146 27 125 49 130 S77 145 98 119 S130 119 150 95 S175 110 196 98 S224 118 244 84 S277 76 294 89 S323 55 345 65 S376 48 391 60 S422 31 440 37 L440 198 L0 198Z" fill="url(#area)" />
                  <path d="M0 150 C25 146 27 125 49 130 S77 145 98 119 S130 119 150 95 S175 110 196 98 S224 118 244 84 S277 76 294 89 S323 55 345 65 S376 48 391 60 S422 31 440 37" fill="none" stroke="#39815d" strokeWidth="2.5" />
                  <circle cx="440" cy="37" r="4" fill="#39815d" />
                </svg>
              </div>
              <div className="visual-bottom"><span>Curiosity meets rigour</span><strong>Explore with context →</strong></div>
            </div>
            <div className="visual-stamp"><div><span>SK</span>KNOWLEDGE<br />OVER NOISE</div></div>
          </div>
        </div>
      </section>

      <section className="trust-strip" aria-label="Our approach">
        <div className="container trust-inner">
          <p className="trust-label">Our commitment to a more informed market conversation</p>
          <div className="trust-point"><ShieldCheck size={19} />Transparent by design</div>
          <div className="trust-point"><BookOpenCheck size={19} />Education first</div>
          <div className="trust-point"><Compass size={19} />Research with context</div>
        </div>
      </section>

      <section className="section">
        <div className="container intro-grid">
          <SectionHeading eyebrow="A clearer point of view" title="Good research begins with better questions." />
          <div className="intro-side">
            <strong>Markets move quickly. Understanding takes a little more care.</strong>
            SK Securities Private Limited is focused on making financial ideas more accessible through considered research, useful analysis, and responsible education. We believe better-informed conversations start with clear sources, balanced perspectives, and an honest view of uncertainty.
            <br /><Link className="text-link" href="/about">Get to know us <ArrowUpRight size={15} /></Link>
          </div>
        </div>
      </section>

      <section className="section section-wash">
        <div className="container">
          <SectionHeading eyebrow="What we do" title="Insight for every layer of the market." description="A thoughtful set of research and educational services—built to explain, not to promise outcomes." />
          <div className="service-grid">
            {services.slice(0, 4).map((service) => <ServiceCard key={service.number} service={service} />)}
          </div>
          <Link className="text-link" href="/services">Explore all services <ArrowUpRight size={15} /></Link>
        </div>
      </section>

      <section className="section">
        <div className="container split-feature">
          <div className="feature-panel">
            <span className="eyebrow">A considered approach</span>
            <h3>Good decisions start with a clear view of what you know—and what you don’t.</h3>
            <p>We aim to make financial topics understandable without losing the nuance that matters.</p>
            <div className="feature-points"><span>Balanced perspectives</span><span>Risk-aware learning</span></div>
          </div>
          <div className="feature-copy">
            <span className="eyebrow">Why SK Securities</span>
            <h2>Substance over speculation.</h2>
            <p>We value context, transparent communication, and responsible education. Our work is designed to help readers ask informed questions—not to offer certainty in an uncertain market.</p>
            <Link className="text-link" href="/about">Our research philosophy <ArrowUpRight size={15} /></Link>
          </div>
        </div>
      </section>

      <section className="section section-wash">
        <div className="container">
          <div className="article-heading-row">
            <SectionHeading eyebrow="From the journal" title="Ideas worth understanding." description="Educational demonstrations—not current investment research or market calls." />
          </div>
          <div className="article-grid">{articles.map((article) => <ArticleCard key={article.slug} article={article} />)}</div>
        </div>
      </section>

      <section className="section">
        <div className="container split-feature">
          <div className="feature-copy">
            <span className="eyebrow">Market dashboard</span>
            <h2>Verified data. Clear context.</h2>
            <p>Explore a market dashboard that displays provider data only when an authorized connection is configured. No invented prices or placeholder quotes.</p>
            <Link className="text-link" href="/markets">Open the market dashboard <ArrowUpRight size={15} /></Link>
          </div>
          <div className="feature-panel">
            <span className="eyebrow">Data integrity matters</span>
            <h3>Trust starts with knowing where information comes from.</h3>
            <p>Market data will identify its provider and may be delayed under the provider’s terms.</p>
            <div className="feature-points"><span>Provider-attributed</span><span>No fabricated prices</span></div>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="container cta-inner">
          <div><span className="eyebrow"><Sparkles size={12} /> Start a conversation</span><h2>Curious about our approach?</h2></div>
          <Link className="button" href="/contact">Talk to our team <ArrowUpRight size={16} /></Link>
        </div>
      </section>
    </>
  );
}
