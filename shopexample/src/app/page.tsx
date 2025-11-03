import DualImageSlider from "@/components/page/dualImageSlider";
import Hero from "@/components/page/hero";
import NavPhoto from "@/components/page/navPhoto";

export default function Home() {
  return (
    <>
      <Hero />
      <NavPhoto />
      <DualImageSlider />
      <div className="w-full text-2xl h-92"></div>
    </>
  );
}
