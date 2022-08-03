import "./Filters.css";
import { useDispatch, useSelector } from "react-redux";
import { changeOrder } from "../../redux/actions";
import React, { useEffect } from "react";
import { getCategory } from "../../redux/actions";
import FilterResponsive from "./FilterResponsive";

export const Filters = () => {
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

  return (
    <>
      <div className="filterContainer hidden sm:grid">
        <div className="selectContainer">
          <select
            defaultValue="DEFAULT"
            className="select"
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
            className="select"
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
          <select
            defaultValue={"DEFAULT"}
            className="select"
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
          <button
            className="secondaryButton mt-6"
            onClick={() => handleChangeOrder(5)}
          >
            Limpiar Filtros
          </button>
        </div>
      </div>
      <div className="sm:hidden">
        <FilterResponsive />
      </div>
    </>
  );
};
