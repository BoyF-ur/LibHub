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

const GetUser = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [allBooks, setAllBooks] = useState([]);
  const [filterType, setFilterType] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
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


  const logout = useLogout();
  

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
    <>
      <header>
        {/* <Navbar
          userInfo={userInfo}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearchNote={onSearchBook}
          handleClearSearch={handleClearSearch} /> */}
      </header>

      <main className="flex flex-col lg:flex-row min-h-screen">
      <aside className="w-full lg:w-1/5 bg-white text-black p-4 rounded-lg flex flex-col justify-between" style={{ backgroundColor: '#FAF3E0', minHeight: '100%' }} data-aos="fade-right">
  
  <div className="flex flex-col space-y-8">
    <h2 className="text-2xl font-extrabold text-gray-800" style={{ fontFamily: 'Poppins, sans-serif', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)' }}>✨General</h2>
    <ul className="space-y-6 w-full">
      <li>
        <button className="animated-button bg-yellow-500 text-black font-bold py-2 px-4 rounded-full w-full flex items-center justify-center space-x-2 transition duration-300 ease-in-out transform hover:scale-105 hover:text-white focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-opacity-50" onClick={() => setActiveSection('account')}>
          <i className="fas fa-user"></i>
          <span>Account Information</span>
        </button>
      </li>
      <li>
        <button className="animated-button bg-yellow-500 text-black font-bold py-2 px-4 rounded-full w-full flex items-center justify-center space-x-2 transition duration-300 ease-in-out transform hover:scale-105 hover:text-white focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-opacity-50" onClick={() => setActiveSection('borrowing')}>
          <i className="fas fa-book"></i>
          <span>Borrowed Books</span>
        </button>
      </li>
      <li>
        <button className="animated-button bg-yellow-500 text-black font-bold py-2 px-4 rounded-full w-full flex items-center justify-center space-x-2 transition duration-300 ease-in-out transform hover:scale-105 hover:text-white focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-opacity-50" onClick={() => setActiveSection('favourites')}>
          <i className="fas fa-heart"></i>
          <span>Favourites</span>
        </button>
      </li>
      <li>
        <button className="animated-button bg-yellow-500 text-black font-bold py-2 px-4 rounded-full w-full flex items-center justify-center space-x-2 transition duration-300 ease-in-out transform hover:scale-105 hover:text-white focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-opacity-50" onClick={() => {
          handleNavigation('/login');
          logout();
        }}>
          <i className="fas fa-sign-out-alt"></i>
          <span>Logout</span>
        </button>
      </li>
    </ul>
  </div>

  
  <div className="flex flex-col space-y-8 mt-12">
  <h2 className="text-2xl font-extrabold " style={{ fontFamily: 'Poppins, sans-serif', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}>✨External Links</h2>
  <ul className="space-y-6 w-full">
    <li>
      <a
        href="https://fap.fpt.edu.vn/"
        target="_blank"
        rel="noopener noreferrer"
        className="animated-button bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-2 px-4 rounded-full w-full flex items-center justify-center space-x-2 transition duration-300 ease-in-out transform hover:scale-105 hover:from-pink-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
      >
        <i className="fas fa-university"></i>
        <span>FAP</span>
      </a>
    </li>
    <li>
      <a
        href="https://flm.fpt.edu.vn/"
        target="_blank"
        rel="noopener noreferrer"
        className="animated-button bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-2 px-4 rounded-full w-full flex items-center justify-center space-x-2 transition duration-300 ease-in-out transform hover:scale-105 hover:from-pink-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
      >
        <i className="fas fa-folder-open"></i>
        <span>FLM</span>
      </a>
    </li>
    <li>
      <a
        href="https://fu-edunext.fpt.edu.vn/"
        target="_blank"
        rel="noopener noreferrer"
        className="animated-button bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-2 px-4 rounded-full w-full flex items-center justify-center space-x-2 transition duration-300 ease-in-out transform hover:scale-105 hover:from-pink-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
      >
        <i className="fas fa-graduation-cap"></i>
        <span>Edunext</span>
      </a>
    </li>
    <li>
      <a
        href="https://cmshn.fpt.edu.vn/"
        target="_blank"
        rel="noopener noreferrer"
        className="animated-button bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-2 px-4 rounded-full w-full flex items-center justify-center space-x-2 transition duration-300 ease-in-out transform hover:scale-105 hover:from-pink-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
      >
        <i className="fas fa-laptop"></i>
        <span>CMS</span>
      </a>
    </li>
  </ul>
</div>
</aside>

<section className="flex flex-col space-y-4 w-full flex-grow  rounded-lg shadow-lg p-4 overflow-y-auto aos-init aos-animate" style={{ minHeight: "calc(100vh - 100px)", color:"#D3D3D3",}} data-aos="fade-up"
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
    <img 
      src={userInfo.avatar} 
      alt="User Avatar" 
      className="w-full min-h-full rounded-full object-cover" 
    />
  </div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <div className="p-4 bg-gray-100 border-2 border-yellow-500 rounded-xl shadow-md hover:shadow-lg transition duration-300">
    <label className="block text-gray-800 text-lg font-bold mb-2">Name</label>
    <input
      type="text"
      value={userInfo.fullName}
      className="input-field bg-white border-2 border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
      readOnly
    />
  </div>

  <div className="p-4 bg-gray-100 border-2 border-yellow-500 rounded-xl shadow-md hover:shadow-lg transition duration-300">
    <label className="block text-gray-800 text-lg font-bold mb-2">Email</label>
    <input
      type="email"
      value={userInfo.email}
      className="input-field bg-white border-2 border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
      readOnly
    />
  </div>

  <div className="p-4 bg-gray-100 border-2 border-yellow-500 rounded-xl shadow-md hover:shadow-lg transition duration-300">
    <label className="block text-gray-800 text-lg font-bold mb-2">Phone Number</label>
    <input
      type="text"
      value={userInfo.phoneNumber}
      className="input-field bg-white border-2 border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
      readOnly
    />
  </div>

  <div className="p-4 bg-gray-100 border-2 border-yellow-500 rounded-xl shadow-md hover:shadow-lg transition duration-300">
    <label className="block text-gray-800 text-lg font-bold mb-2">MSSV</label>
    <input
      type="text"
      value={userInfo.MSSV}
      className="input-field bg-white border-2 border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
      readOnly
    />
    </div>
  </div>
</div>
        )}

