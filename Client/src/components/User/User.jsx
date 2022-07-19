import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Admin from "../Admin/Admin";
import styles from "./User.module.css";
import { useAuth0 } from "@auth0/auth0-react";

export const User = () => {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  console.log(user);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <div className="relative inline-block text-left">
        <div>
          {isAuthenticated ? (
            <button
              onClick={handleClick}
              type="button"
              className="inline-flex justify-center w-60 rounded-md border shadow-sm px-4 py-2 bg-white text-xl font-medium text-gray-700 hover:bg-gray-50  "
              id="menu-button"
              ariaexpanded="true"
              ariahaspopup="true"
            >
              {isAuthenticated ? user.name : "Iniciar Sesion"}
              <svg
                className="-mr-1 ml-2 h-8 w-8"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                ariahidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          ) : (
            <a
              href="#"
              className="inline-flex justify-center w-60 rounded-md border shadow-sm px-4 py-2 bg-white text-xl font-medium text-gray-700 hover:bg-gray-50"
              role="menuitem"
              tabIndex="-1"
              id="menu-item-2"
              onClick={loginWithRedirect}
            >
              Iniciar Sesion
            </a>
          )}
        </div>

        {open && (
          <div
            className="origin-top-right absolute right-0 mt-2 w-60 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            ariaorientation="vertical"
            arialabelledby="menu-button"
            tabndex="-1"
          >
            <div className="py-1" role="none">
              <Link
                to="/admin"
                className="text-gray-700 block px-4 py-2 text-md"
                role="menuitem"
                tabIndex="-1"
                id="menu-item-0"
              >
                Cuenta
              </Link>
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
              )}
              {/* <a
                href="#"
                className="text-gray-700 block px-4 py-2 text-md"
                role="menuitem"
                tabIndex="-1"
                id="menu-item-2"
              >
                Salir
              </a> */}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
