import Link from "next/link";
import { Button } from "./ui/button";

type PropertyType = {
  className?: string;
  display?: "row" | "col";
  mode: "default" | "lineLight" | "lineDark";
};

export default function DoubleButton({
  className,
  display,
  mode,
}: PropertyType) {
  let line = false;
  let modeStyle = "";
  const light =
    "text-stone-800 hover:bg-stone-800 hover:text-white transition-all duration-400 duration-400";
  const lineLight =
    "bg-none border border-white text-white hover:bg-white hover:text-stone-800 duration-400";
  const lineDark =
    "bg-none border border-stone-800 text-stone-800 hover:bg-stone-800 hover:text-white duration-400";
  if (mode == "default") {
    modeStyle = light;
  } else if (mode == "lineDark") {
    modeStyle = lineDark;
  } else if (mode == "lineLight") {
    modeStyle = lineLight;
  }
  if (mode == "lineDark" || mode == "lineLight") {
    line = true;
  }
  return (
    <div className={`flex flex-${display} ${className}`}>
      <Link href="/">
        <Button
          variant={line ? "line" : "default"}
          className={modeStyle + " w-full rounded-3xl px-6 cursor-pointer "}
        >
          SHOP MEN
        </Button>
      </Link>
      <Link href="/">
        <Button
          variant={line ? "line" : "default"}
          className={modeStyle + " w-full rounded-3xl px-6 cursor-pointer "}
        >
          SHOP WOMEN
        </Button>
      </Link>
    </div>
  );
}
