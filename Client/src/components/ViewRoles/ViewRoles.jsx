import { useEffect, useState } from "react";
import "./ViewRoles.css";
import { useDispatch, useSelector } from "react-redux";
import { viewRoles, viewRolesFilter } from "../../redux/actions";
import { CardRoles } from "../CardRoles/CardRoles";

export const ViewRoles = () => {
  const dispatch = useDispatch();
  const [rol, setRol] = useState("");

  const roles = useSelector((state) => state.roles);

  useEffect(() => {
    dispatch(viewRoles());
  }, [dispatch]);

  return (
    <>
      <div className="searchViewProducts ">
        <form
          className="searchContainer border shadow-md mb-2 w-11/12 m-auto"
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(viewRolesFilter(rol));
            setRol("");
          }}
        >
          <input
            className="searchBar"
            placeholder="Buscar por rol"
            value={rol}
            onChange={(e) => setRol(e.target.value)}
          />
          <button type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-search"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#9e9e9e"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <circle cx="10" cy="10" r="7" />
              <line x1="21" y1="21" x2="15" y2="15" />
            </svg>
          </button>
        </form>
      </div>
      <div className="border w-full bg-gray-300 my-1 rounded-lg text-xl p-5 flex align-middle">
        <div className="sm:w-4/6 flex w-full">
          <p className="flex w-2/3 sm:w-2/6 justify-center sm:justify-start text-2xl">
            Email
          </p>
          <p className="hidden sm:flex sm:w-2/6 justify-center sm:justify-start text-2xl">
            Name
          </p>
          <p className="flex w-1/3 sm:w-2/6 justify-center sm:justify-start text-2xl">
            State
          </p>
        </div>
        <p className="hidden sm:flex sm:w-1/6 justify-center m-auto text-2xl">
          Acciones
        </p>
      </div>
      <div className="rounded-lg">
        {roles.length
          ? roles.map((rol) => <CardRoles key={rol.id} rol={rol} />)
          : ""}
      </div>
    </>
  );
};
