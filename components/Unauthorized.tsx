import { ArrowLeft, Lock } from "lucide-react";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

function Unauthorized() {
  return (
    <Card className="border-0 shadow-none sm:border sm:shadow rounded-lg max-w-lg mx-auto flex-1 flex flex-col items-center justify-center bg-white px-6">
      <CardHeader className="flex flex-col gap-4">
        <div className="w-max mx-auto ">
          <Lock className="size-8" />
        </div>
        <CardTitle className="text-center font-extrabold text-xl md:text-2xl -tracking-tighter">
          Unauthorized Access
        </CardTitle>

        <CardDescription className="max-w-prose text-center text-xs md:text-sm -tracking-tighter text-balance">
          You do not have permission to access this page. Please try again later
          if you believe this is an error.
        </CardDescription>
      </CardHeader>
      <CardFooter className="w-max mx-auto space-x-4">
        <Link
          href={"/store"}
          className={buttonVariants({
            className: "w-max !rounded-full gap-2",
            variant: "secondary",
            size: "sm",
          })}
        >
          <ArrowLeft />
          Go back shopping
        </Link>
        <Button
          onClick={() => window.location.reload()}
          className="w-max  rounded-full gap-2"
          size={"sm"}
        >
          Try again
        </Button>
      </CardFooter>
    </Card>
  );
}

export default Unauthorized;
