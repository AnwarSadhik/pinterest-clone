"use client";
import app from "@/lib/firebase";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Pins = () => {
  const db = getFirestore(app);
  const [pins, setPins] = useState<any[]>([]);

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

  return (
    <motion.div className="md:gap-4 p-4 space-y-4 columns-2 md:columns-4">
      {pins.map((pin) => (
        <div key={pin.id} className="rounded-xl overflow-hidden w-full aspect-auto">
            <Image
              src={pin?.imageUrl}
              alt="pin-img"
              width={900}
              height={900}
              className="cursor-pointer"
            />
        </div>
      ))}
    </motion.div>
  );
};

export default Pins;
