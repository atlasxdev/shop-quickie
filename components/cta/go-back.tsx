"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export function GoBack() {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.back()}
      className="uppercase font-bold -tracking-tighter text-[#FBA328] gap-2 pl-0 lg:pl-4"
      variant={"link"}
      size={"sm"}
    >
      <ArrowLeftIcon />
      Go back
    </Button>
  );
}
