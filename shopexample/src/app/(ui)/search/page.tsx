import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Api } from "@/services/api";
import { Icons } from "@/types/ui/icons";
import Image from "next/image";

export default async function SearchBox() {
  const data = await Api("icons");
  const icons: Icons = await data[0].items[0];
  return (
    <>
      <Container className="px-4 xl:px-8 xl:py-0">
        <div className="fixed top-0 left-0 right-0 bg-primary p-2 px-4 border shadow-2xl rounded-b-2xl">
          <div className="relative md:max-w-8/12 mx-auto">
            <Input type="search" className="px-2 border-2 border-stone-400" />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              // onClick={() => setShow(!show)}
              className="absolute right-3 top-1/2 -translate-y-1/2 !bg-[#00000000]"
            >
              <Image
                src={icons.search}
                alt="search"
                width={14}
                height={14}
                className="w-8 h-8 rounded p-1"
              />
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
}
