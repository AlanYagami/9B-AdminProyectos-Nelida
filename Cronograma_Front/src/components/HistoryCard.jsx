import PropTypes from "prop-types";
import { colorMap } from "../data/colors";

const HistoryCard = ({ 
    title, 
    eventType, 
    duration, 
    dotColor, 
    onClick 
}) => {
  const getColorByText = (text) => {
    if (!text) return "#ccc";
    if (colorMap[text]) return colorMap[text];
    const colors = Object.values(colorMap);
    const index = text.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const resolvedDotColor = dotColor || getColorByText(eventType || title);

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
      <div className="card-body position-relative">
        {/* Círculo de color */}
        <span
          className="position-absolute top-0 end-0 m-3 rounded-circle"
          style={{
            width: "12px",
            height: "12px",
            backgroundColor: resolvedDotColor,
          }}
        />

        {/* Nombre */}
        <h5 className="card-title fw-semibold text-light mb-3">
          {title}
        </h5>

        {/* Lista de detalles */}
        <ul
          className="list-unstyled small"
          style={{ color: "#ccc", lineHeight: "1.6" }}
        >
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
        </ul>
      </div>
    </div>
  );
};

HistoryCard.propTypes = {
  title: PropTypes.string.isRequired,
  eventType: PropTypes.string,
  duration: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  dotColor: PropTypes.string,
  onClick: PropTypes.func,
};

export default HistoryCard;