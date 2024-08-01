import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { bannerData } from "./bannerdata";

const responsive = {
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
};

const CarouselSection = () => (
  <div className="Carouselmain">
    <Carousel
      responsive={responsive}
      swipeable={false}
      draggable={false}
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={3000}
      removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
      containerClass="carousel-container"
    >
      {bannerData.map((item) => (
        <div className="Carouseltextbox" key={item.id}>
          <div className="Carouseltextmain">
            <p>{item.text}</p>
          </div>
          <img src={item.url} alt="Banner" width={900} height={450} />
        </div>
      ))}
    </Carousel>
  </div>
);

export default CarouselSection;
