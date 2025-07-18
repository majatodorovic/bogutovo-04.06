"use client";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/scrollbar";
import { Swiper as Slider } from "swiper/react";
import { useState } from "react";
import {
  renderBannerPagination,
  available_modules,
  getSwiperModules,
} from "@/_components/banner-slider/swiper/functions";
import { SwiperSlide } from "swiper/react";
import { Slide } from "./swiper-slide";
import { Button } from "@/_components/shared/button";

export const Swiper = ({ swiper_data, className }) => {
  const [swiper, setSwiper] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const {
    slidesPerView,
    modules,
    autoplay,
    spaceBetween,
    breakpoints,
    navigation,
    pagination,
    slides,
    num_of_slides,
    type,
    rewind,
    imagePriority,
    imageLoading,
  } = swiper_data;

  const handleNextSlide = () => {
    swiper.slideNext();
  };

  const handlePrevSlide = () => {
    swiper.slidePrev();
  };

  const handleSlideTo = (index) => {
    swiper.slideTo(index);
  };

  switch (type) {
    case "banner":
      return (
        <>
          <Slider
            className={className}
            rewind={rewind}
            autoplay={modules?.includes("Autoplay") ? autoplay : false}
            onSwiper={(swiper) => setSwiper(swiper)}
            onSlideChange={({ activeIndex }) => {
              setCurrentSlide(activeIndex);
            }}
            modules={[
              ...getSwiperModules({
                modules: modules,
                available_modules: available_modules,
              }),
            ]}
            navigation={modules?.includes("Navigation") ? navigation : false}
            pagination={modules?.includes("Pagination") ? pagination : false}
            slidesPerView={slidesPerView}
            spaceBetween={spaceBetween}
            breakpoints={breakpoints}
          >
            {slides?.map((banner) => (
              <SwiperSlide key={banner.id} className="!w-full !h-full">
                <Slide
                  {...banner}
                  imagePriority={imagePriority}
                  imageLoading={imageLoading}
                >
                  <HeroSlideContent {...banner} />
                </Slide>
              </SwiperSlide>
            ))}
            {num_of_slides > 1 &&
              renderBannerPagination({
                current_slide: currentSlide,
                num_of_slides: num_of_slides,
                func: {
                  next: handleNextSlide,
                  prev: handlePrevSlide,
                  slideTo: handleSlideTo,
                },
              })}
          </Slider>
        </>
      );
    default:
      return (
        <>
          <Slider
            className={className}
            rewind={rewind}
            autoplay={modules?.includes("Autoplay") ? autoplay : false}
            onSwiper={(swiper) => setSwiper(swiper)}
            onSlideChange={({ activeIndex }) => {
              setCurrentSlide(activeIndex);
            }}
            modules={[
              ...getSwiperModules({
                modules: modules,
                available_modules: available_modules,
              }),
            ]}
            navigation={modules?.includes("Navigation") ? navigation : false}
            pagination={modules?.includes("Pagination") ? pagination : false}
            slidesPerView={slidesPerView}
            spaceBetween={spaceBetween}
            breakpoints={breakpoints}
          >
            {slides?.map((banner) => (
              <SwiperSlide key={banner.id} className="!w-full !h-full">
                <Slide
                  {...banner}
                  imagePriority={imagePriority}
                  imageLoading={imageLoading}
                >
                  <FeaturedSlideContent {...banner} />
                </Slide>
              </SwiperSlide>
            ))}
            {num_of_slides > 1 &&
              renderBannerPagination({
                current_slide: currentSlide,
                num_of_slides: num_of_slides,
                func: {
                  next: handleNextSlide,
                  prev: handlePrevSlide,
                  slideTo: handleSlideTo,
                },
              })}
          </Slider>
        </>
      );
  }
};

const HeroSlideContent = ({ title, subtitle, text, button }) => {
  return (
    <div className="absolute max-md:pl-[1rem] md:pl-[5.25rem] h-full flex flex-col  justify-center z-[5] left-0 top-0 max-sm:translate-y-[7.5rem]">
      {title && (
        <h1
          className="text-white text-[1.479rem] font-light leading-[100%]"
          style={{ textShadow: "black 1px 0 10px, black -1px 0 10px" }}
        >
          {title}
        </h1>
      )}
      {subtitle && (
        <h2
          className="text-white mt-3 text-[2.9rem] font-semibold leading-[100%]"
          style={{ textShadow: "black 1px 0 10px, black -1px 0 10px" }}
        >
          {subtitle}
        </h2>
      )}
      {text && (
        <p
          className="text-white font-light text-base"
          style={{ textShadow: "black 1px 0 10px, black -1px 0 10px" }}
        >
          {text}
        </p>
      )}
      {button && (
        <Button className="mt-[1rem] max-sm:px-2 max-sm:py-2">{button}</Button>
      )}
    </div>
  );
};

const FeaturedSlideContent = ({ title, subtitle, text, button }) => {
  return (
    <div className="absolute max-md:pl-[1rem] md:pl-[5.25rem] max-sm:left-0 max-sm:w-fit sm:pr-[7.25rem] h-full flex flex-col my-auto justify-center z-[5] right-0 top-0 max-sm:translate-y-[7rem]">
      {title && (
        <h2
          className="text-white text-[1.479rem] font-light leading-[100%]"
          style={{ textShadow: "black 1px 0 10px, black -1px 0 10px" }}
        >
          {title}
        </h2>
      )}
      {subtitle && (
        <h3
          className="text-white mt-3 text-[1.479rem] font-semibold leading-[100%]"
          style={{ textShadow: "black 0.1em 0 1em, black -0.1em 0 1em" }}
        >
          {subtitle}
        </h3>
      )}
      {text && (
        <p
          className="text-white font-light text-base"
          style={{ textShadow: "black 1px 0 10px, black -1px 0 10px" }}
        >
          {text}
        </p>
      )}
      {button && (
        <Button className="mt-[1rem] max-sm:px-2 max-sm:py-2">{button}</Button>
      )}
    </div>
  );
};
