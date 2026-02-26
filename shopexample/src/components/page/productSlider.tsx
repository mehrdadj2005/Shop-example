"use client";

import ProductCard from "@/components/ui/card";
import { Api } from "@/services/api";
import { ProductCardType } from "@/types/ui/productCard";
import { useEffect, useState } from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function ProductSlider() {
  const [data, setdata] = useState<ProductCardType[]>([]);

  useEffect(() => {
    async function getData() {
      const items = await Api("allProduct");
      if (items) {
        setdata(await items[0].items[0].men);
      }
    }
    getData();
  }, []);

  return (
    <div className="py-4 !box-border">
      <Swiper
        slidesPerView={window.innerWidth > 768 ? 4 : 1}
        modules={[Pagination]}
        className="mySwiper !min-w-full !h-full !flex !select-none !px-4 !w-full"
      >
        {data.map((item) => (
          <SwiperSlide key={item.id} className="!w-full px-1 md:!w-1/4">
            <ProductCard item={item} variant="hover" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
