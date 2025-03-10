import { GoogleIcon } from "./icons/google";
import { Button } from "./ui/button";

export function GoogleButton() {
  return (
    <Button
      variant="outline"
      className="w-full bg-slate-800/50 border border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white flex items-center justify-center gap-2"
    >
      <GoogleIcon />
      Sign up with Google
    </Button>
  );
}
