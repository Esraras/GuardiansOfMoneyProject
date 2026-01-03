import { useEffect } from "react";
import { useDispatch } from "react-redux";
import TransactionList from "../../TransactionsList/TransactionsList";
import Balance from "../../Balance/Balance";
import { getTransactions } from "../../../redux/transactions/operations";
import Navigation from "../../Navigation/Navigation";
import CurrencyAreaChart from "../../CurrencyAreaChart/CurrencyAreaChart";
import styles from "./HomeTab.module.css";

const HomeTab = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch]);

  return (
    <div className={styles.container}>
        <div className={styles.balance}>
          <Balance />
      </div>

      <TransactionList />
    </div>
  );
};

export default HomeTab;