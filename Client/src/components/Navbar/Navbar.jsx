import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { SearchBar } from "../SearchBar/SearchBar";
import { User } from "../User/User";
import { useDispatch, useSelector } from "react-redux";
import "./Navbar.css";
import { useAuth0 } from "@auth0/auth0-react";
import { changeProfile, cartShow, favoriteShow } from "../../redux/actions";
import mainLogo from "../../public/drink.jpg";

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
  const favorite = useSelector((state) => state.favorite.length);

  if (profile.id) {
    dispatch(cartShow(profile.id));
    dispatch(favoriteShow(profile.id));
  }

  const [isActive, setIsActive] = useState(false);
  const handleClick = () => setIsActive(!isActive);
  return (
    <nav>
      {/* <Profile /> */}
      <div className="container">
        <NavLink
          to="/"
          className="logo"
          onClick={() => dispatch(getProducts())}
        >
          Vite Wines
        </NavLink>
        <NavLink to="/" onClick={() => dispatch(getProducts())}>
          <img src={mainLogo} alt="logo" className="logoImg" />
        </NavLink>
        <div className="search">
          <SearchBar />
        </div>
        <div className="user">
          {profile.rolId === 2 ? (
            <Link to="/favorite" className="cart w-20 hidden sm:flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-heart"
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
                <path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
              </svg>
              {favorite > 0 ? (
                <p className="quantity">{favorite > 9 ? "9+" : favorite}</p>
              ) : (
                ""
              )}
            </Link>
          ) : (
            ""
          )}

          <Link to="/cart" className="cart w-20">
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
              <p className="quantity">{cart > 9 ? "9+" : cart}</p>
            ) : (
              ""
            )}
          </Link>
          <div className="menu-container">
            <button onClick={handleClick} className="burger">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-menu-2"
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
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </svg>
            </button>
            <div className={`menu ${isActive ? "active" : "inactive"} nav`}>
              <Link to="/" className="linksNav">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-home"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#7e52a0"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <polyline points="5 12 3 12 12 3 21 12 19 12" />
                  <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                  <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
                </svg>{" "}
                <p className="linksNavTitle">Inicio</p>
              </Link>
              {profile.rolId === 1 ? (
                <Link to="/admin" className="linksNav">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-building-store"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#7e52a0"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <line x1="3" y1="21" x2="21" y2="21" />
                    <path d="M3 7v1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1h-18l2 -4h14l2 4" />
                    <line x1="5" y1="21" x2="5" y2="10.85" />
                    <line x1="19" y1="21" x2="19" y2="10.85" />
                    <path d="M9 21v-4a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v4" />
                  </svg>{" "}
                  <p className="linksNavTitle">Administracion</p>
                </Link>
              ) : (
                ""
              )}
              {profile.rolId === 2 ? (
                <Link to="/favorite" className="linksNav">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-heart"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#7e52a0"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                  </svg>{" "}
                  <p className="linksNavTitle">Favoritos</p>
                </Link>
              ) : (
                ""
              )}

              {profile.rolId === 2 ? (
                <Link to="/purchases" className="linksNav">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-building-store"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#7e52a0"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <line x1="3" y1="21" x2="21" y2="21" />
                    <path d="M3 7v1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1h-18l2 -4h14l2 4" />
                    <line x1="5" y1="21" x2="5" y2="10.85" />
                    <line x1="19" y1="21" x2="19" y2="10.85" />
                    <path d="M9 21v-4a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v4" />
                  </svg>{" "}
                  <p className="linksNavTitle">Mis Compras</p>
                </Link>
              ) : (
                " "
              )}

              <hr />
              {isAuthenticated ? (
                <div className="userNav">
                  <div className="linksNav">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-user"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="#7e52a0"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <circle cx="12" cy="7" r="4" />
                      <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                    </svg>{" "}
                    <p className="linksNavTitle">{user?.name}</p>
                  </div>
                  <div className="linksNav">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-at"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="#7e52a0"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <circle cx="12" cy="12" r="4" />
                      <path d="M16 12v1.5a2.5 2.5 0 0 0 5 0v-1.5a9 9 0 1 0 -5.5 8.28" />
                    </svg>{" "}
                    <p className="linksNavTitle">{user?.email}</p>
                  </div>
                  <a
                    onClick={() => {
                      logout({ returnTo: window.location.origin });
                    }}
                    className="linksNav"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-logout"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="#7e52a0"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                      <path d="M7 12h14l-3 -3m0 6l3 -3" />
                    </svg>{" "}
                    <p className="linksNavTitle">Salir</p>
                  </a>
                </div>
              ) : (
                <div className="userNav">
                  <div className="linksNav">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-login"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="#7e52a0"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                      <path d="M20 12h-13l3 -3m0 6l-3 -3" />
                    </svg>{" "}
                    <a
                      href="#"
                      className="linksNavTitle"
                      onClick={loginWithRedirect}
                    >
                      Iniciar Sesion
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
          {isAuthenticated ? (
            <User />
          ) : (
            <>
              <a href="#" className="buttonUser" onClick={loginWithRedirect}>
                Iniciar Sesion
              </a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
