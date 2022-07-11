import React from "react";

export const CardCategory = ({ category }) => {
  return (
    <div className="border my-1 rounded-lg text-xl p-5 flex align-middle justify-between">
      <p className="flex w-full align-middle text-2xl">{category.name}</p>
      <div className="flex w-1/3">
        <button
          className="mr-5 bg-yellow-400  w-full p-3 font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
          type="submit"
        >
          Editar
        </button>
        <button
          className="bg-red-400  w-full p-3 font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
          type="submit"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};
