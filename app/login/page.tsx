"use client";

import { apiRoute } from "@/axios/apiRoute";
import { ErrorMessage } from "@/components/ErrorMessage";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn, wait } from "@/lib/utils";
import { TLoginSchema, ZodLoginSchema } from "@/zod-schema";
import { useUserStore } from "@/zustand-store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { AnimatePresence } from "framer-motion";
import { ArrowLeft, Loader, LogIn } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import USERS from "../../data/users.json";

function Page() {
  const router = useRouter();
  const logIn = useUserStore((state) => state.logIn);
  const { mutate, isPending } = useMutation({
    mutationFn: async ({ username, password }: TLoginSchema) => {
      return await apiRoute.post(`/auth/login`, {
        username,
        password,
      });
    },
    onMutate: () =>
      toast("🔑 Welcome!", {
        description: "Just a moment while we verify your credentials",
      }),
    onSuccess: async (data: AxiosResponse<{ token: string }>, { username }) => {
      const user = USERS.find((user) => user.username == username);
      logIn(data.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({ token: data.data.token, userId: user?.id })
      );
      await wait(1000);
      toast("Welcome back! 🎉", {
        description: "You’ve successfully logged in.",
      });
      router.back();
    },
    onError: () => {
      toast.error("Oops! We couldn't log you in.", {
        description: "Please check your credentials and try again.",
      });
      reset();
    },
  });

  const {
    register,
    formState: { errors, isValid },
    reset,
    handleSubmit,
  } = useForm<TLoginSchema>({
    resolver: zodResolver(ZodLoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onChange",
  });

  function submitForm(data: TLoginSchema) {
    mutate({ ...data });
  }

  return (
    <div className="px-6 md:px-0 relative flex-1 flex items-center justify-center bg-[#F5F5F7] py-12 md:py-14 lg:py-16">
      <Link
        href={"/store"}
        className={buttonVariants({
          variant: "link",
          className: cn(
            "-tracking-tighter absolute top-5 left-5 gap-2 !text-[#FBA328]",
            {
              "pointer-events-none": isPending,
            }
          ),
        })}
      >
        <ArrowLeft />
        Continue shopping
      </Link>
      <Card className="mt-8 md:mt-0 max-w-sm w-full h-96">
        <CardHeader className="flex items-center justify-center">
          <Image src={"/logo.png"} priority width={60} height={60} alt="" />
          <CardTitle className="text-xl font-bold -tracking-tighter">
            Welcome
          </CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit(submitForm)}>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label className="text-xs -tracking-tighter">Username</Label>
              <Input {...register("username")} autoFocus className="text-xs" />
              <AnimatePresence>
                {errors.username && (
                  <ErrorMessage message={errors.username.message} />
                )}
              </AnimatePresence>
            </div>
            <div className="space-y-1">
              <Label className="text-xs -tracking-tighter">Password</Label>
              <Input {...register("password")} className="" type="password" />
              <AnimatePresence>
                {errors.password && (
                  <ErrorMessage message={errors.password.message} />
                )}
              </AnimatePresence>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              disabled={!isValid}
              className={cn("w-full rounded-full gap-2", {
                "animate-pulse pointer-events-none": isPending,
              })}
            >
              Login{" "}
              {isPending ? <Loader className="animate-spin" /> : <LogIn />}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default Page;
