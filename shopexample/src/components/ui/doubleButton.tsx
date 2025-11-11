import Link from "next/link";
import { Button } from "./button";

type PropertyType = {
  className?: string;
  display?: "row" | "col";
  mode: "default" | "lineLight" | "lineDark";
  length?: "double" | "men" | "women";
  hrefMen?: string;
  hrefWomen?: string;
};

export default function DoubleButton({
  className,
  display,
  mode,
  length = "double",
  hrefMen = "/",
  hrefWomen = "/",
}: PropertyType) {
  let line = false;
  let modeStyle = "";
  const light =
    "text-stone-800 hover:bg-stone-800 hover:text-white transition-all duration-400 duration-400 w-full rounded-3xl px-6 cursor-pointer";
  const lineLight =
    "bg-none border border-white text-white hover:bg-white hover:text-stone-800 duration-400 w-full rounded-3xl px-6 cursor-pointer";
  const lineDark =
    "bg-none border border-stone-800 text-stone-800 hover:bg-stone-800 hover:text-white duration-400 w-full rounded-3xl px-6 cursor-pointer";
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
      {length == "double" && (
        <>
          <Link className="w-full" href={hrefMen}>
            <Button variant={line ? "line" : "default"} className={modeStyle}>
              SHOP MEN
            </Button>
          </Link>

          <Link className="w-full" href={hrefWomen}>
            <Button variant={line ? "line" : "default"} className={modeStyle}>
              SHOP WOMEN
            </Button>
          </Link>
        </>
      )}
      {/*  */}
      {length == "men" && (
        <Link className="w-full" href={hrefMen}>
          <Button variant={line ? "line" : "default"} className={modeStyle}>
            SHOP MEN
          </Button>
        </Link>
      )}
      {/*  */}
      {length == "women" && (
        <Link className="w-full" href={hrefWomen}>
          <Button variant={line ? "line" : "default"} className={modeStyle}>
            SHOP WOMEN
          </Button>
        </Link>
      )}
    </div>
  );
}
