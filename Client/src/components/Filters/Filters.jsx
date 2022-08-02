import styles from "./Filters.module.css";
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
    dispatch(changeOrder('', '', e.target.value))
  }

  return (
    <div className={styles.filtersContainer}>
      <div className={styles.filterBox}>
        <select defaultValue={'DEFAULT'} className={styles.categoriesContainer}>
          <option value={'DEFAULT'} disabled >Nombre</option>
          <option onClick={() => dispatch(changeOrder('ASC', 'name', ''))}>⏫ Ordenar de la A-Z</option>
          <option onClick={() => dispatch(changeOrder('DESC', 'name', ''))}>⏬ Ordenar de la Z-A</option>
        </select>
        <select defaultValue={'DEFAULT'} className={styles.categoriesContainer}>
          <option value={'DEFAULT'} disabled >Precio</option>
          <option onClick={() => dispatch(changeOrder('ASC', 'price', ''))}>➖ Ordenar del menor al mayor precio</option>
          <option onClick={() => dispatch(changeOrder('DESC', 'price', ''))}>➕ Ordenar del mayor al menor precio</option>
        </select>
        <select defaultValue={'DEFAULT'} className={styles.categoriesContainer} onChange={handleChange}>
          <option value={'DEFAULT'} disabled >Categorias</option>
          {categories.map(c => {
            return <option key={c.id} value={c.id}>{c.name}</option>
          })}
        </select>
      </div>
    </div>
  );
};
