import React, { useEffect, useState } from "react";
import CardCategory from "./CardCategory/CardCategory";
import axios from 'axios';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { PrevArrow, NextArrow } from "./Arrow";
import axiosInstance from "../utils/axiosInstance";

const CardSlider = () => {

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState([true]);
  const [error, setError] = useState(null);

  //fetching data category
  const fetchData = async () => { 
    try {
      const response = await axiosInstance.get("/categories");
      // const response = await axios.get("http://localhost:3000/categories");
      setCategories(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); 
  }, []);

  //when fetching progress 
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  //setting for carousel
  const settings = {
    dots: true,
    infinite: true,
    speed: 900,
    slidesToShow: 3,
    slidesToScroll: 1,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
    responsive: [
    {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0
        }
      },
    ]
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto bg-transparent">
      <Slider {...settings}>
        {/* Render CardCategories from data */}
        {categories.map((category, index) => {
          return (
            <CardCategory
            key={index} 
            title={category.title}
            description={category.description}  
            imageUrl={category.imageUrl}
            linkCategory={category.linkCategory}
            />
          );
        })}
      </Slider> 
    </div>
  );
};

export default CardSlider;

