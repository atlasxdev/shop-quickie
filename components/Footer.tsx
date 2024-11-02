import React from "react";
import { MaxWidthWrapper } from "./MaxWidthWrapper";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-black py-10 md:py-14 text-white">
      <MaxWidthWrapper>
        <div className="w-full flex items-center justify-center flex-wrap divide-x-0 md:divide-x-2 gap-4">
          <div className="space-x-2">
            <p className="text-[0.7rem] md:text-xs -tracking-tighter inline-block">
              Your Privacy Choices
            </p>
            <Image
              src={"/privacy-options.png"}
              width={20}
              height={20}
              alt="privacy options"
              className="inline-block"
            />
          </div>
          <p className="order-3 text-[0.7rem] md:text-xs -tracking-tighter pl-4">
            Privacy Policy
          </p>
          <p className="order-2 text-[0.7rem] md:text-xs -tracking-tighter pl-4">
            Terms and conditions
          </p>
        </div>
        <div className="mt-4 md:mt-6 w-max mx-auto">
          <p className="text-[0.7rem] md:text-xs -tracking-tighter">
            &copy; {new Date().getFullYear()} Shop Quickie
          </p>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
}
