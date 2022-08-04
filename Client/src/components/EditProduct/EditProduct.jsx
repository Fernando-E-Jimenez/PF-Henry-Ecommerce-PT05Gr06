import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editProduct, getCategory, getStates } from "../../redux/actions";
import { useNavigate, useParams } from "react-router-dom";

export const EditProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productEdit = useSelector((state) => state.productEdit);
  const categoriesState = useSelector((state) => state.categories);
  const States = useSelector((state) => state.states);

  const categoriesName = productEdit.categories.map((e) => e.id);

  const [product, setProduct] = useState({
    id: productEdit.id,
    name: productEdit.name,
    description: productEdit.description,
    image: productEdit.image,
    price: productEdit.price,
    stock: productEdit.stock,
    category: categoriesName,
  });

  // useEffect(() => {
  //   dispatch(getCategory());
  // }, [dispatch]);

  // Leo los datos del formulario
  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleDelete = (e, option) => {
    setProduct({
      ...product,
      [option]: product[option].filter((data) => data !== e),
    });
  };

  const handleSelect = (e) => {
    if (product.category.find((c) => c === parseInt(e.target.value))) return;
    setProduct({
      ...product,
      category: product.category.concat(parseInt(e.target.value)),
    });
    console.log(product.category);
  };

  const { id, name, description, image, price, stock, category, state } =
    product;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("id", id);
    // formData.append("state", );
    for (let i = 0; i < category.length - 1; i++) {
      formData.append("category", category[i]);
    }

    dispatch(editProduct(formData));
    console.log(category);
    navigate("/admin/view-products");
    alert("Producto editado con exito");
  };

  useEffect(() => {
    dispatch(getStates());
  }, []);

  return (
    <div>
      <h1 className="text-center text-3xl">
        Editar - Complete todos los campos
      </h1>
      <form
        onSubmit={handleSubmit}
        className="md:w-1/2 m-auto py-6 px-6 sm:px-0"
        encType="multipart/form-data"
      >
        <div className="mb-5">
          <label className="text-gray-700 font-bold text-2xl">Nombre</label>
          <input
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md text-xl"
            type="text"
            value={name}
            name="name"
            placeholder="Ingrese el nombre del producto"
            onChange={handleChange}
          />
        </div>
        <div className="mb-5">
          <label className="text-gray-700 font-bold text-2xl">
            Descripcion
          </label>
          <input
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md text-xl"
            type="text"
            value={description}
            name="description"
            placeholder="Ingrese la descripcion del producto"
            onChange={handleChange}
          />
        </div>
        <div className="mb-5">
          <label className="text-gray-700 font-bold text-2xl">Imagen</label>
          <input
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md text-xl"
            type="file"
            name="image"
            placeholder="Ingrese la descripcion del producto"
          />
        </div>
        <div className="mb-5">
          <label className="text-gray-700 font-bold text-2xl">Precio</label>
          <input
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md text-xl"
            type="text"
            value={price}
            name="price"
            onChange={handleChange}
          />
        </div>
        <div className="mb-5">
          <label className="text-gray-700 font-bold text-2xl">Stock</label>
          <input
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md text-xl"
            type="text"
            value={stock}
            name="stock"
            onChange={handleChange}
          />
        </div>

        <div className="mb-5">
          <label className="text-gray-700 font-bold text-2xl">
            Seleccionar Categorias
          </label>
          <select
            onChange={handleSelect}
            name="category"
            defaultValue={"Select Categoria"}
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md text-xl"
          >
            <option disabled>Seleccionar Categoria</option>
            {categoriesState?.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name}
              </option>
            ))}
          </select>
          {category?.map((e) => (
            <div key={e} className="flex text-xl mt-4 justify-center">
              <div className="w-1/4">
                {categoriesState?.find((c) => c.id === e).name}
              </div>
              <button onClick={() => handleDelete(e, "category")}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={4}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>

        <div className="mb-5">
          <label className="text-gray-700 font-bold text-2xl">
            Seleccionar Estado
          </label>
          <select
            onChange={handleChange}
            name="state"
            defaultValue={"Select State"}
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md text-xl"
          >
            <option disabled>Seleccionar State</option>
            {States?.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name}
              </option>
            ))}
          </select>
        </div>

        <button
          className="bg-primary-color mt-10 w-full p-3 font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
          type="submit"
        >
          Guardar Cambios
        </button>
      </form>
      <hr />
    </div>
  );
};
