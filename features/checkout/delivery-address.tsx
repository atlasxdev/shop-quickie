import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { DELIVERY_OPTIONS } from "./review-order";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { AnimatePresence } from "framer-motion";
import { ZodCheckoutSchema, TCheckoutSchema } from "@/zod-schema";
import { PaymentDetails } from "./payment-details";
import { ErrorMessage } from "@/components/ErrorMessage";

export function DeliveryAddress({
  title,
  quantity,
  price,
  selected,
}: {
  title: string;
  quantity: number;
  price: number;
  selected: (typeof DELIVERY_OPTIONS)[0] | null;
}) {
  const {
    register,
    formState: { errors, isValid },
  } = useForm<TCheckoutSchema>({
    resolver: zodResolver(ZodCheckoutSchema),
    defaultValues: {
      email: "",
      fullName: "",
      mobile: "",
      deliveryAddress: "",
      suburbOrTown: "",
      cityOrState: "",
      country: "",
      postalOrZipCode: "",
    },
    mode: "onChange",
  });

  return (
    <>
      <Card
        className={cn("w-full h-max", {
          "pointer-events-none opacity-40": selected == null,
        })}
      >
        <CardHeader className="space-y-4">
          <CardTitle className="text-[#FBA328] uppercase -tracking-tighter">
            2. Delivery address
          </CardTitle>
          <CardDescription className="font-medium -tracking-tighter text-xs">
            All fields are required*
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-0.5">
            <Label className="text-xs -tracking-tighter">Email address*</Label>

            <Input {...register("email")} />
            {errors.email && (
              <AnimatePresence>
                <ErrorMessage message={errors.email.message} />
              </AnimatePresence>
            )}
          </div>
          <div className="space-y-0.5">
            <Label className="text-xs -tracking-tighter">Full name*</Label>
            <Input {...register("fullName")} />
            {errors.fullName && (
              <AnimatePresence>
                <ErrorMessage message={errors.fullName.message} />
              </AnimatePresence>
            )}
          </div>
          <div className="space-y-0.5">
            <Label className="text-xs -tracking-tighter">Mobile*</Label>
            <Input {...register("mobile")} />
            {errors.mobile && (
              <AnimatePresence>
                <ErrorMessage message={errors.mobile.message} />
              </AnimatePresence>
            )}
          </div>
          <div className="space-y-0.5">
            <Label className="text-xs -tracking-tighter">
              Delivery address*
            </Label>
            <Textarea
              {...register("deliveryAddress")}
              className="text-xs"
              placeholder="Street name, Building, House no."
            />
            {errors.deliveryAddress && (
              <AnimatePresence>
                <ErrorMessage message={errors.deliveryAddress.message} />
              </AnimatePresence>
            )}
          </div>
          <div className="space-y-0.5">
            <Label className="text-xs -tracking-tighter">Suburb/Town*</Label>
            <Input {...register("suburbOrTown")} />
            {errors.suburbOrTown && (
              <AnimatePresence>
                <ErrorMessage message={errors.suburbOrTown.message} />
              </AnimatePresence>
            )}
          </div>
          <div className="space-y-0.5">
            <Label className="text-xs -tracking-tighter">City/State*</Label>
            <Input {...register("cityOrState")} />
            {errors.cityOrState && (
              <AnimatePresence>
                <ErrorMessage message={errors.cityOrState.message} />
              </AnimatePresence>
            )}
          </div>
          <div className="space-y-0.5">
            <Label className="text-xs -tracking-tighter">
              Postcode/ZIP Code*
            </Label>
            <Input {...register("postalOrZipCode")} />
            {errors.postalOrZipCode && (
              <AnimatePresence>
                <ErrorMessage message={errors.postalOrZipCode.message} />
              </AnimatePresence>
            )}
          </div>
          <div className="space-y-0.5">
            <Label className="text-xs -tracking-tighter">Country*</Label>
            <Input {...register("country")} />
            {errors.country && (
              <AnimatePresence>
                <ErrorMessage message={errors.country.message} />
              </AnimatePresence>
            )}
          </div>
        </CardContent>
      </Card>
      {selected == null ? (
        <PaymentDetails
          title={title}
          price={price}
          quantity={quantity}
          orderTotal={price * quantity + 0}
          isFormValid={isValid}
        />
      ) : (
        <PaymentDetails
          title={title}
          price={price}
          quantity={quantity}
          deliveryOption={selected}
          orderTotal={price * quantity + selected.price}
          isFormValid={isValid}
        />
      )}
    </>
  );
}
