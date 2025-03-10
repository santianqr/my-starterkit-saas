import { SignUpForm } from "@/components/signup-form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function SingIn() {
  return <div>
        <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">
          Create an account
        </CardTitle>
        <CardDescription className="">
          Enter your information to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignUpForm />
      </CardContent>
      <CardFooter>
        <p className="w-full text-center text-sm">
          Already have an account?{" "}
          <Link
            href="/auth/sign"
            className=""
          >
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>

  </div>;
}
