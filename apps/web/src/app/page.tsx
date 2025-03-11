// import Link from "next/link";

// import { LatestPost } from "@/app/_components/post";
import { auth } from "@/server/auth";
// import { api, HydrateClient } from "@/trpc/server";
import { HydrateClient } from "@/trpc/server";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

export default async function Home() {
  // const hello = await api.post.hello({ text: "from tRPC" });
  const session = await auth();

  return (
    <HydrateClient>
      <main>
        <Button>Click me</Button>
        <ModeToggle />
        {JSON.stringify(session)}
      </main>
    </HydrateClient>
  );
}
