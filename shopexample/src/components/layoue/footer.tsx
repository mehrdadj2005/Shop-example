import Container from "@/components/ui/container";
import { Api } from "@/services/api";
import { FooterData } from "@/types/layout/footer";
import Image from "next/image";

export default async function Footer() {
  const data = await Api("footer");
  const { item, icons, bottomItems }: FooterData = data[0].items[0];

  return (
    <footer className="bg-stone-800 !h-fit pt-8">
      <Container className="px-4 lg:px-8 xl:py-0 flex flex-col md:flex-row-reverse md:justify-around">
        <div className="flex flex-col">
          <h3 className="text-white text-2xl pb-8 text-center">
            Subscribe to our emails
          </h3>
          {item.map((items) => (
            <div
              key={items.title}
              className="flex flex-col border-b-2 mb-2 pb-2 pl-2"
            >
              <h5 className="text-white text-lg">{items.title}</h5>
              {items.items.map((tit: string) => (
                <span
                  className="text-white pl-4 mt-0.5 cursor-pointer hover:underline !select-none"
                  key={tit}
                >
                  {tit}
                </span>
              ))}
            </div>
          ))}
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col items-center gap-4 py-2 border-b-2 mb-2 pb-4">
            <h5 className="text-white text-lg">{icons.title}</h5>
            <div className="flex gap-1 xs:gap-2">
              {icons.srcs.map((item) => (
                <Image
                  key={item}
                  src={item}
                  alt={item}
                  width={50}
                  height={50}
                  className="cursor-pointer hover:bg-white h-fit rounded-full transition-all duration-300"
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col text-white gap-2 items-center pb-6">
            {bottomItems.map((item) => (
              <span
                className="cursor-pointer hover:underline !select-none"
                key={item}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
