import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import BookCard from "../../components/Cards/BookCard";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import { useNavigate } from "react-router-dom";
import { MdAdd } from "react-icons/md"
import Modal from 'react-modal';
import AddEditBook from "./AddEditBook";
import { ToastContainer, toast } from 'react-toastify'; 
import "./styles.css";
import ViewBook from "./ViewBook";

const SearchResult = () => {
    
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [searchQuery, setSearchQuery] = useState("");
  const query = queryParams.get("q");
  const [filterType, setFilterType] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const [allBooks, setAllBooks] = useState([]);

  const [openAddEditModal, setOpenAddEditModal] = useState({
            isShown: false,
            type:"add",
            data:null,
  });
    
  const [openViewModal, setOpenViewModal] = useState({
          isShown: false,
          data: null,
  });

  const getUserInfo = async () => {
    try{
        const response = await axiosInstance.get("/get-user");
        if(response.data && response.data.user){
            setUserInfo(response.data.user);
        }
    }catch(error){
        if(error.response.status === 401){
            localStorage.clear();
            navigate("/home");
        }
    }
};

  const getAllBooks = async () => {
    try{
        const response = await axiosInstance.get("/get-all-book");
        if(response.data && response.data.stories){
            setAllBooks(response.data.stories);
        }
    }catch(error){
        console.log("An unexpected error occurred. Please try again");
    }
}

    const handleClearSearch = () => {
        setFilterType("");
        getAllBooks();
    }

    const handleEdit = (data) => {
        setOpenAddEditModal({ isShown: true, type: "edit", data: data});
    };
    const handleViewBook = (data) => {
      setOpenViewModal({isShown: true, data});
    };

    const deleteBook = async (data) => {
      const bookId = data._id;

      try{
          const response = await axiosInstance.delete("/delete-book/" + bookId);
          console.log(response.data);
          if(response.data && response.data.error){
              toast.error("Book deleted successfully!", {
                  autoClose: 1000,
                });
              setOpenViewModal((prevState) => ({ ...prevState, isShown : false}));
              getAllBooks();
          }
      }catch(error){
          setError("An unexpected error occurred.Please try again!")
        }
  }

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axiosInstance.get("/search", { params: { query } });
        if (response.data && response.data.stories) {
          setAllBooks(response.data.stories);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    if (query) {
      fetchSearchResults();
    }
    getUserInfo();
  }, [query]);

  return (
    <>
      <Header 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery}
        handleClearSearch={handleClearSearch}
    />
      <div className="container mx-auto py-10">
        
        <div className="grid grid-cols-8 gap-8">
          {allBooks.length > 0 ? (
            allBooks.map((item) => (
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
                onClick={() => userInfo?.role === "admin" ? handleViewBook(item) : navigate(`/book/${item._id}`)}
                />
            ))
          ) : (
            <p>No results found.</p>
          )}
        </div>
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
                    setOpenAddEditModal({ isShown: false, type: "add", data: null});
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
                setOpenAddEditModal({ isShown: true, type: "add", data: null });
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

export default SearchResult;
