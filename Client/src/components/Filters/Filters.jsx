import "./Filters.css";
import { useDispatch, useSelector } from "react-redux";
import { changeOrder } from "../../redux/actions";
import React, { useEffect } from "react";
import { getCategory } from "../../redux/actions";

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

  return (
    <div className="filterContainer">
      <div className="selectContainer">
        <p className="title">Filtrar por Categoria</p>
        <select
          defaultValue={"DEFAULT"}
          className="select"
          onChange={handleChange}
        >
          <option className="option" value={"DEFAULT"} disabled>
            Categoria
          </option>
          {categories.map((c) => {
            return (
              <option key={c.id} value={c.id} className="option">
                {c.name}
              </option>
            );
          })}
        </select>
      </div>

      <div className="selectContainer">
        <button onClick={() => dispatch(changeOrder("ASC", "name", ""))}>
          <p className="title">Ordenar de la A-Z</p>
        </button>
      </div>

      <div className="selectContainer">
        <button onClick={() => dispatch(changeOrder("DESC", "name", ""))}>
          <p className="title">Ordenar de la Z-A</p>
        </button>
      </div>
      <div className="selectContainer">
        <button onClick={() => dispatch(changeOrder("ASC", "price", ""))}>
          <p className="title">Ordenar del menor al mayor precio</p>
        </button>
      </div>
      <div className="selectContainer">
        <button onClick={() => dispatch(changeOrder("DESC", "price", ""))}>
          <p className="title">Ordenar del mayor al menor precio</p>
        </button>
      </div>
      <button className="secondaryButton button">Limpiar filtros</button>
    </div>
  );
};
