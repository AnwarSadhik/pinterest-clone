"use client";

import React from "react";
import app from "@/lib/firebase";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import Image from "next/image";
import { BsFillPinFill } from "react-icons/bs";

type Props = {
  user: string;
};

const SavedPins = ({ user }: Props) => {
  const db = getFirestore(app);
  const [userPins, setUserPins] = React.useState<any[]>([]);
  // console.log(user)

  React.useEffect(() => {
      const getUserPins = async () => {
      const pinsRef = collection(db, "pins");
      const q = query(pinsRef, where("userName", "==", user));

      try {
        const querySnapshot = getDocs(q);
        const pinsData = (await querySnapshot).docs.map((doc) => doc.data());
        setUserPins(pinsData);
      } catch (error) {
        console.log(error);
      }
    };
    getUserPins();
  }, [user]);

  // console.log(userPins)

  return (
    <>
      <div className="md:gap-8 p-4 space-y-4 columns-2 md:columns-4 container max-w-[1200px] mx-auto">
        {userPins?.map((pin) => (
          <div
            key={pin.id}
            className="rounded-xl overflow-hidden w-full aspect-auto"
          >
            <Image
              src={pin?.imageUrl}
              alt="pin-img"
              width={900}
              height={900}
              className="cursor-pointer rounded-lg"
            />
            <div className="flex items-center justify-between">
              <p className="py-2 px-1 hidden md:block md:text-xs">
                {pin.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      {userPins.length === 0 && (
        <div className="flex justify-center items-center text-sm">
          <p className="flex items-center gap-x-2">
            its Empty here
            <BsFillPinFill />
          </p>
        </div>
      )}
    </>
  );
};

export default SavedPins;
