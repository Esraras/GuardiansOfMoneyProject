import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { openAddModal } from "../../redux/Modals/slice";
import TransactionItem from "../TransactionsItem/TransactionsItem";
import styles from "./TransactionsList.module.css";
import Loader from "../Loader/Loader";
import { FaSortUp, FaSortDown } from "react-icons/fa";
import {
  selectTransactions,
  selectTransLoading,
  selectTransError,
} from "../../redux/transactions/selectors";
import { selectCategories } from "../../redux/Statistics/selectors";
import { getFormattedTransactions } from "../../helpers/transactionsFormatter";
import useMedia from "../../hooks/useMedia.jsx";

const TransactionList = () => {
  const transactions = useSelector(selectTransactions);
  const isLoading = useSelector(selectTransLoading);
  const isError = useSelector(selectTransError);
  const categories = useSelector(selectCategories);
  const { isMobile } = useMedia();
  const dispatch = useDispatch();

  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "desc",
  });

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? (
        <FaSortUp className={styles.sortIcon} />
      ) : (
        <FaSortDown className={styles.sortIcon} />
      );
    }
    return null;
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <p className={styles.text}>Oops, something went wrong...</p>;
  }

  if (!transactions || transactions.length === 0) {
    return (
      <div className={styles.emptyTransactionsContainer}>
        <p className={styles.noTransactions}>No transactions available yet.</p>
        <p className={styles.addFirstTransaction}>
          Let's add your first transaction:
        </p>
        <button
          className={styles.addTransactionButton}
          onClick={() => dispatch(openAddModal())}
        >
          ADD TRANSACTION
        </button>
      </div>
    );
  }

  return (
    <div className={styles.tableContainer}>
      {!isMobile && (
        <div className={styles.tableHeader}>
          <div
            className={styles.headerCell}
            onClick={() => requestSort("date")}
          >
            Date {getSortIcon("date")}
          </div>
          <div
            className={styles.headerCell}
            onClick={() => requestSort("type")}
          >
            Type {getSortIcon("type")}
          </div>
          <div
            className={styles.headerCell}
            onClick={() => requestSort("category")}
          >
            Category {getSortIcon("category")}
          </div>
          <div
            className={styles.headerCell}
            onClick={() => requestSort("comment")}
          >
            Comment {getSortIcon("comment")}
          </div>
          <div className={styles.headerCell} onClick={() => requestSort("sum")}>
            Sum {getSortIcon("sum")}
          </div>
          <div className={styles.headerCell}></div>
        </div>
      )}
      <ul className={styles.transactionList}>
        {getFormattedTransactions(transactions, categories, sortConfig).map(
          (transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          )
        )}
      </ul>
    </div>
  );
};

export default TransactionList;