import React from "react";
import styles from "./CustomDropIndicator.module.css";

function CustomDropIndicator({ up }) {
  return (
    <div>
      {up ? (
        <svg
          className={styles.icon}
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="11"
          viewBox="0 0 20 11"
          fill="none"
        >
          <path d="M19 10L10 1L1 10" stroke="#FBFBFB" />
        </svg>
      ) : (
        <svg
          className={styles.icon}
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="11"
          viewBox="0 0 20 11"
          fill="none"
        >
          <path d="M1 1L10 10L19 1" stroke="#FBFBFB" />
        </svg>
      )}
    </div>
  );
}

export default CustomDropIndicator;
