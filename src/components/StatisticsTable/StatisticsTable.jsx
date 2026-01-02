import styles from "./StatisticsTable.module.css";
import { useSelector } from "react-redux";
import {
  selectTransactions,
  selectTransLoading,
} from "../../redux/transactions/selectors";
import { getTrasactionCategoryColor } from "../../constants/TransactionConstants";

import LoadingSpinner from "../common/LoadingSpinner/Loader";

const StatisticsTable = () => {
  const transactionsSummary = useSelector(selectTransactions) || {
    expenseSummary: 0,
    incomeSummary: 0,
  };
  const TransLoading = useSelector(selectTransLoading) || [];

  const isLoading = useSelector(selectTransLoading);

  const renderCategorySummary = () => {
    return (
      <div className={styles.categorySummary}>
        {TransLoading.map((item) => (
          <div key={item.name} className={styles.categoryRow}>
            <div className={styles.category}>
              <div
                style={{
                  backgroundColor: getTrasactionCategoryColor(item.name),
                }}
              ></div>
              <span>{item.name}</span>
            </div>
            <span className={styles.sum}>{item.total * -1}</span>
          </div>
        ))}

        <div className={styles.total}>
          <div className={styles.totalExpenses}>
            <span>Expenses</span>
            <span>{transactionsSummary.expenseSummary * -1}</span>
          </div>

          <div className={styles.totalIncome}>
            <span>Income</span>
            <span>{transactionsSummary.incomeSummary}</span>
          </div>
        </div>
      </div>
    );
  };

  const renderMisingDataMessage = () => {
    return <p className={styles.noData}>There is no data for selected date</p>;
  };

  return (
    <div className={styles.statisticsTable}>
      <div className={styles.tableHead}>
        <span>Category</span>
        <span>Sum</span>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : TransLoading?.length > 0 ? (
        renderCategorySummary()
      ) : (
        renderMisingDataMessage()
      )}

      {/* {filteredCategories?.length > 0
        ? renderCategorySummary()
        : renderMisingDataMessage()} */}
    </div>
  );
};

export default StatisticsTable;
