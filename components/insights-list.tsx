"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { ArticleCard } from "@/components/article-card";
import { articles } from "@/lib/content";

export function InsightsList() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const categories = ["All", ...Array.from(new Set(articles.map((article) => article.category)))];
  const filtered = useMemo(() => articles.filter((article) =>
    (category === "All" || article.category === category) &&
    `${article.title} ${article.excerpt} ${article.category}`.toLowerCase().includes(query.toLowerCase()),
  ), [category, query]);

  return (
    <section className="section"><div className="container">
      <span className="demo-label">Demonstration educational content</span>
      <div className="filter-row" aria-label="Filter articles">
        {categories.map((item) => <button className={category === item ? "active" : ""} key={item} onClick={() => setCategory(item)}>{item}</button>)}
        <label className="search-input"><Search size={15} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search articles" aria-label="Search articles" /></label>
      </div>
      {filtered.length ? <div className="article-grid">{filtered.map((article) => <ArticleCard key={article.slug} article={article} />)}</div> : <p className="body-copy">No articles match that search. Try a different term or category.</p>}
    </div></section>
  );
}
