function FilterBar({
  searchTerm,
  setSearchTerm,
  selectedCuisine,
  setSelectedCuisine,
  cuisines,
}) {
  return (
    <div className="filter-bar">
      <div className="search-input">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search Cameroonian recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <select
        value={selectedCuisine}
        onChange={(e) => setSelectedCuisine(e.target.value)}
        className="cuisine-select"
      >
        <option value="">All Cuisines</option>
        {cuisines.map((cuisine) => (
          <option key={cuisine} value={cuisine}>
            {cuisine}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FilterBar;
