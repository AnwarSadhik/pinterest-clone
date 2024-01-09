"use client";
import app from "@/lib/firebase";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import React from "react";
import Image from "next/image";
import UserPins from "@/components/UserPins";
import SavedPins from "@/components/SavedPins";

type Props = {
  params: {
    userId: string;
  };
};

interface User {
  userName: string;
  email: string;
  profile: string;
}

const page = ({ params: { userId } }: Props) => {
  const db = getFirestore(app);
  const [user, setUser] = React.useState<User>();
  // const [active, setActive] = React.useState<string>("created");
  const [activeTab, setActiveTab] = React.useState<"created" | "saved">(
    "created"
  );
  // console.log(userId);

  React.useEffect(() => {
    if (userId) {
      getUser(userId);
    }
  }, [userId]);

  const getUser = async (userId: string) => {
    const docRef = doc(db, "users", userId);
    const user = await getDoc(docRef);

    if (user.exists()) {
      const userData = user.data() as User;
      setUser(userData);
    }
  };

  // console.log(user);
  const toggleTab = (tab: "created" | "saved") => {
    setActiveTab(tab);
  };

  return (
    <main className="py-4 flex justify-center items-center">
      <div className="flex flex-col items-center space-y-4">
        <Image
          src={user?.profile as string}
          width={150}
          height={150}
          alt="profile"
          className="rounded-full"
        />
        <div>
          <div className="text-center">
            <h2 className="font-semibold text-3xl">{user?.userName}</h2>
            <p className="text-gray-600">{user?.email}</p>
          </div>
        </div>
        <div className="py-10 flex flex-row gap-x-32 font-medium">
          <div
            className={`cursor-pointer ${
              activeTab === "created" ? "border-b-2 border-black" : ""
            }`}
            onClick={() => setActiveTab("created")}
          >
            Created
          </div>
          <div
            className={`cursor-pointer ${
              activeTab === "saved" ? "border-b-2 border-black" : ""
            }`}
            onClick={() => setActiveTab("saved")}
          >
            Saved
          </div>
        </div>
        {activeTab === "created" ? (
          <UserPins user={userId} />
        ) : (
          <SavedPins user={userId} />
        )}
      </div>
    </main>
  );
};

export default page;
