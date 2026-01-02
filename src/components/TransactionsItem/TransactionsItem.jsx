import React from "react";
import styles from "./TransactionsItem.module.css";
import { useDispatch } from "react-redux";
import { deleteTransactions } from "../../redux/transactions/operations";
import { openEditModal, addEditId } from "../../redux/Modals/slice";
import { format, parseISO } from "date-fns";
import { toast } from "react-toastify";
import useMedia from "../../hooks/useMedia.jsx";

const TransactionItem = ({ transaction }) => {
  const dispatch = useDispatch();
  const { isMobile } = useMedia();
  const { id, date, type, category, comment, sum } = transaction;

  const handleEditClick = () => {
    dispatch(addEditId(id));
    dispatch(openEditModal());
  };

  const handleDeleteClick = () => {
    dispatch(deleteTransactions(id))
      .unwrap()
      .then(() => {
        toast.success("Transaction deleted successfully");
      })
      .catch((error) => {
        toast.error(error || "Failed to delete transaction");
      });
  };

  const formatDate = (dateString) => {
    try {
      const date = dateString ? parseISO(dateString) : new Date();
      return format(date, "yyyy-MM-dd");
    } catch {
      return format(new Date(), "yyyy-MM-dd");
    }
  };

  const transactionType = type === "INCOME" ? "+" : "-";

  const mobileData = [
    { label: "date", value: formatDate(date) },
    { label: "type", value: transactionType },
    { label: "category", value: category },
    { label: "comment", value: comment || "-" },
    { label: "sum", value: sum },
  ];

  return isMobile ? (
    <li
      className={`${styles.transactionItem} ${
        type === "EXPENSE" ? styles.expense : styles.income
      }`}
    >
      {mobileData.map((item, index) => (
        <div key={index} className={styles.mobileRow}>
          <div className={styles.mobileLabel}>{item.label}</div>
          <div
            className={styles.mobileValue}
            style={{
              color:
                item.label === "sum" || item.label === "type"
                  ? type === "EXPENSE"
                    ? "var(--red-color)"
                    : "var(--yellow-color)"
                  : "inherit",
            }}
          >
            {item.value}
          </div>
        </div>
      ))}
      <div className={styles.mobileActions}>
        <button className={styles.editButton} onClick={handleEditClick}>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.81396 10.2667L1.15729 12.8667L3.75729 12.2L10.9773 4.98L9.02063 3.02L1.81396 10.2667Z"
              stroke="white"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button className={styles.deleteButton} onClick={handleDeleteClick}>
          Delete
        </button>
      </div>
    </li>
  ) : (
    <li
      className={`${styles.transactionItem} ${
        type === "EXPENSE" ? styles.expense : styles.income
      }`}
    >
      <div className={styles.transactionDate}>{formatDate(date)}</div>
      <div className={styles.transactionType}>{transactionType}</div>
      <div className={styles.transactionCategory}>{category}</div>
      <div className={styles.transactionComment}>{comment || "-"}</div>
      <div className={styles.transactionAmount}>{sum}</div>
      <div className={styles.transactionActions}>
        <button className={styles.editButton} onClick={handleEditClick}>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.81396 10.2667L1.15729 12.8667L3.75729 12.2L10.9773 4.98L9.02063 3.02L1.81396 10.2667Z"
              stroke="white"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button className={styles.deleteButton} onClick={handleDeleteClick}>
          Delete
        </button>
      </div>
    </li>
  );
};

export default TransactionItem;
