import styles from "./ButtonAddTransactions.module.css";
import { openAddModal } from "../../redux/Modals/slice";
import { useDispatch } from "react-redux";

const AddButton = () => {
  const dispatch = useDispatch();

  return (
    <div className={styles.wrap}>
      <button
        className={styles.btn}
        type="button"
        onClick={() => {
          dispatch(openAddModal());
        }}
      >
        <svg
          id="icon-plus"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 32 32"
        >
          <path
            fill="none"
            stroke="#fbfbfb"
            d="M16 0v32"
          ></path>
          <path
            fill="none"
            stroke="#fbfbfb"
            d="M0 16h32"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default AddButton;
