import { Navbar } from "./navbar";
import { Logo } from "./logo";
import { AvatarLogin } from "./avatar-login";

export function Header() {
  return (
    <header className="border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center">
        <Logo />
        <Navbar />
      </div>
      < AvatarLogin />
    </header>
  );
}
