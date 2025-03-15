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
import { useState } from "react";
import { Loader } from "lucide-react";

export default function SignOutPage() {
  const [loading, setLoading] = useState(false);
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
            setLoading(true);
            await signOut({redirectTo: "/"});
            setLoading(false); 
          }}
          disabled={loading}
          className="w-24 flex justify-center"
        >
          {loading ? <Loader className="animate-spin" /> : "Sign Out"}
        </Button>
      </CardFooter>
    </Card>
  );
}
