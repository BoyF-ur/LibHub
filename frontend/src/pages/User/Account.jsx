import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import Navbar from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import AOS from "aos";
import "aos/dist/aos.css";
import EditUser from "./EditUser";
import ViewUser from "./ViewUser";
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import { Tooltip } from "react-tooltip";
import useLogout from "../../utils/useLogout";
import moment from "moment";

const GetUser = ({ }) => {
  const navigate = useNavigate();
  const [showSettings, setShowSettings] = useState(false);
  const [books, setBooks] = useState([]);
  const [favouriteBooks, setFavouriteBooks] = useState([]);
  const [showAvatarMenu, setShowAvatarMenu] = useState(false);
  const [activeSection, setActiveSection] = useState('account');
  const [userInfo, setUserInfo] = useState(null);

  const [openAddEditModal, setopenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [openViewModal, setOpenViewModal] = useState({
    isShown: false,
    data: null,
  });


  const getBorrowedBooks = async (userId) => {
    try {
      const response = await axiosInstance.get(`/get-borrowed-book/${userId}`);
      if (response.data && response.data.borrowed) {
        setBooks(response.data.borrowed);
      }
    } catch (error) {
      console.error("An unexpected error occurred. Please try again", error);
    }
  }

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
        getBorrowedBooks(response.data.user._id);
      }
    } catch (error) {
      if (error.response.status === 401) {
        rage.clear();
      }
    }
  };

  const getFavouriteBooks = async () => {
    try {
      let response = null;
      response = await axiosInstance.get("/get-favourite-books-user");
      if (response.data && response.data.favouriteBooks) {
        setFavouriteBooks(response.data.favouriteBooks);
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again");
    }
  }

  const logout = useLogout();

  const handleEdit = () => {
    setopenAddEditModal({ isShown: true, type: "edit", data: userInfo });
  };

  const handleViewUser = () => {
    setOpenViewModal({ isShown: true });
  };

  useEffect(() => {
    getUserInfo();
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      anchorPlacement: 'top-bottom',
      mirror: false,
    });
  }, []);

  useEffect(() => {
    if (userInfo && userInfo._id) {
      getFavouriteBooks();
    }
  }, [userInfo]);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleAvatarChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('avatar', file);

      try {
        const response = await axiosInstance.post('/update-avatar', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        if (response.data && response.data.user) {
          setUserInfo(response.data.user);
          toast.success('Avatar updated successfully!');
        }
      } catch (error) {
        toast.error('Failed to update avatar. Please try again.');
      }
    }
  };

  const handleAvatarClick = () => {
    setShowAvatarMenu(!showAvatarMenu);
  };

  return (
    <>
      <header>
      </header>

      <main className="flex flex-col lg:flex-row min-h-screen">
        <aside className="w-full lg:w-1/5 bg-white text-black p-4 rounded-lg" style={{ backgroundColor: '#f5f5f5' }} data-aos="fade-right">
          <h2 className="text-2xl font-extrabold mb-4 text-gray-800" style={{ fontFamily: 'Poppins, sans-serif', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)' }}>✨General</h2>
          <ul className="space-y-8">
            <li>
              <button className="animated-button bg-yellow-500 text-black font-bold py-2 px-4 rounded-full w-full flex items-center justify-center space-x-2 transition duration-300 ease-in-out transform hover:scale-105 hover:text-white focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-opacity-50" onClick={() => setActiveSection('account')}>
                <i className="fas fa-user"></i>
                <span>Account Information</span>
              </button>
            </li>
            <li>
              <button className="animated-button bg-yellow-500 text-black font-bold py-2 px-4 rounded-full w-full flex items-center justify-center space-x-2 transition duration-300 ease-in-out transform hover:scale-105 hover:text-white focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-opacity-50" onClick={() => userInfo.role === "admin" ? handleNavigation("/management") : setActiveSection("borrowing")}>
                <i className="fas fa-book"></i>
                <span>Book in Borrowing</span>
              </button>
            </li>
            <li>
              <button className="animated-button bg-yellow-500 text-black font-bold py-2 px-4 rounded-full w-full flex items-center justify-center space-x-2 transition duration-300 ease-in-out transform hover:scale-105 hover:text-white focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-opacity-50" onClick={() => setActiveSection('favourites')}>
                <i className="fas fa-heart"></i>
                <span>Favourites</span>
              </button>
            </li>
            <li>
              <button className="animated-button bg-yellow-500 text-black font-bold py-2 px-4 rounded-full w-full flex items-center justify-center space-x-2 transition duration-300 ease-in-out transform hover:scale-105 hover:text-white focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-opacity-50" onClick={() => logout()}>
                <i className="fas fa-sign-out-alt"></i>
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </aside>

        <section className="flex flex-col space-y-4 w-full flex-grow bg-yellow-500 rounded-lg shadow-lg p-4 overflow-y-auto aos-init aos-animate" style={{ minHeight: "calc(100vh - 100px)" }} data-aos="fade-up"
          data-aos-anchor-placement="top-top">

          {userInfo ? (
            <>
              {activeSection === 'account' && (
                <div className="bg-white border-4 border-black-500 rounded-lg shadow-lg p-8 w-full h-full relative section-content" data-aos="fade-up">
                  <h3 className="text-4xl font-extrabold text-yellow-500 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    👤Account Information
                  </h3>
                  <button className="absolute top-4 right-4 bg-yellow-500 text-black font-bold py-2 px-4 rounded-full flex items-center justify-center space-x-2 transition duration-300 ease-in-out transform hover:scale-105 hover:text-white"
                    onClick={() => handleViewUser()}
                  >
                    <i className="fas fa-cog"></i>
                    <span>Account Settings</span>
                  </button>

                  <div className="relative flex items-start space-x-4 mb-8">
                    <div className="w-72 h-72 rounded-full bg-white border-4 border-yellow-500 relative">
                      <img src={userInfo.avatar} alt="User Avatar" className="w-full min-h-full rounded-full object-cover" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                      <input type="text" value={userInfo.fullName} className="input-field" readOnly />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                      <input type="email" value={userInfo.email} className="input-field" readOnly />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
                      <input type="text" value={userInfo.phoneNumber} className="input-field" readOnly />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">MSSV</label>
                      <input type="text" value={userInfo.MSSV} className="input-field" readOnly />
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'borrowing' && (
                <div className="bg-white border-4 border-black-500 rounded-lg shadow-lg p-8 w-full min-h-full relative section-content" data-aos="fade-up">
                  <h3 className="text-4xl font-extrabold text-yellow-500 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    📚 Book in Borrowing
                  </h3>

                  {/* Header Row */}
                  <div className="grid grid-cols-4 text-center font-bold text-lg bg-gray-200 py-2 rounded-t-md">
                    <div>Book</div>
                    <div>Start Date</div>
                    <div>End Date</div>
                    <div>Status</div>
                  </div>

                  {/* Book List */}
                  <div className="inner-wrap space-y-4">
                    {books.map((book) => (
                      <button
                        key={book.bookId}
                        onClick={() => navigate(`/book/${book.bookId}`)}
                        className="w-full hover:bg-gray-50 transition"
                      >
                        <div className="grid grid-cols-4 items-center text-center border border-gray-300 p-4 shadow-sm">
                          {/* Image Column */}
                          <div className="flex justify-center">
                            <img
                              src={book.imageUrl}
                              alt={book.title}
                              className="w-24 h-auto object-cover rounded-md border border-gray-300"
                            />
                          </div>
                          {/* Start Date Column */}
                          <div className="text-gray-700 text-lg font-semibold">
                            {moment(book.startDate).format("DD/MM/YYYY")}
                          </div>
                          {/* End Date Column */}
                          <div className="text-gray-700 text-lg font-semibold">
                            {moment(book.endDate).format("DD/MM/YYYY")}
                          </div>
                          {/* Status Column */}
                          <div className={`text-lg font-semibold ${book.status === 'pending' ? 'text-yellow-500' : 'text-green-500'}`}>
                            {book.status === 'pending' ? 'Pending' : 'Borrowed'}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {activeSection === 'favourites' && (
                <div className="bg-white border-4 border-black-500 rounded-lg shadow-lg p-8 w-full min-h-full relative section-content" data-aos="fade-up">
                  <h3 className="text-4xl font-extrabold text-yellow-500 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    ❤️Favourites
                  </h3>
                  <div className="inner-wrap flex flex-row flex-wrap justify-start space-x-5 pb-0">
                    {favouriteBooks.map((book) => (
                      <button onClick={() => {
                        navigate(`/book/${book._id}`);
                      }}>
                        <div key={book.bookId} className=" text-center hover:bg-gray-50">
                          <div className="py-3 px-4">
                            <img
                              src={book.imageUrl}
                              alt={book.title}
                              className="w-24 h-auto object-cover rounded-md border border-gray-300"
                            />
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <p className="text-gray-500 text-lg">Loading user information...</p>
          )}
        </section>


        <style jsx>{`
  .animated-button {
    position: relative;
    overflow: hidden;
  }

  .animated-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.2);
    transition: left 0.3s ease-in-out;
  }

  .animated-button:hover::before {
    left: 100%;
  }

  .input-field {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 10px;
    font-size: 16px;
    color: #333;
    width: 100%;
    box-sizing: border-box;
    transition: border-color 0.3s;
  }

  .input-field:focus {
    border-color: #007bff;
    outline: none;
  }

  .label {
    font-size: 14px;
    font-weight: 600;
    color: #555;
    margin-bottom: 5px;
  }

  .textarea-field {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 10px;
    font-size: 16px;
    color: #333;
    width: 100%;
    box-sizing: border-box;
    transition: border-color 0.3s;
    resize: none;
  }

  .textarea-field:focus {
    border-color: #007bff;
    outline: none;
  }

  .section-content {
    width: calc(100% - 2rem); /* Adjust width to match the outer container */
    margin: 0 auto; /* Center the content */
  }
`}</style>

      </main>

      <div>
        <Modal
          isOpen={openAddEditModal.isShown}
          onRequestClose={() => { }}
          style={{
            overlay: {
              backgroundColor: "rgba(0,0,0,0.2)",
              zIndex: 999,
            },
          }}
          appElement={document.getElementById("root")}
          className="model-box relative"
        >
          <EditUser
            type={openAddEditModal.type}
            userInfo={userInfo}
            onClose={() => {
              setopenAddEditModal({ isShown: false, type: "add", data: null });
            }}
            getUserInfo={getUserInfo}
          />
        </Modal>

        <Modal
          isOpen={openViewModal.isShown}
          onRequestClose={() => { }}
          style={{
            overlay: {
              backgroundColor: "rgba(0,0,0,0.2)",
              zIndex: 999,
            },
          }}
          appElement={document.getElementById("root")}
          className="model-box relative"
        >
          <ViewUser
            userInfo={userInfo}
            onClose={() => {
              setOpenViewModal((prevState) => ({ ...prevState, isShown: false }));
            }}
            onEditClick={() => {
              setOpenViewModal((prevState) => ({ ...prevState, isShown: false }));
              handleEdit(openViewModal.data || null);
            }}
          />
        </Modal>

        <ToastContainer />
      </div>

      <Footer />
    </>
  );
};

export default GetUser;