"use client";

import { usePathname } from "next/navigation";
import { useMediaQuery } from "usehooks-ts";
import { MobileNavigation } from "./ui/navigation/mobile-navigation";
import { DesktopNavigation } from "./ui/navigation/desktop-navigation";

export default function Navigation() {
  const pathname = usePathname();
  const matches = useMediaQuery("(min-width: 1024px)");

  return (
    <>
      {matches ? (
        <DesktopNavigation pathname={pathname} />
      ) : (
        <MobileNavigation pathname={pathname} />
      )}
    </>
  );
}
