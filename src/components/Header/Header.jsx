import { useState } from "react";
import css from "./Header.module.css";
import { Icon } from "../../Icons";
import LogoutModal from "../LogoutModal/LogoutModal";
import { selectUser } from "../../redux/auth/selectors.js";
import { useSelector } from "react-redux";
const Header = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const user = useSelector(selectUser);
  const displayName = user?.email ? user.email.split("@")[0] : "";

  function LogoutHandle() {
    setShowLogoutModal(true);
    localStorage.removeItem("token");
  }

  return (
    <>
      <nav className={css.navbar}>
      <div className={css.navbarContainer}>
        <div className={css.logoGroup}>
          <Icon id="#icon-logo_mobile" className={css.icon}></Icon>
        </div>

        <div className={css.userActions}>
          <span className={css.userName}>{displayName}</span>
          <div className={css.divider}></div>
          <button className={css.exitBtn} onClick={LogoutHandle}>
            <Icon id="#icon-exit" className={css.iconExit} />
            <span className={css.spanExit}>Exit</span>
          </button>
        </div>
      </div>
      </nav>

      {showLogoutModal && (
        <LogoutModal onClose={() => setShowLogoutModal(false)}/>
      )}
    </>
  );
};

export default Header;
