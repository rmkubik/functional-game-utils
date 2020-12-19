import Link from "next/link";

import styles from "./Header.module.scss";

const Header = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>
          <Link href="/">Functional Game Utils</Link>
        </h1>
        <ul>
          <li>
            <Link href="/docs">Docs</Link>
          </li>
        </ul>
      </header>
    </div>
  );
};

export default Header;
