"use client";

import { signOut } from "next-auth/react";
import {
  Card,
  // CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function SignOutPage() {
  const router = useRouter();
  return (
    <Card className="w-full max-w-md shadow-2xl backdrop-blur-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Logout Confirmation</CardTitle>
        <CardDescription className="text-foreground/60">
          Are you sure you want to log out of your account?
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button
          variant="destructive"
          onClick={async () => {
            await signOut({redirectTo: "/"});
          }}
        >
          Log out
        </Button>
      </CardFooter>
    </Card>
  );
}
