import React from "react";
import PropTypes from "prop-types";

const EventCard = ({ image, title, description, dotColor, onClick }) => {
  return (
    <div
      className="card bg-dark text-white shadow-sm"
      style={{ width: "18rem", cursor: "pointer" }}
      onClick={onClick}
    >
      <img src={image} className="card-img-top" alt={title} style={{ height: "180px", objectFit: "cover" }} />
      <div className="card-body position-relative">
        <span
          className="position-absolute top-0 end-0 m-3 rounded-circle"
          style={{
            width: "12px",
            height: "12px",
            backgroundColor: dotColor,
          }}
        />
        <h5 className="card-title fw-bold">{title}</h5>
        <p className="card-text text-secondary">{description}</p>
      </div>
    </div>
  );
};


EventCard.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  dotColor: PropTypes.string,
};

export default EventCard;
