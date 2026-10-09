import Link from "next/link";
import { ArrowUpRight, Clock3 } from "lucide-react";
import type { articles } from "@/lib/content";

export function ArticleCard({ article }: { article: (typeof articles)[number] }) {
  const date = new Date(`${article.date}T12:00:00Z`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

  return (
    <article className="article-card">
      <div className="article-art" aria-hidden="true">
        <span className="article-art-label">{article.category}</span>
        <div className="mini-chart"><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
        <span className="article-art-index">SK / INSIGHTS</span>
      </div>
      <div className="article-card-body">
        <div className="article-meta"><span>{date}</span><span className="meta-dot" /> <span><Clock3 size={13} /> {article.readTime}</span></div>
        <h3><Link href={`/insights/${article.slug}`}>{article.title}</Link></h3>
        <p>{article.excerpt}</p>
        <Link className="text-link" href={`/insights/${article.slug}`}>Read article <ArrowUpRight size={15} /></Link>
      </div>
    </article>
  );
}
