// src/components/Carousel.jsx
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

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
          <img src="/images/our-place/images1.jpg" alt="Therapy room 1" />
        </div>
        <div>
          <img src="/images/our-place/images2.jpg" alt="Therapy room 2" />
        </div>
        <div>
          <img src="/images/our-place/images3.jpg" alt="Therapy room 3" />
        </div>
      </Carousel>
    </div>
  );
}
