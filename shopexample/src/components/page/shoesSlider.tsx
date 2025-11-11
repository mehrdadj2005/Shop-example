"use client";
import { ShoesSliderType } from "@/types/page/shoesSliderType";

import Container from "@/components/ui/container";
import { Api } from "@/services/api";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function ShoesSlider() {
  const swiperRef = useRef<any>(null);
  const [data, setData] = useState<ShoesSliderType[]>([]);
  const [bg, setBg] = useState<string>("");
  const [cursor, setCursor] = useState({
    x: 0,
    y: 0,
    side: "right" as "left" | "right",
  });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    async function fetchApi() {
      const data = await Api("shoesSlider");
      setData(data ? data[0].items : []);
    }
    fetchApi();
    swiperRef.current.slideNext();
    swiperRef.current.slidePrev();
  }, []);

  useEffect(() => {
    async function fetchApi() {
      const data = await Api("bg");

      setBg(data ? data[0].items[0].src : [{ src: "" }]);
    }
    fetchApi();
  }, []);

  const containerRef = useRef<HTMLInputElement>(null);
  const handleMove = (e: any) => {
    const x = e.pageX;
    const y = e.pageY - 3015;
    const side = x < window.innerWidth / 2 ? "left" : "right";
    setCursor({ x: x, y: y, side: side });
    setVisible(true);
  };

  const handleClick = () => {
    if (window.innerWidth < 768) return;
    if (!swiperRef.current) return;
    if (cursor.side === "left") swiperRef.current.slidePrev();
    else swiperRef.current.slideNext();
  };

  return (
    <Container className="px-0 !cursor-none relative w-full mx-auto select-none mt-12">
      <div
        onMouseMove={handleMove}
        onMouseLeave={() => setVisible(false)}
        ref={containerRef}
        onClick={handleClick}
      >
        <h3 className=" text-2xl font-light uppercase p-4 text-center absolute left-0 right-0 md:top-8 z-30">
          other shoes
        </h3>
        <Swiper
          modules={[Navigation]}
          loop={true}
          centeredSlides={true}
          slidesPerView={1.5}
          spaceBetween={20}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          className="rounded-2xl bg-no-repeat bg-center bg-size-[600px] md:bg-size-[800px] md:!h-[600px] lg:!h-[700px]"
          style={{ backgroundImage: `url(${bg})` }}
        >
          {data.map((item) => (
            <SwiperSlide key={item.id}>
              <Image
                src={item.src}
                alt={`shoe-${item.id}`}
                className="rounded-2xl object-cover w-full select-none"
                width={300}
                height={300}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {visible && window.innerWidth > 768 && (
        <motion.div
          style={{
            left: cursor.x,
            top: cursor.y,
            transform: "translate(-50%, -50%)",
          }}
          className="absolute pointer-events-none z-50 w-24 h-24 rounded-full 
                     backdrop-blur-md bg-white/20 border border-black/30 
                     flex items-center justify-center transition-transform duration-150"
        >
          {cursor.side === "left" ? (
            <ChevronLeft className="w-8 h-8 text-black" />
          ) : (
            <ChevronRight className="w-8 h-8 text-black" />
          )}
        </motion.div>
      )}
    </Container>
  );
}
