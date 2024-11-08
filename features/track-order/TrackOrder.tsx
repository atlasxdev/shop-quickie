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
import { OrderAnimation } from "@/features/track-order/order-animation";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function TrackOrder({ trackingId }: { trackingId: string }) {
  const router = useRouter();
  return (
    <div className="flex-1 py-12 md:py-14 lg:py-14 bg-stone-50">
      <MaxWidthWrapper className="max-w-lg">
        <div className="space-y-4">
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
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
