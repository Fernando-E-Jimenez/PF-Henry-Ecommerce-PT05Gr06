import styles from "./Reviews.module.css";
import { useParams } from "react-router-dom";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postReview } from "../../redux/actions";
import { productDetail } from "../../redux/actions";
import { FaStar } from "react-icons/fa"; //probando a ver si puedo ingresar las estrellas

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

  const handleClick = (value) => {
    setComment({
      ...comment,
      star: value
    })
    setCurrentValue(value)
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
    dispatch(productDetail(id))
  }

  return (
    <div className={styles.bgPage}>
      <div className={styles.detailContainer}>
          <div className={styles.reviewsContainer}>
            <div>
              <h3 className={styles.title}>Reviews</h3>
            </div>
            {product.review?
              product.review.length>0?
                <div className={styles.cardsReviews}>
                  {product.review.map((r, id) => {
                    return (
                      <div key={id}>
                        <div>{r.description}</div>
                        <div>{r.star} ⭐</div>
                      </div>
                    );
                  })}
                </div>
              :'Este producto no cuenta con Reviews'
            :'Cargando...'}
          </div>
        <div className={styles.newReviewContainer}>
          <h3 className={styles.title}>New Review</h3>
          <form
              onSubmit={(e) => handleSubmit(e)}>
            <input
              type="text"
              className={styles.input}
              placeholder="What do you think about this product?"
              value={comment.description}
              onChange={(e) =>
                setComment({
                  ...comment,
                  description: e.target.value,
                })
              }
            />
            <div className={styles.starts}>
              {stars.map((_, index) => {
                return (
                  <FaStar
                    key={index}
                    size={24}
                    onClick={() => handleClick(index + 1)}
                    onMouseOver={() => handleMouseOver(index + 1)}
                    onMouseLeave={handleMouseLeave}
                    className={styles.colorEstrellas}
                    color={
                      (hoverValue || currentValue) > index
                        ? colors.orange
                        : colors.grey
                    }
                  />
                );
              })}
            </div>
            <button type="submit" className={styles.postButton}>
              Post
            </button>
          </form>
        </div>
      </div>
    </div>
    
  );
};
