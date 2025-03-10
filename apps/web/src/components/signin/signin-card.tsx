import Link from "next/link";
import { SignInForm } from "@/components/signin/signin-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function SignInCard() {
  return (
    <Card className="w-full max-w-md backdrop-blur-md shadow-2xl">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">
          Create an account
        </CardTitle>
        <CardDescription className="text-foreground/60">
          Enter your information to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignInForm />
      </CardContent>
      <CardFooter>
        <p className="w-full text-center text-sm text-slate-400">
        Don&apos;t have an account?{" "}
          <Link
            href="/auth/signup"
            className="text-primary hover:text-primary/80 font-medium"
          >
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
