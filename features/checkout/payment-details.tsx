"use client";

import { ErrorMessage } from "@/components/ErrorMessage";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { TCreditCardSchema, ZodCreditCardSchema } from "@/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useForm } from "react-hook-form";
import OrderSummary from "./order-summary";
import { DELIVERY_OPTIONS } from "./review-order";

const BANKS = [
  "/american-express-logo.png",
  "/mastercard-logo.png",
  "/visa-logo.jpg",
];

export function PaymentDetails({
  title,
  price,
  quantity,
  deliveryOption,
  isFormValid,
  orderTotal,
}: {
  title: string;
  quantity: number;
  price: number;
  deliveryOption?: (typeof DELIVERY_OPTIONS)[0];
  isFormValid: boolean;
  orderTotal: number;
}) {
  const {
    register,
    formState: { errors, isValid },
  } = useForm<TCreditCardSchema>({
    resolver: zodResolver(ZodCreditCardSchema),
    defaultValues: {
      cardHolderName: "",
      cardNumber: "",
      cvv: "",
      expirationDate: "",
    },
    mode: "onChange",
  });

  return (
    <div className="w-full h-max space-y-6 md:space-y-8">
      <Card
        className={cn("w-full h-max", {
          "pointer-events-none opacity-40": !isFormValid,
        })}
      >
        <CardHeader className="space-y-4">
          <CardTitle className="text-[#FBA328] uppercase -tracking-tighter">
            3. Payment details
          </CardTitle>
          <CardDescription className="font-medium -tracking-tighter text-xs">
            All fields are required*
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="w-full px-4 flex justify-between items-center rounded-md border">
            <CardDescription className="font-medium -tracking-tighter text-xs">
              Credit Card
            </CardDescription>
            <div className="flex items-center justify-center py-2 gap-2">
              {BANKS.map((imageUrl) => (
                <Image
                  key={imageUrl}
                  src={imageUrl}
                  alt=""
                  width={40}
                  height={40}
                  className="object-cover"
                />
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <div className="space-y-0.5">
              <Label className="text-xs -tracking-tighter">
                Card holder name
              </Label>
              <Input {...register("cardHolderName")} />
              {errors.cardHolderName && (
                <AnimatePresence>
                  <ErrorMessage message={errors.cardHolderName.message} />
                </AnimatePresence>
              )}
            </div>
            <div className="flex gap-2">
              <div className="space-y-0.5">
                <Label className="text-xs -tracking-tighter">Card number</Label>
                <Input {...register("cardNumber")} />
                {errors.cardNumber && (
                  <AnimatePresence>
                    <ErrorMessage message={errors.cardNumber.message} />
                  </AnimatePresence>
                )}
              </div>
              <div className="space-y-0.5">
                <Label className="text-xs -tracking-tighter">
                  Expiration date
                </Label>
                <Input {...register("expirationDate")} />
                {errors.expirationDate && (
                  <AnimatePresence>
                    <ErrorMessage message={errors.expirationDate.message} />
                  </AnimatePresence>
                )}
              </div>
            </div>
            <div className="space-y-0.5">
              <Label className="text-xs -tracking-tighter">CVV</Label>
              <Input {...register("cvv")} />
              {errors.cvv && (
                <AnimatePresence>
                  <ErrorMessage message={errors.cvv.message} />
                </AnimatePresence>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <OrderSummary
        title={title}
        quantity={quantity}
        price={price}
        deliveryOption={deliveryOption}
        orderTotal={orderTotal}
        isValid={isValid}
      />
    </div>
  );
}
