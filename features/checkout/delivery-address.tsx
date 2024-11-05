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
import React, { useEffect, useRef } from "react";
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
  const inputRef = useRef<HTMLInputElement | null>(null);
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
  const { ref, ...rest } = register("email");

  useEffect(() => {
    if (selected != null && inputRef.current != null) {
      inputRef.current.focus();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [selected]);

  return (
    <>
      <Card
        className={cn("w-full h-max", {
          "pointer-events-none opacity-60": selected == null,
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

            <Input
              {...rest}
              name="email"
              ref={(e) => {
                ref(e);
                inputRef.current = e;
              }}
            />
            <AnimatePresence>
              {errors.email && <ErrorMessage message={errors.email.message} />}
            </AnimatePresence>
          </div>
          <div className="space-y-0.5">
            <Label className="text-xs -tracking-tighter">Full name*</Label>
            <Input {...register("fullName")} />
            <AnimatePresence>
              {errors.fullName && (
                <ErrorMessage message={errors.fullName.message} />
              )}
            </AnimatePresence>
          </div>
          <div className="space-y-0.5">
            <Label className="text-xs -tracking-tighter">Mobile*</Label>
            <Input {...register("mobile")} />
            <AnimatePresence>
              {errors.mobile && (
                <ErrorMessage message={errors.mobile.message} />
              )}
            </AnimatePresence>
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
            <AnimatePresence>
              {errors.deliveryAddress && (
                <ErrorMessage message={errors.deliveryAddress.message} />
              )}
            </AnimatePresence>
          </div>
          <div className="space-y-0.5">
            <Label className="text-xs -tracking-tighter">Suburb/Town*</Label>
            <Input {...register("suburbOrTown")} />
            <AnimatePresence>
              {errors.suburbOrTown && (
                <ErrorMessage message={errors.suburbOrTown.message} />
              )}
            </AnimatePresence>
          </div>
          <div className="space-y-0.5">
            <Label className="text-xs -tracking-tighter">City/State*</Label>
            <Input {...register("cityOrState")} />
            <AnimatePresence>
              {errors.cityOrState && (
                <ErrorMessage message={errors.cityOrState.message} />
              )}
            </AnimatePresence>
          </div>
          <div className="space-y-0.5">
            <Label className="text-xs -tracking-tighter">
              Postcode/ZIP Code*
            </Label>
            <Input {...register("postalOrZipCode")} />
            <AnimatePresence>
              {errors.postalOrZipCode && (
                <ErrorMessage message={errors.postalOrZipCode.message} />
              )}
            </AnimatePresence>
          </div>
          <div className="space-y-0.5">
            <Label className="text-xs -tracking-tighter">Country*</Label>
            <Input {...register("country")} />
            <AnimatePresence>
              {errors.country && (
                <ErrorMessage message={errors.country.message} />
              )}
            </AnimatePresence>
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
