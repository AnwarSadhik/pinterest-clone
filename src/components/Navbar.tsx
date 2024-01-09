import { BsPinterest, BsSearch } from "react-icons/bs";
import Link from "next/link";
import { Input } from "./ui/input";
import AuthBtn from "./AuthBtn";
import { getAuthSession } from "@/app/api/auth/[...nextauth]/route";
import UserAccNav from "./userAccNav";
import NavLinks from "./NavLinks";
import SearchPins from "./SearchPins";

type Props = {};

const Navbar = async (props: Props) => {
  const session = await getAuthSession();
  return (
    <main className="py-5 px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center md:gap-x-8 px-2">
          <Link href="/">
            <BsPinterest
              size={36}
              className="text-red-600 absolute left-2 top-6 md:block"
            />
          </Link>
          <NavLinks user={session?.user} />
        </div>
        <div className="flex w-full items-center justify-around">
          <SearchPins />
          <div className="px-4 md:flex items-center md:gap-x-2">
            <div>
              {session?.user ? <UserAccNav user={session.user} /> : <AuthBtn />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Navbar;
