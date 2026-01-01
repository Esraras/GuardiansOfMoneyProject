import css from "./LogoutModal.module.css";
import { logoutThunk } from "../../redux/auth/operations.js";
import { useDispatch } from "react-redux";
import { Icon } from "../../Icons";

const LogoutModal = ({ onClose }) => {
  const dispatch = useDispatch();

  return (
    <div className={css.modalOverlay} onClick={onClose}>
      <div className={css.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={css.logoGroup}>
          <Icon id="#icon-logo_mobile" className={css.icon}></Icon>
        </div>
        <p className={css.modalText}>
          Are you sure you want <br className={css.br}/> to log out?
        </p>

        <div className={css.modalActions}>
          <button
            className={css.btnLogout}
            onClick={() => dispatch(logoutThunk())}
          >
            LOGOUT
          </button>
          <button className={css.btnCancel} onClick={onClose}>
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
};
export default LogoutModal;
