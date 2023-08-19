import React from "react";
import PinBuilder from "../pin-builder/page";
import { getAuthSession } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

type Props = {};

const CreatePage = async (props: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  }

  return (
    <main className="flex justify-center items-center">
      <PinBuilder />
    </main>
  );
};

export default CreatePage;
