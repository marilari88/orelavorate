import React from "react";
import styles from "./layout.module.css";
import PropTypes from "prop-types";

function Layout({ children }) {
  return (
    <>
      <div className={styles.container}>
        <nav>
          <ul>
            <li>Home</li>
            <li>Elenco Timbrature</li>
            <li>Inserimento Timbratura</li>
          </ul>
        </nav>
        <main>{children}</main>
        <footer></footer>
      </div>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.object,
};

export default Layout;
