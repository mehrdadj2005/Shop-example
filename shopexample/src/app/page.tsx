import DualImageSlider from "@/components/page/dualImageSlider";
import Hero from "@/components/page/hero";
import NavPhoto from "@/components/page/navPhoto";
import WaterproofPhotos from "@/components/page/waterproofPhotos";

export default function Home() {
  return (
    <>
      <Hero />
      <NavPhoto />
      <DualImageSlider />
      <WaterproofPhotos />
      <div className="w-full h-92 bg-blue-200"></div>
    </>
  );
}
