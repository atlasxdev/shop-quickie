import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DELIVERY_OPTIONS } from "./review-order";
import { Separator } from "@/components/ui/separator";

function OrderSummary({
  isValid,
  title,
  price,
  quantity,
  orderTotal,
  deliveryOption,
}: {
  title: string;
  price: number;
  quantity: number;
  isValid: boolean;
  orderTotal: number;
  deliveryOption?: (typeof DELIVERY_OPTIONS)[0];
}) {
  return (
    <Card className={"w-full h-max"}>
      <CardHeader className="space-y-4">
        <CardTitle className="text-[#FBA328] uppercase -tracking-tighter">
          Order summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-0.5">
            <span className="w-7 flex font-medium text-xs -tracking-tighter">
              {quantity} x
            </span>
            <span className="text-[0.7rem] -tracking-tighter font-medium text-balance">
              {title}
            </span>
          </div>

          <div className="space-x-1">
            <span>+</span>
            <AnimatedNumber
              className="text-xs"
              value={price * quantity}
              isPrice={true}
            />
          </div>
        </div>

        {deliveryOption != null ? (
          <>
            <Separator />
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="font-medium text-xs uppercase -tracking-tighter">
                  Delivery option
                </span>
                <span className="text-[0.7rem] -tracking-tighter font-medium text-muted-foreground">
                  {" "}
                  {deliveryOption.title}
                </span>
              </div>

              <div className="space-x-1">
                <span>+</span>
                <AnimatedNumber
                  className="text-xs"
                  value={deliveryOption.price}
                  isPrice={true}
                />
              </div>
            </div>
          </>
        ) : null}
        <Separator />
        <div className="flex justify-between items-center">
          <span className="font-bold text-sm uppercase -tracking-tighter">
            Order total
          </span>

          <AnimatedNumber value={orderTotal} isPrice={true} />
        </div>
        <Button disabled={!isValid} className="rounded-full w-full">
          Complete Order
        </Button>
      </CardContent>
    </Card>
  );
}

export default OrderSummary;
