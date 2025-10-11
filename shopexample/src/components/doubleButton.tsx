import Link from "next/link";
import { Button } from "./ui/button";

type PropertyType = {
  className?: string;
  display?: "row" | "col";
  mode: "dark" | "light";
};

export default function DoubleButton({
  className,
  display,
  mode,
}: PropertyType) {
  const dark =
    "text-white bg-stone-800 hover:bg-white hover:text-stone-800 transition-all duration-400 ";
  const light =
    "text-stone-800 hover:bg-stone-800 hover:text-white transition-all duration-400 ";
  return (
    <div className={`flex flex-${display} ${className}`}>
      <Link href="/">
        <Button
          className={
            (mode == "dark" ? dark : light) +
            " w-full rounded-3xl px-6 cursor-pointer"
          }
        >
          SHOP MEN
        </Button>
      </Link>
      <Link href="/">
        <Button
          className={
            (mode == "dark" ? dark : light) +
            " w-full rounded-3xl px-6 cursor-pointer"
          }
        >
          SHOP WOMEN
        </Button>
      </Link>
    </div>
  );
}
