import React, { useRef } from "react";
import Card from "./Card";
import CardMember from "./CardMember";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { PrevArrow, NextArrow } from "../Arrow";
const CardSlider = ({
  items,
  variant = 'category',
  type = 'home', //To choose setting for carousel 
  cardType = 'card', //To choose Card or CardMember
  getKey = (item, index) => item._id || item.title || index, //get key to return flexible value
}) => {
  const sliderRef = useRef(null);

  //setting for hot books and category carousel
  const homeSettings = {
    dots: true,
    infinite: true,
    speed: 900,
    slidesToShow: 3,
    slidesToScroll: 2,
    arrows: false,
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
          initialSlide: 0,
          infinite: true,
        }
      },
    ]
  };

  //setting for member card carousel
  const aboutSettings = {
    className: "center",
    centerMode: true,
    centerPadding: "120px",
    dots: true,
    infinite: true,
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          className: "center",
          centerMode: true,
          centerPadding: "80px",
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 640,
        settings: {
          className: "center",
          centerMode: true,
          centerPadding: "10px",
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
          infinite: true,
        },
      },
    ],
  };

  const settings = type === "home" ? homeSettings : aboutSettings;
  const SelectedCard = cardType === 'member' ? CardMember : Card;

  return (
    <div className="relative w-full max-w-7xl mx-auto mb-4 bg-transparent">
      <PrevArrow sliderRef={sliderRef} />
      <Slider ref={sliderRef} {...settings}>
        {items.map((item, index) => (
          <SelectedCard
            key={getKey(item, index)} // Use getKey
            variant={cardType === 'card' ? variant : undefined}
            //Giải thích:
            //Tại sao lại là variant={cardType === 'card' ? variant : undefined}
            //Lý do là: nếu cardType là card(dùng Card): truyền prop variant vào Card để nó biết
            //render ra là cardCategory hay cardHotBook
            //Nếu cardType là cardMember: đặt variant là undefined, vì CardMember không cần variant(nó không cần 
            //phân biệt như kiểu Card)
            withHoverEffect={cardType === 'card'}
            id={item._id || item.id} // Pass id for hotbook
            {...item}
          />
        ))}
      </Slider>
      <NextArrow sliderRef={sliderRef} />
    </div>
  );
};

export default CardSlider;

