import Footer from "@/components/layoue/footer";
import Header from "@/components/layoue/header";
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
      {/* <Alert
        variant="destructive"
        className="absolute z-50 w-fit right-8 top-20"
      >
        <AlertCircleIcon />
        <AlertTitle>You are not signed in</AlertTitle>
      </Alert> */}
      <Header />
      <Hero />
      <NavPhoto />
      <DualImageSlider />
      <WaterproofPhotos />
      <ShoesSlider />
      <TreeDasher />
      <ProductSlider />
      <Footer />
    </>
  );
}
