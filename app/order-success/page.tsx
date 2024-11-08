"use client";

import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Copy, PackageSearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";

function Page() {
  const router = useRouter();
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient ? (
        <Confetti
          width={window.innerWidth / 1.5}
          height={window.innerHeight}
          numberOfPieces={200}
          className="hidden md:block mx-auto"
          gravity={0.5}
          recycle={false}
        />
      ) : null}
      <div className="flex-1 py-16 md:py-20 lg:py-24">
        <MaxWidthWrapper className="space-y-6 md:space-y-8 max-w-screen-lg">
          <div className="space-y-4">
            <p className="-tracking-tighter font-extrabold text-base md:text-xl text-[#FBA328]">
              Thank You for Your Purchase!
            </p>
            <h1 className="text-4xl md:text-6xl text-balance -tracking-tighter font-extrabold ">
              Your order has been successfully placed!
            </h1>
            <p className="text-sm md:text-base text-muted-foreground -tracking-tighter font-extrabold ">
              We&apos;ve received your order and is now being processed.
            </p>
          </div>
          <div className="pt-4 space-y-2 md:space-y-4">
            <p className="-tracking-tighter font-extrabold text-base md:text-xl">
              Order number
            </p>

            <div className="flex items-center gap-4">
              <p className="text-muted-foreground -tracking-tighter font-extrabold text-sm md:text-base">
                b3091bdc-d50b-48a1-8d90-f291c9aad50e
              </p>
              <Copy className="size-4 stroke-muted-foreground" />
            </div>
          </div>
          <Separator className="max-w-full" />
          <div className="space-y-2 md:space-y-4">
            <p className="-tracking-tighter font-extrabold text-base md:text-xl">
              You made a great choice!
            </p>

            <p className="text-muted-foreground -tracking-tighter font-extrabold text-pretty text-sm md:text-base">
              We appreciate your trust in us and hope you enjoy your purchase!
              If you have any questions or concerns, our support team is here to
              help.
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center w-full gap-4">
            <Button
              onClick={() => router.push("/store")}
              className="rounded-full gap-2"
              variant={"secondary"}
            >
              <ArrowLeft />
              Go back to shopping
            </Button>
            <Button
              onClick={() =>
                router.push(
                  "/track-order?trackingId=b3091bdc-d50b-48a1-8d90-f291c9aad50e"
                )
              }
              className="rounded-full gap-2"
            >
              <PackageSearchIcon />
              Track your order
            </Button>
          </div>
        </MaxWidthWrapper>
      </div>
    </>
  );
}

export default Page;
