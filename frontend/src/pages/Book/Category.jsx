import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/layouts/Footer";
import Header from "../../components/layouts/Header";
import axios from "axios";
import BookBox from "../../components/CategoryElement/BookBox";
import Filter from "../../components/CategoryElement/Filter";
import SortFilter from "../../components/CategoryElement/SortFilter";
import Pagination from "../../components/CategoryElement/Pagination";
import "./styles.css";
import axiosInstance from "../../utils/axiosInstance";
import { useMemo } from "react";

const Category = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  ///----------
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState({
    id: "0",
    title: "All",
  });
  const [filters, setFilters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;
  //-----------

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
    // getUserInfo();
    return () => {};
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get("/categories");
      console.log("Categories fetched:", response.data);
      setCategories(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const fetchFilters = async () => {
    try {
      const response = await axiosInstance.get("/filter");
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

  const filteredCategories = useMemo(() => {
    if (selectedCategory.id === "0") return categories;
    return categories.filter((category) =>
      category.title
        .toLowerCase()
        .includes(selectedCategory.title.toLowerCase())
    );
  }, [categories, selectedCategory]);

  useEffect(() => {
    console.log(
      "00Selected Category ID:",
      selectedCategory.id,
      typeof selectedCategory.id
    );
    console.log(
      "01Category IDs:",
      categories.map((c) => [c.id, typeof c.id])
    );
    console.log("1Categories:", categories);
    console.log("2Selected Category:", selectedCategory);
    console.log("3Filtered CategoriesLOL:", filteredCategories);
  }, [filteredCategories]);

  useEffect(() => {
    setSelectedCategory({ id: "0", title: "All" });
  }, []);

  return (
    <>
      <header>
        <Header userInfo={userInfo} />
      </header>
      <main id="main">
        <div className="inner-wrap flex flex-row justify-center box-border pb-0">
          <div className="relative p-4">
            {isScreenInRange ? (
              <>
                {/* This is the filter button for mobile view */}
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
                      <h4 className="pt-4 pl-4 pr-4 pb-0 items-center">
                        <span className="text-2xl text-pornhub-200">Category</span>
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
              <div className="inner-filter inline-block basis-1/4 max-w-fit col-auto border-list rounded-filter pl-4 pr-4 pb-8 mt-5 mb-10 max-h-fit sticky top-10">
                <div className="main-filter">
                  <h4 className="pt-4 pl-4 pr-4 pb-0 items-center">
                    <span className="text-2xl text-porn-hub-200">Category</span>
                  </h4>
                  {/* // This is the filter for desktop view */}
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

          <div className="inner-category basis-3/4 max-w-[75%] pl-4 pr-4 pb-8">
            <div className="inner-des relative mb">
              <div className=" flex flex-row justify-between w-full">
                <div className="max-h-full flex flex-row items-center font-text">
                  <div className="sort-dropdown m-7">
                    <form className="my-1.25 mx-0 w-[300px]" method="get">
                      <select
                        name="orderby"
                        className="orderby rounded-[40px] border border-amber-100 w-full text-center"
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
                {filteredCategories.map((category) => (
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
