import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { ToastContainer, toast } from 'react-toastify'; //push notification
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";

const BookDetails = ({ userInfo }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookInfo, setBookInfo] = useState(null);

  const fetchBook = async () => {
    try {
      const response = await axiosInstance.get(`/get-book/${id}`);
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
          autoClose: 1000,
        });
        fetchBook();
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again");
    }
  };

  useEffect(() => {
    fetchBook();
  }, [id]);

  if (!bookInfo) return <p>Not to found</p>;

  return (
    <>
      <div className="content-wrapper font-NunitoSans">
        <header>
          <Header />
        </header> 

        <main className='bg-[#fffefa] min-h-screen py-8'>
          <div className='container max-w-[1350px] mx-auto '>
            <div className='product-container'>

              <div className='product-main'>
                <div className='bg-white p-8 pb-5 rounded-xl h-auto border-gray-200 border-solid border-2 mb-0 grid grid-cols-3'> 
                  <img src={bookInfo.imageUrl} alt={bookInfo.title} className="w-48 h-48 object-cover" />
                  <div className="">   
                    <div>NameBook</div>
                    <div>ID</div>
                    <div>Category</div>
                    <button>Borrow</button>
                  </div>
                  <div>
                    <div>Author</div>
                    <div>Storage</div>
                  </div>
                </div>
              </div>{/* End product main */}

              <div className='product-description'>
                <div className="bg-white p-8 pb-5 rounded-xl h-auto border-gray-200 border-solid border-2 mt-6">
                  <div>Detail Book</div>
                  <div>Content</div>
                </div>
              </div>{/* End product description */}

            </div> {/* End product-container */}
          </div> {/* End container */}
        </main> {/* End main */}

        <footer>
          <Footer />
        </footer> 
      </div>  {/*End content-wrapper */}
    </>
  );
};

export default BookDetails;
