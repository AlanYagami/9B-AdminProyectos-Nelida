import PropTypes from "prop-types";

const EventCard = ({
  image,
  title,
  description,
  dotColor,
  onClick,
  eventType,
  duration,
  schedule,
  startDate,
  endDate,
  location,
  organizer,
}) => {
  return (
    <div
      className="card bg-dark text-white shadow-sm border-0 rounded-4"
      style={{
        width: "100%",
        maxWidth: "20rem",
        cursor: "pointer",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.03)";
        e.currentTarget.classList.add("shadow-lg");
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.classList.remove("shadow-lg");
      }}
    >
      <img
        src={image}
        className="card-img-top rounded-top-4"
        alt={title}
        style={{ height: "180px", objectFit: "cover" }}
      />
      <div className="card-body position-relative">
        <span
          className="position-absolute top-0 end-0 m-3 rounded-circle"
          style={{
            width: "12px",
            height: "12px",
            backgroundColor: dotColor,
          }}
        />
        <h5 className="card-title fw-semibold text-light">{title}</h5>
        <p className="card-text text-secondary mb-3" style={{ fontSize: "0.9rem" }}>
          {description}
        </p>

        <ul className="list-unstyled small" style={{ color: "#ccc", lineHeight: "1.6" }}>
          {eventType && (
            <li>
              <span className="text-light fw-semibold">Tipo:</span>{" "}
              <span className="text-white">{eventType}</span>
            </li>
          )}
          {duration && (
            <li>
              <span className="text-light fw-semibold">Duración:</span>{" "}
              <span className="text-white">{duration} hrs</span>
            </li>
          )}
          {schedule && (
            <li>
              <span className="text-light fw-semibold">Horario:</span>{" "}
              <span className="text-white">{schedule}</span>
            </li>
          )}
          {(startDate || endDate) && (
            <li>
              <span className="text-light fw-semibold">Fechas:</span>{" "}
              <span className="text-white">
                {startDate} {endDate && `- ${endDate}`}
              </span>
            </li>
          )}
          {location && (
            <li>
              <span className="text-light fw-semibold">Ubicación:</span>{" "}
              <span className="text-white">{location}</span>
            </li>
          )}
          {organizer && (
            <li>
              <span className="text-light fw-semibold">Responsable:</span>{" "}
              <span className="text-white">{organizer}</span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

EventCard.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  dotColor: PropTypes.string,
  onClick: PropTypes.func,
  eventType: PropTypes.string,
  duration: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  schedule: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  location: PropTypes.string,
  organizer: PropTypes.string,
};

export default EventCard;
