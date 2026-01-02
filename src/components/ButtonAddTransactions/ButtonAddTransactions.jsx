import React from "react";
import { useDispatch } from "react-redux";
import { openAddModal } from "../../redux/Modals/slice";
import styles from "./ButtonAddTransactions.module.css";

const ButtonAddTransactions = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(openAddModal());
  };

  return (
    <div className={styles.wrap}>
      <button className={styles.btn} onClick={handleClick} type="button">
        <svg
          className={styles.icon}
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
        >
          <path fill="none" stroke="#fbfbfb" d="M16 0v32"></path>
          <path fill="none" stroke="#fbfbfb" d="M0 16h32"></path>
        </svg>
      </button>
    </div>
  );
};

export default ButtonAddTransactions;
