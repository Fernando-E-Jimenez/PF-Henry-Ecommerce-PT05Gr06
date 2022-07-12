import styles from "./Filters.module.css";
import { useDispatch } from "react-redux";
import { changeOrder } from "../../redux/actions";

export const Filters = () => {
  const dispatch = useDispatch();

  return (
    <div className={styles.filtersContainer}>
      <div className={styles.filterBox}>
        <button onClick={() => dispatch(changeOrder('ASC', 'name'))}>⏫ Ordenar de la A-Z</button>
        <button onClick={() => dispatch(changeOrder('DESC', 'name'))}>⏬ Ordenar de la Z-A</button>
        <button onClick={() => dispatch(changeOrder('ASC', 'price'))}>➖ Ordenar del menor al mayor precio</button>
        <button onClick={() => dispatch(changeOrder('DESC', 'price'))}>➕ Ordenar del mayor al menor precio</button>
      </div>
    </div>
  );
};
