import Pins from "@/components/Pins";
import { getAuthSession } from "../api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getAuthSession();
  // console.log(user)
  return (
    <main className="mx-auto py-2 md:px-16">
        <Pins user={session?.user}/>
    </main>
  );
}