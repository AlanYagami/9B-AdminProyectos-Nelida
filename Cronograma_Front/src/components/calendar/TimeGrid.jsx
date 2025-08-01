import { formatDateKey } from '../../utils/dateHelpers';

function TimeGrid({ currentWeek, events, onSlotClick }) {
  const timeSlots = Array.from({ length: 11 }, (_, i) => `${i + 7}:00`);

  const getWeekDays = (date) => {
    const start = new Date(date);
    start.setDate(start.getDate() - start.getDay());
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d;
    });
  };

  const getEventForSlot = (date, time) => {
    return events[`${formatDateKey(date)}-${time}`];
  };

  const getEndTime = (startTime) => {
    const [hour] = startTime.split(':').map(Number);
    const endHour = hour + 1;
    return `${endHour}:00`;
  };

  const weekDays = getWeekDays(currentWeek);

  return (
    <div
      className="table-responsive"
      style={{
        maxHeight: '70vh',
        overflowY: 'auto',
        overflowX: 'auto',
      }}
    >
      <div
        className="d-flex flex-column"
        style={{ minWidth: '750px' }} // Asegura que haya scroll horizontal en móviles
      >
        {timeSlots.map((time, i) => (
          <div
            key={i}
            className="row mx-0 border-bottom border-secondary flex-nowrap"
            style={{ minHeight: '60px' }}
          >
            {/* Columna de hora */}
            <div
              className="col-1 p-2 text-end border-end border-secondary"
              style={{ minWidth: '80px' }}
            >
              <small className="text-light">{time}</small>
            </div>

            {/* Celdas de cada día */}
            {weekDays.map((day, j) => {
              const event = getEventForSlot(day, time);
              const backgroundColor = event ? `${event.color}44` : 'transparent';
              const cardColor = event ? event.color : 'transparent';

              return (
                <div
                  key={j}
                  className="col p-1 border-start border-secondary position-relative"
                  style={{
                    cursor: 'pointer',
                    minHeight: '60px',
                    minWidth: '100px', // Esto asegura que no colapse en pantallas pequeñas
                    backgroundColor,
                  }}
                  onClick={() => onSlotClick(day, time)}
                >
                  {event && (
                    <div
                      title={`${event.time} - ${getEndTime(event.time)} ${event.title}\n${event.description}`}
                      className="rounded p-2 h-100 d-flex flex-column justify-content-start"
                      style={{
                        backgroundColor: cardColor,
                        color: 'white',
                        fontSize: '0.85rem',
                        overflow: 'hidden',
                        whiteSpace: 'pre-line',
                      }}
                    >
                      <div className="fw-bold text-truncate">
                        {event.time} - {getEndTime(event.time)} {event.title}
                      </div>
                      <div className="small text-truncate">
                        {event.description?.slice(0, 100) || ''}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TimeGrid;
