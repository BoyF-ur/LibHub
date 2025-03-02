import React, { useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import "./styles.css";

const Category = () => {
  return (
    <>
      <Header />
      <main id="main">
        <div className="inner-wrap flex flex-row justify-center box-border pb-0">
          <div className="inner-filter block basis-1/4 max-w-[25%] relative col-auto border-list rounded-filter pl-4 pr-4 pb-8">
            <div className="main-filter">
              <h4 className="pt-4 pl-4 pr-4 pb-0 text-[var(--color-text)] items-center ">
                <span className="text-2xl">Category</span>
              </h4>
              <div className="list-wrapper p-4 block ">
                <ul className="list flex flex-col list-none m-0 p-0 border-none line-inherit">
                  <li className="">
                    <div className="filter-option">
                      <input
                        type="radio"
                        id="all"
                        name="category"
                        defaultChecked=""
                      />
                      <label htmlFor="all">Tất cả</label>
                    </div>
                  </li>
                  <li className="">
                    <div className="filter-option">
                      <input type="radio" id="id-1" name="category" />
                      <label htmlFor="id-1">######</label>
                    </div>
                  </li>
                  <li className="">
                    <div className="filter-option">
                      <input type="radio" id="id-2" name="category" />
                      <label htmlFor="id-2">######</label>
                    </div>
                  </li>
                  <li className="">
                    <div className="filter-option">
                      <input type="radio" id="id-3" name="category" />
                      <label htmlFor="id-3">######</label>
                    </div>
                  </li>
                  <li className="">
                    <div className="filter-option">
                      <input type="radio" id="id-4" name="category" />
                      <label htmlFor="id-4">######</label>
                    </div>
                  </li>
                  <li className="">
                    <div className="filter-option">
                      <input type="radio" id="id-5" name="category" />
                      <label htmlFor="id-5">#####$</label>
                    </div>
                  </li>
                  <li className="">
                    <div className="filter-option">
                      <input type="radio" id="id-6" name="category" />
                      <label htmlFor="id-6">#######</label>
                    </div>
                  </li>
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
            <div className="inner-wrap">
              <div className="list-book flex flex-row justify-between">
                <div className="box flex flex-col ">
                  <img
                    src="../../assets/images/pic.PNG"
                    alt="A book"
                    className="basis-3/4"
                  />
                  <div className="basis-1/4 bg-amber-50 flex flex-col p-5">
                    <p className="text-black">Book 2</p>
                    <span className="text-white-1">22nd Feb 2025</span>
                  </div>
                </div>
                <div className="box flex flex-col ">
                  <img
                    src="../../assets/images/pic.PNG"
                    alt="A book"
                    className="basis-3/4"
                  />
                  <div className="basis-1/4 bg-amber-50 flex flex-col p-5">
                    <p className="text-black">Book 2</p>
                    <span className="text-white-1">22nd Feb 2025</span>
                  </div>
                </div>
                <div className="box flex flex-col ">
                  <img
                    src="../../assets/images/pic.PNG"
                    alt="A book"
                    className="basis-3/4"
                  />
                  <div className="basis-1/4 bg-amber-50 flex flex-col p-5">
                    <p className="text-black">Book 2</p>
                    <span className="text-white-1">22nd Feb 2025</span>
                  </div>
                </div>
                <div className="box flex flex-col ">
                  <img
                    src="../../assets/images/pic.PNG"
                    alt="A book"
                    className="basis-3/4"
                  />
                  <div className="basis-1/4 bg-amber-50 flex flex-col p-5">
                    <p className="text-black">Book 2</p>
                    <span className="text-white-1">22nd Feb 2025</span>
                  </div>
                </div>
                <div className="box flex flex-col ">
                  <img
                    src="../../assets/images/pic.PNG"
                    alt="A book"
                    className="basis-3/4"
                  />
                  <div className="basis-1/4 bg-amber-50 flex flex-col p-5">
                    <p className="text-black">Book 2</p>
                    <span className="text-white-1">22nd Feb 2025</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Category;
