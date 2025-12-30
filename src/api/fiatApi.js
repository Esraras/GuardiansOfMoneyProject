// CORS-friendly fiat timeseries using Frankfurter first, fallback to exchangerate.host

const FRANKFURTER = "https://api.frankfurter.app";
const EXCHANGE_HOST = "https://api.exchangerate.host";

function fmtDate(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

async function fetchFromFrankfurter(days) {
  const end = new Date();
  const start = new Date(end);
  start.setDate(end.getDate() - (days - 1));

  const startStr = fmtDate(start);
  const endStr = fmtDate(end);

  const [usdRes, eurRes] = await Promise.all([
    fetch(`${FRANKFURTER}/${startStr}..${endStr}?from=USD&to=TRY`),
    fetch(`${FRANKFURTER}/${startStr}..${endStr}?from=EUR&to=TRY`),
  ]);
  if (!usdRes.ok || !eurRes.ok) throw new Error("Frankfurter request failed");
  const [usdData, eurData] = await Promise.all([usdRes.json(), eurRes.json()]);
  if (!usdData.rates || !eurData.rates)
    throw new Error("Frankfurter invalid payload");

  const dates = Object.keys(usdData.rates)
    .filter((d) => eurData.rates[d])
    .sort();
  return dates.map((date) => {
    const dt = new Date(date + "T00:00:00Z");
    const label = `${String(dt.getMonth() + 1).padStart(2, "0")}/${String(
      dt.getDate()
    ).padStart(2, "0")}`;
    return {
      time: dt.getTime(),
      label,
      USDTRY: usdData.rates[date]?.TRY ?? null,
      EURTRY: eurData.rates[date]?.TRY ?? null,
    };
  });
}

async function fetchFromExchangeHost(days) {
  const end = new Date();
  const start = new Date(end);
  start.setDate(end.getDate() - (days - 1));
  const url = `${EXCHANGE_HOST}/timeseries?start_date=${fmtDate(
    start
  )}&end_date=${fmtDate(end)}&base=TRY&symbols=USD,EUR`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("exchangerate.host request failed");
  const data = await res.json();
  if (!data || !data.rates)
    throw new Error("exchangerate.host invalid payload");
  return Object.keys(data.rates)
    .sort()
    .map((date) => {
      const r = data.rates[date] || {};
      const usdPerTry = typeof r.USD === "number" ? r.USD : null;
      const eurPerTry = typeof r.EUR === "number" ? r.EUR : null;
      const usdTry = usdPerTry ? 1 / usdPerTry : null;
      const eurTry = eurPerTry ? 1 / eurPerTry : null;
      const dt = new Date(date + "T00:00:00Z");
      const label = `${String(dt.getMonth() + 1).padStart(2, "0")}/${String(
        dt.getDate()
      ).padStart(2, "0")}`;
      return { time: dt.getTime(), label, USDTRY: usdTry, EURTRY: eurTry };
    });
}

export async function fetchTryTimeseries(days = 14) {
  let lastErr;
  for (const fetcher of [fetchFromFrankfurter, fetchFromExchangeHost]) {
    try {
      const rows = await fetcher(days);
      if (rows && rows.length) return rows;
      lastErr = new Error("Empty timeseries result");
    } catch (e) {
      lastErr = e;
      continue;
    }
  }
  throw lastErr || new Error("Failed to load fiat timeseries");
}
