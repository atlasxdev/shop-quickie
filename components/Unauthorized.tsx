import { ArrowLeft, Lock } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

function Unauthorized() {
  const router = useRouter();

  return (
    <div className="rounded-lg max-w-screen-lg mx-auto flex-1 flex items-center justify-center h-[60vh] bg-white">
      <div className="flex flex-col gap-4">
        <div className="w-max mx-auto ">
          <Lock className="size-8" />
        </div>
        <h1 className="text-center font-extrabold text-xxl md:text-3xl -tracking-tighter">
          Unauthorized Access
        </h1>

        <p className="max-w-prose text-center text-sm md:text-base -tracking-tighter text-balance text-muted-foreground">
          You do not have permission to access this page. Please try again later
          if you believe this is an error.
        </p>
        <div className="w-max mx-auto space-x-4">
          <Button
            onClick={() => router.push("/store")}
            size={"lg"}
            variant={"secondary"}
            className="w-max rounded-full gap-2"
          >
            <ArrowLeft />
            Go back shopping
          </Button>
          <Button
            onClick={() => window.location.reload()}
            size={"lg"}
            className="w-max  rounded-full gap-2"
          >
            Try again
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Unauthorized;
