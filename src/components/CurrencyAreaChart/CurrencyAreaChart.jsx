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
} from "recharts";
import { fetchTryTimeseries } from "../../api/fiatApi.js";
import styles from "./CurrencyAreaChart.module.css";

const COLORS = {
  USDTRY: "#10B981", // emerald
  EURTRY: "#3B82F6", // blue
};

const formatTime = (ts) => {
  const d = new Date(ts);
  const h = d.getHours().toString().padStart(2, "0");
  const m = d.getMinutes().toString().padStart(2, "0");
  return `${h}:${m}`;
};

const numberFmt = (n) => {
  if (!Number.isFinite(n)) return "-";
  if (n >= 1000)
    return n.toLocaleString(undefined, { maximumFractionDigits: 2 });
  if (n >= 1) return n.toFixed(2);
  return n.toFixed(4);
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div
      style={{
        background: "rgba(17,24,39,0.95)",
        color: "#F9FAFB",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 8,
        padding: "8px 10px",
        boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
        fontSize: 12,
      }}
    >
      <div style={{ fontWeight: 600, marginBottom: 6, color: "#E5E7EB" }}>
        {label}
      </div>
      {payload.map((p) => (
        <div
          key={p.dataKey}
          style={{ display: "flex", gap: 8, alignItems: "center" }}
        >
          <span
            style={{
              width: 10,
              height: 10,
              background: p.color,
              borderRadius: 2,
            }}
          />
          <span style={{ minWidth: 60, color: "#E5E7EB" }}>{p.name}:</span>
          <strong style={{ color: "#FFFFFF" }}>{numberFmt(p.value)} TRY</strong>
        </div>
      ))}
    </div>
  );
};

const CurrencyAreaChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const rows = await fetchTryTimeseries(14);
        if (mounted) setData(rows);
      } catch (e) {
        console.error(e);
        if (mounted)
          setError("Failed to load fiat rates. Please try again later.");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  const last = useMemo(
    () => (data.length ? data[data.length - 1] : null),
    [data]
  );

  return (
    <div className={styles.currencyWidget}>
      {error && <div className={styles.currencyError}>{error}</div>}
      {loading ? (
        <div className={styles.currencyLoading}>Loading rates...</div>
      ) : (
        <ResponsiveContainer
          width="100%"
          height="100%"
          className={styles.areaChart}
        >
          <LineChart
            data={data}
            margin={{ top: 10, right: 12, left: 0, bottom: 4 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 10, fill: "#6B7280" }}
              axisLine={false}
              tickLine={false}
              interval={5}
              tickFormatter={formatTime}
            />
            <YAxis
              tick={{ fontSize: 10, fill: "#6B7280" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => numberFmt(v)}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="top"
              align="left"
              wrapperStyle={{ fontSize: 12, paddingBottom: 6 }}
            />
            <Line
              type="monotone"
              dataKey="USDTRY"
              name="USD/TRY"
              stroke={COLORS.USDTRY}
              dot={false}
              activeDot={{ r: 3 }}
              strokeWidth={2.25}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="EURTRY"
              name="EUR/TRY"
              stroke={COLORS.EURTRY}
              dot={false}
              activeDot={{ r: 3 }}
              strokeWidth={2.25}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
      {last && (
        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            marginTop: 6,
            fontSize: 12,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span
              style={{
                width: 8,
                height: 8,
                background: COLORS.USDTRY,
                borderRadius: 2,
              }}
            />
            <span style={{ fontWeight: 600 }}>USD/TRY:</span>
            <span>{numberFmt(last.USDTRY)} TRY</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span
              style={{
                width: 8,
                height: 8,
                background: COLORS.EURTRY,
                borderRadius: 2,
              }}
            />
            <span style={{ fontWeight: 600 }}>EUR/TRY:</span>
            <span>{numberFmt(last.EURTRY)} TRY</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrencyAreaChart;
