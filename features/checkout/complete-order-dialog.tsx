"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { CardDescription } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useRouter } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useMediaQuery } from "usehooks-ts";
import { toast } from "sonner";
import { wait } from "@/lib/utils";

export function CompleteOrderDialog({ isValid }: { isValid: boolean }) {
  const router = useRouter();
  const matches = useMediaQuery("(min-width: 768px)");
  const [isChecked, setIsChecked] = useState<CheckedState>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <h1>Loading...</h1>;
  }

  async function handleOrder() {
    toast.info("🚚 Processing Your Order!", {
      description: "Sit tight and while your order is being processed.",
      duration: 1000,
    });
    setIsLoading(true);
    await wait(2000);
    setIsLoading(false);
    router.push("/order-success");
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          disabled={!isValid || isLoading}
          className="uppercase -tracking-tighter rounded-full w-full"
        >
          Complete Order
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-base uppercase text-center -tracking-tighter">
            Confirmation of Purchase and Information Review
          </AlertDialogTitle>
          <AlertDialogDescription className="text-xs text-pretty -tracking-tighter">
            By proceeding with this purchase, you acknowledge and agree to the
            following:
          </AlertDialogDescription>
        </AlertDialogHeader>
        {matches ? (
          <ol className="space-y-2">
            <li className="flex flex-col gap-1">
              <span className="text-xs font-semibold">
                1. Review of Information
              </span>
              <span className="text-xs ml-4 text-muted-foreground -tracking-tighter text-pretty">
                Please carefully review all details you have provided, including
                but not limited to payment information, shipping address,
                contact details, and product selections. You confirm that all
                information is accurate and up-to-date.
              </span>
            </li>
            <li className="flex flex-col gap-1">
              <span className="text-xs font-semibold">
                2. Irreversible Transaction
              </span>
              <span className="text-xs ml-4 text-muted-foreground -tracking-tighter text-pretty">
                Once you confirm this action, the transaction will be considered
                final and cannot be undone. This includes any modifications to
                shipping or payment information. Any corrections or
                cancellations must be made before confirming this purchase.
              </span>
            </li>
            <li className="flex flex-col gap-1">
              <span className="text-xs font-semibold">
                3. Agreement to Terms of Sale
              </span>
              <span className="text-xs ml-4 text-muted-foreground -tracking-tighter text-pretty">
                By selecting the checkbox below and proceeding, you accept our
                terms of sale, which include the conditions and limitations of
                refunds, exchanges, and returns as applicable under our policy.
                You understand that any requests outside of these terms may not
                be honored.
              </span>
            </li>
          </ol>
        ) : (
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-xs font-semibold">
                1. Review of Information
              </AccordionTrigger>
              <AccordionContent className="text-xs ml-4 text-muted-foreground -tracking-tighter text-pretty">
                Once you confirm this action, the transaction will be considered
                final and cannot be undone. This includes any modifications to
                shipping or payment information. Any corrections or
                cancellations must be made before confirming this purchase.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-xs font-semibold">
                2. Irreversible Transaction
              </AccordionTrigger>
              <AccordionContent className="text-xs ml-4 text-muted-foreground -tracking-tighter text-pretty">
                Please carefully review all details you have provided, including
                but not limited to payment information, shipping address,
                contact details, and product selections. You confirm that all
                information is accurate and up-to-date.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-xs font-semibold">
                3. Agreement to Terms of Sale
              </AccordionTrigger>
              <AccordionContent className="text-xs ml-4 text-muted-foreground -tracking-tighter text-pretty">
                By selecting the checkbox below and proceeding, you accept our
                terms of sale, which include the conditions and limitations of
                refunds, exchanges, and returns as applicable under our policy.
                You understand that any requests outside of these terms may not
                be honored.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}

        <div className="mt-2 flex flex-col gap-2">
          <span className="text-xs -tracking-tighter text-pretty">
            Please confirm your agreement by checking the box below. This action
            signifies that you fully understand and accept the conditions
            outlined above.
          </span>
          <div className="flex space-x-2">
            <Checkbox onCheckedChange={(checked) => setIsChecked(checked)} />
            <CardDescription className="text-xs -tracking-tighter text-pretty">
              I confirm that all information provided is accurate and that I
              agree to complete this purchase with the understanding that this
              action cannot be undone.
            </CardDescription>
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel className="rounded-full">Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="rounded-full"
            disabled={!isChecked}
            onClick={async () => await handleOrder()}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
