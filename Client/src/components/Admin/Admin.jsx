import React from "react";
import { Outlet } from "react-router-dom";
import { AdminBar } from "../AdminBar/AdminBar";

const Admin = () => {
  return (
    <div>
      <h2 className="text-center text-4xl bg-white w-1/3 m-auto mt-5 rounded-lg py-5">
        Cuenta Administrativa
      </h2>
      <div className="md:flex mt-5">
        <AdminBar />
        <main className="bg-white py-10 px-5 rounded-lg shadow w-full mx-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Admin;
