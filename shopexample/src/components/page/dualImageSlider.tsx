"use client";

import Container from "@/components/container";
import { Api } from "@/services/api";
import { DualImageSliderType } from "@/types/page/dualImageSlider";
import Image from "next/image";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/scrollbar";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import DoubleButton from "../doubleButton";

export default function DualImageSlider() {
  const [data, setData] = useState<DualImageSliderType[]>([]);
  const [bg, setBg] = useState<string>("");

  const [progress, setProgress] = useState(0);
  const [numSlide, setNumSlide] = useState(3001);

  useEffect(() => {
    async function fetchApi() {
      const data = await Api("dualImageSlider");

      setData(data ? data[0].items : []);
    }
    fetchApi();
  }, []);

  useEffect(() => {
    async function fetchApi() {
      const data = await Api("bg");

      setBg(data ? data[0].items[0].src : [{ src: "" }]);
    }
    fetchApi();
  }, []);

  const AUTOPLAY_DELAY = 3000;
  const ANIMATION_FPS = 10;

  const handleSlideChange = (swiper: any) => {
    setNumSlide(3001 + swiper.realIndex);
  };

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += 100 / (AUTOPLAY_DELAY / (1000 / ANIMATION_FPS));
      if (current >= 100) current = 100;
      setProgress(current);
    }, 1000 / ANIMATION_FPS);
    setProgress(0);
    return () => clearInterval(interval);
  }, [numSlide]);

  return (
    <Container className="!w-full h-fit max-w-4xl mx-auto !select-none flex justify-around mt-16">
      <div className="flex flex-col !justify-center !items-center h-[600px]">
        {data.map(
          (item) =>
            numSlide == item.id && (
              <div
                key={item.id}
                className="flex items-center h-full justify-center text-3xl font-bold flex-col gap-y-4 relative"
              >
                <h5 className="text-lg uppercase font-extralight">
                  Comfort by Nature
                </h5>
                <div
                  style={{ backgroundImage: `url(${bg})` }}
                  className="bg-no-repeat bg-center bg-contain"
                >
                  <Image
                    src={item.images.left}
                    alt={item.title}
                    width={600}
                    height={600}
                  />
                </div>
                <div className="absolute right-0 left-0 bottom-0 flex flex-col items-center gap-4">
                  <span className="text-xl text-stone-700 font-semibold">
                    {item.title}
                  </span>
                  <p className="text-sm text-stone-700 font-medium">
                    {item.description}
                  </p>
                  <DoubleButton
                    mode="lineDark"
                    display="row"
                    hrefMen={item.hrefMen}
                    hrefWomen={item.hrefWomen}
                    className="gap-2"
                  />
                </div>
              </div>
            )
        )}
      </div>
      <div className="relative">
        <Swiper
          onSlideChange={handleSlideChange}
          allowTouchMove={false}
          simulateTouch={false}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination]}
          className="mySwiper !w-[600px] !h-[600px] rounded-xl overflow-hidden "
        >
          {data.map((item) => (
            <SwiperSlide
              key={item.id}
              className="flex items-center h-full justify-center text-3xl font-bold"
            >
              <Image
                src={item.images.right}
                alt={item.title}
                width={600}
                height={600}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="absolute bottom-4 left-0 right-0 w-11/12 h-1 bg-gray-300 overflow-hidden z-50 mx-auto rounded flex">
          {data.map((item) => (
            <div className="h-full w-1/3" key={item.id}>
              {item.id == numSlide && (
                <div
                  className="bg-gray-500 h-full transition-all ease-in-out"
                  style={{ width: `${progress}%` }}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
