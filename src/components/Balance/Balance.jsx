import css from "./Balance.module.css";
import {selectUserBalance} from "../../redux/auth/selectors.js";
import {useSelector} from "react-redux";

function Balance() {

  const balance = useSelector(selectUserBalance);

  return (
    <div className={css.balanceCard}>
      <div className={css.balanceContent}>
        <span className={css.label}>YOUR BALANCE</span>
        <div className={css.amountRow}>
          <span className={css.currency}>₴</span>
          <span className={css.balance}>{balance}</span>
        </div>
      </div>
    </div>
  );
}
export default Balance;
