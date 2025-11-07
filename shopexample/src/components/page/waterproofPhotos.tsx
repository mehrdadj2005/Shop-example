import Container from "@/components/container";
import DoubleButton from "@/components/doubleButton";
import { Api } from "@/services/api";
import { WaterproofPhotosType } from "@/types/page/waterproofPhotosType";
import Image from "next/image";

export default async function WaterproofPhotos() {
  const data = await Api("waterproofPhotos");
  const { left, right, video }: WaterproofPhotosType = await data[0].items[0];

  return (
    <Container className="px-4 lx:px-8 lx:py-0 mt-16">
      <h3 className="text-lg font-normal uppercase p-4 text-center">
        MORE ADVENTURE-READY STYLES
      </h3>
      <div className="flex flex-col md:flex-row md:max-h-[1090px] gap-2">
        {/* left */}
        <div className="md:w-1/2 h-full flex flex-col gap-2">
          <div className="w-full h-3/4 relative">
            <Image
              src={left.top}
              alt=""
              width={600}
              height={600}
              className="w-full h-full rounded-2xl"
            />
            <div className="absolute left-0 right-0 top-1/3 w-full md:w-1/2 mx-auto flex gap-2 md:gap-4 flex-col items-center">
              <span className="text-white text-center text-3xl md:text-3xl">
                The Explore
                <br /> Collection
              </span>
              <h2 className="text-white text-center text-xs md:text-xs">
                shoes that are comfortable in every situation-trail-
                <br />
                tested, city-approved, and wildly stylish.
              </h2>
              <DoubleButton mode="lineLight" className="gap-4" />
            </div>
          </div>
          <Image
            src={left.bottom}
            alt=""
            width={600}
            height={600}
            className="w-full h-1/4 hidden md:flex rounded-2xl"
          />
        </div>
        {/* right */}
        <div className="md:w-1/2 h-full flex flex-col gap-2">
          <video
            src={video}
            autoPlay
            loop
            muted
            className="w-full h-1/4 rounded-2xl"
          ></video>
          <div className="flex h-3/4 gap-2">
            <div className="h-full w-1/2">
              <Image
                src={right.left}
                alt=""
                width={600}
                height={600}
                className="w-full h-full rounded-2xl"
              />
            </div>
            <div className=" w-1/2 h-full flex flex-col gap-2">
              <div className="h-1/2 w-full">
                <Image
                  src={right.top}
                  alt=""
                  width={600}
                  height={600}
                  className="w-full h-full rounded-2xl"
                />
              </div>
              <div className="h-1/2 w-full">
                <Image
                  src={right.bottom}
                  alt=""
                  width={600}
                  height={600}
                  className="w-full h-full rounded-2xl"
                />
              </div>
            </div>
          </div>
          <div className="h-full w-full flex md:hidden">
            <Image
              src={left.bottom}
              alt=""
              width={600}
              height={600}
              className="w-full h-full rounded-2xl"
            />
          </div>
        </div>
      </div>
    </Container>
  );
}
