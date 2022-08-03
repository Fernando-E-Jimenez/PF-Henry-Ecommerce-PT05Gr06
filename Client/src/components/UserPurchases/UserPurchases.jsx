import { useEffect, useState } from "react";
import "./UserPurchases.css";
import { useDispatch, useSelector } from "react-redux";
import { showPurchases, addToCartDetailUser } from "../../redux/actions";
import UserPurchase from "../UserPurchase/UserPurchase";

export const UserPurchases = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const purchases = useSelector((state) => state.purchases);

  useEffect(() => {
    if (profile.id) {
      dispatch(showPurchases(profile.id));
    }
  }, [dispatch]);

  return (
    <div className="containerPurch">
      <div className="border bg-gray-300 my-1 rounded-lg text-xl p-5 flex align-middle sm:justify-between">
        <p className="flex w-1/2 sm:w-2/5 align-center text-3xl">Productos</p>
        <p className="flex w-1/2 sm:w-1/5 align-middle text-3xl justify-center sm:justify-start">
          Estado
        </p>
        <p className="hidden sm:flex w-1/5 align-middle text-3xl">Valor</p>
        <p className="hidden sm:flex w-1/5 align-middle text-3xl justify-center">
          Acciones
        </p>
      </div>
      <div className=" bg-white">
        {purchases?.length
          ? purchases.map((purchase) => (
              <UserPurchase key={purchase.id} purchase={purchase} />
            ))
          : ""}
      </div>
    </div>
  );
};
