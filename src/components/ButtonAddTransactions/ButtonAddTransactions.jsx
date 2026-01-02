import React from "react";
import { IoAdd } from "react-icons/io5";
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
        <IoAdd className={styles.icon} />
      </button>
    </div>
  );
};

export default ButtonAddTransactions;
