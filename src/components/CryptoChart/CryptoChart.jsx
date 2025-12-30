import React, { useEffect, useMemo, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ReferenceLine,
} from "recharts";
import { fetchMultipleSymbolsKlines } from "../../api/cryptoApi.js";
import styles from "./CryptoChart.module.css";

const SYMBOLS = ["BTCUSDT", "ETHUSDT", "SOLUSDT", "ADAUSDT"];

const COLORS = {
  BTCUSDT: "#F7931A", // BTC orange
  ETHUSDT: "#627EEA", // ETH blue
  SOLUSDT: "#14F195", // SOL green
  ADAUSDT: "#0D67FE", // ADA blue
};

const formatTime = (ts) => {
  const d = new Date(ts);
  const h = d.getHours().toString().padStart(2, "0");
  const m = d.getMinutes().toString().padStart(2, "0");
  return `${h}:${m}`;
};

const numberFmt = (n) => {
  if (n >= 1000) return n.toLocaleString(undefined, { maximumFractionDigits: 2 });
  if (n >= 1) return n.toFixed(2);
  return n.toFixed(4);
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div style={{
      background: "rgba(17,24,39,0.95)", // slate-900 with opacity
      color: "#F9FAFB", // slate-50
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 8,
      padding: "8px 10px",
      boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
      fontSize: 12,
    }}>
      <div style={{ fontWeight: 600, marginBottom: 6, color: "#E5E7EB" }}>{label}</div>
      {payload.map((p) => {
        const sym = p.dataKey;
        const usdKey = `${sym}_usd`;
        const usdVal = p.payload?.[usdKey];
        return (
          <div key={p.dataKey} style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span style={{ width: 10, height: 10, background: p.color, borderRadius: 2 }} />
            <span style={{ minWidth: 46, color: "#E5E7EB" }}>{p.name.replace("USDT", "")}:</span>
            <strong style={{ color: "#FFFFFF" }}>{p.value.toFixed(2)}%</strong>
            {usdVal != null && (
              <span style={{ color: "#CBD5E1" }}>({numberFmt(usdVal)} USDT)</span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default function CryptoChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetchMultipleSymbolsKlines(SYMBOLS, "1h", 24);

        // Use the timestamps from the first symbol as the base timeline
        const base = res[0]?.data || [];
        const timeline = base.map((k) => k.time);

        const seriesMap = Object.fromEntries(
          res.map(({ symbol, data }) => [symbol, data.map((d) => d.close)])
        );

        const merged = timeline.map((t, idx) => ({
          time: t,
          label: formatTime(t),
          BTCUSDT_usd: seriesMap.BTCUSDT?.[idx] ?? null,
          ETHUSDT_usd: seriesMap.ETHUSDT?.[idx] ?? null,
          SOLUSDT_usd: seriesMap.SOLUSDT?.[idx] ?? null,
          ADAUSDT_usd: seriesMap.ADAUSDT?.[idx] ?? null,
        }));

        // Normalize to % relative to first available value for each symbol (100 baseline)
        const bases = {
          BTCUSDT: merged.find((r) => r.BTCUSDT_usd != null)?.BTCUSDT_usd ?? null,
          ETHUSDT: merged.find((r) => r.ETHUSDT_usd != null)?.ETHUSDT_usd ?? null,
          SOLUSDT: merged.find((r) => r.SOLUSDT_usd != null)?.SOLUSDT_usd ?? null,
          ADAUSDT: merged.find((r) => r.ADAUSDT_usd != null)?.ADAUSDT_usd ?? null,
        };

        const normalized = merged.map((r) => ({
          ...r,
          BTCUSDT: bases.BTCUSDT ? ((r.BTCUSDT_usd / bases.BTCUSDT) - 1) * 100 : null,
          ETHUSDT: bases.ETHUSDT ? ((r.ETHUSDT_usd / bases.ETHUSDT) - 1) * 100 : null,
          SOLUSDT: bases.SOLUSDT ? ((r.SOLUSDT_usd / bases.SOLUSDT) - 1) * 100 : null,
          ADAUSDT: bases.ADAUSDT ? ((r.ADAUSDT_usd / bases.ADAUSDT) - 1) * 100 : null,
        }));

        if (isMounted) setData(normalized);
      } catch (e) {
        console.error(e);
        if (isMounted) setError("Failed to load crypto data. Please try again later.");
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  const lastRow = useMemo(() => (data && data.length ? data[data.length - 1] : null), [data]);

  if (loading) return <div className={styles.loading}>Loading crypto…</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.container}>
      <div className={styles.chart}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 12, left: 0, bottom: 4 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
            <XAxis dataKey="label" tick={{ fontSize: 10, fill: "#6B7280" }} axisLine={false} tickLine={false} interval={5} />
            <YAxis domain={["auto", "auto"]} tick={{ fontSize: 10, fill: "#6B7280" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v.toFixed(0)}%`} />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="top"
              align="left"
              wrapperStyle={{ fontSize: 12, paddingBottom: 6 }}
              formatter={(value) => value.replace("USDT", "")}
            />
            <ReferenceLine y={0} stroke="#9CA3AF" strokeDasharray="4 4" />
            {SYMBOLS.map((sym) => (
              <Line
                key={sym}
                type="monotone"
                dataKey={sym}
                name={sym}
                stroke={COLORS[sym]}
                dot={false}
                activeDot={{ r: 3 }}
                strokeWidth={2.25}
                isAnimationActive={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {lastRow && (
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 6, fontSize: 12 }}>
          {SYMBOLS.map((sym) => (
            <div key={`tag-${sym}`} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 8, height: 8, background: COLORS[sym], borderRadius: 2 }} />
              <span style={{ fontWeight: 600 }}>{sym.replace("USDT", "")}:</span>
              <span>{lastRow[sym] != null ? `${lastRow[sym].toFixed(2)}%` : "-"}</span>
              {lastRow[`${sym}_usd`] != null && (
                <span style={{ color: "#6B7280" }}>({numberFmt(lastRow[`${sym}_usd`])} USDT)</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}