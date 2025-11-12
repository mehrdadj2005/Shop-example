import DualImageSlider from "@/components/page/dualImageSlider";
import Hero from "@/components/page/hero";
import NavPhoto from "@/components/page/navPhoto";
import ProductSlider from "@/components/page/productSlider";
import ShoesSlider from "@/components/page/shoesSlider";
import TreeDasher from "@/components/page/treeDasher";
import WaterproofPhotos from "@/components/page/waterproofPhotos";

export default function Home() {
  return (
    <>
      <Hero />
      <NavPhoto />
      <DualImageSlider />
      <WaterproofPhotos />
      <ShoesSlider />
      <TreeDasher />
      <ProductSlider />
    </>
  );
}
