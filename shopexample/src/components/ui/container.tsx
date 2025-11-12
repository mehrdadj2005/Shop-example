"use client";

import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export default function Container({ children, className }: ContainerProps) {
  return (
    <div className={" !max-w-[1500px] w-full my-0 mx-auto " + className}>
      {children}
    </div>
  );
}
// px-4 xl:px-8 xl:py-0
