import React from "react";
import PropTypes from "prop-types";

const Rating = ({ value = 0, text = "", color = "#f8e825" }) => {
  // 🧠 Array-based rendering to avoid repetition
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="rating d-inline-flex align-items-center">
      {stars.map((star) => (
        <span key={star}>
          <i
            style={{ color }}
            className={
              value >= star
                ? "fas fa-star"
                : value >= star - 0.5
                ? "fas fa-star-half-alt"
                : "far fa-star"
            }
          ></i>
        </span>
      ))}
      {text && (
        <span style={{ marginLeft: "5px", fontSize: "0.9rem" }}>{text}</span>
      )}
    </div>
  );
};

Rating.propTypes = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string,
  color: PropTypes.string,
};

export default Rating;
