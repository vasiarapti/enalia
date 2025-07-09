// src/components/Carousel.jsx
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import place1 from "../assets/our-place/image1.JPG";
import place2 from '../assets/our-place/image2.JPG';
import place3 from '../assets/our-place/image3.jpg';

export default function ImageCarousel() {
  return (
    <div className="max-w-[900px] mx-auto">
      <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop
        autoPlay
        interval={3000}
        transitionTime={800}
        swipeable
        emulateTouch
      >
        <div>
          {/* <img src="/images/our-place/image1.jpg" alt="Therapy room 1" /> */}
          {/* <Image src={place1} alt="Χώρος"/> */}
          <img
            src={place1.src}
            alt="Χώρος"
          />
        </div>
        <div>
          {/* <img src="/images/our-place/image2.jpg" alt="Therapy room 2" /> */}
          <img
            src={place2.src}
            alt="Χώρος"
          />
        </div>
        <div>
          {/* <img src="/images/our-place/image3.jpg" alt="Therapy room 3" /> */}
          <img
            src={place3.src}
            alt="Χώρος"
          />
        </div>
      </Carousel>
    </div>
  );
}
