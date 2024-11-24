import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div
        className={
          "w-full sticky top-0 z-20 backdrop-blur-md bg-white/70 py-6 md:py-8 border"
        }
      >
        <MaxWidthWrapper>
          <Link
            href={"/store"}
            className={buttonVariants({
              className: "text-muted-foreground gap-2",
              variant: "link",
            })}
          >
            <ArrowLeft /> Continue shopping
          </Link>
        </MaxWidthWrapper>
      </div>
      <div className="flex-1 flex py-12 md:py-14 lg:py-16 bg-[#F5F5F7]">
        <MaxWidthWrapper className="flex-1 flex items-center justify-center">
          {children}
        </MaxWidthWrapper>
      </div>
    </>
  );
}

export default layout;
