
function SearchBar({ searchValue, onSearchChange, onAddClick, showAddButton = true }) {
  return (
    <div className="d-flex justify-content-center mb-5">
      <div className="input-group w-50">
        <span className="input-group-text bg-dark border-secondary text-white">
          🔍
        </span>
        <input
          type="text"
          className="form-control bg-dark text-white border-secondary"
          placeholder="Nombre del evento..."
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {showAddButton && (
          <button className="btn btn-success" type="button" onClick={onAddClick}>
            +
          </button>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
