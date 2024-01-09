"use client";

import app from "@/lib/firebase";
import {
  getFirestore,
  collection,
  getDocs,
} from "firebase/firestore";
import Image from "next/image";
import React, { useState, useEffect } from "react";
// import { LuBookmark } from "react-icons/lu";
// import { LuBookMarked } from "react-icons/lu";

type User = {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
};

type Props = {
  user: User | null | undefined;
};
const Pins = ({ user }: Props) => {
  const db = getFirestore(app);
  const [pins, setPins] = useState<any[]>([]);
  const [isSaved, setIsSaved] = useState(false);
  const [hover,setHover] = useState<Boolean>(false);

  const fetchPins = async () => {
    const pinsCollection = collection(db, "pins");
    const querySnapshot = await getDocs(pinsCollection);

    const pinsData: any[] = [];
    querySnapshot.forEach((doc) => {
      pinsData.push({ id: doc.id, ...doc.data() });
    });

    setPins(pinsData);
  };

  useEffect(() => {
    fetchPins();
  }, []);

  const toggleHoverOver = async () => {};

  return (
    <div className="md:gap-8 p-4 space-y-4 columns-2 md:columns-4">
      {pins.map((pin) => (
        <div
          key={pin.id}
          className="rounded-xl overflow-hidden w-full aspect-auto"
        >
          <div>
            <Image
              src={pin?.imageUrl}
              alt="pin-img"
              width={600}
              height={600}
              className="cursor-pointer rounded-lg"
            />
          </div>
          <div className="flex items-center justify-between">
            <p className="py-2 px-1 hidden md:block md:text-xs">
              {pin.title}
            </p>
          </div>
          {/* <LuBookmark className="hidden md:block cursor-pointer" /> */}
          <div className="flex items-center space-x-2 cursor-pointer">
            <Image
              src={pin.userProfile}
              alt="user"
              width={28}
              height={28}
              className="hidden md:block rounded-full"
            />
            <p className="hidden md:block md:text-xs">{pin.userName}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Pins;
