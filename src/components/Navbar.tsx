import { BsPinterest, BsSearch } from "react-icons/bs";
import Link from "next/link";
import { Input } from "./ui/input";
import AuthBtn from "./AuthBtn";
import { getAuthSession } from "@/app/api/auth/[...nextauth]/route";
import UserAccNav from "./userAccNav";
import NavLinks from "./NavLinks";

type Props = {};

const Navbar = async (props: Props) => {
  const session = await getAuthSession();

  return (
    <main className="py-5 px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <Link href="/">
            <BsPinterest size={36} className="text-red-600" />
          </Link>
          <NavLinks user={session?.user} />
        </div>
        <div className="flex w-full items-center justify-around">
          <div className="flex items-center w-full">
            <BsSearch
              className="md:relative md:left-[2.6rem] text-black"
              size={15}
            />
            <Input
              placeholder="Search"
              className="hidden text-black md:block font-semibold md:w-full rounded-full ml-4 pl-8 py-5  bg-[#e9e9e9] outline-none"
            />
          </div>
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
