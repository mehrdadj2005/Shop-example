"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function Page() {
  const pathname = useRouter();
  return (
    <div className="!flex !flex-col !w-full !h-screen !gap-4 !items-center !justify-center">
      <h1>not found</h1>
      <Button
        variant={"secondary"}
        onClick={() => pathname.back()}
        className="w-fit"
      >
        BACK
      </Button>
    </div>
  );
}

export default Page;
