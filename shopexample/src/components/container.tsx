"use client";

import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export default function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={
        " !max-w-[1400px] w-full my-0 mx-auto px-4 lx:px-8 lx:py-0 " + className
      }
    >
      {children}
    </div>
  );
}
