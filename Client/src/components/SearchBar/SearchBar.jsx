import styles from "./SearchBar.module.css";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getProductsFilter } from "../../redux/actions";

export const SearchBar = () => {
  const dispatch = useDispatch();
  const [drink, setDrink] = useState('');

  return (
    <form className={styles.searchContainer} onSubmit={(e) => {
      e.preventDefault();
      dispatch(getProductsFilter(drink))
      setDrink('')
    }}>
      <input 
        className={styles.searchBar} 
        placeholder="Search" 
        value={drink}
        onChange={e => setDrink(e.target.value)}
      />
      <button type='submit'>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-search"
          width="33"
          height="33"
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
  );
};