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

  const weekDays = getWeekDays(currentWeek);

  const getEndTime = (startTime) => {
  const [hour, minute] = startTime.split(':').map(Number);
  const endHour = hour + 1;
  return `${endHour}:00`;
  };


  return (
    <div style={{ maxHeight: '70vh', overflowY: 'auto' }}>
      {timeSlots.map((time, i) => (
        <div key={i} className="row mx-0 border-bottom border-secondary" style={{ minHeight: '60px' }}>
          <div className="col-1 p-2 text-end border-end border-secondary">
            <small className="text-light">{time}</small>
          </div>
          {weekDays.map((day, j) => {
            const event = getEventForSlot(day, time);
            const backgroundColor = event ? `${event.color}44` : 'transparent'; // Fondo con opacidad
            const cardColor = event ? event.color : 'transparent'; // Color puro para la card

            return (
              <div
                key={j}
                className="col p-1 border-start border-secondary position-relative"
                style={{
                  cursor: 'pointer',
                  minHeight: '60px',
                  backgroundColor: backgroundColor,
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
  );
}

export default TimeGrid;
