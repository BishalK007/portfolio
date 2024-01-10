import React, { useLayoutEffect, useRef, useState } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
// import SwiperClass from "swiper/types/swiper-class";
// import SwiperCore, { FreeMode, Navigation, Thumbs, Controller } from "swiper";


export default function AdSwiper() {
//   const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore>();
//   const [firstSwiper, setFirstSwiper] = useState<SwiperClass>();
//   const [secondSwiper, setSecondSwiper] = useState<SwiperClass>();
//   const swiper1Ref = useRef<React.MutableRefObject<null>>(null);
//   const swiper2Ref = useRef();

//   useLayoutEffect(() => {
//     if (swiper1Ref.current !== null) {
//       swiper1Ref.current.controller.control = swiper2Ref.current;
//     }
//   }, []);

  return (
    <div className="h-[550px] ">
      {/* <Swiper
        onSwiper={(swiper) => {
          if (swiper1Ref.current !== null) {
            swiper1Ref.current = swiper;
          }
        }}
        // preloadImages={false}
        controller={{ control: secondSwiper }}
        spaceBetween={10}
        slidesPerView={1}
        grabCursor={true}
        navigation={true}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs, Controller]}
        className="w-[848px] h-[454px] rounded-xl"
      >
        <SwiperSlide>
          <img src="https://a.d-cd.net/9634e6s-960.jpg" />
        </SwiperSlide>

        <SwiperSlide>
          <img src="https://a.d-cd.net/a5634e6s-960.jpg" />
        </SwiperSlide>

        <SwiperSlide>
          <img src="https://a.d-cd.net/13634e6s-960.jpg" />
        </SwiperSlide>

        <SwiperSlide>
          <img src="https://a.d-cd.net/e3634e6s-960.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="http://carsot.com/images/daewoo-nubira-ii-1999-2003-sedan-interior-2.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://www.4tuning.ro/images/elemente-caroserie-din-dezmembrari-daewoo-nubira/elemente-caroserie-din-dezmembrari-daewoo-nubira-8fd6c1475ef586f2cf-1100-615-2-85-1.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://a.d-cd.net/5283186s-480.jpg" className="w-full" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://a.d-cd.net/JCAAAgGDAuA-960.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://a.d-cd.net/a5634e6s-960.jpg" />
        </SwiperSlide>
      </Swiper>
      <Swiper
        controller={{ control: firstSwiper }}
        loop={false}
        spaceBetween={10}
        slidesPerView={8}
        watchSlidesProgress
        touchRatio={0.2}
        // preloadImages={false}
        // lazy
        slideToClickedSlide={true}
        onSwiper={setThumbsSwiper}
        modules={[Navigation, Thumbs, Controller]}
        className="h-[100.4px] w-[848px] mt-[20px] rounded-xl"
      >
        <SwiperSlide className="w-[70px]">
          <img
            src="https://a.d-cd.net/9634e6s-960.jpg"
            className=" rounded-xl  h-[70px]"
          />
        </SwiperSlide>
        <SwiperSlide className="w-[70px]">
          <img
            src="https://a.d-cd.net/a5634e6s-960.jpg"
            className=" rounded-xl  h-[70px]"
          />
        </SwiperSlide>
        <SwiperSlide className="w-[70px]">
          <img
            src="https://a.d-cd.net/13634e6s-960.jpg"
            className=" rounded-xl  h-[70px]"
          />
        </SwiperSlide>
        <SwiperSlide className="w-[70px]">
          <img
            src="https://a.d-cd.net/e3634e6s-960.jpg"
            className=" rounded-xl  h-[70px]"
          />
        </SwiperSlide>
        <SwiperSlide className="w-[70px]">
          <img
            src="http://carsot.com/images/daewoo-nubira-ii-1999-2003-sedan-interior-2.jpg"
            className=" rounded-xl  h-[70px]"
          />
        </SwiperSlide>

        <SwiperSlide className="w-[70px]">
          <img
            className=" rounded-xl  h-[70px]"
            src="https://www.4tuning.ro/images/elemente-caroserie-din-dezmembrari-daewoo-nubira/elemente-caroserie-din-dezmembrari-daewoo-nubira-8fd6c1475ef586f2cf-1100-615-2-85-1.jpg"
          />
        </SwiperSlide>
        <SwiperSlide className="w-[70px]">
          <img
            className=" rounded-xl  h-[70px]"
            src="https://a.d-cd.net/5283186s-480.jpg"
          />
        </SwiperSlide>
        <SwiperSlide className="w-[70px]">
          <img
            className=" rounded-xl  h-[70px]"
            src="https://a.d-cd.net/JCAAAgGDAuA-960.jpg"
          />
        </SwiperSlide>
        <SwiperSlide className="w-[70px]">
          <img
            src="https://a.d-cd.net/a5634e6s-960.jpg"
            className=" rounded-xl  h-[70px]"
          />
        </SwiperSlide>
      </Swiper> */}
    </div>
  );
}