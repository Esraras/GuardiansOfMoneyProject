// Lightweight Binance API helpers for client-side fetches
// Fetches klines for symbols like BTCUSDT, ETHUSDT, etc.

const BINANCE_BASES = [
  "https://data-api.binance.vision",
  "https://api.binance.com",
  "https://www.binance.com",
];

export async function fetchKlines(symbol, interval = "1h", limit = 24) {
  let lastErr;
  for (const base of BINANCE_BASES) {
    try {
      const url = `${base}/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`;
      const res = await fetch(url);
      if (!res.ok) {
        lastErr = new Error(
          `Binance klines error for ${symbol}: ${res.status}`
        );
        continue;
      }
      const data = await res.json();
      return data.map((k) => ({
        time: k[0],
        open: Number(k[1]),
        high: Number(k[2]),
        low: Number(k[3]),
        close: Number(k[4]),
      }));
    } catch (e) {
      lastErr = e;
      continue;
    }
  }
  throw lastErr || new Error(`Failed to fetch klines for ${symbol}`);
}

export async function fetchMultipleSymbolsKlines(
  symbols,
  interval = "1h",
  limit = 24
) {
  const results = await Promise.all(
    symbols.map(async (s) => ({
      symbol: s,
      data: await fetchKlines(s, interval, limit),
    }))
  );
  return results;
}
