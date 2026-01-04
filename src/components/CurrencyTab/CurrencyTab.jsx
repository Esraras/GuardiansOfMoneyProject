import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrencyRates } from "../../features/currency/currencyOperations.js";
import styles from "./CurrencyTab.module.css";
import { MOCK_RATES } from "../../features/currency/currencySlice.js";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const CurrencyTab = () => {
  const dispatch = useDispatch();

  const currencyData = useSelector((state) => state.currency.rates);
  const isLoading = useSelector((state) => state.currency.isLoading);

  const [baseline, setBaseline] = useState(null);

  const BASE_KEY = "currencyTrendBaseline";

  useEffect(() => {
    dispatch(fetchCurrencyRates());
  }, [dispatch]);

  // Load baseline from localStorage; refresh if older than 24h
  useEffect(() => {
    try {
      const raw = localStorage.getItem(BASE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setBaseline(parsed);
      }
    } catch (_) {}
  }, []);

  useEffect(() => {
    if (!currencyData || currencyData.length === 0) return;
    const now = Date.now();
    const TWENTY_FOUR_H = 24 * 60 * 60 * 1000;
    const shouldRefresh = !baseline || !baseline.timestamp || now - baseline.timestamp > TWENTY_FOUR_H;
    if (shouldRefresh) {
      const snapshot = {
        timestamp: now,
        rates: currencyData
          .filter((r) => (r.currencyCodeA === 840 || r.currencyCodeA === 978) && r.currencyCodeB === 980)
          .map((r) => ({
            currencyCodeA: r.currencyCodeA,
            currencyCodeB: r.currencyCodeB,
            rateBuy: Number(r.rateBuy),
            rateSell: Number(r.rateSell),
          })),
      };
      setBaseline(snapshot);
      try {
        localStorage.setItem(BASE_KEY, JSON.stringify(snapshot));
      } catch (_) {}
    }
  }, [currencyData]);

  const displayData =
    currencyData && currencyData.length > 0 ? currencyData : MOCK_RATES;

  const baseMap = useMemo(() => {
    if (!baseline || !baseline.rates) return {};
    const map = {};
    baseline.rates.forEach((r) => {
      map[r.currencyCodeA] = r;
    });
    return map;
  }, [baseline]);

  const trend = (codeA, key, currentVal) => {
    const base = baseMap[codeA]?.[key];
    if (typeof base !== "number" || typeof currentVal !== "number") return 0; // neutral
    const diff = currentVal - base;
    const eps = 0.0001;
    if (diff > eps) return 1;
    if (diff < -eps) return -1;
    return 0;
  };

  if (isLoading) {
    return (
      <div className={styles.currencyTab}>
        <div className={styles.currencyLoading}>Loading...</div>
      </div>
    );
  }

  return (
    <div className={styles.currencyTab}>
      <div className={styles.tableHeader}>
        <span style={{ gridColumn: "1 / 2" }}>Currency</span>
        <span style={{ gridColumn: "2 / 3" }}>Purchase</span>
        <span style={{ gridColumn: "3 / 4" }}>Sale</span>
      </div>

      <div>
        {displayData
          .filter((r) => r.currencyCodeA === 840 || r.currencyCodeA === 978)
          .map((rate) => {
            const code = rate.currencyCodeA;
            const label = code === 840 ? "USD" : code === 978 ? "EUR" : code;
            const buy = Number(rate.rateBuy);
            const sell = Number(rate.rateSell);
            const tBuy = trend(code, "rateBuy", buy);
            const tSell = trend(code, "rateSell", sell);
            return (
              <div key={code} className={styles.currencyRow}>
                <span style={{ gridColumn: "1 / 2" }} className={`${tBuy > 0 ? styles.trendUp : tBuy < 0 ? styles.trendDown : ""}`}>{label}</span>
                <span style={{ gridColumn: "2 / 3" }}>
                  <span className={`${styles.valueCell} ${tBuy > 0 ? styles.trendUp : tBuy < 0 ? styles.trendDown : ""}`}>
                    {tBuy > 0 && <ArrowUpRight size={16} />}
                    {tBuy < 0 && <ArrowDownRight size={16} />}
                    <span style={{ color: "inherit" }}>{buy}</span>
                  </span>
                </span>
                <span style={{ gridColumn: "3 / 4" }}>
                  <span className={`${styles.valueCell} ${tSell > 0 ? styles.trendUp : tSell < 0 ? styles.trendDown : ""}`}>
                    {tSell > 0 && <ArrowUpRight size={16} />}
                    {tSell < 0 && <ArrowDownRight size={16} />}
                    <span style={{ color: "inherit" }}>{sell}</span>
                  </span>
                </span>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default CurrencyTab;