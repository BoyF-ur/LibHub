import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import moment from "moment";
import axiosInstance from "../../utils/axiosInstance";
import { MdArrowBack } from "react-icons/md";
import { TfiAgenda } from "react-icons/tfi";
import { ToastContainer, toast } from 'react-toastify';
import { FaHeart } from "react-icons/fa6";
import Header from "../../components/layouts/Header";
import { getCookie } from "../../utils/getCookie";
import Footer from "../../components/layouts/Footer";
import Modal from 'react-modal';
import ViewBorrow from "./ViewBorrow";


const BookDetail = ({  }) => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [bookInfo, setBookInfo] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

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

  const [openViewModal, setOpenViewModal] = useState({
    isShown: false,
    data: null,
  });

  const handleViewBook = () => {
    setOpenViewModal({ isShown: true });

  };
  
  const fetchBook = async () => {
    
    
    try {
      let response = null;
      if(isCookie){
        response = await axiosInstance.get(`/get-book-user/${id}`);
      }
      else{
        response = await axiosInstance.get(`/get-book/${id}`);
      }
      if (response.data && response.data.story) {
          setBookInfo(response.data.story);
        }
      } catch (error) {
        console.log("An unexpected error occurred. Please try again");
      }
  };

  const updateIsFavourite = async () => {
    try {
            const response = await axiosInstance.put(`/update-is-favourite/${id}`);
            
            if (response.data && response.data.story) {
                toast.success("Update Successfully", {
                    autoClose: 500,
                  });
                  fetchBook();
            }
        } catch (error) {
            console.log("An unexpected error occurred. Please try again");
        }
  };

  const handleReload = () => {
    window.location.reload();
  };

  useEffect(() => {
    fetchBook();
    isCookie && getUserInfo();
  }, [id]);

  if (!bookInfo) return <p>Loading...</p>;

  return (
    <div className="">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 ">
        <button
          className="text-gray-500 hover:text-gray-700 flex items-center mb-4"
          onClick={() => navigate(-1)}
        >
          <MdArrowBack className="text-xl mr-2" /> Back
        </button>

        <div className="flex flex-col sm:flex-row gap-6">
          <div className="relative">
            <img
              src={bookInfo.imageUrl}
              alt={bookInfo.title}
              className="w-35  h-30 sm:w-3/4 rounded-lg shadow-md object-cover"
            />
          
          </div>

          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-800">{bookInfo.title}</h1>
            <div className="flex items-center justify-between mt-2 text-sm text-gray-500">
              <span>{moment(bookInfo.date).format("Do MMM YYYY")}</span>
              <div className="inline-flex items-center gap-2 text-yellow-600 bg-yellow-100 rounded px-2 py-1">
                <TfiAgenda className="text-sm" />
              
              </div>
            </div>
            <p className="mt-4 text-gray-700"> 
              <strong>Category: </strong> 
              {bookInfo?.category?.length > 0 ? bookInfo.category.map((category) => category).join(", ") : "None"}
            </p>
            <br />
            
            <div className="mt-2">
              <p className="text-sm text-gray-600"><strong>Author:</strong> {bookInfo.author ? `${bookInfo.author}` : "None"}</p>
              <p className="text-sm text-gray-600"> {bookInfo.story || "None"}</p>
              <p className="text-sm text-gray-600"><strong>Remaining Book:</strong> {bookInfo.remainingBook ? `${bookInfo.remainingBook}` : "None"}</p>
            </div>

            <div className="flex gap-3 mt-6">
              {bookInfo.remainingBook > 0 ? (
                isCookie && <button 
                  className="bg-black text-white px-4 py-2 rounded-lg hover:bg-pornhub-200 font-semibold transition"
                  onClick={() => handleViewBook()}
                >
                  Borrow!
                </button>
                    ) : (
                      <span className="bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed">
                        Out of book
                      </span>
                    )}

                    <button
                      className={`p-2 rounded-full border transition-colors duration-300 flex items-center justify-center w-10 h-10
                      ${bookInfo.isFavourite ? "bg-red-500 text-white border-red-500 hover:bg-red-600" : "bg-gray-200 text-gray-600 hover:bg-gray-300"}`}
                      onClick={updateIsFavourite}
                    >
                <FaHeart className="text-lg" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer />
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
              <ViewBorrow 
                userInfo={userInfo}
                bookInfo={bookInfo}
                onClose={() => {
                    setOpenViewModal((prevState) => ({ ...prevState, isShown: false}));
                    handleReload();
                }}
              />
            </Modal>
    </div>
  );
};

export default BookDetail;