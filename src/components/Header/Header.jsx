import React from 'react';
import './Header.module.css';

const Header = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo-group">
            <svg className="icon">
              <use href="./images/icons.svg#icon-exit" />
            </svg>
          <h1 className="brand-name">Money Guard</h1>
        </div>

        <div className="user-actions">
          <span className="user-name">Name</span>
          <div className="divider"></div>
          <button className="exit-btn">
            <span>Exit</span>
            <svg className="icon">
              <use href="./images/icons.svg#icon-exit" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;