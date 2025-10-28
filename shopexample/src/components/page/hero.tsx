import Container from "@/components/container";
import DoubleButton from "@/components/doubleButton";
import { Api } from "@/services/api";
import { HeroData } from "@/types/page/hero";

export default async function Hero() {
  const data = await Api("hero");
  const src: HeroData = await data[0];

  return (
    <Container className="px-2">
      <div className="w-full h-[550px] mt-2 rounded-2xl relative overflow-hidden">
        <video
          src={src.src}
          className="rounded-2xl absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover"
          autoPlay
          loop
          muted
        ></video>
        <div className="md:w-1/3 h-1/3 md:bottom-12 bottom-4 right-0 w-full absolute flex flex-col items-center justify-around">
          <p className="md:font-semibold font-extrabold text-popover md:text-white text-lg px-1 rounded-md bg-[#00000075] md:bg-[#00000000]">
            Our first-ever Waterproof Collection
          </p>
          <p className="md:font-semibold font-extrabold text-popover md:text-white text-2xl px-1 rounded-md bg-[#00000075] md:bg-[#00000000]">
            100% Chance of Comfort
          </p>
          <DoubleButton
            display="row"
            mode="default"
            className="justify-center items-center gap-4 w-1/3"
          />
        </div>
      </div>
    </Container>
  );
}
