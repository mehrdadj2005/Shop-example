import { TreeDasherItems, TreeDasherTitle } from "@/types/page/treeDasherType";

import Container from "@/components/ui/container";
import { Api } from "@/services/api";
import DoubleButton from "../ui/doubleButton";

export default async function TreeDasher() {
  const data = await Api("treeDasher");
  const items: TreeDasherItems = await data[0].items;
  const title: TreeDasherTitle = await data[0].title;

  return (
    <Container className="px-4 lg:px-2 flex flex-col gap-8 ">
      <div className="w-full mx-auto">
        {title.map((item) => (
          <div
            key={item.title}
            className="flex flex-col justify-center items-center gap-4"
          >
            <h3 className="text-4xl md:text-6xl font-light">{item.title}</h3>
            <p>{item.description}</p>
            <DoubleButton
              mode={item.buttons.mode}
              hrefMen={item.buttons.hrefMen}
              hrefWomen={item.buttons.hrefWomen}
              length={item.buttons.buttonLength}
              className="gap-2"
            />
          </div>
        ))}
      </div>
      <div className="w-full flex flex-col md:flex-row gap-4 md:gap-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="w-full md:w-1/3 h-[600px] md:h-[400px] lg:h-[90vh] !max-h-[625px] bg-center bg-cover rounded-3xl flex justify-center items-center flex-col box-border relative transition-transform duration-500 md:hover:scale-101"
            style={{ backgroundImage: `url(${item.src})` }}
          >
            <h4 className="text-white text-4xl md:text-2xl lg:text-3xl text-center">
              {item.title}
            </h4>
            <p className="text-white text-center text-xs md:text-xs lg:text-base mt-4">
              {item.description}
            </p>
            <DoubleButton
              className="absolute left-0 right-0 bottom-4 gap-4 w-full px-4"
              mode={item.mode}
              length={item.buttonLength}
            />
          </div>
        ))}
      </div>
    </Container>
  );
}
