"use client";
import USERS from "../../data/users.json";
import { apiRoute } from "@/axios/apiRoute";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { wait } from "@/lib/utils";
import { TLoginSchema, ZodLoginSchema } from "@/zod-schema";
import { useCartStore, useUserStore } from "@/zustand-store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import Image from "next/image";
import Link from "next/link";
import { permanentRedirect, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { motion } from "framer-motion";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PasswordInput } from "@/components/ui/password-input";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import useMetadata from "@/hooks/use-metadata";

function Page() {
  useMetadata(
    "Login to Your Account - Shop Quickie",
    "Securely access your account at [Store Name]. Log in to view your orders, manage your profile, and enjoy a personalized shopping experience. Enter your username and password to get started."
  );
  const user = useUserStore((state) => state.user);
  const cart = useCartStore((state) => state.cart);
  const setCart = useCartStore((state) => state.setCart);
  const router = useRouter();
  const logIn = useUserStore((state) => state.logIn);
  const [isClient, setIsClient] = useState<boolean>(false);

  const { mutate, isPending } = useMutation({
    mutationFn: async ({ username, password }: TLoginSchema) => {
      return await apiRoute.post(`/auth/login`, {
        username,
        password,
      });
    },
    onMutate: () =>
      toast("🔑 Welcome!", {
        description: "Verifying your credentials...",
      }),
    onSuccess: async (data: AxiosResponse<{ token: string }>, { username }) => {
      toast.dismiss();
      const user = USERS.find((user) => user.username === username);
      if (!user) {
        throw new Error("No user found.");
      }
      logIn({ userId: user.id, token: data.data.token });
      if (user != null && cart != null) {
        localStorage.removeItem("cart");
        const updatedCart = [cart].map((v) => ({ ...v, userId: user.id }));
        setCart(updatedCart[0]);
      }
      await wait(1000);
      toast("🎉 Welcome back!", {
        description: "You’ve successfully logged in.",
      });
      router.back();
    },
    onError: () => {
      toast.dismiss();
      toast.error("Login failed!", {
        description: "Please check your credentials and try again.",
      });
      form.reset();
    },
  });

  const form = useForm<TLoginSchema>({
    resolver: zodResolver(ZodLoginSchema),
    defaultValues: {
      username: "mor_2314",
      password: "83r5^_",
    },
    mode: "onChange",
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  function submitForm(data: TLoginSchema) {
    mutate({ ...data });
  }

  if (!isClient) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-100">
        <motion.div
          className="flex space-x-2 animate-bounce"
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <div className="w-4 h-4 bg-orange-500 rounded-full" />
          <div className="w-4 h-4 bg-orange-600 rounded-full" />
          <div className="w-4 h-4 bg-orange-700 rounded-full" />
        </motion.div>
      </div>
    );
  }

  if (user != null) {
    permanentRedirect("/");
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6 lg:p-12">
      <Card className="max-w-screen-lg w-full grid grid-cols-1 lg:grid-cols-2 shadow-lg overflow-hidden rounded-lg">
        <div className="hidden lg:flex flex-col justify-center bg-gradient-to-b from-[#FBA328] to-orange-500 text-white p-10">
          <h2 className="text-2xl font-bold text-center mt-4">
            Welcome to Shop Quickie!
          </h2>
          <p className="text-center mt-2">
            Log in to explore amazing deals and manage your account
            effortlessly.
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white flex flex-col py-6 px-2 lg:p-8">
          {/* Go Back Button */}
          <Button
            variant="link"
            className="mb-4 text-[#FBA328] gap-2 w-max"
            onClick={() => router.back()}
            size={"sm"}
          >
            <ArrowLeft /> Go Back
          </Button>

          <CardHeader className="flex flex-col items-center mb-8">
            <Image src="/logo.png" alt="Logo" width={60} height={60} />
            <CardTitle className="text-xl md:text-2xl font-extrabold mt-4">
              Sign In
            </CardTitle>
            <CardDescription>Access your account below.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(submitForm)}
                className="space-y-4 md:space-y-6"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="-tracking-tighter text-xs">
                        Username
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="Enter your username"
                          className="-tracking-tighter !text-xs"
                        />
                      </FormControl>
                      <FormMessage className="-tracking-tighter text-[0.65rem] md:text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="-tracking-tighter text-xs">
                        Password
                      </FormLabel>
                      <FormControl>
                        <PasswordInput
                          {...field}
                          placeholder="Enter your password"
                          className="-tracking-tighter !text-xs"
                        />
                      </FormControl>
                      <FormMessage className="-tracking-tighter text-[0.65rem]" />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full bg-[#FBA328] text-white hover:bg-orange-600"
                  disabled={isPending}
                >
                  {isPending ? "Loading..." : "Log In"}
                </Button>
              </form>
            </Form>
          </CardContent>
          <div className="mt-6 text-center">
            <p className="-tracking-tighter text-xs">
              New to Shop Quickie?{" "}
              <Link href="/#" className="text-[#FBA328] hover:underline">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Page;
