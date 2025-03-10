"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Button } from "@/components/ui/button";
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
import { GoogleButton } from "./google-button";
import { createAccountFormSchema } from "@/lib/formSchemas";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";

export function SignUpForm() {
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof createAccountFormSchema>>({
    resolver: zodResolver(createAccountFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const createAccount = api.auth.createAccount.useMutation({
    onSuccess: async () => {
      toast.success("Account created successfully");
      router.push('/auth/signin');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof createAccountFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    createAccount.mutate(values);
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground/80">Full Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="your name"
                  type="text"
                  className="bg-slate-800/70 border-slate-700 text-white placeholder:text-slate-500 focus:border-slate-200 focus:ring-1 focus:ring-blue-600"
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground/80">Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="your@email.com"
                  type="email"
                  className="bg-slate-800/70 border-slate-700 text-white placeholder:text-slate-500 focus:border-slate-200 focus:ring-1 focus:ring-blue-600"
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
              <FormLabel className="text-foreground/80">Password</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="*****"
                  className="bg-slate-800/70 border-slate-700 text-white placeholder:text-slate-500 focus:border-slate-200 focus:ring-1 focus:ring-blue-600"
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
          name="passwordConfirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground/80">Confirm Password</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="*****"
                  className="bg-slate-800/70 border-slate-700  placeholder:text-slate-500 focus:border-slate-200 focus:ring-1 focus:ring-blue-600"
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

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-medium py-2 mt-2"
          disabled={createAccount.isPending}
        >
          {createAccount.isPending ? (
            <Loader className="animate-spin" />
          ) : (
            "Sign Up"
          )}
        </Button>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-slate-900/80 px-2 text-slate-500">
              Or continue with
            </span>
          </div>
        </div>
        <GoogleButton />
      </form>
    </Form>
  );
}
