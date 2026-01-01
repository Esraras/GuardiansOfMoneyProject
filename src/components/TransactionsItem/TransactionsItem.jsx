import clsx from "clsx";
import { useDispatch } from "react-redux";
import { useState } from "react";

import { deleteTransactions } from "../../redux/transactions/operations";
import { openEditModal, addEditId } from "../../redux/Modals/slice";

import styles from "./TransactionsItem.module.css";
import { getBalanceThunk } from "../../redux/auth/operations";

function getStyleByType(type) {
  const currentColor =
    type === "-" ? "var(--red-color)" : "var(--yellow-color)";
  return { color: currentColor };
}

function TransactionItem({ transaction, id }) {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const style = getStyleByType(transaction.type);

  function onEdit() {
    if (!isModalOpen) {
      dispatch(addEditId(id));
      dispatch(openEditModal());
      setIsModalOpen(true);
    }
  }

  async function OnDelete() {
    await dispatch(deleteTransactions(id));
    dispatch(getBalanceThunk());
  }

  return (
    <li className={styles.item} style={style}>
      <ul className={clsx(styles.card, styles.mobileOnly)}>
        {Object.keys(transaction).map((tKey) => (
          <li key={tKey} className={styles.row}>
            <span className={styles.row_item}>{tKey}</span>
            <span className={styles.row_item}>{transaction[tKey]}</span>
          </li>
        ))}

        <li className={styles.row}>
          <button
            type="button"
            className={clsx(styles.btn_edit, styles.row_item)}
            onClick={onEdit}
          >
            <svg
              id="icon-edit"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
            >
              <path
                fill="none"
                stroke="#fff"
                d="M23.733 12.718l-5.744-5.744M1.477 29.231l4.86-0.54c0.594-0.066 0.891-0.099 1.168-0.189 0.246-0.080 0.48-0.192 0.696-0.335 0.243-0.161 0.455-0.372 0.877-0.794l18.963-18.963c1.586-1.586 1.586-4.158 0-5.744s-4.158-1.586-5.744 0l-18.963 18.963c-0.422 0.422-0.634 0.634-0.794 0.877-0.142 0.216-0.255 0.45-0.335 0.696-0.090 0.277-0.123 0.574-0.189 1.168l-0.54 4.86z"
              ></path>
            </svg>
          </button>
          <button
            type="button"
            className={clsx(styles.colored, "btn_delete")}
            onClick={OnDelete}
          >
            Delete
          </button>
        </li>
      </ul>

      <ul className={clsx(styles.row, styles.desktopOnly)}>
        {Object.values(transaction).map((value, idx) => (
          <li key={idx} className={styles.row_item}>
            {value}
          </li>
        ))}

        <li className={clsx(styles.row_item, styles.controls)}>
          <button type="button" className={styles.btn_edit} onClick={onEdit}>
            <svg
              id="icon-edit"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
            >
              <path
                fill="none"
                stroke="#fff"
                d="M23.733 12.718l-5.744-5.744M1.477 29.231l4.86-0.54c0.594-0.066 0.891-0.099 1.168-0.189 0.246-0.080 0.48-0.192 0.696-0.335 0.243-0.161 0.455-0.372 0.877-0.794l18.963-18.963c1.586-1.586 1.586-4.158 0-5.744s-4.158-1.586-5.744 0l-18.963 18.963c-0.422 0.422-0.634 0.634-0.794 0.877-0.142 0.216-0.255 0.45-0.335 0.696-0.090 0.277-0.123 0.574-0.189 1.168l-0.54 4.86z"
              ></path>
            </svg>
          </button>
          <button
            type="button"
            className={clsx(styles.colored, "btn_delete")}
            onClick={OnDelete}
          >
            Delete
          </button>
        </li>
      </ul>
    </li>
  );
}

export default TransactionItem;
