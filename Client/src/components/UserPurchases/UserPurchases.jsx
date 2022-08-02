import { useEffect, useState } from "react";
import styles from "./UserPurchases.module.css";
import { useDispatch, useSelector } from "react-redux";
import { showPurchases, addToCartDetailUser } from "../../redux/actions";

export const UserPurchases = () => {
    const dispatch = useDispatch();
    const profile = useSelector((state) => state.profile);
    const purchases = useSelector((state) => state.purchases);

    useEffect(() => {
        if(profile.id) {
            dispatch(showPurchases(profile.id));
        }
    }, [dispatch]);

    const repurchase = (products) => {
        if(profile.id) {
            products.map((product) => (
                dispatch(addToCartDetailUser(profile.id, product.id, product.productXorder.cant ))
            ))
        }
    }

  return (
    <>
      <div className="border bg-gray-300 my-1 rounded-lg text-xl p-5 flex align-middle justify-between">
        <p className="flex w-3/5 align-center text-2xl">Productos</p>
        <p className="flex w-1/5 align-middle text-2xl">Estado</p>
        <p className="flex w-1/5 align-middle text-2xl">Valor</p>
        <p className="flex w-1/5 align-middle text-2xl">Acciones</p>
      </div>
      <div className="rounded-lg">
        {purchases?.length
          ? purchases.map((purchase) => (
                <div key={purchase.id} className="border my-1 rounded-lg text-xl p-5 flex align-middle justify-between">
                    {purchase.products.map((product) => (
                        <div key={product.id}>
                            {/* <img className={styles.imagen} src={product.image} alt="imagen" /> */}
                            <p className="flex w-4/5 align-center mr-3 text-2xl">{product.name}</p>
                        </div>
                    ))}
                    <p className="flex w-1/5 align-middle text-2xl">{purchase.state.name}</p>
                    <p className="flex w-1/5 align-middle text-2xl">{purchase.mont}</p>

                    <div className="flex w-1/3">
                    <button
                        onClick={() => repurchase(purchase.products)}
                        className="mr-5 bg-yellow-400  w-full p-3 font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
                        type="button"
                    >
                        Volver a comprar
                    </button>
                    </div>
                </div>
            ))
          : ""}
      </div>
    </>
  );
};