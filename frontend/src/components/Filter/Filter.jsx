const Filter = ({ id, title, selectedCategory, setSelectedCategory}) => {
  return (
    <li>
      <div className="filter-option">
        <input
          type="radio"
          id={id}
          name="category"
          checked={selectedCategory === id}  // Kiểm tra đúng giá trị được chọn
          onChange={() => setSelectedCategory(id)}  // Cập nhật state khi chọn
        />
        <label htmlFor={id}>{title}</label>
      </div>
    </li>
  );
};

export default Filter;
