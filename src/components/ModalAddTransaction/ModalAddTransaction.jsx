import { useEffect } from "react";
import ButtonAddTransactions from "../ButtonAddTransactions/ButtonAddTransactions";
import css from "./ModalAddTransaction.module.css";

export default function ModalAddTransaction({ onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className={css.overlay} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={css.title}>Add transaction</h2>
        <ButtonAddTransactions onDone={onClose} />
      </div>
    </div>
  );
}
