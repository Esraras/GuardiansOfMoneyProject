import { useDispatch } from "react-redux";
import { useState } from "react";
import { removeTransaction } from "../../redux/transactions/transactionsThunks";

import ModalEditTransaction from "../ModalEditTransaction/ModalEditTransaction";
import css from "./TransactionsItem.module.css";

export default function TransactionsItem({ tx }) {
  const dispatch = useDispatch();
  const [openEdit, setOpenEdit] = useState(false);

  const isIncome = tx.type === "INCOME";

  const onDelete = async () => {
    await dispatch(removeTransaction(tx.id));
  };

  const dateText = tx.transactionDate
    ? String(tx.transactionDate).slice(0, 10)
    : "-";

  return (
    <>
      <div className={css.row}>
        <div>{dateText}</div>
        <div>{isIncome ? "+" : "-"}</div>
        <div>{tx.categoryName || "-"}</div>
        <div className={css.comment}>{tx.comment || "-"}</div>

        <div className={`${css.sum} ${isIncome ? css.income : css.expense}`}>
          {Number(tx.amount || 0).toFixed(2)}
        </div>

        <div className={css.actions}>
          <button
            className={css.edit}
            type="button"
            onClick={() => setOpenEdit(true)}
          >
            Edit
          </button>
          <button className={css.del} type="button" onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>

      {openEdit && (
        <ModalEditTransaction tx={tx} onClose={() => setOpenEdit(false)} />
      )}
    </>
  );
}
