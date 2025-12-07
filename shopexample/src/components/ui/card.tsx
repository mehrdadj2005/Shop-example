import { ProductCardType } from "@/types/ui/productCard";
import Image from "next/image";

export default function ProductCard({
  item,
  className,
  variant = "default",
}: {
  item: ProductCardType;
  className?: string;
  variant?: "hover" | "default";
}) {
  return (
    <div
      className={`relative group ${className} ${
        variant == "default"
          ? " hover:scale-101 transition-all duration-200"
          : ""
      }`}
    >
      <div
        className={`
        flex flex-col w-full justify-between rounded-2xl p-4 bg-white relative group ${
          variant == "hover"
            ? "group-hover:rounded-b-none group-hover:scale-105"
            : ""
        }`}
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
        {/*  */}
      </div>
      {variant == "hover" && (
        <div className="absolute top-full ring-0 left-0 z-50 w-full h-28 bg-white hidden group-hover:block group-hover:scale-105 rounded-b-2xl">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur
          aliquam quidem eos
        </div>
      )}
    </div>
  );
}
