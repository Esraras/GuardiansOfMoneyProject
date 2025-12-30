import { useEffect } from "react";
import EditTransactionForm from "../EditTransactionForm/EditTransactionForm";
import css from "./ModalEditTransaction.module.css";

export default function ModalEditTransaction({ tx, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className={css.overlay} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={css.title}>Edit transaction</h2>
        <EditTransactionForm tx={tx} onDone={onClose} />
      </div>
    </div>
  );
}
