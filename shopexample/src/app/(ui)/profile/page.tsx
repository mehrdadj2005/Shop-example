"use client";

import Header from "@/components/layoue/header";
import { EditAddress, NewAddress } from "@/components/profile/addressModale";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Container from "@/components/ui/container";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "@/components/ui/input-group";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Api } from "@/services/api";
import { addQty, clearCart, lessQty } from "@/store/slices/cartSlice";
import { RootState } from "@/store/store";
import { ProfileProductCardType } from "@/types/profile/productCard";
import { Icons } from "@/types/ui/icons";
import { DialogTitle } from "@radix-ui/react-dialog";
import { AlertCircleIcon } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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
  const [data, setData] = useState<ProfileProductCardType[]>([]);
  const [dataDelivered, setDataDelivered] = useState<ProfileProductCardType[]>(
    []
  );
  const [newAddressModal, setNewAddressModal] = useState<boolean>(false);
  const [editAddressModal, setEditAddressModal] = useState({
    show: false,
    text: "",
  });
  const [showModaSignOut, setShowModaSignOut] = useState<boolean>(false);
  const [setCartToLSDelivered, setSetCartToLSDelivered] =
    useState<boolean>(false);
  const [reviewCart, setReviewCart] = useState<boolean>(false);
  const [saveAddress, setSaveAddress] = useState<boolean>(false);
  const [address, setAddress] = useState<string>("");
  const [addresses, setAddresses] = useState<string[]>([]);
  const [showAddresses, setShowAddresses] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState({ show: false, text: "" });

  const { data: session } = useSession();

  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const router = useRouter();

  function customAlert(text: string) {
    setShowAlert({
      show: true,
      text: text,
    });
    setTimeout(() => {
      setShowAlert({
        show: false,
        text: "",
      });
    }, 2000);
  }

  useEffect(() => {
    async function getData() {
      const data = await Api("icons");
      setIcons(await data[0].items[0]);
    }
    getData();

    // load addresses from local storage
    const ls = localStorage.getItem("addresses");
    JSON.parse(ls) && setAddresses(JSON.parse(ls));
  }, [editAddressModal, newAddressModal]);

  useEffect(() => {
    setSkeleton(true);

    setTimeout(() => {
      setSkeleton(false);
    }, 1000);
  }, [ordersItmes]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    const initialState: ProfileProductCardType = {
      items: savedCart ? JSON.parse(savedCart) : [],
    };
    setData(initialState.items);
    //
    const Delivered = localStorage.getItem("Delivered");
    const initialStateDelivered: ProfileProductCardType = {
      items: Delivered ? JSON.parse(Delivered) : [],
    };
    setDataDelivered(initialStateDelivered.items);
    //
    const saveingAddress = () => {
      if (!address || address.trim() === "" || !saveAddress) return;

      const stored = JSON.parse(localStorage.getItem("addresses")) || [];

      if (!stored.includes(address.trim())) {
        const updated = [...stored, address.trim()];
        localStorage.setItem("addresses", JSON.stringify(updated));
      }
    };
    saveingAddress();
  }, [setCartToLSDelivered]);

  useEffect(() => {
    if (setCartToLSDelivered) {
      if (localStorage.getItem("Delivered")) {
        const ls = localStorage.getItem("Delivered");
        const lsparse = JSON.parse(ls);
        localStorage.setItem(
          "Delivered",
          JSON.stringify([...lsparse, ...cart.items])
        );
      } else {
        localStorage.setItem("Delivered", JSON.stringify([...cart.items]));
      }
      dispatch(clearCart());
      setData([]);
      setSetCartToLSDelivered(!setCartToLSDelivered);
    }
  }, [setCartToLSDelivered, cart, data, dispatch, ordersItmes]);

  const handleSetSetCartToLSDelivered = () => {
    if (address.length) {
      setSetCartToLSDelivered(!setCartToLSDelivered);
    } else {
      customAlert("Pless fix your address");
    }
  };

  useEffect(() => {
    console.log(editAddressModal);
  }, [editAddressModal]);
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
      {showModaSignOut && (
        <div className="w-full h-screen absolute z-50 top-0 bottom-0 left-0 right-0 bg-[#00000075] flex justify-center items-center ">
          <div className="bg-white w-1/6 h-1/6 flex justify-center items-center flex-col gap-4 rounded-2xl">
            <h3 className="text-lg font-semibold">are you sure?</h3>
            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={async () => {
                  await signOut();
                  setShowModaSignOut(false);
                }}
                className="px-6"
              >
                yes
              </Button>
              <Button
                variant="destructive"
                onClick={() => setShowModaSignOut(false)}
                className="px-6"
              >
                no
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* ORDERS */}
      <Sheet open={openSheet == "orders" ? true : false}>
        <SheetContent className="!min-w-full flex items-end ">
          <DialogTitle className="hidden"></DialogTitle>
          <Container className="px-4 xl:px-8 xl:py-0 ">
            <MenuHeader />
            {/*  */}
            <div className="flex justify-between my-4 mx-auto">
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
            {/* shop */}
            <div
              className={`h-screen no-scrollbar overflow-y-scroll gap-y-8 flex-col flex-no-wrap justify-start items-center md:flex-row md:flex-wrap md:justify-start pb-64 ${
                ordersItmes == "shop" ? "flex" : "hidden"
              }`}
            >
              {ordersItmes == "shop" && cart.items.length && data.length ? (
                <>
                  {cart.items.map((item) =>
                    data.map(
                      (order) =>
                        item?.id == order?.id &&
                        (skeleton ? (
                          <Skeleton
                            key={item?.id}
                            className="h-2/5 mb-4 !w-full md:!w-1/4 flex md:justify-between"
                          />
                        ) : (
                          <div key={item?.id} className="px-8 w-full md:w-1/4">
                            <div className="w-full md:w-1/4 border-b-2 border-r-2 border-primary rounded-2xl md:!min-w-full hover:!scale-none">
                              <Image
                                width={300}
                                height={300}
                                alt={order?.description}
                                src={order.image || ""}
                              />
                              {/* DESCRIPTION */}
                              <div className="h-1/3 flex flex-col p-2 px-4 bg-primary rounded-b-2xl">
                                {/*  */}
                                <div className="text-left text-sm">
                                  {order?.description}
                                </div>
                                <div className="flex justify-between items-end mt-auto">
                                  <div>
                                    {/* COLORS */}
                                    <div className="flex flex-row m-2 mt-4">
                                      <div
                                        className={` flex w-4 h-4 rounded-full `}
                                        style={{
                                          backgroundColor: item?.color,
                                        }}
                                      ></div>
                                    </div>
                                    {/* SIZES */}
                                    <div className="flex gap-1">
                                      <div className="border-1 border-black flex justify-center items-center rounded w-9 h-9 ">
                                        {item?.size}
                                      </div>
                                    </div>
                                  </div>
                                  {/*  */}
                                  <div className="flex flex-col">
                                    <div className="mb-2 flex flex-col items-end">
                                      <div className="pr-1 md:pr-2">
                                        {item.discountedPrice ? (
                                          <div className="flex gap-1 md:gap-2">
                                            <span className="text-base text-red-400 line-through">
                                              ${item.price}
                                            </span>
                                            <span className="text-base">
                                              ${item.discountedPrice}
                                            </span>
                                          </div>
                                        ) : (
                                          <span className="text-base">
                                            ${item.price}
                                          </span>
                                        )}
                                      </div>
                                      <div className="flex gap-2 items-center">
                                        <Button
                                          variant={"secondary"}
                                          onClick={() =>
                                            dispatch(
                                              lessQty({
                                                color: item?.color,
                                                id: item?.id,
                                                size: item?.size,
                                                qty: 1,
                                                image: item?.image,
                                                description: item.description,
                                                price: item.price,
                                                discountedPrice:
                                                  item.discountedPrice,
                                              })
                                            )
                                          }
                                        >
                                          -
                                        </Button>
                                        <span>
                                          {
                                            cart.items.find(
                                              (i) =>
                                                i.id == item?.id &&
                                                i.color == item?.color &&
                                                i.size == item?.size
                                            )?.qty
                                          }
                                        </span>
                                        <Button
                                          variant={"secondary"}
                                          onClick={() =>
                                            dispatch(
                                              addQty({
                                                color: item?.color,
                                                id: item?.id,
                                                size: item?.size,
                                                qty: 1,
                                                image: item?.image,
                                                description: item.description,
                                                price: item.price,
                                                discountedPrice:
                                                  item.discountedPrice,
                                              })
                                            )
                                          }
                                        >
                                          +
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                    )
                  )}
                  {/* Review */}
                  <div className="w-full flex items-center justify-center">
                    <Button
                      onClick={() => setReviewCart(!reviewCart)}
                      variant={"link"}
                      className="w-11/12 bg-popover rounded-b-none absolute bottom-0 z-50 !px-auto text-stone-600 font-bold text-md py-6 cursor-pointer hover:no-underline"
                    >
                      Review
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Sheet open={reviewCart}>
                      <SheetTrigger asChild></SheetTrigger>
                      <SheetContent
                        side={"bottom"}
                        className="w-full h-full flex flex-col"
                      >
                        <Container className="px-4 xl:px-8 xl:py-0 h-full w-full flex flex-col">
                          <SheetHeader
                            onClick={() => setReviewCart(!reviewCart)}
                            className="felx items-end"
                          >
                            <Image
                              src={icons?.close}
                              alt={icons?.close}
                              width={30}
                              height={30}
                            />
                          </SheetHeader>
                          <div className="no-scrollbar overflow-y-auto pb-20">
                            {/* orders */}
                            <div className="flex flex-wrap gap-y-6">
                              {data.map((order) => (
                                <div
                                  className="px-1 w-1/2 md:w-1/4"
                                  key={order.id + order.color + order.qty}
                                >
                                  <div className="w-full md:w-1/6 border-b-2 border-r-2 border-primary rounded-2xl md:!min-w-full hover:!scale-none">
                                    <Image
                                      width={300}
                                      height={300}
                                      alt={order?.description}
                                      src={order.image || ""}
                                    />
                                    {/* DESCRIPTION */}
                                    <div className="h-1/3 flex flex-col p-2 px-4 bg-primary rounded-b-2xl">
                                      {/*  */}
                                      <div className="flex justify-between items-end mt-auto">
                                        <div>
                                          {/* COLORS */}
                                          <div className="flex flex-row m-2 mt-4">
                                            <div
                                              className={` flex w-4 h-4 rounded-full `}
                                              style={{
                                                backgroundColor: order?.color,
                                              }}
                                            ></div>
                                          </div>
                                          {/* SIZES */}
                                          <div className="flex gap-1">
                                            <div className="border-1 border-black flex justify-center items-center rounded w-9 h-9 ">
                                              {order?.size}
                                            </div>
                                          </div>
                                        </div>
                                        {/* price */}
                                        <div className="flex flex-col">
                                          <div className="md:mb-2 flex flex-col items-end">
                                            <div className="pr-1 md:pr-2">
                                              {order.discountedPrice ? (
                                                <div className="flex gap-1 md:gap-2 flex-col">
                                                  <span className="text-base text-red-400 line-through ">
                                                    ${order.price}
                                                  </span>
                                                  <span className="text-base">
                                                    ${order.discountedPrice}
                                                  </span>
                                                </div>
                                              ) : (
                                                <span className="text-base">
                                                  ${order.price}
                                                </span>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      {/* quantity */}
                                      <div className="flex gap-2 items-center">
                                        <span>quantity: {order.qty}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                            {/* line */}
                            <div className="w-full/12 h-0.5 bg-stone-500 rounded-3xl mx-auto my-8"></div>
                            {/* address */}
                            <div>
                              <InputGroup className="h-auto !border-none shadow-none">
                                <Textarea
                                  placeholder="Enter your address"
                                  className="resize-none min-h-32 focus:outline-none focus-visible:ring-0"
                                  onChange={(e) => setAddress(e.target.value)}
                                  value={address}
                                />
                                {/* input */}
                                <InputGroupAddon
                                  align="block-start"
                                  className="flex items-center justify-between"
                                >
                                  <InputGroupText>address</InputGroupText>
                                  <Button
                                    onClick={() => {
                                      setShowAddresses(!showAddresses);
                                    }}
                                    variant={"outline"}
                                  >
                                    Select Address
                                  </Button>
                                </InputGroupAddon>
                                {/* checkbox address */}
                                <FieldGroup className="mr-auto flex py-4 pl-2 ">
                                  <Field
                                    orientation="horizontal"
                                    className="gap-2 w-fit"
                                  >
                                    <Checkbox
                                      id="terms-checkbox-basic"
                                      name="terms-checkbox-basic"
                                      className="border-stone-600 !text-stone-600"
                                      checked={saveAddress}
                                      onCheckedChange={(value: boolean) => {
                                        setSaveAddress(value);
                                      }}
                                    />
                                    <FieldLabel htmlFor="terms-checkbox-basic">
                                      Save address
                                    </FieldLabel>
                                  </Field>
                                </FieldGroup>
                              </InputGroup>
                              {/* Modal addresses */}
                              {showAddresses && (
                                <div className="w-screen h-screen bg-[#00000030] absolute top-0 left-0 right-0 z-50 flex justify-center items-center">
                                  <div className="bg-white w-3/4 h-3/4 md:w-1/3 md:h-1/2 rounded-4xl flex gap-2 flex-col p-4 box-content overflow-y-scroll">
                                    <div className="flex justify-between px-2">
                                      <h3 className="font-semibold no-scrollbar">
                                        Addresses
                                      </h3>
                                      <div
                                        className=""
                                        onClick={() =>
                                          setShowAddresses(!showAddresses)
                                        }
                                      >
                                        <Image
                                          src={icons?.close}
                                          alt={icons?.close}
                                          width={30}
                                          height={30}
                                        />
                                      </div>
                                    </div>
                                    {addresses.map((item) => (
                                      <div
                                        key={item}
                                        className="border-1 border-t-0 border-r-0 border-stone-500 rounded p-2 hover:bg-stone-200 duration-300"
                                        onClick={() => {
                                          setAddress(item);
                                          setShowAddresses(!showAddresses);
                                        }}
                                      >
                                        <p>{item}</p>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                          <SheetFooter>
                            <div className="w-full flex items-center justify-center z-40">
                              <Button
                                onClick={() =>
                                  handleSetSetCartToLSDelivered(
                                    !setCartToLSDelivered
                                  )
                                }
                                variant={"link"}
                                className="w-11/12 bg-popover absolute bottom-0 z-50 !px-auto rounded-b-none text-stone-600 font-bold text-md py-6 cursor-pointer hover:no-underline"
                              >
                                Checkout
                              </Button>
                            </div>
                          </SheetFooter>
                        </Container>
                      </SheetContent>
                    </Sheet>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center gap-4 mx-auto">
                  <h3>Your shopping cart is empty</h3>
                  <Button
                    variant={"secondary"}
                    onClick={() => router.push("/category")}
                  >
                    Come place an order
                  </Button>
                </div>
              )}
            </div>
            {/* delivered */}
            <div
              className={`no-scrollbar h-screen overflow-y-scroll gap-y-8 flex-col flex-no-wrap justify-start items-center pb-64 md:flex-row md:flex-wrap md:justify-start ${
                ordersItmes == "delivered" ? "flex" : "hidden"
              }`}
            >
              {ordersItmes == "delivered" && dataDelivered.length ? (
                <>
                  {dataDelivered.map((order) =>
                    skeleton ? (
                      <Skeleton
                        key={order?.id}
                        className="h-2/5 mb-4 !w-full md:!w-1/4 flex md:justify-between"
                      />
                    ) : (
                      <div key={order?.id} className="px-8 w-full md:w-1/4">
                        <div className="w-full md:w-1/4 border-b-2 border-r-2 border-primary rounded-2xl md:!min-w-full hover:!scale-none">
                          <Image
                            width={300}
                            height={300}
                            alt={order?.description}
                            src={order?.image || ""}
                          />
                          {/* DESCRIPTION */}
                          <div className="h-1/3 flex flex-col p-2 px-4 bg-primary rounded-b-2xl">
                            {/*  */}
                            <div className="text-left text-sm">
                              {order?.description}
                            </div>
                            <div className="flex justify-between items-end mt-auto">
                              <div>
                                {/* COLORS */}
                                <div className="flex flex-row m-2 mt-4">
                                  <div
                                    className={` flex w-4 h-4 rounded-full `}
                                    style={{
                                      backgroundColor: order?.color,
                                    }}
                                  ></div>
                                </div>
                                {/* SIZES */}
                                <div className="flex gap-1">
                                  <div className="border-1 border-black flex justify-center items-center rounded w-9 h-9 ">
                                    {order?.size}
                                  </div>
                                </div>
                              </div>
                              {/* price */}
                              <div className="flex flex-col">
                                <div className="mb-2 flex flex-col items-end">
                                  <div className="pr-1 md:pr-2">
                                    {order.discountedPrice ? (
                                      <div className="flex gap-1 md:gap-2">
                                        <span className="text-base text-red-400 line-through">
                                          ${order.price}
                                        </span>
                                        <span className="text-base">
                                          ${order.discountedPrice}
                                        </span>
                                      </div>
                                    ) : (
                                      <span className="text-base">
                                        ${order.price}
                                      </span>
                                    )}
                                  </div>
                                  <div className="flex gap-2 items-center">
                                    <span>quantity: {order.qty}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center gap-4 mx-auto">
                  <h3>You have no received orders.</h3>
                  <Button
                    variant={"secondary"}
                    onClick={() => router.push("/category")}
                  >
                    Come place an order
                  </Button>
                </div>
              )}
            </div>
            {/* inSending */}
            <div
              className={`h-screen overflow-y-auto gap-y-8 flex-wrap justify-center items-center pb-64 md:flex-wrap md:justify-start ${
                ordersItmes == "inSending" ? "flex" : "hidden"
              }`}
            >
              {ordersItmes == "inSending" ? (
                data.map((items) => <div key={items.id}></div>)
              ) : (
                <div className="flex flex-col items-center gap-4 mx-auto ">
                  <h3>You have no orders in progress.</h3>
                  <Button
                    variant={"secondary"}
                    onClick={() => router.push("/category")}
                  >
                    Come place an order
                  </Button>
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
            <div className="flex flex-col gap-4 justify-start  my-4 mx-auto h-screen">
              <Button
                onClick={() => setNewAddressModal(!newAddressModal)}
                variant="outline"
                className="h-12 text-stone-700 text-lg mx-8"
              >
                ADD NEW ADDRESS
              </Button>
              <div className="pb-24 box-border overflow-y-scroll no-scrollbar flex flex-col gap-4 justify-between my-4 ">
                {addresses.map((item) => (
                  <div
                    key={item}
                    className="w-full border-2 rounded-2xl flex items-center justify-center"
                  >
                    <span className="w-full p-4">{item}</span>
                    <span
                      className="pr-4 flex  py-7.5 text-blue-400 justify-center"
                      onClick={() =>
                        setEditAddressModal({
                          show: !editAddressModal.show,
                          text: item,
                        })
                      }
                    >
                      edit
                    </span>
                  </div>
                ))}
              </div>
            </div>
            {newAddressModal && (
              <NewAddress
                newAddressModal={newAddressModal}
                setNewAddressModal={setNewAddressModal}
              />
            )}
            {editAddressModal.show && (
              <EditAddress
                editAddressModal={editAddressModal.text}
                setEditAddressModal={setEditAddressModal}
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
          <>
            <div className="w-full flex md:hidden flex-col gap-6">
              <Button
                className="w-full py-8 text-base"
                onClick={() => setOpenSheet("orders")}
                variant="outline"
              >
                ORDERS
              </Button>
              {/*  */}
              <Button
                className="w-full py-8 text-base"
                onClick={() => setOpenSheet("addresses")}
                variant="outline"
              >
                ADDRESSES
              </Button>
              {/*  */}
              <Button
                className="w-full py-8 text-base"
                variant="destructive"
                onClick={async () => await signOut()}
              >
                SIGN OUT
              </Button>
            </div>
            <div className="w-full max-w-[400px] hidden md:flex flex-col gap-6">
              <Button
                className="w-full py-8 text-base"
                onClick={() => setOpenSheet("orders")}
                variant="outline"
              >
                ORDERS
              </Button>
              {/*  */}
              <Button
                className="w-full py-8 text-base"
                onClick={() => setOpenSheet("addresses")}
                variant="outline"
              >
                ADDRESSES
              </Button>
              {/*  */}
              <Button
                className="w-full py-8 text-base"
                variant="destructive"
                onClick={() => setShowModaSignOut(true)}
              >
                SIGN OUT
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-4 items-center justify-center">
            <p className="text-2xl">You are not signed in</p>
            <Button variant={"outline"} onClick={async () => await signIn()}>
              SIGN IN
            </Button>
          </div>
        )}
      </Container>
      {showAlert.show && (
        <Alert
          variant="destructive"
          className="z-50 absolute top-2 right-2 w-fit"
        >
          <AlertCircleIcon />
          <AlertTitle className="font-medium text-base">
            {showAlert.text}
          </AlertTitle>
        </Alert>
      )}
    </>
  );
}
