const Filter = ({ id, title, selectedCategory, setSelectedCategory}) => {
  return (
    <li>
      <div className="filter-option">
        <input
          type="radio"
          id={id}
          name="category"
          checked={selectedCategory === id}
          onChange={() => setSelectedCategory(id)}
          className="flex-none"
        />
        <label htmlFor={id}>{title}</label>
      </div>
    </li>
  );
};

export default Filter;
