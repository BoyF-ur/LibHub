import React, { useState, useEffect } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import "./styles.css";
import BookBox from "../../components/BookBox";
import axios from "axios";
import Filter from "../../components/Filter/Filter";
import Pagination from "../../components/Pagination";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filters, setFilters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3000/categories");
      setCategories(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const fetchFilters = async () => {
    try {
      const response = await axios.get("http://localhost:3002/filter");
      setFilters(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchFilters();
    setLoading(false);
  }, []);

  return (
    <>
      <Header />
      <main id="main">
        <div className="inner-wrap flex flex-row justify-center box-border pb-0">
          <div className="inner-filter block basis-1/4 max-w-[25%] relative col-auto border-list rounded-filter pl-4 pr-4 pb-8 mt-5 mb-10">
            <div className="main-filter">
              <h4 className="pt-4 pl-4 pr-4 pb-0 text-[var(--color-text)] items-center ">
                <span className="text-2xl">Category</span>
              </h4>
              <div className="list-wrapper p-4 block ">
                <ul className="list flex flex-col list-none m-0 p-0 border-none line-inherit">
                  {filters.map((filter) => (
                    <Filter
                      id={filter.id}
                      title={filter.title}
                      selectedCategory={selectedCategory} // Truyền state vào component Filter
                      setSelectedCategory={setSelectedCategory}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="inner-category basis-3/4 max-w-[75%] pl-4 pr-4 pb-8">
            <div className="inner-des relative mb">
              <div className=" flex flex-row justify-between w-full">
                <div className="max-h-full flex flex-row items-center font-text">
                  <p className="mb-0 mt-0 font-semibold inline-block ">
                    Hiển thị 1-Null trang
                  </p>
                  <div className="sort-dropdown m-7">
                    <form className="my-1.25 mx-0 wid-2" method="get">
                      <select
                        name="orderby"
                        className="orderby rounded-4xl border border-amber-100 w-full"
                        aria-label="Yêu cầu thuê sách"
                      >
                        <option value="alphabet" selected="selected">
                          Thứ tự từ A-Z
                        </option>
                        <option value="alphabet-2">Thứ tự từ Z-A</option>
                      </select>
                      <input type="hidden" name="paged" defaultValue={1} />
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <div className="inner-wrap c-container">
              <div className="list-book-1 flex flex-row justify-between flex-wrap ">
                {categories.map((category) => (
                  <BookBox
                    key={category.id}
                    title={category.title}
                    description={category.description}
                    imgUrl={category.imageUrl}
                  />
                ))}
              </div>

              <div className="list-book-2 flex flex-row justify-between flex-wrap ">
                {categories.map((category) => (
                  <BookBox
                    key={category.id}
                    title={category.title}
                    description={category.description}
                    imgUrl={category.imageUrl}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Category;
