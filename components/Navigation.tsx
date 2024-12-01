"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useMediaQuery } from "usehooks-ts";
import { MobileNavigation } from "./ui/navigation/mobile-navigation";
import { DesktopNavigation } from "./ui/navigation/desktop-navigation";

export default function Navigation() {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  const [isActiveLink, setIsActiveLink] = useState<string | null>(null);
  const matches = useMediaQuery("(min-width: 1024px)");

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) {
      return;
    } else {
      if (pathname.includes("/store")) {
        setIsActiveLink("Store");
      } else {
        setIsActiveLink(null);
      }
    }
  }, [isClient, pathname]);

  return (
    <>
      {matches ? (
        <DesktopNavigation
          pathname={pathname}
          isActiveLink={isActiveLink}
          setIsActiveLink={setIsActiveLink}
        />
      ) : (
        <MobileNavigation
          isActiveLink={isActiveLink}
          setIsActiveLink={setIsActiveLink}
        />
      )}
    </>
  );
}
