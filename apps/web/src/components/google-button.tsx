import { GoogleIcon } from "./icons/google";
import { Button } from "./ui/button";

type GoogleButtonProps = {
  type: "up" | "in";
  onClick: () => void;
  disabled: boolean;
};

export function GoogleButton({ type, onClick, disabled }: GoogleButtonProps) {
  return (
    <Button
      variant="outline"
      className="w-full"
      onClick={onClick}
      disabled={disabled}
    >
      <GoogleIcon />
      {type === "up" ? "Sign up with Google" : "Sign in with Google"}
    </Button>
  );
}