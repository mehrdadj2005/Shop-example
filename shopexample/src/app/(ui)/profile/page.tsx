"use client";

import Header from "@/components/layoue/header";
import { EditAddres, NewAddress } from "@/components/profile/addressModale";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ui/card";
import Container from "@/components/ui/container";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Api } from "@/services/api";
import { Icons } from "@/types/ui/icons";
import { ProductCardType } from "@/types/ui/productCard";
import { signIn, signOut, useSession } from "next-auth/react";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type ListItems = {
  id: number;
  text: string;
};

export default function Page() {
  const [openSheet, setOpenSheet] = useState<"orders" | "addresses" | false>();
  const [ordersItmes, setOrdersItmes] = useState<
    "inSending" | "delivered" | "shop"
  >("inSending");
  const [icons, setIcons] = useState<Icons>({});
  const [skeleton, setSkeleton] = useState(true);
  const [data, setdata] = useState<ProductCardType[]>([]);
  const [list, setList] = useState<ListItems>([]);
  const [newAddressModal, setNewAddressModal] = useState<boolean>(false);
  const [editAddressModal, setEditAddressModal] = useState<boolean>(false);

  const { data: session } = useSession();

  useEffect(() => {
    async function getData() {
      const data = await Api("icons");
      setIcons(await data[0].items[0]);
    }
    getData();
  }, []);

  useEffect(() => {
    setSkeleton(true);

    setTimeout(() => {
      setSkeleton(false);
    }, 1000);
  }, [ordersItmes]);

  useEffect(() => {
    async function getData() {
      const items = await Api("newArrivals");
      if (items) {
        setdata(await items[0].items);
      }
    }
    getData();
  }, []);

  //  MENU HEADER
  const MenuHeader = () => {
    return (
      <div className="flex w-full justify-between border-b-2 border-primary">
        <Link href={"/"} className="flex justify-start ">
          {<Image src={icons?.logo || ""} alt="logo" width={60} height={60} />}
        </Link>

        <Button
          className="bg-white hover:bg-stone-100 my-4"
          onClick={() => setOpenSheet(false)}
        >
          <Image
            className="w-full h-full"
            src={icons?.arrowRight}
            alt=""
            width={24}
            height={24}
          />
        </Button>
      </div>
    );
  };

  return (
    <>
      {/* ORDERS */}
      <Sheet open={openSheet == "orders" ? true : false}>
        <SheetContent className="!min-w-full flex items-end">
          <Container className="px-4 xl:px-8 xl:py-0">
            <MenuHeader />
            {/*  */}
            <div className="flex justify-between my-4 mx-auto ">
              <Button
                variant={ordersItmes == "inSending" ? "secondary" : "outline"}
                onClick={() => setOrdersItmes("inSending")}
                className="!w-3/10"
              >
                In Sending
              </Button>
              <Button
                variant={ordersItmes == "delivered" ? "secondary" : "outline"}
                onClick={() => setOrdersItmes("delivered")}
                className="!w-3/10"
              >
                Delivered
              </Button>
              <Button
                variant={ordersItmes == "shop" ? "secondary" : "outline"}
                onClick={() => setOrdersItmes("shop")}
                className="!w-3/10"
              >
                Shop
              </Button>
            </div>
            {/*  */}
            <div
              className={`h-screen overflow-y-auto gap-8 flex-wrap justify-around items-center pb-64 ${
                ordersItmes == "shop" ? "flex" : "hidden"
              }`}
            >
              {ordersItmes == "shop" && 1 ? (
                <>
                  {data.map((items) =>
                    skeleton ? (
                      <Skeleton key={items.id} className="h-2/5 mb-4 !w-full" />
                    ) : (
                      <ProductCard
                        item={items}
                        key={items.id}
                        className="border-b-2 border-r-2 border-primary rounded-2xl !w-full hover:!scale-none"
                      />
                    )
                  )}
                  <Link href="./" className="w-full">
                    <Button variant={"outline"} className="w-full">
                      Go Shopping
                    </Button>
                  </Link>
                </>
              ) : (
                <div className="flex flex-col items-center gap-4 ">
                  <h3>Your shopping cart is empty</h3>
                  <Button variant={"outline"}>Come place an order</Button>
                </div>
              )}
            </div>
            <div
              className={`h-screen overflow-y-auto gap-8 flex-wrap justify-around items-center pb-64 ${
                ordersItmes == "delivered" ? "flex" : "hidden"
              }`}
            >
              {ordersItmes == "delivered" && 0 ? (
                data.map((items) =>
                  skeleton ? (
                    <Skeleton key={items.id} className="h-2/5 mb-4 !w-full" />
                  ) : (
                    <ProductCard
                      item={items}
                      key={items.id}
                      className="border-b-2 border-r-2 border-primary rounded-2xl !w-full hover:!scale-none"
                    />
                  )
                )
              ) : (
                <div className="flex flex-col items-center gap-4 ">
                  <h3>You have no received orders.</h3>
                  <Button variant={"outline"}>Come place an order</Button>
                </div>
              )}
            </div>
            <div
              className={`h-screen overflow-y-auto gap-8 flex-wrap justify-around items-center pb-64 ${
                ordersItmes == "inSending" ? "flex" : "hidden"
              }`}
            >
              {ordersItmes == "inSending" && 0 ? (
                data.map((items) =>
                  skeleton ? (
                    <Skeleton key={items.id} className="h-2/5 mb-4 !w-full" />
                  ) : (
                    <ProductCard
                      item={items}
                      key={items.id}
                      className="border-b-2 border-r-2 border-primary rounded-2xl !w-full hover:!scale-none"
                    />
                  )
                )
              ) : (
                <div className="flex flex-col items-center gap-4 ">
                  <h3>You have no orders in progress.</h3>
                  <Button variant={"outline"}>Come place an order</Button>
                </div>
              )}
            </div>
          </Container>
        </SheetContent>
      </Sheet>
      {/* ADDRESSES */}
      <Sheet open={openSheet == "addresses" ? true : false}>
        <SheetContent className="!min-w-full flex items-end">
          <Container className="px-4 xl:px-8 xl:py-0">
            <MenuHeader />
            {/*  */}
            <div className="flex flex-col gap-4 justify-between my-4 mx-auto">
              {list.map((item) => (
                <div
                  key={item.id}
                  className="w-full border-2 h-20 rounded-2xl flex items-center justify-around"
                >
                  <span className="p-2 w-10/12 h-8/12 my-auto !line-clamp-2 mt-1">
                    {item.text}
                  </span>
                  <span
                    className="w-2/12 pl-2 flex h-full py-7.5 text-blue-400"
                    onClick={() => setEditAddressModal(!editAddressModal)}
                  >
                    edit
                  </span>
                </div>
              ))}

              <Button
                onClick={() => setNewAddressModal(!newAddressModal)}
                variant="outline"
                className="h-12 text-stone-700 text-lg mx-8"
              >
                ADD NEW ADDRESS
              </Button>
            </div>
            {newAddressModal && (
              <NewAddress
                newAddressModal={newAddressModal}
                setNewAddressModal={setNewAddressModal}
              />
            )}
            {editAddressModal && (
              <EditAddres
                editAddressModal={editAddressModal}
                setEditAddressModal={setEditAddressModal}
                id={1}
              />
            )}
          </Container>
        </SheetContent>
      </Sheet>
      {/*  */}
      <Container className="px-4 xl:px-8 xl:py-0 md:!pt-24 flex flex-col gap-6 items-center justify-center max-h-[750px] h-screen">
        <Header />
        {/* MOBILE */}
        {session?.user?.email ? (
          <div className="w-full flex flex-col gap-6">
            <Button
              className="flex md:hidden w-full py-8 text-base"
              onClick={() => setOpenSheet("orders")}
              variant="outline"
            >
              ORDERS
            </Button>
            {/*  */}
            <Button
              className="flex md:hidden w-full py-8 text-base"
              onClick={() => setOpenSheet("addresses")}
              variant="outline"
            >
              ADDRESSES
            </Button>
            {/*  */}
            <Button
              className="flex md:hidden w-full py-8 text-base"
              variant="destructive"
              onClick={async () => await signOut()}
            >
              SIGN OUT
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-4 items-center justify-center">
            <p className="text-2xl">You are not signed in</p>
            <Button variant={"outline"} onClick={async () => await signIn()}>
              SIGN IN
            </Button>
          </div>
        )}
      </Container>
    </>
  );
}
