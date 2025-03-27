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

const GetUser = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [allBooks, setAllBooks] = useState([]);
  const [filterType, setFilterType] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [showAvatarMenu, setShowAvatarMenu] = useState(false);
  const [activeSection, setActiveSection] = useState('account');

  const [openAddEditModal, setopenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [openViewModal, setOpenViewModal] = useState({
    isShown: false,
    data: null,
  });

  const getBorrowedBooks = async () => {
    try {
      const response = await axiosInstance.get("/get-borrowed-book");
      if (response.data && response.data.borrowedById) {
        setBooks(response.data.borrowedById);
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
        console.log(123);
        console.log(typeof response.data.user.phoneNumber);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        navigate("/home");
      }
    }
  };

  const handleEdit = () => {
    setopenAddEditModal({ isShown: true, type: "edit", data: userInfo });
  };

  const handleViewUser = () => {
    setOpenViewModal({ isShown: true });
  };

  const getAllBooks = async () => {
    try {
      const response = await axiosInstance.get("/get-all-book");
      if (response.data && response.data.stories) {
        setAllBooks(response.data.stories);
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again");
    }
  }

  const onSearchBook = async (query) => {
    try {
      const response = await axiosInstance.get("/search", {
        params: {
          query,
        },
      });
      if (response.data && response.data.stories) {
        setFilterType("search");
        setAllBooks(response.data.stories);
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again!")
    }
  }

  const handleClearSearch = () => {
    setFilterType("");
    getAllBooks();
  }

  useEffect(() => {
    getUserInfo();
    getBorrowedBooks();
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      anchorPlacement: 'top-bottom',
      mirror: false,
    });
  }, []);

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
    <div className="font-NunitoSans">
      <header>
        <Navbar
          userInfo={userInfo}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearchNote={onSearchBook}
          handleClearSearch={handleClearSearch} />
      </header>

      <main className="flex flex-col lg:flex-row min-h-screen">
        <aside className="w-full lg:w-1/5 text-black px-3 py-3 rounded-lg bg-gray-50 ">
          <h2 className="text-3xl font-extrabold mb-4 text-gray-800 flex justify-center">Menu</h2>
          <ul className="flex flex-col space-y-5">
            <li className="">
              <button className="ct-button-sidebar-account-page justify-start w-full" onClick={() => setActiveSection('account')}>
                <i className="fas fa-user"></i>
                <span>My Information</span>
              </button>
            </li>
            <li>
              <button className="ct-button-sidebar-account-page justify-start" onClick={() => setActiveSection('borrowing')}>
                <i className="fas fa-book"></i>
                <span>Borrowed Book</span>
              </button>
            </li>
            <li>
              <button className="ct-button-sidebar-account-page justify-start" onClick={() => setActiveSection('favourites')}>
                <i className="fas fa-heart"></i>
                <span>Favourites</span>
              </button>
            </li>
            <li>
              <button className="ct-button-sidebar-account-page justify-start" onClick={() => handleNavigation('/login')}>
                <i className="fas fa-sign-out-alt"></i>
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </aside>
        {/*End Menu sidebar */}

        <section className="flex flex-col space-y-4 w-full flex-grow bg-gray-150 rounded-lg p-4 overflow-y-auto aos-init aos-animate" style={{ minHeight: "calc(100vh - 100px)" }} data-aos="fade-up"
          data-aos-anchor-placement="top-top">

          {userInfo ? (
            <>
              {activeSection === 'account' && (
                <div className="bg-white border-black-500 rounded-lg shadow-lg p-8 w-full h-full relative section-content">
                  <h3 className="text-4xl font-extrabold text-black mb-4">
                    My Information
                  </h3>
                  <button className="absolute top-4 right-4 bg-teal-400 hover:bg-teal-500 duration-300 text-black font-bold py-2 px-4 rounded-full flex items-center justify-center space-x-2 "
                    onClick={() => handleViewUser()}
                  >
                    <i className="fas fa-cog"></i>
                    <span>Edit Information</span>
                  </button>

                  <div className="relative flex flex-row gap-8 mb-8">
                    {/* Avatar Img */}
                    <div className="relative rounded-full w-[275px] h-[275px]">
                      <img
                        src={userInfo.avatar}
                        alt="User Avatar"
                        className="w-full h-full rounded-full object-cover border-2 border-gray-150"
                      />
                      {/* Camera icon */} 
                      <div className="absolute bottom-0 left-0 w-8 h-8 bg-white rounded-full flex items-center justify-center border border-gray-300">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-gray-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 9a2 2 0 012-2h3l2-2h4l2 2h3a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                    </div>

                    {/*User information*/}
                    <div className="flex flex-col space-y-2 justify-center ">
                      {/* Tên và nhãn */}
                      <div className="flex items-center space-x-2">
                        <h2 className="text-5xl font-bold text-black">{userInfo.fullName}</h2>
                      </div>

                      {/* MSSV */}
                        <p className="text-gray-400 text-xl font-bold">Mã số sinh viên</p>
                      <div className="flex items-center space-x-2">
                        <span className="text-black font-bold text-xl">{userInfo.MSSV}</span>
                      </div>
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
                    <div className="md:col-span-2">
                      <label className="block text-gray-700 text-sm font-bold mb-2">Bio</label>
                      <textarea value={userInfo.bio || "Bio: Loving reading books"} className="textarea-field" readOnly />
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'borrowing' && (
                <div className="bg-white border-4 border-black-500 rounded-lg shadow-lg p-8 w-full min-h-full relative section-content" data-aos="fade-up">
                  <h3 className="text-4xl font-extrabold text-yellow-500 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    My Loan
                  </h3>
                  <div>


                  </div>
                </div>
              )}

              {activeSection === 'favourites' && (
                <div className="bg-white border-4 border-black-500 rounded-lg shadow-lg p-8 w-full min-h-full relative section-content" data-aos="fade-up">
                  <h3 className="text-4xl font-extrabold text-yellow-500 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Favourites
                  </h3>
                  <div>

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
    </div>
  );
};

export default GetUser;