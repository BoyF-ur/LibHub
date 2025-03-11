import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/layouts/Footer";
import Header from "../../components/layouts/Header";
import axios from "axios";
import BookBox from "../../components/CategoryElement/BookBox";
import Filter from "../../components/CategoryElement/Filter";
import SortFilter from "../../components/CategoryElement/SortFilter";
import Pagination from "../../components/CategoryElement/Pagination";
import "./styles.css"

const Category = () => {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState(null);

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/home");
      }
    }
  };

  useEffect(() => {
    getUserInfo();
    return () => {};
  }, []);

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

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isScreenInRange, setIsScreenInRange] = useState(
    window.innerWidth >= 100 && window.innerWidth <= 772
  );

  useEffect(() => {
    const handleResize = () => {
      setIsScreenInRange(window.innerWidth >= 100 && window.innerWidth <= 772);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <header>
        <Header userInfo={userInfo} />
      </header>
      <main id="main">
        <div className="inner-wrap flex flex-row justify-center box-border pb-0">
          <div className="relative p-4 h-fit ">
            {isScreenInRange ? (
              <>
                <SortFilter onFilterClick={() => setIsFilterOpen(true)} />
                {isFilterOpen && (
                  <div className="fixed top-0 right-0 h-full w-full bg-white shadow-lg transition-transform duration-300 z-50 translate-x-0">
                    <button
                      className="p-4 text-red-500 font-bold"
                      onClick={() => setIsFilterOpen(false)}
                    >
                      Đóng
                    </button>
                    <div className="main-filter">
                      <h4 className="pt-4 pl-4 pr-4 pb-0 text-[var(--color-text)] items-center">
                        <span className="text-2xl">Category</span>
                      </h4>
                      <div className="list-wrapper p-4 pt-2 block">
                        <ul className="list flex flex-wrap flex-col list-none m-0 p-0 border-none line-inherit">
                          {filters.map((filter) => (
                            <Filter
                              key={filter.id}
                              id={filter.id}
                              title={filter.title}
                              selectedCategory={selectedCategory}
                              setSelectedCategory={setSelectedCategory}
                            />
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="inner-filter inline-block basis-1/4 max-w-fit col-auto border-list rounded-filter pl-4 pr-4 pb-8 mt-5 mb-10 max-h-fit sticky top-5">
                <div className="main-filter">
                  <h4 className="pt-4 pl-4 pr-4 pb-0 text-[var(--color-text)] items-center">
                    <span className="text-2xl">Category</span>
                  </h4>
                  <div className="list-wrapper p-4 pt-2 block">
                    <ul className="list flex flex-wrap flex-col list-none m-0 p-0 border-none line-inherit">
                      {filters.map((filter) => (
                        <Filter
                          key={filter.id}
                          id={filter.id}
                          title={filter.title}
                          selectedCategory={selectedCategory}
                          setSelectedCategory={setSelectedCategory}
                        />
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="inner-category basis-3/4 max-w-[75%] vsm:basis-full pl-4 pr-4 pb-8">
            <div className="inner-des relative mb">
              <div className=" flex flex-row justify-between w-full">
                <div className="max-h-full flex flex-row items-center font-text">
                  <p className="mb-0 mt-0 font-semibold inline-block vsm:max-lg:hidden">
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
              <div className="list-book flex flex-row flex-wrap gap-[50px]">
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
      </main>

      <div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>

      <Footer />
    </>
  );
};

export default Category;
