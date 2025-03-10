import { GoogleIcon } from "./icons/google";
import { Button } from "./ui/button";

type GoogleButtonProps = {
  type: "up" | "in";
};

export function GoogleButton({ type }: GoogleButtonProps) {
  return (
    <Button
      variant="outline"
      className="w-full"
    >
      <GoogleIcon />
      {type === "up" ? "Sign up with Google" : "Sign in with Google"}
    </Button>
  );
}