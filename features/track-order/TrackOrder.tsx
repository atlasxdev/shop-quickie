"use client";

import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import Unauthorized from "@/components/Unauthorized";
import { OrderAnimation } from "@/features/track-order/order-animation";
import { ArrowLeft, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function TrackOrder({ trackingId }: { trackingId: string }) {
  const router = useRouter();
  const [isClient, setIsClient] = useState<boolean>(false);
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
    setUser(localStorage.getItem("user") ?? null);
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

  return (
    <div className="flex-1 py-12 md:py-14 lg:py-14 bg-stone-50">
      <MaxWidthWrapper className="max-w-lg">
        <Card className="bg-white">
          <div className="p-4">
            <Button
              onClick={() => router.back()}
              className="w-max mr-auto gap-2 text-[#FBA328]"
              variant={"link"}
              size={"sm"}
            >
              <ArrowLeft />
              Go back
            </Button>
          </div>
          <div className="w-max mx-auto">
            <OrderAnimation />
          </div>
          <CardHeader>
            <CardDescription className="font-medium text-xs -tracking-tighter">
              Your Order ID
            </CardDescription>
            <CardTitle className="text-lg">{trackingId}</CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="px-0">
            <div className="py-4 px-6 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <Checkbox checked />
                <span className="text-xs -tracking-tighter font-semibold">
                  Order confirmed
                </span>
              </div>
              <p className="text-xs -tracking-tighter">12:30 PM</p>
            </div>
            <Separator />
            <div className="py-4 px-6 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <Checkbox disabled />
                <span className="text-xs -tracking-tighter text-muted-foreground font-semibold">
                  Preparing your order
                </span>
              </div>
              <p className="text-xs -tracking-tighter text-muted-foreground">
                In progress
              </p>
            </div>

            <Separator />
            <div className="py-4 px-6 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <Checkbox disabled />
                <span className="text-xs -tracking-tighter text-muted-foreground font-semibold">
                  Order is on the way
                </span>
              </div>
              <p className="text-xs -tracking-tighter text-muted-foreground">
                In progress
              </p>
            </div>
          </CardContent>
        </Card>
      </MaxWidthWrapper>
    </div>
  );
}
