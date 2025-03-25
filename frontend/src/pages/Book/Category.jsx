import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import Header from "../../components/layouts/Header";
import BookCard from "../../components/Cards/BookCard";
import { MdAdd } from "react-icons/md"
import Modal from 'react-modal';
import AddEditBook from "./AddEditBook";
import { ToastContainer, toast } from 'react-toastify';
import Footer from "../../components/layouts/Footer";
import ViewBook from "./ViewBook";
import "./styles.css";
import Filter from "../../components/CategoryElement/Filter";
import SortFilter from "../../components/CategoryElement/SortFilter";
import Pagination from "../../components/CategoryElement/Pagination";
import { useMemo } from "react";
import { getCookie } from "../../utils/getCookie";

const Category = ({}) => {

    const { title } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [allBooks, setAllBooks] = useState([]);

    const [filterType, setFilterType] = useState("");
    const [searchQuery, setSearchQuery] = useState('');

    const [openAddEditModal, setopenAddEditModal] = useState({
        isShown: false,
        type: "add",
        data: null,
    });

    const [openViewModal, setOpenViewModal] = useState({
      isShown: false,
      data: null,
    });

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState({
        title: "All",
    });
    const [filters, setFilters] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const isCookie = getCookie('token');
    

    const getUserInfo = async () => {
        try {
          const response = await axiosInstance.get("/get-user");
          if (response.data && response.data.user) {
              setUserInfo(response.data.user);
          }
        } catch (error) {
          console.error("An unexpected error occurred. Please try again", error);
        }
    };

    const getAllBooks = async (page) => {
      setLoading(true);
      try {
        let response = null;
        if(isCookie){
          response = await axiosInstance.get(`/get-all-book-user?page=${page}&limit=16`);
        }
        else{
          response = await axiosInstance.get(`/get-all-book?page=${page}&limit=16`);
        }
        
        if (response.data && response.data.stories) {
          setAllBooks(response.data.stories);
          setTotalPages(response.data.totalPages || 1);
        }
      } catch (error) {
          console.log("An unexpected error occurred. Please try again");
      }finally {
        setLoading(false);
    }
  }


    const handleEdit = (data) => {
        setopenAddEditModal({ isShown: true, type: "edit", data: data });
    };
    const handleViewBook = (data) => {
        setOpenViewModal({ isShown: true, data });
    };

    const deleteBook = async (data) => {
        const bookId = data._id;

        try {
            const response = await axiosInstance.delete("/delete-book/" + bookId);
            console.log(response.data);
            if (response.data && response.data.error) {
                toast.error("Book deleted successfully!", {
                    autoClose: 1000,
                });
                setOpenViewModal((prevState) => ({ ...prevState, isShown: false }));
                getAllBooks();
            }
        } catch (error) {
            setError("An unexpected error occurred.Please try again!");
        }
    }

    const updateIsFavourite = async (bookData) => {
        const bookId = bookData._id;
        try {
            const response = await axiosInstance.put(`/update-is-favourite/${bookId}`);

            if (response.data && response.data.story) {
                toast.success("Update Successfully", {
                    autoClose: 1000,
                });
                getAllBooks();
            }
        } catch (error) {
            console.log("An unexpected error occurred. Please try again.");
        }
    };

    const onSearchBook = async (query) => {
        try{
          const response = await axiosInstance.get("/search", {
            params:{
              query,
            },
          });
          if(response.data && response.data.stories){
            setFilterType("search");
            setAllBooks(response.data.stories);
          }
      }catch(error){
          setError("An unexpected error occurred.Please try again!")
        }
    }
  
    const handleClearSearch = () => {
        setFilterType("");
        getAllBooks();
    }

  useEffect(() => {
    isCookie && getUserInfo();
    getAllBooks(currentPage);
    return () => {};
  }, [currentPage]);

  const fetchFilters = async () => {
    try {
      const response = await axiosInstance.get("/categories");
      setFilters(response.data.categories);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleReload = () => {
    window.location.reload();
  };

  useEffect(() => {
    setSelectedCategory(title);
    fetchFilters();
    setLoading(false);
  }, []);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isScreenInRange, setIsScreenInRange] = useState(
    window.innerWidth >= 100 && window.innerWidth <= 871
  );

  useEffect(() => {
    const handleResize = () => {
      setIsScreenInRange(window.innerWidth >= 100 && window.innerWidth <= 871);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredBooks = useMemo(() => {
    if (selectedCategory.title === "All") return allBooks;
    return allBooks.filter((book) =>
      book.category.some(cat => cat.toLowerCase() === selectedCategory.title.toLowerCase())
    );
  }, [allBooks, selectedCategory]);

  useEffect(() => {
    if (title) {
      setSelectedCategory({ title });
    } else {
      setSelectedCategory({ title: "All" });
    }
  }, [title]);


  return ( 
    <>
      <header>
        <Header  
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearchNote={onSearchBook}
        handleClearSearch={handleClearSearch}/>
      </header>
      <main id="main">
        <div className="inner-wrap flex flex-row justify-center pb-0">
          <div className="relative p-4 h-fit">
            {isScreenInRange ? (
              <>
                {/* This is the filter button for mobile view */}
                <SortFilter onFilterClick={() => setIsFilterOpen(true)} />
                {isFilterOpen && (
                  <div className="fixed top-0 right-0 h-full w-full bg-white shadow-lg z-50 translate-x-0 transition-all duration-500 ease-in-out">
                    <button
                      className="p-4 text-red-500 font-bold transition-all duration-500 ease-in-out"
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
                              key={filter._id}
                              id={filter._id}
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
              <div className="inner-filter inline-block basis-1/4 vlg:w-[300px] lg:w-[259px] scr:w-[200px] col-auto border-list rounded-[30px] pl-4 pr-4 pb-8 mt-5 mb-10 max-h-fit sticky top-10">
                <div className="main-filter">
                  <h4 className="pt-4 pl-4 pr-4 pb-0 items-center">
                    <span className="text-2xl text-porn-hub-200">Category</span>
                  </h4>
                  {/* // This is the filter for desktop view */}
                  <div className="list-wrapper p-4 pt-2 block">
                    <ul className="list flex flex-wrap flex-col list-none m-0 p-0 border-none line-inherit">
                      {filters.map((filter) => (
                        <Filter
                          key={filter._id}
                          id={filter._id}
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

          <div className="inner-category basis-3/4 max-w-[75%] pl-4 pr-4 pb-8 mt-[40px] vsm:relative vsm:top-[88px] vsm:right-[50px] sm:static">
            <div className="inner-wrap c-container">
              <div>
                {allBooks.length > 0 ? (
                            <div className="list-book flex flex-row flex-wrap gap-[50px]">
                                {filteredBooks.map((item) => {
                                    return (
                                        <BookCard 
                                        key={item._id}
                                        imgUrl={item.imageUrl}
                                        title={item.title}
                                        story={item.story}
                                        author={item.author}
                                        date={item.date}
                                        remainingBook={item.remainingBook}
                                        isFavourite={item.isFavourite}
                                        onEdit={() => handleEdit(item)}
                                        onClick={() => 
                                          userInfo?.role === "admin" 
                                            ? handleViewBook(item) 
                                            : navigate(`/book/${item._id}`)
                                        }
                                        onFavouriteClick={() => updateIsFavourite(item)}
                                        />
                                    );
                                })}
                            </div>
                        ) : (
                            <>Empty Card Here</>
                        )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <div className="flex justify-center mt-10 mb-10">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
            
            <div>
            <Modal 
              isOpen={openAddEditModal.isShown}
              onRequestClose={() => {}}
              style={{
                  overlay: {
                      backgroundColor: "rgba(0,0,0,0.2)",
                      zIndex: 999,
                  },
              }}
              appElement={document.getElementById("root")}
              className="model-box relative"
            >
            <AddEditBook
                type={openAddEditModal.type}
                bookInfo={openAddEditModal.data}
                onClose={() => {
                    setopenAddEditModal({ isShown: false, type: "add", data: null});
                    handleReload();
                }}
                getAllBooks={getAllBooks} 
            />
            </Modal>
        
        <Modal 
              isOpen={openViewModal.isShown}
              onRequestClose={() => {}}
              style={{
                  overlay: {
                      backgroundColor: "rgba(0,0,0,0.2)",
                      zIndex: 999,
                  },
              }}
              appElement={document.getElementById("root")}
              className="model-box relative"
            >
              <ViewBook 
                bookInfo={openViewModal.data || null}
                userInfo={userInfo}
                onClose={() => {
                    setOpenViewModal((prevState) => ({ ...prevState, isShown: false}));
                }}
                onEditClick={() => {
                    setOpenViewModal((prevState) => ({ ...prevState, isShown: false}));
                    handleEdit(openViewModal.data || null);
                }}
                onDeleteClick={() => {
                    deleteBook(openViewModal.data || null);
                    
                }}
                isAdmin={userInfo?.role === "admin"}
              />
            </Modal>
            
            {userInfo?.role === "admin" && (
            <button
                className="w-16 h-16 flex items-center justify-center rounded-full bg-black hover:bg-pornhub-200 fixed right-10 bottom-10"
                onClick={() => {
                setopenAddEditModal({ isShown: true, type: "add", data: null });
                }}
            >
                <MdAdd className="text-[32px] text-white" />
            </button>
            )}
        
        <ToastContainer />  
        </div>

      <Footer />
    </>
  );
};

export default Category;
