"use client";

import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Api } from "@/services/api";
import { HeaderData } from "@/types/layout/header";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [openMenu, setOpenMenu] = useState<"men" | "women" | null>(null);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [skeleton, setSkeleton] = useState(true);
  const [info, setInfo] = useState<HeaderData[]>([]);

  useEffect(() => {
    async function getApi() {
      const data = await Api("header");
      setInfo(data || []);
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
        className={`fixed top-0 left-0 right-0 h-screen transform origin-top transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] z-40  ${
          isOpen
            ? "scale-y-100 opacity-100"
            : "scale-y-0 opacity-0 pointer-events-none"
        }`}
      >
        {/* top section*/}
        <div className="h-3/4 w-full flex items-center justify-center text-3xl font-bold bg-primary text-popover">
          <Container className=" mt-12 px-4 lx:px-8 lx:py-0">
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
      <div
        className={`fixed top-4 left-0 right-0 z-50 transition-transform duration-500  ${
          showHeader ? "translate-y-0" : "-translate-y-20"
        }`}
      >
        <Container className="px-4 lx:px-8 lx:py-0">
          <div className="mx-auto flex items-center justify-between rounded-2xl py-2 px-6 bg-white">
            {/* LOGO */}
            <div className="w-1/3 flex justify-start">
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
            <div id="nav" className="flex gap-4 w-1/3 justify-center">
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
            <div className="flex gap-4 items-center w-1/3 justify-end">
              <Link href={"/"} className="text-xs cursor-pointer">
                About
              </Link>
              <span
                onClick={() => window.location.reload()}
                className="text-xs cursor-pointer"
              >
                ReRun
              </span>
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
        </Container>
      </div>
    </>
  );
}

// -translate-z-8 rotate-x-50 rotate-z-45 hover:rotate-x-0 hover:rotate-z-0 z-50 transition-all duration-400 cursor-pointer
