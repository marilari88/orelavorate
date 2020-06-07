import styles from "./layout.module.css";

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
        <footer>
           
        </footer>
      </div>
    </>
  )
}

export default Layout;
