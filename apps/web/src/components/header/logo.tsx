import Link from "next/link";

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Link href="/" className="flex items-center space-x-2">
        <span className="text-xl font-bold">SaaS Kit</span>
      </Link>
    </div>
  );
}
