import { useEffect, useState } from "react";
import styles from "./ViewRoles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { viewRoles } from "../../redux/actions";
import { CardRoles } from "../CardRoles/CardRoles";

export const ViewRoles = () => {
  const dispatch = useDispatch();
  const [rol, setRol] = useState('');

  const roles = useSelector((state) => state.roles);

  useEffect(() => {
    dispatch(viewRoles());
  }, [dispatch]);

  return (
    <>
      <div className={styles.searchViewProducts}>
        <form className={styles.searchContainer} onSubmit={(e) => {
          e.preventDefault();
          dispatch(getProductsFilter(rol))
          setRol('')
        }}>
          <input 
            className={styles.searchBar} 
            placeholder="Search" 
            value={rol}
            onChange={e => setDrink(e.target.value)}
          />
          <button type='submit'>🔍</button>
        </form>
      </div>
      <div className="border bg-gray-300 my-1 rounded-lg text-xl p-5 flex align-middle justify-between">
        <p className="flex w-3/5 align-center text-2xl">Email</p>
        <p className="flex w-1/5 align-middle text-2xl">Name</p>
        <p className="flex w-1/5 align-middle text-2xl">State</p>
        <p className="flex w-1/5 align-middle text-2xl">Acciones</p>
      </div>
      <div className="rounded-lg">
        {roles.length
          ? roles.map((rol) => (
              <CardRoles key={rol.id} rol={rol} />
            ))
          : ""}
      </div>
    </>
  );
};