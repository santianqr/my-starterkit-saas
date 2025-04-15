"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Form,
  FormControl,
  //   FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/input-password";
import { Separator } from "@/components/ui/separator";
import { GoogleButton } from "@/components/google-button";
import { signinFormSchema } from "@/lib/schemas";
// import { api } from "@/trpc/react";
import { toast } from "sonner";
import { Loader } from "lucide-react";
// import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
// import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function SignInForm() {
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof signinFormSchema>>({
    resolver: zodResolver(signinFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof signinFormSchema>) {
    setLoading(true);
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const response = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (response && !response.error) {
      router.push("/");
    } else {
      toast.error("Wrong email or password");
    }
    setLoading(false);
  }

  async function googleOnSubmit(){
    try {
      await signIn("google", { callbackUrl: "/" }); // Redirect to home after successful sign-in
    } catch (error) {
      toast.error("Failed to sign in with Google");
    } finally {
      setGoogleLoading(false);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="">Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="your@email.com"
                  type="email"
                  className=""
                  {...field}
                />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <FormLabel className="">Password</FormLabel>
                  <Link
                    href="/auth/forgot-password"
                    className="ml-auto text-xs underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <FormControl>
                <PasswordInput placeholder="*****" className="" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="mt-2 w-full bg-gradient-to-r from-blue-600 to-blue-800 py-2 font-medium text-white hover:from-blue-700 hover:to-blue-900"
          disabled={loading}
        >
          {loading ? <Loader className="animate-spin" /> : "Sign In"}
        </Button>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative text-center text-xs after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">
              OR CONTINUE WITH
            </span>
          </div>
        </div>
        {/* {message && (
          <div className="text-red-500 text-center">{message}</div>
        )} */}
        <GoogleButton type="in" onClick={googleOnSubmit} disabled={googleLoading} />
      </form>
    </Form>
  );
}
