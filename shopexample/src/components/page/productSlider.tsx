"use client";

import ProductCard from "@/components/ui/card";
import { Api } from "@/services/api";
import { ProductCardType } from "@/types/ui/productCard";
import { useEffect, useState } from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Container from "../ui/container";

export default function ProductSlider() {
  const [data, setdata] = useState<ProductCardType[]>([]);
  useEffect(() => {
    async function getData() {
      const items = await Api("newArrivals");
      if (items) {
        setdata(await items[0].items);
      }
    }
    getData();
  }, []);

  return (
    <Container className="py-4 !box-border">
      <Swiper
        slidesPerView={window.innerWidth > 768 ? 4 : 1}
        modules={[Pagination]}
        className="mySwiper !max-w-full !h-full !px-4 flex !select-none"
      >
        {data.map((item) => (
          <SwiperSlide key={item.id} className="!w-full md:!w-1/4 px-1">
            <ProductCard item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
}
