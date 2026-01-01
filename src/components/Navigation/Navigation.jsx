import css from "./Navigation.module.css";
import { Icon } from "../../Icons";

function Navigation({ activeTab, onChange }) {
  return (
    <div className={css.navbar}>
      <button
        className={css.btn}
        onClick={() => onChange("home")}
        aria-pressed={activeTab === "home"}
      >
        <div
          className={`${css.navItem} ${
            activeTab === "home" ? css.navItemActive : ""
          }`}
        >
          <Icon
            id="#icon-home-nav"
            className={`${css.navIcon} ${
              activeTab === "home" ? css.navIconActive : ""
            }`}
          />
        </div>
        <span className={css.span}>Home</span>
      </button>

      <button
        className={css.btn}
        onClick={() => onChange("statistics")}
        aria-pressed={activeTab === "statistics"}
      >
        <div className={`${css.navItem} ${
          activeTab === "statistics" ? css.navItemActive : ""
        }`}>
             <Icon
          id="#icon-timeline"
          className={`${css.navIcon} ${
            activeTab === "statistics" ? css.navIconActive : ""
          }`}
        />
        </div>
         <span className={css.span}>Statistics</span>
      </button>
    
      <button
        className={`${css.navItem} ${css.itemCurr} ${
          activeTab === "currency" ? css.navItemActive : ""
        }`}
        onClick={() => onChange("currency")}
        aria-pressed={activeTab === "currency"}
      >
        <Icon
          id="#icon-dolar"
          className={`${css.navIcon} ${
            activeTab === "currency" ? css.navIconActive : ""
          }`}
        />
      </button>
    </div>
  );
}

export default Navigation;
