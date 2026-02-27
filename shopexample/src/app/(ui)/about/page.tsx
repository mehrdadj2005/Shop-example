import Footer from "@/components/layoue/footer";
import Header from "@/components/layoue/header";
import Hero from "@/components/page/hero";
import Container from "@/components/ui/container";
import { Api } from "@/services/api";
import { AboutData } from "@/types/about/about";
import Image from "next/image";

export default async function About() {
  const allData = await Api("about");
  const data: AboutData = allData[0].items[0];
  const { bigPicturs, items, firstText } = data;
  const [item1, item2, item3] = items;

  return (
    <>
      <Header />
      <Hero />
      <Container className="px-4 xl:px-8 xl:py-0">
        <div className="w-full">
          <h3 className="h-fit text-lg md:text-2xl text-stone-600 font-semibold w-11/12 md:w-3/5 mx-auto text-center py-10 md:py-20 ">
            {firstText}
          </h3>
        </div>
        {/*  */}
        <div className=" mb-10">
          <div className="flex md:flex-row flex-col items-center justify-between border-popover border-2">
            <Image src={item1.src} alt={item1.src} width={700} height={300} />
            <p className="w-full md:w-1/2 text-lg pb-20 text-stone-900 md:text-2xl/loose text-center font-semibold px-8">
              {item1.text}
            </p>
          </div>
          {/*  */}
          <div className="flex md:flex-row flex-col items-center justify-between bg-popover">
            <Image
              src={item2.src}
              alt={item2.src}
              width={700}
              height={300}
              className="flex md:hidden"
            />
            <p className="w-full md:w-1/2 text-lg pb-20 text-stone-900 md:text-2xl/loose text-center font-semibold px-8">
              {item2.text}
            </p>
            <Image
              src={item2.src}
              alt={item2.src}
              width={700}
              height={300}
              className="hidden md:flex"
            />
          </div>
          {/*  */}
          <div className="flex md:flex-row flex-col items-center justify-between border-popover border-2">
            <Image src={item3.src} alt={item3.src} width={700} height={300} />
            <p className="w-full md:w-1/2 text-lg pb-20 text-stone-900 md:text-2xl/loose text-center font-semibold px-8">
              {item3.text}
            </p>
          </div>
        </div>
        {/*  */}
        <div>
          <div className="flex">
            <Image
              src={bigPicturs.src}
              alt={bigPicturs.src}
              width={450}
              height={500}
              className="w-full md:w-1/2 h-fit"
            />
            <Image
              src={bigPicturs.src}
              alt={bigPicturs.src}
              width={450}
              height={500}
              className="w-1/2 h-fit hidden md:flex"
            />
          </div>
          <p className="w-full md:w-2/3 text-lg py-10 text-stone-900 md:text-2xl/loose text-center font-semibold mx-auto">
            {bigPicturs.text}
          </p>
        </div>
      </Container>
      <Footer />
    </>
  );
}
