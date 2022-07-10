import React from "react";
import { Outlet } from "react-router-dom";
import { AdminBar } from "../AdminBar/AdminBar";

const Admin = () => {
  return (
    <div>
      <h2 className="text-center text-4xl bg-white w-1/3 m-auto mt-5 rounded-lg py-5">
        Cuenta Administrativa
      </h2>
      <div className="md:flex md:min-h-screen">
        <AdminBar />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Admin;
