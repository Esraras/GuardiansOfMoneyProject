import { useDispatch, useSelector } from "react-redux";
import {
  selectTransError,
  selectTransLoading,
  selectTransactions,
} from "../../redux/transactions/selectors";
import { selectCategories } from "../../redux/Statistics/selectors";

import styles from "./TransactionsList.module.css";
import Loader from "../Loader/Loader";
import TransactionItem from "../TransactionsItem/TransactionsItem";
import FormButton from "../common/FormButton/FormButton";
import { openAddModal } from "../../redux/Modals/slice";

function getFormattedTransactions(transactions, categories) {
  return transactions
    .map((transaction) => getFormattedTransaction(transaction, categories))
    .toSorted((a, b) => b.date.localeCompare(a.date));
}

function getFormattedTransaction(transaction, categories) {
  const {
    transactionDate: date,
    amount: sum,
    categoryId,
    type,
    comment,
    id,
  } = transaction;

  return {
    id,
    date,
    type: type === "EXPENSE" ? "-" : "+",
    category: getCategoryName(categoryId, categories),
    comment,
    sum: `${Math.abs(sum)} lei`,
  };
}

function getCategoryName(id, categories) {
  const cat = categories.find((item) => item.id === id);
  return cat?.name || "Invalid";
}

function getHeadTransaction() {
  return ["date", "type", "category", "comment", "sum"];
}

function TransactionList() {
  const reduxTransactions = useSelector(selectTransactions);
  const isLoading = useSelector(selectTransLoading);
  const isError = useSelector(selectTransError);
  const categories = useSelector(selectCategories);

  const dispatch = useDispatch();

  return (
    <>
      {isLoading && <Loader />}
      {isError && <p className={styles.text}>Oops, something went wrong...</p>}
      {!isLoading && reduxTransactions.length === 0 ? (
        <div className={styles.container}>
          <p>No transactions available yet.</p>{" "}
          <p> Let&#39;s add your first transaction:</p>
          <FormButton
            type="button"
            text={"Add transaction"}
            variant={"multiColorButton"}
            handlerFunction={() => dispatch(openAddModal())}
          />
        </div>
      ) : (
        <>
          <ul className={styles.head_row}>
            {getHeadTransaction().map((value, idx) => (
              <li key={idx} className={styles.row_item}>
                {value}
              </li>
            ))}
            <li className={styles.row_item}></li>
          </ul>

          <ul className={styles.list}>
            {getFormattedTransactions(reduxTransactions, categories).map(
              ({ id, ...item }) => {
                return <TransactionItem key={id} id={id} transaction={item} />;
              }
            )}
          </ul>
        </>
      )}
    </>
  );
}

export default TransactionList;
