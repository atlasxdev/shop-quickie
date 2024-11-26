"use client";

import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Unauthorized from "@/components/Unauthorized";
import useMetadata from "@/hooks/use-metadata";
import { ArrowLeft, Copy, Loader, PackageSearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import React from "react";
import { motion } from "framer-motion";
import { useLottie } from "lottie-react";
import politeChicky from "../../public/polite-chicky.json";

function Page() {
  const [isClient, setIsClient] = useState<boolean>(false);
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem("user") ?? "null");
    setUser(user);
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="flex-1 flex items-center justify-center h-[60vh]">
        <Loader className="size-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Unauthorized />;
  }

  if (!localStorage.getItem("hasOrder")) {
    return <NoOrderPage />;
  }

  return <OrderSuccess />;
}

function OrderSuccess() {
  useMetadata(
    "Order Confirmed - Thank You for Shopping at Shop Quickie",
    "Your order has been successfully placed at Shop Quickie. Thank you for your purchase! You will receive an email confirmation shortly with your order details and tracking information. We appreciate your business and look forward to serving you again."
  );
  const router = useRouter();

  return (
    <>
      <Confetti
        width={window.innerWidth / 1.5}
        height={window.innerHeight}
        numberOfPieces={200}
        className="hidden md:block mx-auto"
        gravity={0.5}
        recycle={false}
      />
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
              onClick={() => {
                router.replace("/store");
                localStorage.removeItem("hasOrder");
              }}
              className="rounded-full gap-2"
              variant={"secondary"}
            >
              <ArrowLeft />
              Go back to shopping
            </Button>
            <Button
              onClick={() => {
                router.replace(
                  "/track-order?trackingId=b3091bdc-d50b-48a1-8d90-f291c9aad50e"
                );
                localStorage.removeItem("hasOrder");
              }}
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

function NoOrderPage() {
  useMetadata(
    "No Orders Found - Shop at Shop Quickie",
    "It seems like you haven't placed any orders yet at Shop Quickie. Explore our amazing collection and make your first purchase today! We're excited to have you as a customer and look forward to providing you with the best shopping experience."
  );
  const router = useRouter();
  const { View } = useLottie({
    animationData: politeChicky,
    loop: true,
  });

  return (
    <MaxWidthWrapper className="flex-1 flex items-center justify-center py-16 md:py-20 lg:py-24">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="border shadow-md rounded-lg p-8 text-center max-w-lg mx-auto"
      >
        <h1 className="-tracking-tighter text-xl md:text-2xl font-bold mb-4">
          Oops! No Order Found
        </h1>
        <motion.div
          initial={{
            scale: 0,
          }}
          animate={{
            scale: 1,
          }}
          transition={{
            delay: 0.5,
          }}
          className="size-44 md:size-52 mx-auto"
        >
          {View}
        </motion.div>
        <p className="text-balance text-muted-foreground -tracking-tighter text-xs md:text-sm mb-6">
          It looks like you haven&apos;t placed an order yet. But don&apos;t
          worry, our store is full of amazing items just waiting for you!
        </p>

        <Button
          onClick={() => router.push("/store")}
          className="rounded-full gap-2"
        >
          <ArrowLeft />
          Go back to shopping
        </Button>
      </motion.div>
    </MaxWidthWrapper>
  );
}

export default Page;
