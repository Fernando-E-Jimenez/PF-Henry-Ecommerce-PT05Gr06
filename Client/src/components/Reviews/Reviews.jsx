import styles from "./Reviews.module.css";
import { useParams } from "react-router-dom";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postReview } from "../../redux/actions";

export const Reviews = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const product = useSelector((state) => state.detail);
    const [comment, setComment] = useState({
        description: '',
        star: 0
    });
  return (
    <div>
        <div className={styles.bgPage}>
            <div className={styles.detailContainer}>
                <h3 className={styles.title} >Reviews</h3>
                <div>
                    {product[0].reviews.map((r, id) => {
                        return (
                            <div key={id}>
                                <div>{r.description}</div>
                                <div>{r.star}</div>
                            </div>
                        )
                    })}                   
                </div>
                <h3 className={styles.title} >New Review</h3>
                <form /* className={pte} */ onSubmit={(e) => {
                    e.preventDefault();
                    dispatch(postReview(comment, id))
                    setComment({
                        description: '',
                        star: 0
                    })
                }}>
                    <input 
                        type='text'
                        /* className={pte} */
                        placeholder="What do you think about this product?" 
                        value={comment.description}
                        onChange={e => setComment({
                            ...comment,
                            description: e.target.value
                        })}
                    />
                    <input 
                        type='number'
                        /* className={pte} */
                        value={comment.star}
                        onChange={e => setComment({
                            ...comment,
                            star: e.target.value
                        })}
                    />
                    <button type="submit" /* className="option-button" */>
                        Post
                    </button>
                </form>
            </div>
        </div>
    </div>
  );
};