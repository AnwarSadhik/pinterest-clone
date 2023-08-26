"use client";
import React from "react";
import { AiFillHome } from "react-icons/ai";
import { MdExplore } from "react-icons/md";
import { IoIosCreate } from "react-icons/io";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";

type User = {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
};

type Props = {
  // user: {
  //   name?: string;
  //   email?: string;
  //   image?: string;
  // };
  user: User | null | undefined;
};

interface NavLink {
  title: string;
  icon: React.ReactNode;
  path: string;
}

const navLinks: NavLink[] = [
  {
    title: "Home",
    icon: <AiFillHome size={21} />,
    path: "/",
  },
  {
    title: "Explore",
    icon: <MdExplore size={21} />,
    path: "/explore",
  },
  {
    title: "Create",
    icon: <IoIosCreate size={21} />,
    path: "/create",
  },
];

const NavLinks = ({ user }: Props) => {
  const router = useRouter();
  const [activeLink, setActiveLink] = React.useState<string | null>("/");
  const { toast } = useToast();

  const handleLinkClick = (path: string) => {
    setActiveLink(path);
  };

  React.useEffect(() => {
    if (!user && activeLink === "/create") {
      // window.alert("Login first to create a pin")
      router.push("/");
      setActiveLink("/");
      toast({
        title: "Login First!",
        description: "You must be logged in to create a Pin",
        variant: "destructive",
      });
    }
  }, [activeLink, user, router]);

  return (
    <div className="hidden md:flex items-center space-x-4">
      {navLinks.map((link) => (
        <Link
          key={link.title}
          href={link.path}
          onClick={() => handleLinkClick(link.path)}
          className={`flex items-center gap-x-2 ${
            activeLink === link.path
              ? "bg-[#121212] py-[1px] px-2 rounded-md font-extrabold text-white transition-all"
              : "text-black"
          }`}
        >
          <div className="mb-1">{link.icon}</div>
          <div className="text-lg">{link.title}</div>
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;
