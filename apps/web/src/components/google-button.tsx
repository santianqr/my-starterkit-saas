import { GoogleIcon } from "./icons/google";
import { Button } from "./ui/button";

export function GoogleButton() {
  return (
    <Button
      variant="outline"
      className="flex w-full items-center justify-center gap-2"
    >
      <GoogleIcon />
      Sign up with Google
    </Button>
  );
}
