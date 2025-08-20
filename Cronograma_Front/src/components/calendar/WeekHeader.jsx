import React from 'react';

function WeekHeader({ currentWeek, setCurrentWeek }) {
  const dayNames = ['DOM', 'LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB'];
  const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  const purple = '#764BA2';
  const textPurple = { color: purple };

  const getWeekDays = (date) => {
    const day = date.getDay();
    const diff = (day === 0 ? -6 : 1) - day;
    const start = new Date(date);
    start.setDate(start.getDate() + diff);

    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d;
    });
  };

  const weekDays = getWeekDays(currentWeek);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center p-3 border-bottom border-secondary">
        <div className="d-flex align-items-center">
          <button className="btn btn-outline-light me-2" 
          onClick={() => setCurrentWeek(prev => {
            const newDate = new Date(prev);
            newDate.setDate(newDate.getDate() - 7);
            return newDate;
          })}>‹</button>
          <button className="btn btn-outline-light me-2" 
          onClick={() => setCurrentWeek(prev => {
            const newDate = new Date(prev);
            newDate.setDate(newDate.getDate() + 7);
            return newDate;
          })}>›</button>
          <button className="btn me-2" style={{ backgroundColor: purple, color: 'white' }} onClick={() => setCurrentWeek(new Date())}>Hoy</button>
          <h5 className="mb-0 text-white">{monthNames[currentWeek.getMonth()]} {currentWeek.getFullYear()}</h5>
        </div>
      </div>
      <div className="row mx-0 border-bottom border-secondary">
        <div className="col-1 p-2"></div>
        {weekDays.map((day, i) => (
          <div key={i} className="col p-2 text-center border-start border-secondary">
            <div className="small text-light">{dayNames[day.getDay()]}</div>
            <h5 className="mb-0" style={day.toDateString() === new Date().toDateString() ? textPurple : { color: 'white' }}>
              {day.getDate()}
            </h5>
          </div>
        ))}
      </div>
    </>
  );
}

export default WeekHeader;
