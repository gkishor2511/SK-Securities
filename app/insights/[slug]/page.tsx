import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/article-card";
import { articles } from "@/lib/content";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  return { title: article?.title ?? "Insight" };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) notFound();
  const related = articles.filter((item) => item.slug !== article.slug).slice(0, 2);
  const date = new Date(`${article.date}T12:00:00Z`).toLocaleDateString("en-IN", {
    day: "numeric", month: "long", year: "numeric", timeZone: "UTC",
  });

  return (
    <>
      <section className="page-hero"><div className="container">
        <div className="breadcrumbs"><Link href="/">Home</Link> &nbsp;/&nbsp; <Link href="/insights">Insights</Link> &nbsp;/&nbsp; Article</div>
        <article className="article-page">
          <span className="demo-label">Demonstration educational content · {article.category}</span>
          <h1>{article.title}</h1>
          <p className="article-lede">{article.excerpt}</p>
          <div className="article-meta"><span>{date}</span><span className="meta-dot" /><span>{article.author}</span><span className="meta-dot" /><span>{article.readTime}</span></div>
        </article>
      </div></section>
      <section className="section"><div className="container article-page">
        <div className="article-content">{article.content.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>
        <div className="article-alert">This demonstration article is for general educational information only and does not constitute investment advice, a recommendation, or current market research. Securities investments are subject to market risks.</div>
        <h2 style={{ fontFamily: "var(--serif)", color: "var(--navy)", marginTop: 55 }}>Continue exploring</h2>
        <div className="article-grid">{related.map((item) => <ArticleCard key={item.slug} article={item} />)}</div>
      </div></section>
    </>
  );
}
