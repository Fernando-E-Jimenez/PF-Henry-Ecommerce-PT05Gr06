import { useState } from "react";
import { Outlet } from "react-router-dom";
import { AdminBar } from "../AdminBar/AdminBar";
import "./Admin.css";

const Admin = () => {
  const [isActive, setIsActive] = useState(false);
  const handleClick = () => setIsActive(!isActive);

  return (
    <div>
      <div className="flex bg-white align-middle w-4/5 sm:w-1/3 m-auto justify-between sm:justify-center mt-5 rounded-lg p-5">
        <h2 className="text-center text-gray-500 text-4xl">
          Cuenta Administrativa
        </h2>
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
          <div
            className={`menu ${
              isActive ? "active" : "inactive"
            } nav menuActive`}
          >
            <AdminBar />
          </div>
        </div>
      </div>
      <div className="md:flex mt-5">
        <div className="md:w-1/3 lg:w-1/5 xl:w-1/6 hidden sm:block">
          <AdminBar />
        </div>
        <main className="bg-white sm:block py-10 sm:px-5 rounded-lg shadow w-11/12 m-auto sm:w-full sm:mx-10 mb-6 ">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Admin;
