import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editProduct } from "../../redux/actions";
import { useNavigate, useParams } from "react-router-dom";

export const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productEdit = useSelector((state) => state.detail);

  useEffect(() => {
    console.log(productEdit);
  }, []);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    image: "",
    price: 0,
    stock: 0,
    category: [],
  });

  return (
    <div>
      <h1 className="text-center text-3xl">
        Editar - Complete todos los campos
      </h1>
      <hr />
    </div>
  );
};
