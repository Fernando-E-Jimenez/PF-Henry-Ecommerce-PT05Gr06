import styles from "./Filters.module.css";

export const Filters = () => {
  return (
    <div className={styles.filtersContainer}>
      <div className={styles.filterBox}>
        <p>Filtro 1</p>
        <p>Filtro 2</p>
        <p>Filtro 3</p>
        <p>Filtro 4</p>
      </div>
    </div>
  );
};
