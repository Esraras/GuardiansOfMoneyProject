import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchTransactions } from "../../redux/transactions/transactionsThunks";
import {
  selectTransactions,
  selectTransactionsLoading,
  selectTransactionsError,
} from "../../redux/transactions/transactionsSelectors";

import TransactionsItem from "../TransactionsItem/TransactionsItem";
import EmptyTransactions from "../EmptyTransactions/EmptyTransactions";
import css from "./TransactionsList.module.css";

export default function TransactionsList() {
  const dispatch = useDispatch();
  const items = useSelector(selectTransactions);
  const loading = useSelector(selectTransactionsLoading);
  const error = useSelector(selectTransactionsError);

  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const endOfToday = useMemo(() => {
    const d = new Date();
    d.setHours(23, 59, 59, 999);
    return d.getTime();
  }, []);

  const sortedTransactions = useMemo(() => {
    const list = Array.isArray(items) ? items : [];

    const filtered = list.filter((tx) => {
      const d = new Date(
        tx.transactionDate || tx.date || tx.transactionDateISO || ""
      );
      const t = d.getTime();

      if (!Number.isFinite(t)) return true;

      return t <= endOfToday;
    });

    return [...filtered].sort((a, b) => {
      const da = new Date(
        a.transactionDate || a.date || a.transactionDateISO || 0
      ).getTime();
      const db = new Date(
        b.transactionDate || b.date || b.transactionDateISO || 0
      ).getTime();
      return sortOrder === "asc" ? da - db : db - da;
    });
  }, [items, sortOrder, endOfToday]);

  const toggleSort = () => {
    setSortOrder((p) => (p === "asc" ? "desc" : "asc"));
  };

  if (error) return <div>Hata oluştu: {String(error)}</div>;
  if (!loading && sortedTransactions.length === 0) return <EmptyTransactions />;

  return (
    <section className={css.wrap}>
      <div className={css.scroll}>
        <div className={css.table}>
          <div className={`${css.row} ${css.head}`}>
            <button type="button" className={css.dateHead} onClick={toggleSort}>
              Date{" "}
              <span className={css.sortIcon}>
                {sortOrder === "asc" ? "▲" : "▼"}
              </span>
            </button>

            <div>Type</div>
            <div>Category</div>
            <div>Comment</div>
            <div className={css.right}>Sum</div>
            <div className={css.right}></div>
          </div>

          {sortedTransactions.map((tx) => (
            <TransactionsItem key={tx.id} tx={tx} />
          ))}
        </div>
      </div>
    </section>
  );
}
