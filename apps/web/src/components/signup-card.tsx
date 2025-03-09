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
    <Card className="w-full max-w-md border-muted shadow-lg bg-gray-900 border-gray-800">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold">
            Create an account
          </CardTitle>
        </div>
        <CardDescription>
          Enter your information to create your account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <SignUpForm />
      </CardContent>
      <CardFooter>
        <p className="w-full text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="underline underline-offset-4 hover:text-primary"
          >
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
