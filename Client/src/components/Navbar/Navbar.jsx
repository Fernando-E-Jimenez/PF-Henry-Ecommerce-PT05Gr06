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
        <Link
          to="/"
          className={styles.logoContainer}
          onClick={() => dispatch(getProducts())}
        >
          <h1>Logo</h1>
        </Link>
        <div className={styles.searchBarContainer}>
          <SearchBar />
        </div>
        <div className={styles.userContainer}>
          <Link to="/cart">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-shopping-cart"
              width="33"
              height="33"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#ffffff"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <circle cx="6" cy="19" r="2" />
              <circle cx="17" cy="19" r="2" />
              <path d="M17 17h-11v-14h-2" />
              <path d="M6 5l14 1l-1 7h-13" />
            </svg>
          </Link>
          <User />
        </div>
      </div>
    </div>
  );
};
