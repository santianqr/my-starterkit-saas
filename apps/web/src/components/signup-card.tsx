import Link from "next/link";
import { SignUpForm } from "./signup-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

export function SignUpCard() {
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
        <SignUpForm />
      </CardContent>
      <CardFooter>
        <p className="w-full text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link
            href="/auth/sign"
            className="text-primary hover:text-primary/80 font-medium"
          >
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
