import styles from "./SearchBar.module.css";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getProductsFilter } from "../../redux/actions";
import axios from "axios";
const { VITE_URL_API } = import.meta.env;

export const SearchBar = () => {
  const dispatch = useDispatch();
  const [drink, setDrink] = useState("");
  const [drinks, setDrinks] = useState([]);
  const [suggestions, setsuggestions] = useState([]);

  useEffect(() => {
    const loadDrinks = async () => {
      const reponse = await axios.get(
        `${VITE_URL_API}/guess/product/autocomplete`
      );
      setDrinks(reponse.data);
    };
    loadDrinks();
  }, []);

  const onChangeHandler = (text) => {
    let matches = [];
    if (text.length > 0) {
      matches = drinks.filter((p) => {
        const regex = new RegExp(`${text}`, "gi");
        return p.name.match(regex);
      });
    }
    setsuggestions(matches.slice(0, 7));
    setDrink(text);
  };

  const onSuggestionHandler = (text) => {
    setDrink(text);
    setsuggestions([]);
  };

  return (
    <form
      className={styles.searchContainer}
      onSubmit={(e) => {
        e.preventDefault();
        dispatch(getProductsFilter(drink));
        setDrink("");
      }}
    >
      <div className={styles.searchBar}>
        <input
          className={styles.searchBar}
          placeholder="Buscar productos"
          value={drink}
          onChange={(e) => onChangeHandler(e.target.value)}
        />
        <div className={styles.autocomplete}>
          {suggestions &&
            suggestions.map((s, i) => {
              return (
                <div
                  className={styles.autocompleteItem}
                  key={i}
                  onClick={() => onSuggestionHandler(s.name)}
                >
                  {s.name}
                </div>
              );
            })}
        </div>
      </div>

      <button type="submit">
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
