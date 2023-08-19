"use client";
import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { GrFormUpload } from "react-icons/gr";
import { Avatar } from "./ui/avatar";
import Image from "next/image";
import { Textarea } from "./ui/textarea";
import { storage } from "@/lib/firebase";

type User = {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
};

type Props = {
  user: User | null | undefined;
};

interface Pin {
  title: string;
  description: string;
  tag: string;
  imageFile?: File;
  imageUrl?: string;
  userName?: string | null;
  userProfile?: string | null;
}

const PinForm: React.FC<Props> = ({ user }) => {
  const imgRef = React.useRef<HTMLInputElement>(null);

  const [pinData, setPinData] = React.useState<Pin>({
    title: "",
    description: "",
    tag: "",
    imageFile: undefined,
    imageUrl: "",
    userName: user?.name || null,
    userProfile: user?.image || null,
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImg = e.target.files?.[0];
    if (selectedImg) {
      setPinData((prevPinData) => ({
        ...prevPinData,
        imageFile: selectedImg,
        imageUrl: URL.createObjectURL(selectedImg),
      }));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPinData((prevPinData) => ({
      ...prevPinData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // First, upload the image if it exists
    if (pinData.imageFile) {
    }
  };

  console.log(pinData);
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col md:flex-row space-y-10">
        <div className="w-[15rem] h-[15rem] mt-16 md:mt-0 border-dashed border-2 rounded-lg md:h-[32rem] md:w-[32rem]">
          <div
            className="flex justify-center items-center h-full cursor-pointer bg-gray-100 rounded-lg"
            onClick={() => imgRef.current?.click()}
          >
            {pinData.imageFile ? (
              <img
                src={URL.createObjectURL(pinData.imageFile)}
                alt="Uploaded"
                className="h-full w-full object-cover"
              />
            ) : (
              <>
                <span>
                  <GrFormUpload size={30} />
                </span>
                click to upload
              </>
            )}
            <input
              ref={imgRef}
              type="file"
              name="img"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
          <Button className="bg-red-500 absolute top-28 right-4 md:right-10 md:top-10 px-11 py-3 font-extrabold rounded-full">
            Save
          </Button>
        </div>
        <div className="flex flex-col justify-center items-center w-full px-10 space-y-10">
          <div className="w-full">
            <Input
              placeholder="Add your title"
              name="title"
              onChange={handleChange}
            />
            <label htmlFor="name" className="px-[0.5rem] text-xs text-gray-600">
              The first 40 characters that show up in your feed
            </label>
            <div className="flex items-center mt-2 gap-x-2">
              <Avatar>
                <Image
                  src={user?.image || ""}
                  width={40}
                  height={40}
                  alt="user image"
                />
              </Avatar>
              <h2>{user?.name}</h2>
            </div>
          </div>
          <Textarea
            placeholder="Tell everyone what your pin is about"
            name="description"
            className="resize-none pl-2"
            onChange={handleChange}
          />
          <Input
            placeholder="Add a tag  (cats, Tech...)"
            name="tag"
            onChange={handleChange}
          />
        </div>
      </div>
    </form>
  );
};

export default PinForm;
