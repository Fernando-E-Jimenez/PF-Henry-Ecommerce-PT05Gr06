import "./UserPurchase.css";
import { addToCartDetailUser } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserPurchase = ({ purchase }) => {
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const repurchase = (products) => {
    if (profile.id) {
      products.map((product) =>
        dispatch(
          addToCartDetailUser(
            profile.id,
            product.id,
            product.productXorder.cant
          )
        )
      );
    }
    navigate("/cart");
  };

  return (
    <>
      <div className="rounded-lg text-xl p-5 sm:flex align-middle justify-between containerResponsive">
        <div className="flex sm:w-2/5 align-center mr-3 text-2xl responsiveTitle">
          {purchase.products.map((product) => (
            <div key={product.id}>
              {/* <img className={styles.imagen} src={product.image} alt="imagen" /> */}
              <p className="capitalize">{product.name}</p>
            </div>
          ))}
        </div>
        <p className="flex sm:w-1/5 justify-center sm:justify-start align-middle text-2xl capitalize responsiveState">
          {purchase.state.name}
        </p>
        <p className="flex sm:w-1/5 justify-center sm:justify-start align-middle my-auto text-2xl">
          {purchase.mont}
        </p>

        <div className="flex sm:w-1/5 justify-center my-auto">
          <button
            onClick={() => repurchase(purchase.products)}
            className=" bg-yellow-400 w-2/3 h-14 sm:w-full sm:p-3 font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
            type="button"
          >
            Volver a comprar
          </button>
        </div>
      </div>
      <hr />
    </>
  );
};

export default UserPurchase;
