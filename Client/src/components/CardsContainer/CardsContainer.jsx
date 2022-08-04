import React from "react";
import { Card } from "../Card/Card";
import "./CardsContainer.css";
import { getProducts } from "../../redux/actions";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const CardsContainer = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const order = useSelector((state) => state.order);
  const [page, setPage] = useState(1);

  const previousPage = () => {
    if (products.previousPage) {
      setPage(page - 1);
    }
  };

  const nextPage = () => {
    if (products.nextPage) {
      setPage(page + 1);
    }
  };

  const productsStock = products.data?.filter((product) => product.stock > 0);

  useEffect(() => {
    dispatch(getProducts(page, order.type, order.by, order.id));
  }, [dispatch, page, order]);

  return (
    <div className="cardsContainer sm:my-10">
      {products.data ? (
        <div className="mb-6 sm:mb-0">
          <div className="boxContainer">
            {productsStock?.map((product) => (
              <Card
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
              />
            ))}
          </div>
          <div className="containerPagination">
            <button
              className={
                page <= 1
                  ? "secondaryButtonPag disabled:opacity-25"
                  : "secondaryButtonPag"
              }
              disabled={page <= 1 ? true : false}
              onClick={previousPage}
            >
              <div>
                <p className="paginationTitle">Pagina anterior</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 svgPagination"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              </div>
            </button>
            <button
              className={
                products.nextPage <= 1
                  ? "secondaryButtonPag disabled:opacity-25"
                  : "secondaryButtonPag"
              }
              onClick={nextPage}
              disabled={products.nextPage ? false : true}
            >
              <div>
                <p className="paginationTitle">Pagina siguiente</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 svgPagination"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>
      ) : (
        <div className="noResults">
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
          <br />
          <h3 className="noResultsText">OH... No pudimos encontrar nada</h3>
        </div>
      )}
    </div>
  );
};
