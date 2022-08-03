import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./User.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";

export const User = () => {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const handleClick = () => setIsActive(!isActive);

  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  const profile = useSelector((state) => state.profile);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const pageClickEvent = (e) => {
  //     if (
  //       dropdownRef.current !== null &&
  //       !dropdownRef.current.contains(e.target)
  //     ) {
  //       setIsActive(!isActive);
  //     }
  //   };

  //   if (isActive) {
  //     window.addEventListener("click", pageClickEvent);
  //   }

  //   return () => {
  //     window.removeEventListener("click", pageClickEvent);
  //   };
  // }, [isActive]);

  // console.log(isActive);

  return (
    <>
      <div className="menu-container">
        {isAuthenticated ? (
          <div onClick={handleClick}>
            {isAuthenticated ? (
              <div className="buttonUser">
                {user.name}{" "}
                <div className="w-16 h-16 ml-3">
                  <img
                    className="rounded-full"
                    src={user.picture}
                    alt={user.name}
                  />
                </div>
              </div>
            ) : (
              "Iniciar Sesion"
            )}
          </div>
        ) : (
          ""
        )}

        <nav
          ref={dropdownRef}
          className={`menu ${isActive ? "active" : "inactive"} nav`}
        >
          <ul>
            {profile.rolId == 1 ? (
              <li className="li-flex">
                <Link to="/admin">Administrador</Link>
              </li>
            ) : profile.rolId == 2 ? (
              <li className="li-flex">
                <Link to="/purchases">Mis Compras</Link>
              </li>
            ) : (
              ""
            )}
            <li className="li-flex">
              <p>{user.email}</p>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-700 block px-4 py-2 text-md"
                role="menuitem"
                tabIndex="-1"
                id="menu-item-2"
                onClick={() => {
                  logout({ returnTo: window.location.origin });
                }}
              >
                Salir
              </a>
            </li>
          </ul>
        </nav>

        {/* {open && (
          <div
            className="origin-top-right absolute right-0 mt-2 w-60 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            ariaorientation="vertical"
            arialabelledby="menu-button"
            tabndex="-1"
          >
            <div className="py-1" role="none">
              {profile.rolId == 1 ? (
                <Link
                  to="/admin"
                  className="text-gray-700 block px-4 py-2 text-md"
                  role="menuitem"
                  tabIndex="-1"
                  id="menu-item-0"
                >
                  Cuenta
                </Link>
              ) : (
                ""
              )}
              <p className="text-gray-700 block px-4 py-2 text-md">
                {user.email}
              </p>
              <hr />
              {!isAuthenticated ? (
                <a
                  href="#"
                  className="text-gray-700 block px-4 py-2 text-md"
                  role="menuitem"
                  tabIndex="-1"
                  id="menu-item-2"
                  onClick={loginWithRedirect}
                >
                  Iniciar Sesion
                </a>
              ) : (
                <>
                  <a
                    href="#"
                    className="text-gray-700 block px-4 py-2 text-md"
                    role="menuitem"
                    tabIndex="-1"
                    id="menu-item-2"
                    onClick={() => navigate("/purchases") }
                  >
                    Compras
                  </a>
                  <a
                    href="#"
                    className="text-gray-700 block px-4 py-2 text-md"
                    role="menuitem"
                    tabIndex="-1"
                    id="menu-item-2"
                    onClick={() => {
                      logout({ returnTo: window.location.origin });
                    }}
                  >
                    Salir
                  </a>
                </>
              )}
            </div>
          </div>
        )} */}
      </div>
    </>
  );
};
