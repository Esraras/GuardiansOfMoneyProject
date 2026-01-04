import styles from "./StatisticsTable.module.css";
import { useSelector } from "react-redux";

import {
  selectSummary,
  selectStatLoading,
} from "../../redux/Statistics/selectors";
import { selectCategories } from "../../redux/Statistics/selectors";
import { getTrasactionCategoryColor } from "../../constants/TransactionConstants";
import LoadingSpinner from "../common/LoadingSpinner/Loader";

const StatisticsTable = () => {
  const transactionsSummary = useSelector(selectSummary) || [];
  const categories = useSelector(selectCategories) || [];

  const isLoading = useSelector(selectStatLoading);

  

  const renderCategorySummary = () => {
    return (
      <div className={styles.categorySummary}>
          {transactionsSummary.length > 0 &&
          transactionsSummary.map((item, idx) => {
            // Determine a readable name: prefer API-provided name; if 'Unknown' or missing, try to map by categoryId
            const providedName = item.name;
            const mappedName = item.categoryId
              ? categories.find((c) => c.id === item.categoryId)?.name
              : undefined;
            const displayName =
              providedName && providedName !== "Unknown"
                ? providedName
                : mappedName || "Unknown";

            return (
              <div key={displayName + idx} className={styles.categoryRow}>
                <div className={styles.category}>
                  <div
                    style={{
                      backgroundColor: getTrasactionCategoryColor(displayName),
                    }}
                  ></div>
                  <span>{displayName}</span>
                </div>
                <span className={styles.sum}>{(Math.abs(item.total || 0)).toFixed(2)}</span>
              </div>
            );
          })}

        <div className={styles.total}>
          <div className={styles.totalExpenses}>
            <span>Expenses</span>
            <span>
              {transactionsSummary.length > 0
                ? transactionsSummary
                    .filter((i) => i.total < 0)
                    .reduce((acc, i) => acc + Math.abs(i.total || 0), 0)
                    .toFixed(2)
                : "0.00"}
            </span>
          </div>

          <div className={styles.totalIncome}>
            <span>Income</span>
            <span>
              {transactionsSummary.length > 0
                ? transactionsSummary
                    .filter((i) => i.total > 0)
                    .reduce((acc, i) => acc + (i.total || 0), 0)
                    .toFixed(2)
                : "0.00"}
            </span>
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
      ) : transactionsSummary.length > 0 ? (
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
