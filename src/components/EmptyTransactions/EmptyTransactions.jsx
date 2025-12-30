import css from "./EmptyTransactions.module.css";

export default function EmptyTransactions() {
  return (
    <div className={css.card}>
      <div className={css.icon}>💸</div>
      <div className={css.title}>No transactions yet</div>
      <div className={css.text}>
        Click the <b>+</b> button to add your first transaction.
      </div>
    </div>
  );
}
