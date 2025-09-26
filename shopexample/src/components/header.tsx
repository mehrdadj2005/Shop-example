"use client";

import Image from "next/image";
import Container from "./container";

const liClass =
  "text-sm font-bold p-2 hover:border-b-3 border-red-500 transition-all duration-100 cursor-pointer pb-3 hover:p-2 text-sm ";

const personOptionClass =
  "flex items-center hover:bg-gray-100 px-2 rounded-2xl transition-all duration-300 cursor-pointer";

export default function Header() {
  return (
    <div className="shadow-sm">
      <Container>
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center w-3/5">
            <Image
              src={"/images/logo.png"}
              alt="logo"
              width={200}
              height={70}
              className="cursor-pointer"
            ></Image>
            <div className="bg-gray-100 rounded-2xl p-1 flex w-full mr-4">
              <Image
                src={"/images/search.svg"}
                alt="logo"
                width={40}
                height={40}
                className="p-2 bg-red-500 rounded-md cursor-pointer"
              ></Image>
              <input
                type="search"
                className="outline-0 pr-2 w-full"
                placeholder="جستوجو در مهران کالا..."
              />
            </div>
          </div>

          <div className="flex items-center gap-x-2">
            <div className={personOptionClass}>
              <div className="flex items-start flex-col p-2">
                <span className="text-xs font-normal mr-1">کاربری</span>
                <span className="text-sm font-bold">ورود / ثبت نام</span>
              </div>
              <div>
                <Image
                  src={"/images/user.svg"}
                  alt="logo"
                  width={25}
                  height={25}
                ></Image>
              </div>
            </div>

            <div className={personOptionClass}>
              <div className="flex items-start flex-col p-2">
                <span className="text-xs font-normal mr-1">سبد خرید</span>
                <span className="text-sm font-bold">خالی است</span>
              </div>
              <div>
                <Image
                  src={"/images/shop.svg"}
                  alt="logo"
                  width={25}
                  height={25}
                ></Image>
              </div>
            </div>
          </div>
        </div>
        {/*  */}
        <div className="pt-2">
          <div>
            <ul className="flex gap-x-6">
              <li className={liClass + ` flex items-center gap-x-2 `}>
                <Image
                  src={"/images/menu4.svg"}
                  alt="logo"
                  width={18}
                  height={18}
                  className="ml-2"
                ></Image>
                دسته بندی کالاها
                <Image
                  src={"/images/arrowdown.svg"}
                  alt="logo"
                  width={15}
                  height={15}
                  className="mt-1"
                ></Image>
              </li>
              <li className={liClass}>مهران کالای من</li>
              <li className={liClass}>سوالی دارد؟</li>
              <li className={liClass}>مهران کالایی شوید</li>
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
}
