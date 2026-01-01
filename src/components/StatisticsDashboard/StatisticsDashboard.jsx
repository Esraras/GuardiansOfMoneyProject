import { useEffect, useState } from "react";
import styles from "./StatisticsDashboard.module.css";
import { useDispatch } from "react-redux";
import {
  Months_OPTIONS,
  YEARS_OPTIONS,
} from "../../constants/TransactionConstants";
import { fetchTransactionsSummary } from "../../redux/Statistics/operations";

const StatisticsDashboard = () => {
  const dispatch = useDispatch();

  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    dispatch(fetchTransactionsSummary({ month, year }));
  }, [month, year, dispatch]);

  return (
    <div className={styles.dropdownsWrapper}>
      <select value={month} onChange={(e) => setMonth(e.target.value)}>
        {Months_OPTIONS.map((item) => (
          <option
            key={item.value}
            value={item.value}
            label={item.label}
          ></option>
        ))}
      </select>
      <select value={year} onChange={(e) => setYear(e.target.value)}>
        {YEARS_OPTIONS.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StatisticsDashboard;
