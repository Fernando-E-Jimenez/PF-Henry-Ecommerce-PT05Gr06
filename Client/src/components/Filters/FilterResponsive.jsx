import "./FilterResponsive.css";
import { useDispatch, useSelector } from "react-redux";
import { changeOrder } from "../../redux/actions";
import { useEffect, useState } from "react";
import { getCategory } from "../../redux/actions";

const FilterResponsive = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  const handleChange = (e) => {
    e.preventDefault();
    dispatch(changeOrder("", "", e.target.value));
  };

  const handleChangeOrder = (e) => {
    if (e == 5) {
      dispatch(changeOrder("", "", ""));
    } else {
      e.preventDefault();
      console.log(e.target.value);
      if (e.target.value == 1) {
        dispatch(changeOrder("ASC", "name", ""));
      } else if (e.target.value == 2) {
        dispatch(changeOrder("DESC", "name", ""));
      } else if (e.target.value == 3) {
        dispatch(changeOrder("ASC", "price", ""));
      } else if (e.target.value == 4) {
        dispatch(changeOrder("DESC", "price", ""));
      }
    }
  };

  const [isActive, setIsActive] = useState(false);
  const [isActiveF, setIsActiveF] = useState(false);

  const handleClick = () => setIsActive(!isActive);
  const handleClickF = () => setIsActiveF(!isActiveF);

  return (
    <div className=" my-1 filterCont mx-2 flex menuContainer">
      <button
        onClick={handleClick}
        className=" bg-white flex w-1/2 justify-center text-xl py-2 mr-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="gray"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
          />
        </svg>
        <p className="text-gray-500">Ordenar</p>
      </button>
      <div className={`menuFilter ${isActive ? "active" : "inactive"} nav`}>
        <select
          defaultValue="DEFAULT"
          className="select m-0"
          onChange={handleChangeOrder}
        >
          <option value={"DEFAULT"} disabled>
            Nombre
          </option>
          <option
            onSelect={() => dispatch(changeOrder("ASC", "name", ""))}
            value={1}
          >
            Ordenar de la A-Z
          </option>
          <option
            onSelect={() => dispatch(changeOrder("DESC", "name", ""))}
            value={2}
          >
            Ordenar de la Z-A
          </option>
        </select>
        <select
          defaultValue={"DEFAULT"}
          className="select m-0"
          onChange={handleChangeOrder}
        >
          <option value={"DEFAULT"} disabled>
            Precio
          </option>
          <option
            onClick={() => dispatch(changeOrder("ASC", "price", ""))}
            value={3}
          >
            Ordenar del menor al mayor precio
          </option>
          <option
            onClick={() => dispatch(changeOrder("DESC", "price", ""))}
            value={4}
          >
            Ordenar del mayor al menor precio
          </option>
        </select>
      </div>
      <button
        onClick={handleClickF}
        className=" bg-white flex w-1/2 justify-center text-xl py-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="gray"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
          />
        </svg>
        <p className="text-gray-500">Filtrar</p>
      </button>
      <div className={`menuFilter ${isActiveF ? "active" : "inactive"} nav`}>
        <select
          defaultValue={"DEFAULT"}
          className="select m-0"
          onChange={handleChange}
        >
          <option value={"DEFAULT"} disabled>
            Categorias
          </option>
          {categories.map((c) => {
            return (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default FilterResponsive;
