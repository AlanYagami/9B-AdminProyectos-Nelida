import { FaSearch, FaPlus } from "react-icons/fa";

function SearchBar({ searchValue, onSearchChange, onAddClick, showAddButton = true }) {
  return (
    <div className="container mb-4">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6">
          <div className="input-group shadow-sm">
            <span className="input-group-text bg-dark text-white border-0 rounded-start-pill">
              <FaSearch />
            </span>
            <input
              type="text"
              className="form-control bg-dark text-white border-0 rounded-end-pill"
              placeholder="Buscar evento..."
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              style={{
                borderTopLeftRadius: "0",
                borderBottomLeftRadius: "0",
              }}
            />
            {showAddButton && (
              <button
                className="btn btn-success ms-2 rounded-pill px-3 d-flex align-items-center"
                type="button"
                onClick={onAddClick}
              >
                <FaPlus className="me-2" />
                Añadir
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
