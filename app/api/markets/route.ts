import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const instruments: Record<string, { symbol: string; exchange: string }> = {
  NIFTY: { symbol: "NIFTY", exchange: "NSE" },
  SENSEX: { symbol: "SENSEX", exchange: "BSE" },
  RELIANCE: { symbol: "RELIANCE", exchange: "NSE" },
  TCS: { symbol: "TCS", exchange: "NSE" },
  INFY: { symbol: "INFY", exchange: "NSE" },
  HDFCBANK: { symbol: "HDFCBANK", exchange: "NSE" },
  ICICIBANK: { symbol: "ICICIBANK", exchange: "NSE" },
  SBIN: { symbol: "SBIN", exchange: "NSE" },
};
const intervals = new Set(["1day", "1week", "1month"]);
const providerUrl = "https://api.twelvedata.com";

type ProviderQuote = { close?: string; percent_change?: string; status?: string; message?: string };
type ProviderSeries = { values?: { datetime?: string; close?: string }[]; status?: string; message?: string };

function validNumber(value: string | undefined) {
  if (value === undefined || value.trim() === "") return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

export async function GET(request: NextRequest) {
  const symbol = (request.nextUrl.searchParams.get("symbol") || "NIFTY").toUpperCase();
  const interval = request.nextUrl.searchParams.get("interval") || "1day";
  const instrument = instruments[symbol];
  if (!instrument || !intervals.has(interval)) {
    return NextResponse.json({ error: "Unsupported instrument or chart interval." }, { status: 400 });
  }

  const apiKey = process.env.TWELVE_DATA_API_KEY;
  if (!apiKey) return NextResponse.json({ configured: false, symbol }, { headers: { "Cache-Control": "no-store" } });

  try {
    const params = new URLSearchParams({
      symbol: instrument.symbol,
      exchange: instrument.exchange,
      apikey: apiKey,
    });
    const [quoteResponse, seriesResponse] = await Promise.all([
      fetch(`${providerUrl}/quote?${params.toString()}`, { cache: "no-store", signal: AbortSignal.timeout(8000) }),
      fetch(`${providerUrl}/time_series?${new URLSearchParams({ ...Object.fromEntries(params), interval, outputsize: "60" })}`, {
        cache: "no-store",
        signal: AbortSignal.timeout(8000),
      }),
    ]);
    if (!quoteResponse.ok || !seriesResponse.ok) {
      return NextResponse.json({ error: "The market data provider is temporarily unavailable." }, { status: 502 });
    }
    const [quote, series] = (await Promise.all([quoteResponse.json(), seriesResponse.json()])) as [ProviderQuote, ProviderSeries];
    if (quote.status === "error" || series.status === "error") {
      return NextResponse.json({ error: "The provider could not return data for this instrument." }, { status: 502 });
    }

    const price = validNumber(quote.close);
    const changePercent = validNumber(quote.percent_change);
    const values = (series.values || [])
      .map((item) => ({ datetime: item.datetime || "", close: validNumber(item.close) }))
      .filter((item): item is { datetime: string; close: number } => Boolean(item.datetime) && item.close !== undefined)
      .reverse();

    if (price === undefined) {
      return NextResponse.json({ error: "No verified quote is currently available for this instrument." }, { status: 502 });
    }

    return NextResponse.json(
      { configured: true, symbol, price, changePercent, values, source: "Twelve Data" },
      { headers: { "Cache-Control": "private, max-age=30, stale-while-revalidate=30" } },
    );
  } catch {
    return NextResponse.json({ error: "Market data could not be reached. Please try again shortly." }, { status: 502 });
  }
}
