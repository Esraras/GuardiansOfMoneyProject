import React from "react";
import css from "./LogoutModal.module.css";
import logout from "../../redux/auth/operations.js";
import { useDispatch } from "react-redux";

const LogoutModal = () => {
  
  const dispatch = useDispatch();

  return (
    <div className={css.modalOverlay}>
      <div className={css.modalContent}>
        <p className={css.modalText}>
          Are you sure you want <br /> to log out?
        </p>

        <div className={css.modalActions}>
          <button className={css.btnLogout} onClick={() => dispatch(logout())}>
            LOGOUT
          </button>
          <button className={css.btnCancel} onClick={""}>
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
};
export default LogoutModal;
