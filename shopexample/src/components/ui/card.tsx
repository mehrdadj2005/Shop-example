"use client";

import { addItem, addQty, lessQty } from "@/store/slices/cartSlice";
import { RootState } from "@/store/store";
import { ProductCardType } from "@/types/ui/productCard";
import { AlertCircleIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, AlertTitle } from "./alert";
import { Button } from "./button";

export default function ProductCard({
  item,
  className,
  variant = "default",
}: {
  item: ProductCardType;
  className?: string;
  variant?: "hover" | "default";
}) {
  const [selectColor, setSelectColor] = useState("");
  const [selectSize, setSelectSize] = useState(0);
  const [showAlert, setShowAlert] = useState({ show: false, text: "" });
  const { data: session } = useSession();
  const [buttonVariant, setButtonVariant] = useState<"add" | "number">("add");

  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);
  console.log(cart.items);

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

  function handleAddOrderToCart() {
    if (!session?.user?.email) {
      customAlert("You are not signed in");
    } else {
      if (selectSize == 0 || selectColor == "") {
        customAlert("Please select values");
      } else {
        dispatch(
          addItem({
            id: item.id,
            color: selectColor,
            size: selectSize,
            qty: 1,
            image: item.images.main,
            description: item.description,
            price: item.price,
            discountedPrice: item.discountedPrice,
          })
        );
      }
    }
  }

  useEffect(() => {
    console.log(selectColor);
    console.log(selectSize);
    console.log("--------");
    cart.items.forEach((order) => {
      console.log(order.color == selectColor && order.size == selectSize);
    });
  }, [cart, selectColor, selectSize]);

  useEffect(() => {
    if (!session?.user?.email) {
      customAlert("You are not signed in");
      setSelectColor("");
      setSelectSize(0);
    } else {
      if (selectSize != 0 && selectColor != "") {
        setButtonVariant("add");
        cart.items.find((order) => {
          if (
            order.id == item.id &&
            order.size == selectSize &&
            order.color == selectColor &&
            order.qty > 0
          ) {
            setButtonVariant("number");
          }
        });
      }
    }
  }, [selectColor, selectSize, session, cart, item]);

  return (
    <>
      <div
        onMouseLeave={() => {
          setSelectColor("");
          setSelectSize(0);
          setButtonVariant("add");
        }}
        className={` relative group overflow-hidden  ${className} ${
          variant == "default" ? "" : ""
        }`}
      >
        <div
          className={`
        flex flex-col w-full justify-between rounded-2xl p-4 bg-white relative group 
        ${variant == "hover" ? "" : ""}
        `}
        >
          {/* label */}
          <div className="text-left">
            <span className="bg-primary rounded-full px-2 py-1.5 text-xs/none font-medium tracking-wider text-black uppercase ">
              {item.label}
            </span>
          </div>
          {/* image */}
          <div>
            <Image
              src={item.images.main}
              alt={item.description}
              width={200}
              height={200}
              className="mx-auto"
            />
          </div>
          {/* price */}
          <div>
            <div className="text-left">
              <span className="font-sans text-xs font-medium tracking-wider uppercase">
                {item.description}
              </span>
            </div>
            <div className="text-left">
              {item.discountedPrice ? (
                <div className="flex gap-2 ">
                  <span className="text-red-700">${item.discountedPrice}</span>
                  <span className="text-stone-800 line-through">
                    ${item.price}
                  </span>
                </div>
              ) : (
                <span>${item.price}</span>
              )}
            </div>
          </div>
          {/* colors */}
          <div className="flex gap-1 mt-2">
            {item.colors.all.map((item) => (
              <div
                key={item}
                className={` w-4 h-4 rounded-full`}
                style={{ backgroundColor: item }}
              ></div>
            ))}
          </div>
        </div>
        {/* DESCRIPTION */}
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-primary border-4 border-t-0 border-white rounded-2xl rounded-t-none translate-y-0 md:translate-y-full transition-transform duration-300 ease-out md:group-hover:translate-y-0 flex flex-col p-2 px-4">
          {/* DESCRIPTION */}
          <div className="text-left text-sm">{item.description}</div>
          <div className="flex justify-between items-end mt-auto">
            <div>
              {/* COLORS */}
              <div className="flex flex-row mb-4">
                {item.colors.all.map((color) => (
                  <div
                    key={color}
                    className={` w-6 h-6 flex justify-center items-center rounded-4xl `}
                    style={{
                      border: `2px solid ${
                        selectColor == color ? color : "#00000000"
                      } `,
                    }}
                  >
                    <div
                      className={` flex w-4 h-4 rounded-full `}
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectColor(color)}
                    ></div>
                  </div>
                ))}
              </div>
              {/* SIZES */}
              <div className="flex gap-1">
                {item.sizes.map((size) => (
                  <div
                    className="border-1 border-black flex justify-center items-center rounded w-9 h-9 "
                    key={size}
                    style={{
                      backgroundColor:
                        selectSize == size ? "#00000030" : "#00000000",
                    }}
                    onClick={() => setSelectSize(size)}
                  >
                    {size}
                  </div>
                ))}
              </div>
            </div>
            {/*  */}
            <div className="flex flex-col">
              <div className="mb-2 flex flex-col">
                {item.discountedPrice ? (
                  <>
                    <span className="text-base text-red-400 line-through">
                      ${item.price}
                    </span>
                    <span className="text-base">${item.discountedPrice}</span>
                  </>
                ) : (
                  <span className="text-base">${item.price}</span>
                )}
              </div>
              {buttonVariant == "add" ? (
                <Button variant={"secondary"} onClick={handleAddOrderToCart}>
                  Add
                </Button>
              ) : (
                <div className="flex gap-2 items-center">
                  <Button
                    variant={"secondary"}
                    onClick={() =>
                      dispatch(
                        lessQty({
                          color: selectColor,
                          id: item.id,
                          size: selectSize,
                          qty: 1,
                          image: item.images.main,
                          description: item.description,
                          price: item.price,
                          discountedPrice: item.discountedPrice,
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
                          i.id == item.id &&
                          i.color == selectColor &&
                          i.size == selectSize
                      )?.qty
                    }
                  </span>
                  <Button
                    variant={"secondary"}
                    onClick={() =>
                      dispatch(
                        addQty({
                          color: selectColor,
                          id: item.id,
                          size: selectSize,
                          qty: 1,
                          image: item.images.main,
                          description: item.description,
                          price: item.price,
                          discountedPrice: item.discountedPrice,
                        })
                      )
                    }
                  >
                    +
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {showAlert.show && (
        <Alert variant="destructive" className="absolute top-2 right-2 w-fit">
          <AlertCircleIcon />
          <AlertTitle className="font-medium text-base">
            {showAlert.text}
          </AlertTitle>
        </Alert>
      )}
    </>
  );
}
