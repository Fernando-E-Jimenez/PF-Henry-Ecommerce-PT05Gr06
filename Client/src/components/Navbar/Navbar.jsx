import { useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { SearchBar } from "../SearchBar/SearchBar";
import { User } from "../User/User";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Navbar.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import { changeProfile, cartShow } from "../../redux/actions";

export const Navbar = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      const { name, email, nickname } = user;
      let data = {
        name,
        email,
        username: nickname,
      };
      dispatch(changeProfile(data));
    }
  }, [dispatch, changeProfile, isAuthenticated]);

  const cart = useSelector((state) => state.cart.length);
  if (profile.id) {
    dispatch(cartShow(profile.id));
  }
  return (
    <nav>
      {/* <Profile /> */}
      <div className={styles.container}>
        <NavLink
          to="/"
          className={styles.logo}
          onClick={() => dispatch(getProducts())}
        >
          Vite Wines
        </NavLink>
        <div className={styles.search}>
          <SearchBar />
        </div>
        <div className={styles.user}>
          <Link to="/cart" className={styles.cart}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-shopping-cart"
              width="33"
              height="33"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#7e52a0"
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
              <p className={styles.quantity}>{cart > 9 ? "9+" : cart}</p>
            ) : (
              ""
            )}
          </Link>

          {isAuthenticated ? (
            <User />
          ) : (
            <a
              href="#"
              className={styles.buttonUser}
              onClick={loginWithRedirect}
            >
              Iniciar Sesion
            </a>
          )}
        </div>
      </div>
    </nav>
  );
};
