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
      className="card bg-dark text-white shadow transition-shadow"
      style={{ width: "20rem", cursor: "pointer" }}
      onClick={onClick}
      onMouseEnter={(e) => e.currentTarget.classList.add("shadow-lg")}
      onMouseLeave={(e) => e.currentTarget.classList.remove("shadow-lg")}
    >
      <img
        src={image}
        className="card-img-top"
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
        <h5 className="card-title fw-bold">{title}</h5>
        <p className="card-text text-secondary">{description}</p>

        <ul className="list-unstyled small text-muted">
          {eventType && <li><strong>Tipo:</strong> {eventType}</li>}
          {duration && <li><strong>Duración:</strong> {duration} hrs</li>}
          {schedule && <li><strong>Horario:</strong> {schedule}</li>}
          {(startDate || endDate) && (
            <li>
              <strong>Fechas:</strong> {startDate} - {endDate}
            </li>
          )}
          {location && <li><strong>Ubicación:</strong> {location}</li>}
          {organizer && <li><strong>Responsable:</strong> {organizer}</li>}
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
