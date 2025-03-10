import { GoogleIcon } from "./icons/google";
import { Button } from "./ui/button";

export function GoogleButton() {
  return (
    <Button
      variant="outline"
      className="w-full"
    >
      <GoogleIcon />
      Sign up with Google
    </Button>
  );
}
