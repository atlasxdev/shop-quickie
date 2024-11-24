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
import { useMediaQuery } from "usehooks-ts";

export function DeliveryAddress({
  productsWithQuantities,
  selected,
}: {
  productsWithQuantities: { [key: string]: string }[];
  selected: (typeof DELIVERY_OPTIONS)[0] | null;
}) {
  const matches = useMediaQuery("(min-width: 768px)");
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
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (selected != null && inputRef.current != null && matches) {
      inputRef.current.focus();

      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (selected != null && containerRef.current != null) {
      containerRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [matches, selected]);

  return (
    <>
      <Card
        ref={containerRef}
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
              className="text-xs md:text-sm"
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
            <Input className="text-xs md:text-sm" {...register("fullName")} />
            <AnimatePresence>
              {errors.fullName && (
                <ErrorMessage message={errors.fullName.message} />
              )}
            </AnimatePresence>
          </div>
          <div className="space-y-0.5">
            <Label className="text-xs -tracking-tighter">Mobile*</Label>
            <Input className="text-xs md:text-sm" {...register("mobile")} />
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
            <Input
              className="text-xs md:text-sm"
              {...register("suburbOrTown")}
            />
            <AnimatePresence>
              {errors.suburbOrTown && (
                <ErrorMessage message={errors.suburbOrTown.message} />
              )}
            </AnimatePresence>
          </div>
          <div className="space-y-0.5">
            <Label className="text-xs -tracking-tighter">City/State*</Label>
            <Input
              className="text-xs md:text-sm"
              {...register("cityOrState")}
            />
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
            <Input
              className="text-xs md:text-sm"
              {...register("postalOrZipCode")}
            />
            <AnimatePresence>
              {errors.postalOrZipCode && (
                <ErrorMessage message={errors.postalOrZipCode.message} />
              )}
            </AnimatePresence>
          </div>
          <div className="space-y-0.5">
            <Label className="text-xs -tracking-tighter">Country*</Label>
            <Input className="text-xs md:text-sm" {...register("country")} />
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
          productsWithQuantities={productsWithQuantities}
          isFormValid={isValid}
        />
      ) : (
        <PaymentDetails
          productsWithQuantities={productsWithQuantities}
          deliveryOption={selected}
          isFormValid={isValid}
        />
      )}
    </>
  );
}
