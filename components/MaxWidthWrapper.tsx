import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export function MaxWidthWrapper({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("mx-auto max-w-screen-2xl px-6 md:px-8", className)}>
      {children}
    </div>
  );
}
