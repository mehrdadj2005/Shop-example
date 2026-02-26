import Container from "@/components/ui/container";
import { Api } from "@/services/api";

import Header from "@/components/layoue/header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default async function Help() {
  const data = await Api("FrequentlyAskedQuestions");

  return (
    <>
      <Header />
      <Container className="px-4 xl:px-8 xl:py-0 mt-24 mb-4">
        <Accordion
          type="single"
          collapsible
          defaultValue="shipping"
          className="w-full md:w-1/2 mx-auto flex flex-col gap-2 md:gap-1"
        >
          {data[0].items.map((item) => (
            <AccordionItem
              key={item.question}
              value={item.question}
              className="w-full border-b border-stone-500 rounded-l-2xl px-4"
            >
              <AccordionTrigger className="!no-underline hover:cursor-pointer">
                {item.question}
              </AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </>
  );
}
