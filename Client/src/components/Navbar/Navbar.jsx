import { useEffect } from "react";
import { Link } from "react-router-dom";
import { SearchBar } from "../SearchBar/SearchBar";
import { User } from "../User/User";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Navbar.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import { changeProfile, cartShow } from "../../redux/actions";

export const Navbar = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useAuth0();
  const profile = useSelector((state) => state.profile);

  useEffect(() => {
    if(isAuthenticated) {
      const { name, email, nickname } = user;
      let data = {
        name,
        email,
        username: nickname
      }
      dispatch(changeProfile(data))
    }
  }, [dispatch, changeProfile, isAuthenticated])

  const cart = useSelector((state) => state.cart.length);
  if(profile.id) {
    dispatch(cartShow(profile.id))
  }
  return (
    <div className={styles.navbarContainer}>
      {/* <Profile /> */}
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
          <Link to="/cart" className={styles.cartContainer}>
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
            {cart > 0 ? (
              <p className={styles.cartQuantity}>{cart > 9 ? "9+" : cart}</p>
            ) : (
              ""
            )}
          </Link>

          <User />
          {isAuthenticated ? (
            <div className="w-20 h-20">
              <img
                className="rounded-full"
                src={user.picture}
                alt={user.name}
              />
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};
