import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

export function MobileNavigation({
  setIsActiveLink,
}: {
  setIsActiveLink: Dispatch<SetStateAction<string | null>>;
}) {
  return (
    <nav
      className={
        "sticky top-0 z-20 inset-x-0 p-6 backdrop-blur-md bg-white/70 border-b"
      }
    >
      <div className="w-full flex items-center justify-between">
        <Sheet>
          <SheetTrigger>
            {" "}
            <svg
              stroke-width="2"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
            >
              <path
                d="M3 5H21"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M3 12H16"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M3 19H11"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </SheetTrigger>
          <SheetContent side={"left"}>
            <SheetHeader>
              <div className="relative size-20 mx-auto">
                <Image src={"/logo.png"} fill className="object-cover" alt="" />
              </div>
              <SheetTitle>Are you absolutely sure?</SheetTitle>
              <SheetDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
        <Link
          onClick={() => {
            setIsActiveLink(null);
          }}
          className={"relative size-10"}
          href={"/"}
        >
          <Image src={"/logo.png"} fill className="object-cover" alt="" />
        </Link>
      </div>
    </nav>
  );
}
