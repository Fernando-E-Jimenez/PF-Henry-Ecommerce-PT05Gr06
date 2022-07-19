import { useDispatch, useSelector } from "react-redux";
import { removeProduct, productQuantity } from "../../redux/actions";
import { useEffect, useState } from "react";

export const CartItem = ({ product }) => {
  const dispatch = useDispatch();
  console.log(product.qty);

  const [quantity, setQuantity] = useState(product.qty ? product.qty : 1);

  const handleAdd = () => {
    setQuantity(quantity + 1);
    dispatch(productQuantity(product.id, quantity));
  };

  const handleDecresed = () => {
    setQuantity(quantity - 1);
    dispatch(productQuantity(product.id, quantity));
  };

  const removeProductCart = (id) => {
    console.log("producto eliminado", id);
    dispatch(removeProduct(id));
  };

  const total = quantity * product.price;

  return (
    <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
      <div className="flex w-2/5">
        <div className="w-28">
          <img className="h-36" src={product.image} alt="" />
        </div>
        <div className="flex flex-col justify-between ml-4 flex-grow">
          <span className=" text-2xl">{product.name}</span>
          <button
            onClick={() => removeProductCart(product.id)}
            className="font-semibold hover:text-red-500 text-gray-500 text-xl"
          >
            Remove
          </button>
        </div>
      </div>
      <div className="flex justify-center w-1/5 ">
        <button onClick={handleDecresed}>
          <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
            <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
          </svg>
        </button>

        <p className="mx-2 border text-center w-8">{quantity}</p>

        <button onClick={handleAdd}>
          <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
            <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
          </svg>
        </button>
      </div>
      <span className="text-center w-1/5 text-xl">{product.price}</span>
      <span className="text-center w-1/5 text-xl">{total}</span>
    </div>
  );
};