{activeSection === 'borrowing' && (
  <div className="bg-white border-4 border-black-500 rounded-lg shadow-lg p-8 w-full min-h-full relative section-content" data-aos="fade-up">
    <h3 className="text-4xl font-extrabold text-yellow-500 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
      📚Borrowed Books
    </h3>
    <div className="inner-wrap flex flex-row flex-wrap justify-start space-x-5 pb-0">      <img
        src="https://marketplace.canva.com/EAFPHUaBrFc/1/0/1003w/canva-black-and-white-modern-alone-story-book-cover-QHBKwQnsgzs.jpg"
        style={{ width: '120px', height: 'auto' }}
      />
      <img
        src="https://www.designforwriters.com/wp-content/uploads/2017/10/design-for-writers-book-cover-tf-2-a-million-to-one.jpg"
        style={{ width: '120px', height: 'auto' }}
      />
      <img
        src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/art-book-cover-design-template-34323b0f0734dccded21e0e3bebf004c_screen.jpg?ts=1637015198"
        style={{ width: '120px', height: 'auto' }}
      />
      <img
        src="https://www.adobe.com/express/create/cover/media_19d5e212dbe8553614c3a9fbabd4d7f219ab01c85.png?width=750&format=png&optimize=medium"
        style={{ width: '120px', height: 'auto' }}
      />
    </div>
  </div>
)}

        {activeSection === 'favourites' && (
          <div className="bg-white border-4 border-black-500 rounded-lg shadow-lg p-8 w-full min-h-full relative section-content" data-aos="fade-up">
    <h3 className="text-4xl font-extrabold text-yellow-500 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
              ❤️Favourites
            </h3>
            <div className="inner-wrap flex flex-row flex-wrap justify-start space-x-5 pb-0">      <img
        src="https://marketplace.canva.com/EAFPHUaBrFc/1/0/1003w/canva-black-and-white-modern-alone-story-book-cover-QHBKwQnsgzs.jpg"
        style={{ width: '120px', height: 'auto' }}
      />
      <img
        src="https://www.designforwriters.com/wp-content/uploads/2017/10/design-for-writers-book-cover-tf-2-a-million-to-one.jpg"
        style={{ width: '120px', height: 'auto' }}
      />
      <img
        src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/art-book-cover-design-template-34323b0f0734dccded21e0e3bebf004c_screen.jpg?ts=1637015198"
        style={{ width: '120px', height: 'auto' }}
      />
      <img
        src="https://www.adobe.com/express/create/cover/media_19d5e212dbe8553614c3a9fbabd4d7f219ab01c85.png?width=750&format=png&optimize=medium"
        style={{ width: '120px', height: 'auto' }}
      />
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