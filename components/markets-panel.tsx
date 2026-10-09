"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Search, TrendingUp } from "lucide-react";

type MarketPayload = {
  configured: boolean;
  symbol?: string;
  price?: number;
  changePercent?: number;
  values?: { datetime: string; close: number }[];
  source?: string;
  error?: string;
};

const symbols = [
  { symbol: "NIFTY", name: "NIFTY 50", exchange: "NSE index" },
  { symbol: "SENSEX", name: "S&P BSE SENSEX", exchange: "BSE index" },
  { symbol: "RELIANCE", name: "Reliance Industries", exchange: "NSE equity" },
  { symbol: "TCS", name: "Tata Consultancy Services", exchange: "NSE equity" },
  { symbol: "INFY", name: "Infosys", exchange: "NSE equity" },
  { symbol: "HDFCBANK", name: "HDFC Bank", exchange: "NSE equity" },
  { symbol: "ICICIBANK", name: "ICICI Bank", exchange: "NSE equity" },
  { symbol: "SBIN", name: "State Bank of India", exchange: "NSE equity" },
];
const intervals = [
  { label: "1D", value: "1day" },
  { label: "1W", value: "1week" },
  { label: "1M", value: "1month" },
] as const;

function formatPrice(value: number | undefined) {
  if (typeof value !== "number" || !Number.isFinite(value)) return "—";
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 }).format(value);
}

export function MarketsPanel() {
  const [selected, setSelected] = useState("NIFTY");
  const [interval, setInterval] = useState<(typeof intervals)[number]["value"]>("1day");
  const [query, setQuery] = useState("");
  const [data, setData] = useState<MarketPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError("");
    fetch(`/api/markets?symbol=${encodeURIComponent(selected)}&interval=${interval}`, {
      signal: controller.signal,
    })
      .then(async (response) => {
        const result = (await response.json()) as MarketPayload;
        if (!response.ok) throw new Error(result.error || "Market data could not be loaded.");
        setData(result);
      })
      .catch((reason: unknown) => {
        if (reason instanceof Error && reason.name !== "AbortError") setError(reason.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [selected, interval]);

  const filteredSymbols = useMemo(() => {
    const term = query.trim().toLowerCase();
    return symbols.filter(({ symbol, name }) =>
      !term || symbol.toLowerCase().includes(term) || name.toLowerCase().includes(term),
    );
  }, [query]);

  const selectedName = symbols.find((item) => item.symbol === selected)?.name ?? selected;
  const values = data?.values ?? [];
  const isPositive = (data?.changePercent ?? 0) >= 0;

  return (
    <div className="market-dashboard">
      <div className="market-main">
        <div className="market-toolbar">
          <div><span className="eyebrow">Market snapshot</span><h2>{selectedName}</h2></div>
          {data?.configured ? <span className="data-provider">{data.source} data</span> : null}
        </div>
        {!data?.configured && !loading && !error ? (
          <div className="market-empty">
            <div className="empty-icon"><TrendingUp size={22} /></div>
            <h3>Live market data isn’t connected yet</h3>
            <p>Configure an authorized Twelve Data API key to show verified quotes and charts. No sample prices are shown here.</p>
            <a href="/markets">See dashboard details <span aria-hidden="true">↗</span></a>
          </div>
        ) : (
          <>
            <div className="quote-row">
              <div className="quote-price">{loading ? "Loading…" : `₹${formatPrice(data?.price)}`}</div>
              <div className={`quote-change${isPositive ? " positive" : " negative"}`}>
                {!loading && typeof data?.changePercent === "number"
                  ? `${isPositive ? "+" : ""}${data.changePercent.toFixed(2)}%`
                  : "—"}
              </div>
            </div>
            <div className="chart-controls" aria-label="Chart time range">
              {intervals.map((item) => (
                <button key={item.value} className={interval === item.value ? "selected" : ""} onClick={() => setInterval(item.value)}>
                  {item.label}
                </button>
              ))}
            </div>
            <div className="market-chart">
              {error ? <p className="inline-error" role="alert">{error}</p> : null}
              {!error && !loading && values.length ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={values} margin={{ top: 12, right: 12, left: -24, bottom: 0 }}>
                    <CartesianGrid stroke="#e9eeeb" vertical={false} />
                    <XAxis dataKey="datetime" tickLine={false} axisLine={false} tick={{ fill: "#748278", fontSize: 11 }} minTickGap={30} />
                    <YAxis domain={["auto", "auto"]} tickLine={false} axisLine={false} tick={{ fill: "#748278", fontSize: 11 }} tickFormatter={formatPrice} />
                    <Tooltip formatter={(value) => [`₹${formatPrice(Number(value))}`, selectedName]} />
                    <Line type="monotone" dataKey="close" stroke="#287c5a" strokeWidth={2.4} dot={false} activeDot={{ r: 4, fill: "#287c5a" }} />
                  </LineChart>
                </ResponsiveContainer>
              ) : null}
              {!error && !loading && !values.length ? <p className="chart-empty">No chart history is available for this selection.</p> : null}
              {loading ? <p className="chart-empty">Loading verified market data…</p> : null}
            </div>
            <p className="market-note">{data?.source ? `Data provided by ${data.source}.` : ""} Data may be delayed according to provider terms. Not investment advice.</p>
          </>
        )}
      </div>
      <aside className="watchlist">
        <div className="watchlist-title"><h3>Watchlist</h3><span>{filteredSymbols.length} instruments</span></div>
        <label className="watch-search">
          <Search size={16} />
          <input aria-label="Search watchlist" placeholder="Search instruments" value={query} onChange={(event) => setQuery(event.target.value)} />
        </label>
        <div className="watch-items">
          {filteredSymbols.map((item) => (
            <button key={item.symbol} className={`watch-item${selected === item.symbol ? " active" : ""}`} onClick={() => setSelected(item.symbol)}>
              <span><strong>{item.name}</strong><small>{item.exchange}</small></span>
              <span className="watch-price">{selected === item.symbol && data?.configured ? `₹${formatPrice(data.price)}` : "—"}</span>
            </button>
          ))}
          {!filteredSymbols.length ? <p className="watch-empty">No matching instruments.</p> : null}
        </div>
      </aside>
    </div>
  );
}
