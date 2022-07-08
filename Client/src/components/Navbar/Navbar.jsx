import { Link } from "react-router-dom";
import { Cart } from "../Cart/Cart";
import { SearchBar } from "../SearchBar/SearchBar";
import { User } from "../User/User";
import { useDispatch } from "react-redux";
import styles from "./Navbar.module.css";

export const Navbar = () => {
  const dispatch = useDispatch();

  return (
    <div className={styles.navbarContainer}>
      <div className={styles.navbarBox}>
        <Link to="/" className={styles.logoContainer} onClick={() => dispatch(getProducts())}>
          <h1>Logo</h1>
        </Link>
        <div className={styles.searchBarContainer}>
          <SearchBar />
        </div>
        <div className={styles.userContainer}>
          <Cart />
          <User />
        </div>
      </div>
    </div>
  );
};
