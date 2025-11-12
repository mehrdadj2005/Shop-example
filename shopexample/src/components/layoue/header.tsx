"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";
import { Api } from "@/services/api";
import { HeaderData } from "@/types/layout/header";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Sheet, SheetContent } from "../ui/sheet";

export default function Header() {
  const [openMenu, setOpenMenu] = useState<"women" | "men" | null>(null);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [skeleton, setSkeleton] = useState(true);
  const [info, setInfo] = useState<HeaderData[]>([]);
  const [openDerawer, setOpenDerawer] = useState<boolean>(false);
  const [icons, setIcons] = useState<Icons>({});

  useEffect(() => {
    async function getApi() {
      const data = await Api("header");
      setInfo(data || []);
    }
    getApi();
  }, []);

  useEffect(() => {
    async function getApi() {
      const data = await Api("icons");
      setIcons(data[0].items[0] || "");
    }
    getApi();
  }, []);

  let items, logo, images;
  if (info[0]) {
    const { item } = info[0];
    items = item.items;
    logo = item.logo;
    images = item.images;
  }

  const accordionTit = {
    item1: items?.items1[0],
    item2: items?.items2[0],
    item3: items?.items3[0],
  };

  useEffect(() => {
    const handleScroll = () => {
      setOpenMenu(null);
      if (window.scrollY > lastScrollY) {
        setShowHeader(false);
      } else setShowHeader(true);
      setLastScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    setSkeleton(true);

    setTimeout(() => {
      setSkeleton(false);
    }, 700);
  }, [openMenu]);

  const isOpen = !!openMenu;

  return (
    <>
      {/* MENU */}
      <div
        className={`hidden md:flex flex-col fixed top-0 left-0 right-0 h-screen transform origin-top transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] z-40  ${
          isOpen
            ? "scale-y-100 opacity-100"
            : "scale-y-0 opacity-0 pointer-events-none"
        }`}
      >
        {/* top section*/}
        <div className="h-3/4 w-full flex felx-col items-center justify-center text-3xl font-bold bg-primary text-popover">
          <Container className=" mt-12 px-4 xl:px-8 xl:py-0">
            {openMenu === "women" && (
              <div
                className="flex w-full
            "
              >
                <div className=" w-1/2 flex">
                  <div className="flex flex-col text-stone-800  mr-16 gap-y-5">
                    {items?.items1.map((item) =>
                      skeleton ? (
                        <Skeleton key={item} className="w-32 h-4 mb-4" />
                      ) : (
                        <Link
                          href={"/"}
                          key={item}
                          className="text-base font-medium hover:underline cursor-pointer"
                        >
                          {item}
                        </Link>
                      )
                    )}
                  </div>
                  <div className="flex flex-col [&>*:first-child]:text-stone-800  mr-16 gap-y-2">
                    {items?.items2.map((item) =>
                      skeleton ? (
                        <Skeleton key={item} className="w-32 h-4 mb-4" />
                      ) : (
                        <Link
                          href={"/"}
                          key={item}
                          className="text-stone-400 text-base font-medium hover:underline cursor-pointer"
                        >
                          {item}
                        </Link>
                      )
                    )}
                  </div>
                  <div className="flex flex-col [&>*:first-child]:text-stone-800 mr-16 gap-y-2">
                    {items?.items3.map((item) =>
                      skeleton ? (
                        <Skeleton key={item} className="w-32 h-4 mb-4" />
                      ) : (
                        <Link
                          href={"/"}
                          key={item}
                          className="text-stone-400 text-base font-medium hover:underline cursor-pointer"
                        >
                          {item}
                        </Link>
                      )
                    )}
                  </div>
                </div>
                <div className="flex w-1/2 h-80 gap-8 justify-end">
                  <div className="w-1/3 h-full bg-cover bg-no-repeat items-start justify-end flex flex-col customCard">
                    {skeleton ? (
                      <Skeleton className="h-full w-full rounded-xl absolute" />
                    ) : (
                      <div
                        style={{ backgroundImage: `url(${images?.left}) ` }}
                        className="w-full h-full bg-cover bg-no-repeat items-start justify-end flex flex-col rounded-2xl"
                      >
                        <span className="text-lg pl-4 mb-4 text-stone-100">
                          WOOL CRUISER COLLECTION
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="w-1/3 flex gap-4 flex-col">
                    <div className="h-full bg-cover bg-no-repeat items-start justify-end flex flex-col customCard">
                      {skeleton ? (
                        <Skeleton className="h-full w-full rounded-xl absolute" />
                      ) : (
                        <div
                          style={{ backgroundImage: `url(${images?.top}) ` }}
                          className="rounded-2xl h-full bg-cover bg-no-repeat items-start justify-end flex flex-col"
                        >
                          <span className="text-lg pl-4 mb-4 text-stone-100">
                            ALL NEW WATERPROOF COLLECTION
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="h-full bg-cover bg-no-repeat items-start justify-end flex flex-col customCard">
                      {skeleton ? (
                        <Skeleton className="h-full w-full rounded-xl absolute" />
                      ) : (
                        <div
                          style={{ backgroundImage: `url(${images?.bottom}) ` }}
                          className="rounded-2xl h-full bg-cover bg-no-repeat items-start justify-end flex flex-col"
                        >
                          <span className="text-lg pl-4 mb-4 text-stone-100">
                            OUR CUSHIEST SLIPPER EVER
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {openMenu === "men" && (
              <div
                className="flex w-full
            "
              >
                <div className=" w-1/2 flex">
                  <div className="flex flex-col text-stone-800  mr-16 gap-y-5">
                    {items?.items1.map((item) =>
                      skeleton ? (
                        <Skeleton key={item} className="w-32 h-4 mb-4" />
                      ) : (
                        <Link
                          href={"/"}
                          key={item}
                          className="text-base font-medium hover:underline cursor-pointer"
                        >
                          {item}
                        </Link>
                      )
                    )}
                  </div>
                  <div className="flex flex-col [&>*:first-child]:text-stone-800  mr-16 gap-y-2">
                    {items?.items2.map((item) =>
                      skeleton ? (
                        <Skeleton key={item} className="w-32 h-4 mb-4" />
                      ) : (
                        <Link
                          href={"/"}
                          key={item}
                          className="text-stone-400 text-base font-medium hover:underline cursor-pointer"
                        >
                          {item}
                        </Link>
                      )
                    )}
                  </div>
                  <div className="flex flex-col [&>*:first-child]:text-stone-800 mr-16 gap-y-2">
                    {items?.items3.map((item) =>
                      skeleton ? (
                        <Skeleton key={item} className="w-32 h-4 mb-4" />
                      ) : (
                        <Link
                          href={"/"}
                          key={item}
                          className="text-stone-400 text-base font-medium hover:underline cursor-pointer"
                        >
                          {item}
                        </Link>
                      )
                    )}
                  </div>
                </div>
                <div className="flex w-1/2 h-80 gap-8 justify-end">
                  <div className="w-1/3 h-full bg-cover bg-no-repeat items-start justify-end flex flex-col customCard">
                    {skeleton ? (
                      <Skeleton className="h-full w-full rounded-xl absolute" />
                    ) : (
                      <div
                        style={{ backgroundImage: `url(${images?.left}) ` }}
                        className="w-full h-full bg-cover bg-no-repeat items-start justify-end flex flex-col rounded-2xl"
                      >
                        <span className="text-lg pl-4 mb-4 text-stone-100">
                          WOOL CRUISER COLLECTION
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="w-1/3 flex gap-2 flex-col">
                    <div className="h-full bg-cover bg-no-repeat items-start justify-end flex flex-col customCard">
                      {skeleton ? (
                        <Skeleton className="h-full w-full rounded-xl absolute" />
                      ) : (
                        <div
                          style={{ backgroundImage: `url(${images?.top}) ` }}
                          className="rounded-2xl h-full bg-cover bg-no-repeat items-start justify-end flex flex-col"
                        >
                          <span className="text-lg pl-4 mb-4 text-stone-100">
                            ALL NEW WATERPROOF COLLECTION
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="h-full bg-cover bg-no-repeat items-start justify-end flex flex-col customCard">
                      {skeleton ? (
                        <Skeleton className="h-full w-full rounded-xl absolute" />
                      ) : (
                        <div
                          style={{ backgroundImage: `url(${images?.bottom}) ` }}
                          className="rounded-2xl h-full bg-cover bg-no-repeat items-start justify-end flex flex-col"
                        >
                          <span className="text-lg pl-4 mb-4 text-stone-100">
                            OUR CUSHIEST SLIPPER EVER
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Container>
        </div>

        {/* down section*/}
        <div
          className="h-1/4 w-full flex items-center justify-center text-white font-bold "
          style={{ backgroundColor: "#00000025" }}
          // close modal by hover this box
          onMouseEnter={() => setOpenMenu(null)}
        ></div>
      </div>

      {/* MENU MOBILE */}
      <div
        className={`flex md:hidden fixed top-0 left-0 right-0 h-screen transform origin-top transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] z-50  ${
          isOpen
            ? "scale-y-100 opacity-100"
            : "scale-y-0 opacity-0 pointer-events-none"
        }`}
      >
        <Container className="pt-4 xl:px-8 xl:py-0 h-full w-full flex flex-col items-center justify-start text-3xl font-bold bg-primary text-popover z-50">
          {/* LOGO MOBILE */}
          <div className="px-4 w-full ">
            <div className="flex md:hidden justify-between bg-white px-4 py-3 rounded-2xl">
              <Link href={"/"} className="w-1/3 flex justify-start ">
                {
                  <Image
                    src={logo?.src || ""}
                    alt="logo"
                    width={60}
                    height={60}
                  />
                }
              </Link>
              <span className="w-1/3 flex justify-center text-popover">
                {openMenu == "men" ? "MEN" : "WOMEN"}
              </span>
              <div className="w-1/3 flex justify-end items-center">
                <Image
                  className="h-6 w-6"
                  onClick={() => setOpenMenu(null)}
                  src={icons.close}
                  alt="close"
                  width={40}
                  height={40}
                />
              </div>
            </div>
          </div>
          {openMenu === "women" && (
            <div className="flex flex-col w-full overflow-y-scroll items-start px-4">
              {/* ITEMS */}
              <div className="flex w-full justify-start items-start flex-col text-stone-800 px-4 mr-16 gap-y-5 mt-4">
                <Accordion
                  type="single"
                  collapsible
                  className="w-full"
                  defaultValue="item-1"
                >
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="font-bold">
                      {accordionTit.item1}
                    </AccordionTrigger>
                    {items?.items1.map((item) =>
                      skeleton ? (
                        <Skeleton key={item} className="w-32 h-4 mb-4" />
                      ) : (
                        <>
                          <AccordionContent className="flex flex-col gap-4 text-balance px-4 text-stone-500">
                            {item}
                          </AccordionContent>
                        </>
                      )
                    )}
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger className="font-bold">
                      {accordionTit.item2}
                    </AccordionTrigger>
                    {items?.items2.map((item) =>
                      skeleton ? (
                        <Skeleton key={item} className="w-32 h-4 mb-4" />
                      ) : (
                        <>
                          <AccordionContent className="flex flex-col gap-4 text-balance px-4 text-stone-500">
                            {item}
                          </AccordionContent>
                        </>
                      )
                    )}
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger className="font-bold">
                      {accordionTit.item3}
                    </AccordionTrigger>
                    {items?.items3.map((item) =>
                      skeleton ? (
                        <Skeleton key={item} className="w-32 h-4 mb-4" />
                      ) : (
                        <>
                          <AccordionContent className="flex flex-col gap-4 text-balance px-4 text-stone-500">
                            {item}
                          </AccordionContent>
                        </>
                      )
                    )}
                  </AccordionItem>
                </Accordion>
              </div>

              {/* PHOTOS */}
              <div className="w-full flex flex-col gap-1">
                <div className="bg-cover bg-no-repeat bg-center w-full h-48">
                  {skeleton ? (
                    <Skeleton className="h-full w-full rounded-xl absolute" />
                  ) : (
                    <div
                      style={{ backgroundImage: `url(${images?.left}) ` }}
                      className="w-full h-full bg-cover bg-no-repeat items-start justify-end flex flex-col rounded-2xl"
                    >
                      <span className="text-lg pl-4 mb-4 text-stone-100">
                        WOOL CRUISER COLLECTION
                      </span>
                    </div>
                  )}
                </div>

                <div className="bg-cover bg-no-repeat bg-center w-full h-48">
                  {skeleton ? (
                    <Skeleton className="h-full w-full rounded-xl absolute" />
                  ) : (
                    <div
                      style={{ backgroundImage: `url(${images?.top}) ` }}
                      className="rounded-2xl h-full bg-cover bg-no-repeat items-start justify-end flex flex-col"
                    >
                      <span className="text-lg pl-4 mb-4 text-stone-100">
                        ALL NEW WATERPROOF COLLECTION
                      </span>
                    </div>
                  )}
                </div>
                <div className="bg-cover bg-no-repeat bg-center w-full h-48">
                  {skeleton ? (
                    <Skeleton className="h-full w-full rounded-xl absolute" />
                  ) : (
                    <div
                      style={{ backgroundImage: `url(${images?.bottom}) ` }}
                      className="rounded-2xl h-full bg-cover bg-no-repeat items-start justify-end flex flex-col "
                    >
                      <span className="text-lg pl-4 mb-4 text-stone-100">
                        OUR CUSHIEST SLIPPER EVER
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          {openMenu === "men" && (
            <div className="flex flex-col w-full overflow-y-scroll items-start px-4">
              {/* ITEMS */}
              <div className="flex w-full justify-start items-start flex-col text-stone-800 px-4 mr-16 gap-y-5 mt-4">
                <Accordion
                  type="single"
                  collapsible
                  className="w-full"
                  defaultValue="item-1"
                >
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="font-bold">
                      {accordionTit.item1}
                    </AccordionTrigger>
                    {items?.items1.map((item) =>
                      skeleton ? (
                        <Skeleton key={item} className="w-32 h-4 mb-4" />
                      ) : (
                        <>
                          <AccordionContent className="flex flex-col gap-4 text-balance px-4 text-stone-500">
                            {item}
                          </AccordionContent>
                        </>
                      )
                    )}
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger className="font-bold">
                      {accordionTit.item2}
                    </AccordionTrigger>
                    {items?.items2.map((item) =>
                      skeleton ? (
                        <Skeleton key={item} className="w-32 h-4 mb-4" />
                      ) : (
                        <>
                          <AccordionContent className="flex flex-col gap-4 text-balance px-4 text-stone-500">
                            {item}
                          </AccordionContent>
                        </>
                      )
                    )}
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger className="font-bold">
                      {accordionTit.item3}
                    </AccordionTrigger>
                    {items?.items3.map((item) =>
                      skeleton ? (
                        <Skeleton key={item} className="w-32 h-4 mb-4" />
                      ) : (
                        <>
                          <AccordionContent className="flex flex-col gap-4 text-balance px-4 text-stone-500">
                            {item}
                          </AccordionContent>
                        </>
                      )
                    )}
                  </AccordionItem>
                </Accordion>
              </div>

              {/* PHOTOS */}
              <div className="w-full flex flex-col gap-1">
                <div className="bg-cover bg-no-repeat bg-center w-full h-48">
                  {skeleton ? (
                    <Skeleton className="h-full w-full rounded-xl absolute" />
                  ) : (
                    <div
                      style={{ backgroundImage: `url(${images?.left}) ` }}
                      className="w-full h-full bg-cover bg-no-repeat items-start justify-end flex flex-col rounded-2xl"
                    >
                      <span className="text-lg pl-4 mb-4 text-stone-100">
                        WOOL CRUISER COLLECTION
                      </span>
                    </div>
                  )}
                </div>

                <div className="bg-cover bg-no-repeat bg-center w-full h-48">
                  {skeleton ? (
                    <Skeleton className="h-full w-full rounded-xl absolute" />
                  ) : (
                    <div
                      style={{ backgroundImage: `url(${images?.top}) ` }}
                      className="rounded-2xl h-full bg-cover bg-no-repeat items-start justify-end flex flex-col"
                    >
                      <span className="text-lg pl-4 mb-4 text-stone-100">
                        ALL NEW WATERPROOF COLLECTION
                      </span>
                    </div>
                  )}
                </div>
                <div className="bg-cover bg-no-repeat bg-center w-full h-48">
                  {skeleton ? (
                    <Skeleton className="h-full w-full rounded-xl absolute" />
                  ) : (
                    <div
                      style={{ backgroundImage: `url(${images?.bottom}) ` }}
                      className="rounded-2xl h-full bg-cover bg-no-repeat items-start justify-end flex flex-col "
                    >
                      <span className="text-lg pl-4 mb-4 text-stone-100">
                        OUR CUSHIEST SLIPPER EVER
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </Container>
      </div>

      <Sheet open={openDerawer}>
        <SheetContent className="w-full" side="left">
          <Button onClick={() => setOpenDerawer(!openDerawer)}>❌</Button>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia non
          delectus commodi et. Facilis incidunt, repudiandae, tempora deleniti
          animi voluptatibus odio facere ea voluptate quisquam eligendi
          provident ducimus accusantium quam.
        </SheetContent>
      </Sheet>
      <div
        className={`fixed top-2 left-0 right-0 z-40 transition-transform duration-500  ${
          showHeader ? "translate-y-0" : "-translate-y-30"
        }`}
      >
        <Container className="px-4 py-2 xl:px-8xlpy-0">
          <div className="mx-auto flex items-center justify-between rounded-2xl rounded-b-none md:rounded-b-2xl py-2 px-4 md:py-2 md:px-6 bg-white">
            {/* LOGO */}
            <div className="w-1/3 justify-start hidden md:flex">
              <Link href={"/"}>
                {
                  <Image
                    src={logo?.src || ""}
                    alt="logo"
                    width={60}
                    height={60}
                  />
                }
              </Link>
            </div>
            {/* LOGO MOBILE */}
            <div className="w-1/3 justify-start flex md:hidden">
              <Link href={"/"}>
                {
                  <Image
                    src={logo?.src || ""}
                    alt="logo"
                    width={60}
                    height={60}
                  />
                }
              </Link>
            </div>

            {/* MENU BUTTON*/}
            <div id="nav" className="gap-4 w-1/3 justify-center hidden md:flex">
              <Button
                variant="ghost"
                className={`relative z-50 text-stone-800 hover:bg-stone-100 transition-all duration-350 ${
                  openMenu == "men" ? "bg-stone-100" : "bg-none"
                }`}
                onMouseEnter={() => setOpenMenu("men")}
              >
                MEN
              </Button>
              <Button
                variant="ghost"
                className={`relative z-50 text-stone-800 hover:bg-stone-100 transition-all duration-350 ${
                  openMenu == "women" ? "bg-stone-100" : "bg-none"
                }`}
                onMouseEnter={() => setOpenMenu("women")}
              >
                WOMEN
              </Button>
            </div>

            {/* ICONS*/}
            <div className="gap-4 items-center w-1/3 justify-end flex">
              <div className="hidden gap-4 md:flex">
                <Link href={"/"} className="text-xs cursor-pointer">
                  About
                </Link>
                <span
                  onClick={() => window.location.reload()}
                  className="text-xs cursor-pointer"
                >
                  ReRun
                </span>
              </div>
              <Image
                src="/images/search.svg"
                alt="search"
                width={24}
                height={24}
                className="cursor-pointer"
              />
              <Image
                src="/images/user.svg"
                alt="user"
                width={24}
                height={24}
                className="cursor-pointer"
              />
              <Image
                src="/images/help.svg"
                alt="help"
                width={24}
                height={24}
                className="cursor-pointer"
              />
              <Image
                src="/images/shop.svg"
                alt="shop"
                width={24}
                height={24}
                className="cursor-pointer"
              />
            </div>
          </div>

          {/* MENU BOTTOM */}
          <div className="flex md:hidden bg-popover justify-around p-0.5 rounded-b-2xl ">
            <Link
              href="./"
              className="border-primary border-r-3 w-full h-full text-center text-stone-700 font-semibold"
            >
              <span>ABOUT</span>
            </Link>
            <span
              className="border-primary border-r-3 w-full h-full text-center text-stone-700 font-semibold"
              onClick={() => setOpenMenu("men")}
            >
              MEN
            </span>
            <span
              className="border-primary border-r-3 w-full h-full text-center text-stone-700 font-semibold"
              onClick={() => setOpenMenu("women")}
            >
              WOMEN
            </span>
            <span
              onClick={() => window.location.reload()}
              className="w-full h-full text-center text-stone-700 font-semibold"
            >
              RERUN
            </span>
          </div>
        </Container>
      </div>
    </>
  );
}
