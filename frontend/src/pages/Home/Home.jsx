import React, { useEffect, useState } from "react";
import Footer from "../../components/layouts/Footer";
import { Navigate, useNavigate } from "react-router-dom"
import axiosInstance from "../../utils/axiosInstance";
import Navbar from "../../components/layouts/Header";
import TextToggle from "../../components/TextToggle";
import CardSlider from "../../components/CardSlider";


const Home = () =>{

    // get Inforamation user
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);

    const getUserInfo = async () => {
      try{
        const response = await axiosInstance.get("/get-user");
        if(response.data && response.data.user) {
            setUserInfo(response.data.user);
        }
      } catch(error) {
          if (error.response.status === 401) {
              localStorage.clear();
              navigate("/home");
          }
        }
      };

      //scroll 
      const scrollToFooter = () => {
        const footer = document.getElementById("footer");
        footer.scrollIntoView({behavior: "smooth"});
      }

      const scrollToAbout = () => {
        const about = document.getElementById("about");
        about.scrollIntoView({behavior: "smooth"});
      }
      
    useEffect(() => {
      getUserInfo();  
      return () => {   
      };
      }, []);
      
    return(
        <>
          <div className="content-wrapper font-NunitoSans">
            <header>
                  <Navbar userInfo={userInfo} scrollToFooter={scrollToFooter}/>
              </header>
      
              <main className="">
                <div className="">
                  Game
                </div> {/*End game*/}

                <div className="bg-gray-100 h-auto">
                  <div className="p-5">
                      <div className="ct-subheadline ">
                        What is the <span className="text-pornhub-200 ml-2 mr-2">Libhub</span> product?
                      </div>
                    <div className="flex items-center justify-center font-medium">
                      <TextToggle scrollToAbout={scrollToAbout}/>
                    </div> 
                  </div> 
                </div> {/*End about*/}
                
                <div className="bg-white">
                  <div className="p-9">
                    <div className="ct-subheadline">
                      Categories
                    </div> 
                    {/* Render CardCategories and CardSlider from data */}
                    <CardSlider />
                  </div>
                </div>{/*End category-previous*/}


                <div className="bg-gray-100">
                  <div className="p-9">
                    <div className="ct-subheadline">
                      Hot Books
                    </div>
                    
                  </div>
                </div> {/*End hot-book*/}           

              </main> {/*End Body*/}

          </div> {/* End content-wrapper */}

          <Footer />
        </>
    )
}

export default Home