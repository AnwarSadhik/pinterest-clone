"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import React from "react";
import { signOut } from "next-auth/react";
import { LuLogOut } from "react-icons/lu";
import UserAvatar from "./UserProfile";
import { getFirestore } from '@/lib/firebase';
import { doc, setDoc } from "firebase/firestore";
import { redirect, useRouter } from "next/navigation";
 
type Props = {
  user: {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
  };
};

const UserAccountNav = ({ user }: Props) => {
  const db = getFirestore();
  const router = useRouter();
    
  const saveUser = async (user: any) => {
    if (user) {
      try {
        // console.log("Attempting to save user data:", user);
        const docRef = doc(db, "users", user.name);
        await setDoc(docRef, {
          userName: user.name,
          email: user.email,
          profile: user.image,
        });
        // console.log("User data saved:", user.email);
      } catch (error) {
        console.error("Error saving user data:", error);
      }
    }
  };

  React.useEffect(() => {
    // console.log("User prop changed:", user);
    saveUser(user);
  }, [user]);

  // const userName = generateUsername("",0,9);
  // console.log(userName);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {/* <img src={user.image as string} alt="pfp" className="w-10 h-10 rounded-full"/> */}
        <UserAvatar user={user} />
        <DropdownMenuContent className="bg-white " align="end">
          <div className="flex items-center justify-start gap-2 p-2">
            <div className="flex flex-col space-y-1 leading-none">
              {user.name && (
                <p className="font-medium dark:text-black">{user.name}</p>
              )}
              {user.email && (
                <p className="w-[200px] truncate text-sm text-zinc-700">
                  {user.email}
                </p>
              )}
            </div>
          </div>

          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer dark:text-black dark:bg-transparent"
            onClick={() => {
              router.push("/profile/" + `${user.name}`);
            }}
          >
            My profile
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={(e) => {
              e.preventDefault();
              signOut().catch(console.error);
            }}
            className="text-red-500 cursor-pointer"
          >
            Sign Out
            <LuLogOut className="w-4 h-4 ml-2" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
};

export default UserAccountNav;
