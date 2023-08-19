import PinForm from "@/components/PinForm";
import React from "react";
import { getAuthSession } from "../api/auth/[...nextauth]/route";

type Props = {};

const PinBuilder = async (props: Props) => {
  const session = await getAuthSession();
  return (
    <main className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="w-[90vw] mb-10 md:mb-0 h-full mt-28 md:mt-0  md:w-[80vw] md:h-[60vh]  bg-white shadow-custom p-8 rounded-xl">
        <PinForm user={session?.user}/>
      </div>
    </main>
  );
};

export default PinBuilder;
