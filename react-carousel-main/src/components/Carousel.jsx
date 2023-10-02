import React, { useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import "./Carousel.css";

export const Carousel = ({ data }) => {
  const [slide, setSlide] = useState(0);

  const nextSlide = () => {
    setSlide((slide + 1) % data.length);
  };

  const prevSlide = () => {
    setSlide((slide - 1 + data.length) % data.length);
  };

  const goToSlide = (index) => {
    setSlide(index);
  };

  return (
    <div className="carousel-container">
      <div className="prev-image-container">
        <div className="prev-image">
          <img
            src={data[(slide - 1 + data.length) % data.length].src}
            alt={data[(slide - 1 + data.length) % data.length].alt}
          />
        </div>
      </div>
      <div className="carousel">
        <BsArrowLeftCircleFill
          onClick={prevSlide}
          className="left-arrow"
        />
        {data.map((item, idx) => {
          const isActive = slide === idx;
          const isPrev = slide === (idx + 1) % data.length;
          const isNext = slide === (idx - 1 + data.length) % data.length;
          const textPosition = isActive ? "bottom" : "top";

          const classNames = `slide ${isActive ? "active" : ""} ${
            isPrev ? "hidden prev" : ""
          } ${isNext ? "hidden next" : ""}`;

          return (
            <div key={idx} className={classNames}>
              <img
                src={item.src}
                alt={item.alt}
              />
              <div className={`text-overlay ${isActive ? "animate-text" : ""}`} position={textPosition}>
                {item.alt}
              </div>
            </div>
          );
        })}
        <BsArrowRightCircleFill
          onClick={nextSlide}
          className="right-arrow"
        />
        <div className="indicators">
          {data.map((_, idx) => {
            return (
              <button
                key={idx}
                className={`indicator ${
                  slide === idx ? "indicator-active" : "indicator-inactive"
                }`}
                onClick={() => goToSlide(idx)}
              ></button>
            );
          })}
        </div>
      </div>
      <div className="next-image-container">
        <div className="next-image">
          <img
            src={data[(slide + 1) % data.length].src}
            alt={data[(slide + 1) % data.length].alt}
          />
        </div>
      </div>
    </div>
  );
};
