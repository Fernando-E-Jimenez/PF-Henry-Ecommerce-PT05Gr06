import "./Reviews.css";
import { useParams } from "react-router-dom";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postReview } from "../../redux/actions";
import { productDetail } from "../../redux/actions";
import { FaStar } from "react-icons/fa"; //probando a ver si puedo ingresar las estrellas
import { useAuth0 } from "@auth0/auth0-react";

/* Variables para los colores de las estrellas */
const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9",
};

export const Reviews = () => {
  /* Comienza armado de estrellas */
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const stars = Array(5).fill(0);
  const { isAuthenticated } = useAuth0();

  const handleClick = (value) => {
    setComment({
      ...comment,
      star: value,
    });
    setCurrentValue(value);
  };

  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };
  /* Finaliza armado de estrellas */
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.detail);
  const [comment, setComment] = useState({
    description: "",
    star: 0,
  });

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postReview(comment, id));
    setComment({
      description: "",
      star: 0,
    });
    alert("Comentario agregado con exito");
    dispatch(productDetail(id));
  }

  return (
    <div className="reviewsPage">
      <hr />
      <div className="reviewsContainer">
        <div className="w-full">
          <h4 className="title text-3xl text-center">Reviews</h4>
        </div>
        {product.review ? (
          product.review.length > 0 ? (
            <div className="boxReviews">
              {product.review.map((r, id) => {
                return (
                  <div key={id} className="cardReview">
                    <div style={{ fontSize: "large" }}>{r.star} ⭐</div>
                    <p style={{ fontSize: "large" }}>{r.description}</p>
                    <hr />
                  </div>
                );
              })}
            </div>
          ) : (
            "Este producto no cuenta con Reviews"
          )
        ) : (
          "Cargando..."
        )}
      </div>
      {isAuthenticated ? (
        <div className="newReviewContainer">
          <h4 className="title text-3xl text-center">New Review</h4>
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              style={{ fontSize: "large" }}
              type="text"
              className="input text-xl"
              placeholder="What do you think about this product?"
              value={comment.description}
              onChange={(e) =>
                setComment({
                  ...comment,
                  description: e.target.value,
                })
              }
            />
            <div className="starts justify-center">
              {stars.map((_, index) => {
                return (
                  <FaStar
                    key={index}
                    size={24}
                    onClick={() => handleClick(index + 1)}
                    onMouseOver={() => handleMouseOver(index + 1)}
                    onMouseLeave={handleMouseLeave}
                    className="colorEstrellas"
                    color={
                      (hoverValue || currentValue) > index
                        ? colors.orange
                        : colors.grey
                    }
                  />
                );
              })}
            </div>
            <div className="flex justify-center mt-6">
              <button type="submit" className="secondaryButton mt-4">
                Post
              </button>
            </div>
          </form>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
