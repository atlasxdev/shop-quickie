import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import Products from "@/features/hero/components/products";
import { BestSellers } from "@/features/hero/components/best-sellers";
import Image from "next/image";
import dynamic from "next/dynamic";
import { NavLoader } from "@/components/nav-loader";
import { HeroSection } from "@/features/hero/components/hero-section";

const Navigation = dynamic(() => import("@/components/Navigation"), {
  ssr: false,
  loading: ({ isLoading }) => {
    if (isLoading) {
      return <NavLoader />;
    } else {
      return null;
    }
  },
});

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="flex-1">
        <HeroSection />
        <MaxWidthWrapper>
          <section className="py-8 md:py-14">
            <BestSellers />
          </section>
        </MaxWidthWrapper>

        <MaxWidthWrapper className="bg-stone-50">
          <section className="space-y-8 w-full py-12 md:py-16 lg:py-24">
            <div className="max-w-5xl mx-auto space-y-4">
              <p className="text-[#FBA328] text-center uppercase text-balance text-2xl md:text-3xl lg:text-4xl font-extrabold -tracking-tighter">
                Discover your favorite products in one quick stop
              </p>
            </div>

            <Products />
          </section>
        </MaxWidthWrapper>

        <section className="py-24 sm:py-30 md:py-36">
          <MaxWidthWrapper className="max-w-lg space-y-6 md:space-y-8">
            <p className="text-center -tracking-tighter text-xl md:text-2xl font-extrabold">
              DISCOVER EVERYDAY ESSENTIALS AT SHOP QUICKIE
            </p>
            <p className="text-balance text-xs md:text-sm -tracking-tighter">
              At Shop Quickie, we believe in the power of convenience.
              We&apos;re here to make shopping quick, simple, and
              stylish—because we know life moves fast, and so should your
              shopping experience. Our collections are crafted with care,
              blending quality with affordability. From comfortable apparel and
              unique jewelry pieces to cutting-edge electronics, we’re here to
              serve every need with style and purpose.
              <br />
              <br />
              Shop Quickie is your go-to for the latest fashion trends, whether
              you&apos;re looking to dress up for a night out, find cozy
              essentials for your downtime, or accessorize with jewelry that
              shines. Our carefully selected electronics provide more than just
              utility; they’re designed to fit seamlessly into your lifestyle,
              enhancing every moment from work to play.
              <br />
              <br />
              We understand that shopping today is about more than just
              products. That’s why we focus on creating a personalized
              experience with quick delivery and customer care that puts you
              first. Shop Quickie is committed to bringing you what you need,
              when you need it—redefining the future of convenient shopping.
            </p>
            <br />
            <Image
              priority
              src={"/logo.png"}
              width={80}
              height={80}
              className="object-cover mx-auto"
              alt=""
            />
          </MaxWidthWrapper>
        </section>
      </main>
    </>
  );
}
