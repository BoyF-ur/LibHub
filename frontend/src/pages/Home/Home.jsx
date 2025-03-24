import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom"
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import axiosInstance from "../../utils/axiosInstance";
import GameCard from "../../components/Cards/GameCard";
import CardSlider from "../../components/Cards/CardSlider";
import { useSearch } from "../../utils/useSearch";  // Import the custom hook
import "../About/styles.css";

const Home = () => {
  const [items, setItems] = useState({ categories: [], hotBooks: [] });
  const [HotBooks, setHotBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // get Inforamation user
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  const {
    searchQuery,
    setSearchQuery,
    onSearchBook,
    handleClearSearch,
  } = useSearch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching categories from /home
        const categoryResponse = await axiosInstance.get('/home');
        if (categoryResponse.data && categoryResponse.data.categories) {
          setCategories(categoryResponse.data.categories);
        }

        // Fetching books from /get-all-book
        const bookResponse = await axiosInstance.get('/get-all-book');
        if (bookResponse.data && bookResponse.data.stories) {
          setHotBooks(bookResponse.data.stories);
        }

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // When fetching process
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div className="font-NunitoSans">
        <header>
          <Header
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSearchNote={onSearchBook}
            handleClearSearch={handleClearSearch}
          />
        </header>

        <div className="rounded-lg">
          {/* <GameCard /> */}
        </div>
        <main className="w-full">

          <div className="bg-gray-100 h-auto w-full">
            <div className="p-5 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-5 ">
              <div className="ct-subheadline">
                What is the <span className="text-pornhub-200 ml-2 mr-2">Libhub</span> product?
              </div>
              <div className="flex items-center justify-center font-medium max-w-5xl mx-auto mb-3">
                <p className=''>
                  Libhub stands for Library Hub. This is an innovative improvement to the schools library system, designed to enhance students learning experience. It simplifies the search for academic resources, making it easier to find relevant materials. Libhub, simplifies resource searching and provides a virtual library simulation, making it easier for students to access and explore academic materials. We aim to optimize UI/UX to make the library more user-friendly and interesting.
                </p>
              </div>
              <div className='flex justify-center items-center my-3 font-KumbhSans'>
                <a href="/about">
                  <button className='py-3 px-6 rounded-full text-black bg-pornhub-200 hover:bg-pornhub-300 font-semibold'>More details</button>
                </a>
              </div>
            </div>
          </div> {/*End about*/}

          <div className="bg-white">
            <div className="p-9 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
              <div className="ct-subheadline">
                Categories
              </div>
              {/* Render CategoryCards from Card.jsx */}
              <CardSlider
                items={categories}
                variant="category"
                type="home"
                cardType="card"
                getKey={(item) => item.title} //return name category
              />
            </div>
          </div>{/*End category-previous*/}

          <div className="bg-gray-100">
            <div className="p-9 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
              <div className="ct-subheadline">
                Hot Books
              </div>
              {/* Render HotBookCards from Card.jsx */}
              <CardSlider
                items={HotBooks}
                variant="hotbook"
                type="home"
                cardType="card"
                getKey={(item) => item._id} //return id bookDetails 
              />
            </div>
          </div> {/*End hot-book*/}

        </main> {/*End Body*/}

        <footer>
          <Footer />
        </footer>
      </div> {/* End content-wrapper */}

    </>
  )
}

export default Home