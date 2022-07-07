import { Cart } from "../Cart/Cart";
import { SearchBar } from "../SearchBar/SearchBar";
import { User } from "../User/User";
import styles from "./Navbar.module.css";

export const Navbar = () => {
  return (
    <div className={styles.navbarContainer}>
      <div className={styles.navbarBox}>
        <div className={styles.logoContainer}>
          <h1>Logo</h1>
        </div>
        <div className={styles.searchBarContainer}>
          <SearchBar />
        </div>
        <div>
          <Cart />
        </div>
        <div>
          <User />
        </div>
      </div>
    </div>
  );
};
