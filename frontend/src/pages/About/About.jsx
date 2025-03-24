import React, { useEffect, useState } from "react";
import Header from '../../components/layouts/Header';
import { useSearch } from '../../utils/useSearch';
import Footer from '../../components/layouts/Footer';
import CardSlider from "../../components/Cards/CardSlider";
const About = () => {
  const {
    searchQuery,
    setSearchQuery,
    onSearchBook,
    handleClearSearch,
  } = useSearch();
  const [userInfo, setUserInfo] = useState(null);
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/home");
      }
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  //Data members
  const members = [
    {
      imageUrl: "./public/Members/nguyen-hiep-store.jpg",
      name: "Đặng Cường",
      role: "Leader & Frontend Developer",
      quote: "Suc cheo khong",
      tagline: "Sục",
      linktoFacebook: "https://www.facebook.com/caocuong.dang.7524",
      linktoIntasgram: "#",
      linktoEmail: "mailto:nguyen.hiep@example.com",
    },
    {
      imageUrl: "./public/Members/nguyen-hiep-store.jpg",
      name: "Nguyễn Dũng",
      role: "Tech Lead & Backend Developer",
      quote: "Hat dau nho",
      tagline: "Hát",
      linktoFacebook: "https://www.facebook.com/hat.au.nho.983082",
      linktoIntasgram: "https://instagram.com/",
      linktoEmail: "mailto:tran.anh@example.com",
    },
    {
      imageUrl: "./public/Members/nguyen-hiep-store.jpg",
      name: "Nguyễn Hiệp",
      role: "Backend Developer",
      quote: "Boy phố làm bố các em",
      tagline: "Phố",
      linktoFacebook: "https://www.facebook.com/hieppotato",
      linktoIntasgram: "https://instagram.com/",
      linktoEmail: "mailto:tran.anh@example.com",
    },
    {
      imageUrl: "./public/Members/nguyen-hiep-store.jpg",
      name: "Quốc Anh",
      role: "Frontend Developer",
      quote: "dang code",
      tagline: "gpt",
      linktoFacebook: "https://www.facebook.com/adonis.quocanh",
      linktoIntasgram: "https://instagram.com/",
      linktoEmail: "mailto:tran.anh@example.com",
    },
    {
      imageUrl: "./public/Members/nguyen-hiep-store.jpg",
      name: "Hoàng Thảo",
      role: "Frontend Developer",
      quote: "Cac",
      tagline: "Gay",
      linktoFacebook: "https://www.facebook.com/kingkind.k6",
      linktoIntasgram: "https://instagram.com/",
      linktoEmail: "mailto:tran.anh@example.com",
    },
    {
      imageUrl: "./public/Members/nguyen-hiep-store.jpg",
      name: "Lưu Kiên",
      role: "Frontend Developer",
      quote: "Deo hieu code",
      tagline: "Hít đất",
      linktoFacebook: "https://www.facebook.com/kienchiluu2910",
      linktoIntasgram: "https://instagram.com/",
      linktoEmail: "mailto:tran.anh@example.com",
    },
  ];

  return (
    <div className="content-wrapper font-NunitoSans">
      <header className="mb-0">
        <Header
          userInfo={userInfo}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearchNote={onSearchBook}
          handleClearSearch={handleClearSearch}
        />
      </header>

      <main className="" id='about'>
        <div className="h-[400px] z-0">
          <div
            className="flex flex-col items-center justify-center top-0 bottom-0 bg-slate-500 w-full h-[400px] bg-center bg-no-repeat bg-cover"
            style={{
              backgroundImage: "url('./public/bg-about-2.jpg')",
            }}
          >
            <h1 className="text-white text-[80px] font-bold">About Us</h1>
            <h2 className="text-white text-2xl font-bold">
            Connecting knowledge seekers.
            </h2>
          </div>
        </div>
        <div className="wrapper pb-3">
          <div className="pt-16 font-NunitoSans text-lg text-[#4B4B4B]">
            <p className="mt-4">
              Libhub stands for Library Hub. This is an innovative improvement
              to the schools library system, designed to enhance students
              learning experience. It simplifies the search for academic
              resources, making it easier to find relevant materials.
            </p>
            <p className="mt-4">
              Libhub, simplifies resource searching and provides a virtual
              library simulation, making it easier for students to access and
              explore academic materials. We aim to optimize UI/UX to make the
              library more user-friendly and interesting.
            </p>
            <p className="mt-4">
              As a reader and at FPT University, we want to create a
              student-friendly library that helps them enjoy reading. Not only
              is it a quiet space to study, the library is also a place to
              inspire, stimulate creativity and connect knowledge-loving souls.
            </p>
            <p className="mt-4">
              We believe that reading not only helps expand knowledge but is
              also the key to developing critical thinking and creativity.
            </p>
            <p className="mt-4 pb-3">
              Therefore, our library not only provides thousands of books in
              many different fields but also makes it easy for them to access
              the books by indicating their location on the bookshelf.
            </p>
          </div>
        </div>
        <div className="pt-10 pb-10 bg-gray-50">
          <div className="ct-subheadline text-center">
            <h2>Meeting Our Team</h2>
          </div>
          <CardSlider 
          items={members} 
          cardType="member" 
          type="member"
          getKey={(item, index) => index} 
          />
        </div>
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};
export default About;
