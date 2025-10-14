"use client";
import Container from "@/components/container";
import DoubleButton from "@/components/doubleButton";
import { Api } from "@/services/api";
import { NavPhotoType } from "@/types/page/navPhoto";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function NavPhoto() {
  const [items, setItems] = useState<NavPhotoType[]>([]);
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    async function fetchApi() {
      const data = await Api("navPhoto");
      if (data && data.length > 0) {
        setItems(data[0].items);
      }
    }

    fetchApi();
  }, []);

  useEffect(() => {
    console.log(title);
  }, [title]);

  return (
    <Container className="mt-8">
      <div className="flex justify-between gap-2 px-2">
        {items.map((item) => (
          <div
            key={Math.random()}
            style={{ backgroundImage: `url(${item.src})` }}
            className="w-1/4 h-[500px] hover:rounded-[250px] bg-center bg-cover box-content rounded-3xl transition-all duration-700 flex items-center justify-center flex-col gap-2"
            onMouseEnter={() => setTitle(item.title)}
            onMouseLeave={() => setTitle("")}
          >
            <div className="flex items-center flex-col">
              <motion.span
                className={`text-white border-2 py-2 px-4 rounded-3xl 
               ${title == item.title ? "border-transparent" : "border-white"}`}
                animate={{
                  y: title == item.title ? -10 : 0,
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                }}
              >
                {item.title}
              </motion.span>

              <AnimatePresence>
                {title == item.title && (
                  <motion.div
                    key="doubleButton"
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                  >
                    <DoubleButton
                      hrefMen={item.hrefMen ? item.hrefMen : "/"}
                      hrefWomen={item.hrefWomen ? item.hrefWomen : "/"}
                      mode="lineLight"
                      display="col"
                      length={item.buttonLength}
                      className="gap-2"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
