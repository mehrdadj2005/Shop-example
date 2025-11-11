"use client";

import Container from "@/components/ui/container";
import { Api } from "@/services/api";
import { DualImageSliderType } from "@/types/page/dualImageSlider";
import Image from "next/image";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/scrollbar";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import DoubleButton from "../ui/doubleButton";

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
    <Container className="!w-full h-fit max-w-4xl mx-auto !select-none flex flex-col-reverse items-center md:flex-row justify-around mt-16">
      <div className="relative flex flex-col !justify-center !items-center h-96 xs:h-96 md:w-80 md:h-80 lg:w-[500px] lg:h-[500px] xl:w-[600px] xl:h-[600px]">
        <h5 className="text-lg font-normal uppercase absolute top-8 md:top-2">
          Comfort by Nature
        </h5>
        {data.map(
          (item) =>
            numSlide == item.id && (
              <div
                key={item.id}
                className="relative flex flex-col items-center justify-center h-full text-3xl font-bold gap-y-4"
              >
                <div
                  style={{ backgroundImage: `url(${bg})` }}
                  className="bg-no-repeat bg-center bg-contain h-[300px] w-[300px] xs:w-80 xs:h-80 md:w-[250px] md:h-[250px] lg:!w-[400px] lg:!h-[400px] xl:!h-[500px] xl:!w-[500px] flex justify-center items-center"
                >
                  <Image
                    src={item.images.left}
                    alt={item.title}
                    width={600}
                    height={600}
                    className="absolute top-0"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center gap-4">
                  <span className="text-xl font-semibold text-stone-700">
                    {item.title}
                  </span>
                  <p className="text-sm font-medium text-center text-stone-700">
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
      <div className="relative w-[300px] h-[300px] xs:w-[450px] xs:h-[450px] lg:w-[500px] lg:h-[500px] md:w-80 md:h-80 xl:w-[600px] xl:h-[600px]">
        <Swiper
          onSlideChange={handleSlideChange}
          allowTouchMove={false}
          simulateTouch={false}
          pagination={false}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Pagination]}
          className="mySwiper !w-full !h-full rounded-xl overflow-hidden "
        >
          {data.map((item) => (
            <SwiperSlide
              key={item.id}
              className="flex items-center justify-center h-full text-3xl font-bold"
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
        <div className="absolute left-0 right-0 z-50 flex w-11/12 h-1 mx-auto overflow-hidden bg-gray-300 rounded bottom-4">
          {data.map((item) => (
            <div className="w-1/3 h-full" key={item.id}>
              {item.id == numSlide && (
                <div
                  className="h-full transition-all ease-in-out bg-gray-500"
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
